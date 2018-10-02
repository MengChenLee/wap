<template>
    <div id="socialDynamic" style="width: 100%;height: 100%;">
        <div class="socialDynamic footerBtnParent">
          <div class="releaseDynamicHeader">
            <div class="socialDynamicHeader ">
              <span class="backBtn"><a href="javascript:;" @click="clickBack"><img src="../../assets/nav_button_back@2x.png" alt=""></a></span>
              <span class="socialDynamic headerRes">发布动态</span>
              <span class="Scavenging"></span>
            </div>
          </div>
          <div class="dynamicMain">
            <h5>动态内容</h5>
            <p class="dynamicContent">
              <textarea name="dynamicContent" v-model="myaddDynamicInfo.dynamicContent" class="dynamicContentWrite" maxlength="500"></textarea>
            </p>
            <div class="showImageList" >
              <h5>动态配图</h5>
              <div class="imgShow"  >
                <!--accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"-->
                <!--- 付费图标 ---->
                <!--<div class="paidMain" v-show="imgUrl.payStatus === 1">
                        <span class="mask"></span>
                        <span class="paid">付费</span>
                      </div>-->
               
                <div class="uploadImg">
                  <div class="releaseImg">
                    <div class="positionCheck">
                      <!--- elem上传组件 ---->
                      <el-upload
                        action="http://up-z0.qiniu.com"
                        list-type="picture-card"
                        :multiple= true
                        :data="qiniu"
                        :before-upload="beforeAvatarUpload"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleAvatarSuccess"
                        :limit=15>
                        <i >
                          <img class="uploadedImg" src="../../assets/social/jibenxinxi_tianjiazhaopian_baise_226.png" alt="">
                        </i>
                      </el-upload>
                    </div>
                  </div>
                  <!--- 上传完成的图片 -->
                  <div class="releaseImg imgEmpty" v-for="(imgUrl, index) in imgEmpty">
                    <div class="positionCheck">
                      <div class="delImg"  @click="clickDel(index,$event)">
                        <img src="../../assets/social/jibenxinxi_shanchu_hongse_30.png" alt="">
                      </div>
                      <img :src="imgUrl.picPath" class="photo">
                    </div>
                  </div>
                  
                  <!--- localStrange的图片 -->
                  <div class="releaseImg uploadedImg" v-for="(imgUrl, index) in uploadedImg" >
                    <div class="positionCheck">
                      <div class="delImg" @click="clickDel(index,$event)">
                        <img src="../../assets/social/jibenxinxi_shanchu_hongse_30.png" alt="">
                      </div>
                      <img :src="imgUrl.picPath" class="photo">
                    </div>
                  </div>
                </div>
              </div>
              
          </div>
            <div class="ChargeRights" >
              <h5>收费权限</h5>
              <div class="PermissionSwitch">
                <span class="Whether">是否收费</span>
                <mt-switch v-model="value" @change="turn"></mt-switch>
              </div>
            </div>
            <div class="ViewAmount" v-show="value">
              <h5>查看金额</h5>
              <div class="amountMoney" @click="clickF">
                <span class="amount">
                  <input class="number"
                         type="text"
                         onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"                          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                         v-model="myaddDynamicInfo.payAmount">
                </span>
                <span class="yuan">元</span>
              </div>
            </div>
          </div>
          <div class="Release HomemadeButton">
            <a class="release HomemadeButtonSon" @click="clickRelease">发布</a>
          </div>
        </div>
    </div>
</template>

