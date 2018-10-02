<template>
    <div class="app">
        <div class="header">
           <a class="headerBack" href="javaScript:;" onClick="javaScript:history.go(-1)">
         <i class="mintui mintui-back left-icon"></i></a>
         <h1>基本信息</h1>
       </div>

       <!-- 基本信息内容容器 -->
       <div class="container">
                <div class="years">
                    <h1>你的年龄</h1>
                    <input type="text" v-model="personAge">
                    <i>岁</i>
                </div>
                <div class="years">
                    <h1>你的身高</h1>
                    <input type="text" v-model="personHeight">
                    <i>cm</i>
                </div>

                    <div class="years">
                                <h1>你的体重</h1>
                                <input type="text" v-model="personWeight">
                                <i>Kg</i>
                            </div>

                    <div class="years">
                                <h1>所在地区</h1>
                              
                               <button  @click="socialShow=!socialShow">{{province}}</button>
                                <i></i>
                            </div>


                    <div class="personTips">
                    <h1>个性标签（*最多可添加4个标签，每个标签不超过4个字）</h1>
                    <button @click="addTips">  <i>+</i> 新建标签</button>
                    <div class="dataList">
                    <span @click="cancelTips(i)" v-for="(v,i) in myinfo.tagInfoList2" v-if="v.status==1"  :key="i">{{v.tagName}}</span>
                    </div>
                </div>
                
       <!-- 个人简介 -->
                <div class="perosnProduct">
                    <h1>个人简介</h1>
                    <textarea v-model="personProdut" name="" id="" cols="30" rows="10"></textarea>
                </div>

       <!-- 图片展示 -->
                <div class="showImageList" >
                    <h1>展示图片（*最多展示6张图片）</h1>
                    <div class="imgList" >
                            <el-upload
                                action="http://up-z0.qiniu.com"
                                list-type="picture-card"
                                :data="qiniu"
                                :on-success="handleMainImgSuccess"
                                limit:6
                                :file-list="personImgs"
                                :on-remove='canceImgList'
                                 :before-upload="beforeAvatarUpload"
                                >
                                <i>
                                    <img class="uploadImg" src="../../assets/social/jibenxinxi_tianjiazhaopian_baise_226.png" alt="">
                                </i>
                            </el-upload>
                    </div>
                </div>

       </div>
      <div class="submit HomemadeButton footerBtn">
        <a class="HomemadeButtonSon" @click="upDateInfo">保存</a>
      </div>

       <!-- 新建标签模态框 -->
       <div v-if="modelShow" class="modelTips">
         <h1>新建标签内容</h1>
         <input v-model="tipContent" type="text" placeholder="请输入标签内容">
         <button @click="cancel" class="cancel">取消</button>
         <button @click="confirm" class="confirm">确定</button>
       </div>

        <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
   <div v-show="socialShow" class="socialFilter animated">
    <!-- 筛选的盒子  删选条件的内容 -->
    <div class="socialContent">
          <!-- 所在省份 -->
          <div class="provinceRange">
              <h1>所在省份</h1>
                <button
                 v-for="(v,i) in areaList"
                 :key="i" @click="btn(i)"
                 v-bind:class="{active:i==guigeSpan}">
                 {{v.areaName}}</button>
          </div>
         
    </div>
 <div class="confirmBtn">
     <button @click="confirmProvince">确定</button>
 </div>


 
   </div>
   
</transition>

    </div>
</template>

<script>
import api from '../../service/api.js'
import { Toast } from 'mint-ui'
export default {
   data(){
       return{
            dialogImageUrl: '',
            dialogVisible: false,
            modelShow:false,
            tipContent:'',//标签名字
            qiniu:{
            token:''
            },
            socialId:+localStorage.getItem("mySocialId"),
            detailImg:[],
            areaList:[],//区域信息
            socialShow:false,//区域编辑
             guigeSpan:-1 ,//区域选择
                            personalInfo:{},//上个页面传来的社交信息
                            personTags:[],//上个页面传来的标签
                            personImgs:[],//上个页面传来的展示图片
              province:'',//区域展示
              personAge:'',
              personHeight:'',
              personWeight:'',
              personProdut:'',
              saveTagList:[],//保存改变状态的标签（删除过后的数据传递给后台）
              saveImgList:[],//保存删除后的图片数据
                                                    myinfo:{           //我的个人资料
                                                        age:'',
                                                        height:'',
                                                        weight:'',
                                                        areaId:'',
                                                        gender:1,
                                                        introduction:'',
                                                        tagInfoList2:[],                                         //社交标签
                                                        socialPicList2:[],
                                                        accessToken:null,
                                                        socialId:+localStorage.getItem("mySocialId"),
                                                        memberId:+localStorage.getItem("memberId"),
                                                      
                                                        },
                                                        
       }
       
   },
   methods:{
       addTips(){
           if(this.myinfo.tagInfoList2.length<4){
               this.modelShow=true
         
           }
           else{
                this.$message({
            message: '标签最多只能添加四个哦',
            type: 'warning'
        });
           }
        
       },
      confirm(){
          if(this.tipContent!=''){
            
            this.myinfo.tagInfoList2.push({
                tagName:this.tipContent,
                socialId:this.socialId,
                status:1
                });
            this.tipContent='';
            this.modelShow=false;
          }
          else{
               this.$message({
                    message: '请输入标签',
                    type: 'warning'
        });
          }
          
      },
      cancel(){
           this.tipContent='';
            this.modelShow=false;
      },
      handleMainImgSuccess(value,fil,raw,index){
         console.log(fil,raw)
            const path=this.qiniuUrl+'/'+value.key;
          if(index!==undefined){
            this.$set(  this.myinfo.socialPicList2,index,path)
          }else{
             this.myinfo.socialPicList2.push({
                 picPath:path,
                 socialId:this.socialId,
                 status:1
             })
          }
      },
      
      cancelTips(i){
        //
        if(this.myinfo.tagInfoList2[i].hasOwnProperty("status")){
                this.myinfo.tagInfoList2[i].status=-1
                this.saveTagList.push(this.myinfo.tagInfoList2[i]);
                this.myinfo.tagInfoList2.splice(i,1);
                // console.log(this.saveTagList);
        }
        else{
            this.myinfo.tagInfoList2.splice(i,1)
        }
       
      },
       gettoken(){
            api.getToken().then(({status, data = {}}) => {
                 if(data.success==true){
                    this.qiniu.token=data.data.token
                 }
            });
       },
       //更新社交资料
       upDateInfo(){
          var token=JSON.parse(localStorage.getItem('accessToken'))
          this.myinfo.age=+this.personAge
          this.myinfo.height=+this.personHeight
          this.myinfo.weight=+this.personWeight
          this.myinfo.areaId=+localStorage.getItem("provinceIndex")+1
          this.myinfo.introduction=this.personProdut;
          this.myinfo.accessToken=token;
          //将绑定的数据和保存的表现数据放在一起
          this.myinfo.tagInfoList2=this.myinfo.tagInfoList2.concat(this.saveTagList);
          //将删除的数据和新上传的数据放在一起传递给后台
          //1处理删除后的数据，把不用的数据删除掉
              var newImgList=[];
              for(var i=0;i<this.saveImgList.length;i++){
                  newImgList.push({
                      socialId:this.saveImgList[i].socialId,
                      status:this.saveImgList[i].status,
                      socialPicId:this.saveImgList[i].socialPicId,
                      picPath:this.saveImgList[i].url
                  })
              }
              
        //2将处理好的删除的数据和上传的新数据拼接发送给后台；
        this.myinfo.socialPicList2=this.myinfo.socialPicList2.concat(newImgList)

          api.updateSocialInfo(
                this.myinfo
          ).then(({status, data = {}}) => {
               if(data.success==true){
                    this.$message({
                    message: '修改成功！',
                    type: 'success'
        });
                 this.$router.push('/socialmyCenter');
               }
          });
       },
         //获取区域信息
            getAreaList(){
                 api.queryAreaList({   }).then(({status, data = {}}) => {
                 
                 if(data.success==true){
                        // this.loading2=false
                     this.areaList=data.data;
                     
                     
                  
                 }
                  


                   });
            },
            // 切换区域
           btn:function(index){  //当点击时候点亮，同级的span标签删除Class
           this.guigeSpan = index;
          
           localStorage.setItem("provinceIndex",index)

            },
            //点击确认筛选区域信息
        confirmProvince(){
             var index=localStorage.getItem("provinceIndex");
             this.myinfo.areaId=index;
             this.province=this.areaList[index].areaName
             this.socialShow=false

        },
        //获取个人信息
        getUserInfo(){
               //获取个人社交页面传来的社交信息，标签和社交图片
                 this.personalInfo=JSON.parse(localStorage.getItem("personnalInfo"))
                this.personTags=JSON.parse(localStorage.getItem("personTags"))
                this.personImgs=JSON.parse(localStorage.getItem("personImgs"))
               
                //给变数组中图片的属性值，渲染页面
                    var a=JSON.stringify(this.personImgs).replace(/picPath/g,"url");
                    var b=JSON.parse(a);
                    this.personImgs=b;
                 
                console.log(this.personalInfo)
              //把传来的数据渲染绑定在页面上，随时可以改动传递给后台
                this.province=this.personalInfo.areaName
                this.personAge=this.personalInfo.age
                this.personHeight=this.personalInfo.height,
                this.personWeight=this.personalInfo.weight
                this.personProdut=this.personalInfo.introduction

            //    操作标签数据渲染页面
               for(var i=0 ; i < this.personTags.length;i++){
                  this.myinfo.tagInfoList2.push({
                      socialId:this.personTags[i].socialId,
                      status:this.personTags[i].status,
                      tagName:this.personTags[i].tagName,
                      tagId:this.personTags[i].tagId
                  })
               
               }
                //   console.log(this.myinfo.tagInfoList2)
        },
        //删除数据
        canceImgList(a,b){
            a.status=-1
            this.saveImgList.push(a)
            console.log(this.saveImgList)
        },
         beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
        
   },
   created(){
       this.gettoken();
      this.getAreaList();
      this.getUserInfo()
   },
     computed:{
      qiniuUrl:function () {
        return this.$store.state.qiniuUrl
      }
    },
}
</script>