<script>
  import api from '../../service/api.js'
  import { Toast } from 'mint-ui'
    export default {
      name: "social-addDynamic",
      data() {
        return {
          elemShow:true,
          value:false,
          sumImg:[],      // 总存储空间
          imgEmpty:[],    // 设置一个存储上传的图片空间
          uploadedImg:JSON.parse(localStorage.getItem("editableImg")), // 存储上传完成后的图片
          qiniu:{
            token:''
          },
          surplusImg:'',
          imgNum:'',
          falg:true,
          delImgNum:'',
          // delImgANum:'',
          // delImgBNum:'',
          myaddDynamicInfo:{    // 发布动态接口所需要的数据
            "accessToken": JSON.parse(localStorage.getItem("accessToken")),
            "memberId": JSON.parse(localStorage.getItem("memberId")),
            dynamicContent: JSON.parse(localStorage.getItem("dynamicContent")),
            payStatus: '',
            payAmount: '',
            socialId: +localStorage.getItem("mySocialId"),
            dynamicPics2:[],
          },
        };
      },
      created(){
        this.gettoken();
        this.imgEmpty=[];
      },
      computed:{
        qiniuUrl:function () {
          return this.$store.state.qiniuUrl;
        }
      },
      methods: {
        getPath(path){
          return this.qiniuUrl+'/'+path
        },
        clickBack(){
          this.$router.push({
            path: "/socialmyCenter"
          })
        },
        // 点击switch开关的动态
        turn: function(){
          if(this.value){
            $('.ViewAmount').show();
            $('.number').focus();
            $('.socialDynamic').scrollTop = $('.socialDynamic').scrollHeight;
          }else{
            $('.ViewAmount').hide();
          }
        },
        clickF(){
          $('.number').focus();
          $('.socialDynamic').scrollTop = $('.socialDynamic').scrollHeight;
        },
        beforeAvatarUpload(file) {
          this.value=false;
          const isLt10M = file.size / 1024 / 1024 < 10;
          if (!isLt10M) {
            this.$message.error('上传图片大小不能超过10MB!');
          }
          return isLt10M;
        },
        // 文件上传成功时所做的工作
        handleAvatarSuccess(res,file,raw) {
          if(this.falg){
            if(this.uploadedImg==null || this.uploadedImg.length===0){
              this.imgNum=0;
            }else{
              this.imgNum=this.uploadedImg.length;
            }
            this.delImgNum=raw.length;
          }else{
            if(this.uploadedImg==null || this.uploadedImg.length===0){
              this.imgNum=0;
            }else{
              this.imgNum = this.imgNum;
            }
            this.delImgNum= this.delImgNum + 1;
          }
          const path=this.qiniuUrl+'/'+res.key;
          this.surplusImg = this.delImgNum + this.imgNum;
          if(this.surplusImg<=15){
            this.imgEmpty.push({
              picPath: path,
              payStatus: 0
            });
            this.sumImg = this.imgEmpty;
            // console.log(this.imgEmpty)
          }else{
            this.$message({
              message: '最多只能上传15张图片哦',
              type: 'warning'
            });
          }
          // console.log(this.surplusImg)
        },
        // 获取七牛云token
        gettoken(){
          api.getToken().then(({status, data = {}}) => {
            if(data.success==true){
              this.qiniu.token=data.data.token;
            }
          });
        },
        
        // 图片的删除
        clickDel(index,event){
          this.falg=false;
          if($(event.currentTarget).parent().parent().hasClass('imgEmpty')==true){
            if(index==0){
              this.imgEmpty.splice(0,1);
            }else {
              this.imgEmpty.splice(index,1);
            }
            --this.delImgNum;
            this.delImgNum=this.delImgNum;
          }else if($(event.currentTarget).parent().parent().hasClass('uploadedImg')==true){
            if(index==0){
              this.uploadedImg.splice(0,1);
            }else {
              this.uploadedImg.splice(index,1);
            }
            --this.imgNum;
            this.imgNum=this.imgNum;
          }
        },
        
        // 发布动态
        clickRelease() {
          if(this.uploadedImg == null || this.uploadedImg.length==0){
            this.sumImg=this.imgEmpty;
          }else{
            this.sumImg=this.uploadedImg.concat(this.imgEmpty);
          }
          this.myaddDynamicInfo.dynamicPics2=this.sumImg;
          if(this.value!=true){
            this.myaddDynamicInfo.payStatus=0;
            this.myaddDynamicInfo.payAmount= +this.myaddDynamicInfo.payAmount;
            api.addDynamicInfo(
              this.myaddDynamicInfo
            ).then(({status, data = {}}) => {
              if(data.success!=true){
                this.$message({
                  message: data.msg.message,
                  type: 'warning'
                });
              }else{
                this.$router.push({
                  path: "/socialmyCenter"
                })
              }
            });
          }else if(this.myaddDynamicInfo.payAmount==''){
            this.$message({
              message: '请输入需要付的费用',
              type: 'warning'
            });
          }else{
            this.myaddDynamicInfo.payStatus=1;
            localStorage.setItem('sumImg', JSON.stringify(this.sumImg));
            localStorage.setItem('uploadedImg', JSON.stringify(this.uploadedImg));
            localStorage.setItem('myaddDynamicInfo', JSON.stringify(this.myaddDynamicInfo));
            localStorage.setItem('dynamicContent', JSON.stringify(this.myaddDynamicInfo.dynamicContent));
            this.$router.push({
              path: "/selectPaidContent"
            });
          }
          
        },
      }
    }
</script>