<style scoped>


.app{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    color: white;
    position: relative;
    overflow: scroll;
}
.header {
     width: 100%;
     height: 40px;
     text-align: center;
     line-height: 40px;
     font-size: 14px;
     color: white;
     position: fixed;
     z-index: 666;
     background-color: black;
     border-bottom: 1px solid rgba(209, 201, 201, 0.3);
     top: 0;
     left: 0;
     
 }
 .headerBack{
     width: 40px;
     height: 41px;
     position: absolute;
     left: 0;
     top: 0;
     
 }
  .headerBack i{
      font-size: 20px;
      color: white;
  }
  .header h1{
      font-weight: 600;
      font-size: 16px;
  }


.container{
    width: 100%;
   box-sizing: border-box;
    padding: 10px;
}
.years{
    width: 100%;
    height: 80px;
    position: relative;
}
.years input{
    width: 95%;
    height: 40px;
    border: 1px solid #545454;
    outline: none;
    background-color: #111;
    text-indent: 10px;
    color: #fff;
}
.years button{
    width: 95%;
    height: 40px;
    border: 1px solid #545454;
    outline: none;
    background-color: #111;
    text-indent: 10px;
    color: #fff;
    text-align: left;
}
.years h1{
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #ccc;
  
  
}
.years i{
    position: absolute;
    right: 10%;
    bottom: 19%;
    font-size: 14px;
    color: #fffefe;
   
}
.personTips{
      width: 100%;
    height: 120px;
    position: relative;
}
.personTips h1{
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #ccc;
}
.personTips button{
    width: 80px;
    height: 30px;
    padding-left:5px;
    position: relative;
    color: #fff;
    background-color: #111;
    border: solid 1px #ffffff;
}
.personTips button i{
    position: absolute;
    font-size: 20px;
    color: #ccc;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);

}