<style scoped>
  .socialDynamic{
    width: 100%;
    height: 100%;
  }
  .socialDynamicHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 10;
    background-color: #111111;
    text-align: center;
  }
  .socialDynamicHeader .socialDynamic{
    line-height: 60px;
  }
  .socialDynamicHeader span img{
     position: absolute;
     top: 10px;
     width: 40px;
     height: 40px;
   }
  .Scavenging img{
    right: 10px;
  }
  .backBtn img{
    left: 10px;
  }
  .dynamicMain{
    margin-top: 60px;
  }
  .dynamicMain h5{
    height: 40px;
    font-family: PingFang-SC-Medium;
    font-size: 15px;
    line-height: 40px;
    letter-spacing: 0px;
    font-weight: normal;
    margin-left: 3%;
    color: #fffefe;
  }
  .dynamicContent{
    width: 94%;
    height: 200px;
    border-radius: 2px;
    border: solid 1px #545454;
    margin: 5px auto;
  }
  .dynamicContent  .dynamicContentWrite{
    width: 96%;
    height: 170px;
    margin: 15px 2%;
    font-size: 14px;
    font-family: "Micrsoft YaHei", "PingFangSC-Semibold";
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  /* 修改upload */
  .showImageList{
    width: 94%;
    margin: 5px auto;
  }
  .showImageList h5{
    margin-left: 0;
  }
  .imgShow{
    width: 100%;
  }
  .uploadImg{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .uploadedImg{
    width: 100%;
    height: 100%;
  }
  .PermissionSwitch,
  .amountMoney{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    height: 45px;
    margin: 5px auto;
    padding: 0 2%;
    border-radius: 3px;
    border: solid 1px #545454;
  }
  .Whether,
  .amountMoney span{
    font-family: PingFang-SC-Medium;
    font-size: 15px;
    line-height: 45px;
    margin-left: 2%;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .amountMoney .amount input{
    font-family: PingFang-SC-Medium;
    color: #ffffff;
    background-color: #111111;
  }
  .Release{
    width: 96%;
    margin: 20px auto 10px;
  }

  /*.paidMain{
    position: absolute;
    top: 10px;
    left: 0;
  }
  .paidMain .mask{
    display: inline-block;
    width: 40px;
    height: 20px;
    opacity: 0.5;
    background-color: #000;
  }
  .paidMain .paid{
    position: absolute;
    top: 0;
    left: 8px;
    font-size: 12px;
    line-height: 19px;
  }
  .imgStrange{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }*/
  .releaseImg{
    width: 33.3%;
    margin-bottom: 10px;
  }
  .positionCheck{
    position: relative;
    margin: 0 auto;
  }
  @media screen and (min-width: 300px) {
    .positionCheck{
      width: 95px;
      height: 95px;
    }
  }
  @media screen and (min-width: 330px) {
    .positionCheck{
      width: 100px;
      height: 100px;
    }
  }
  @media screen and (min-width: 350px) {
    .positionCheck{
      width: 105px;
      height: 105px;
    }
  }
  @media screen and (min-width: 380px) {
    .positionCheck{
      width: 115px;
      height: 115px;
    }
  }
  @media screen and (min-width: 400px) {
    .positionCheck{
      width: 120px;
      height: 120px;
    }
  }
  @media screen and (min-width: 420px) {
    .positionCheck{
      width: 127px;
      height: 127px;
    }
  }
  @media screen and (min-width: 440px) {
    .positionCheck{
      width: 133px;
      height: 133px;
    }
  }
  @media screen and (min-width: 470px) {
    .positionCheck{
      width: 140px;
      height: 140px;
    }
  }
  @media screen and (min-width: 500px) {
    .positionCheck{
      width: 148px;
      height: 148px;
    }
  }
  @media screen and (min-width: 520px) {
    .positionCheck{
      width: 155px;
      height: 155px;
    }
  }
  @media screen and (min-width: 550px) {
    .positionCheck{
      width: 165px;
      height: 165px;
    }
  }
  @media screen and (min-width: 580px) {
    .positionCheck{
      width: 180px;
      height: 180px;
    }
  }
  @media screen and (min-width: 660px) {
    .positionCheck{
      width: 200px;
      height: 200px;
    }
  }
  @media screen and (min-width: 700px) {
    .positionCheck{
      width: 213px;
      height: 213px;
    }
  }
  @media screen and (min-width: 740px) {
    .positionCheck{
      width: 226px;
      height: 226px;
    }
  }
  .delImg{
    position: absolute;
    right: 0;
    top: 0;
  }
  .delImg img{
    width: 23px;
    height: 23px;
  }
  .releaseImg .photo{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .removeImg{
    width: 22px;
    height: 22px;
    border-radius: 50%;
  }


</style>