.dataList{
    width: 100%;
    height: 40px;
    margin-top: 10px;

}
.dataList span{
    width: 20%;
    height: 30px;
    display: inline-block;
    border: 1px solid red;
    line-height: 30px;
    text-align: center;
    margin-left: 3%;
    color: #ef2b3a;
     background-image: url(../../assets/social/jibenxinxi_shanchu_hongse_30.png);
     background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: 103% -5%;
    font-size: 13PX;
}

.perosnProduct{
    width: 100%;
    height: 200PX;
}
.perosnProduct h1{
    width: 100%;
    height: 30px;
    line-height: 30px;
}
.perosnProduct textarea{
    width: 90%;
    height: 150PX;
    margin-left: 5%;
    box-sizing: border-box;
    background-color: #111;
    border: 1px solid #262626;
    border-radius: 4px;
    color: #fff;
    padding: 11px;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0px;
}

.showImageList{
    width: 100%;
}
.showImageList h1{
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #ccc;
}
.imgList{
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
}
/* 修改upload */


.submit{
  width: 94%;
  left: 50%;
  /*bottom: -58%;*/
  transform: translateX(-50%);
  margin-bottom: 10px;
}


/* 添加标签模态框 */
.modelTips{
    width: 270px;
    height:165px;
    z-index:999;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top: 30%;
    background-color: black;
    border-radius: 14px;
    overflow: hidden;
  
   
}
.modelTips h1{
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #EF2B3A;
    font-size: 16px;
    text-align: center;
    
    
}
.modelTips input{
    width: 90%;
    height: 30px;
   margin-left: 5%;
   margin-top: 20px;
  background-color: #111;
   border: 1px solid #333;
   text-align: center;
   color: #ccc;
   font-size: 14px;
}
.modelTips button{
    position: absolute;
    width: 135px;
    height: 50px;
    background-color: #111;
    border: 1px solid #333;
}
.modelTips .cancel{
    bottom: 0;
    left: 0;
    color: #ccc;
     border-radius: 0px 0px 0px 14px;
}
.confirm{
     right: 0;
    bottom: 0;
    color: #ef2b3a;
    border-radius: 0px 0px 14px 0;
}
.uploadImg{
    width: 100px;
    height: 100px;
   
}











/* 筛选模态框 */
 .socialFilter{
     position: absolute;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     z-index: 999;
     background-color: rgba(0, 0, 0, .3);
     box-sizing: border-box;
     overflow: hidden;
    
 }
.socialFilter .socialContent{
  width: 70%;
  height: 100%;
  position: absolute;
  overflow: scroll;
  right: 0;
  top: 0;
  background-color: #000;
  padding: 0 10px;
   box-sizing: border-box;
   padding-bottom:42px;

}


/* 省份区间 */

.provinceRange{
    width: 100%;
}
.provinceRange h1{
     display: block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    color:#565656;
}
.provinceRange button{
    width: 30%;
    height: 40px;
    float: left;
    margin-top: 10px;
    margin-right: 3.3%;
    color: #ccc;
    background-color: #000;
    border: 1px solid rgb(170, 168, 168);
    position: relative;
    font-size: 13px;
    border-radius: 2px;
}

.provinceRange button:nth-child(3n+1) {
  margin-right: 0;
}
.confirmBtn{
    width: 70%;
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: red;
}
.confirmBtn button{
    width: 100%;
    height: 40px;
    border: none;
    background-color: #ccc;
    color: #777;
    text-align: center;
}
.confirmBtn button:last-child{
  background-color: #EF2B3A;
  color: white;
}

.active{
  background-image: url(../../assets/social/addclass.png);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 103% -5%;
  border: 1px solid red!important;
  color:#ef2b3a!important;
  
}
</style>
