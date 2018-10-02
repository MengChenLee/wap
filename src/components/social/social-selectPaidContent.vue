<template>
  <div id="selectPaidContent">
    <div class="selectPaidContent">
      <div class="selectPaidConHeader">
        <div class="selectPaidHeader publicFlex">
          <span class="backBtn"><a href="javascript:;" @click="clickBack"><img src="../../assets/nav_button_back@2x.png" alt=""></a></span>
          <span class="socialDynamic headerRes">选择付费内容</span>
          <span class="Scavenging flexClear"></span>
        </div>
        <div class="selectPaidConMain" v-show="pageShow">
          <div class="selectPaidMain">
            <div class="selectPaid" v-for="(imgUrl, index) in imgList.dynamicPics2">
              <div class="positionCheck">
                <img :src=srcCheckno @click="changeBgc(index)" class="imgCheck">
                <img :src="imgUrl.picPath" class="photo">
              </div>
            </div>
          </div>
          <div class="Finish HomemadeButton footerBtn">
            <a class="finish HomemadeButtonSon" @click="clickFinish">完成</a>
          </div>
        </div>
        <div class="selectPaidErrorMain" v-show="!pageShow">
          <img src="../../assets/social/wangluobukeyong_400.png" class="positionCenter" alt="" width="300px" height="300px" @click="clickRefresh">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../service/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "selectPaidContent",
    data(){
      return {
        pageShow:true,
        srcChecked: require('../../assets/social/checked.png'),
        srcCheckno: require('../../assets/social/check_no.png'),
        imgList: JSON.parse(localStorage.getItem("myaddDynamicInfo")), // 存储上传数据
        editableImg:[], // 存储可编辑的图片
      }
    },
    computed:{
      qiniuUrl:function () {
        return this.$store.state.qiniuUrl;
      }
    },
    created() {
      this.dataStrange();
    },
    methods:{
      // 储存可编辑的图片数据
      dataStrange(){
        this.editableImg=this.imgList.dynamicPics2;
        localStorage.setItem('editableImg', JSON.stringify(this.editableImg));
      },
      // 获取图片路径
      getPath(path){
        return this.qiniuUrl+'/'+path
      },
      clickBack(){
        this.$router.push({
          path: "/socialAddDynamic"
        })
      },
      
      // 编辑图片
      changeBgc(index){
        if(this.imgList.dynamicPics2[index].payStatus==0){
          $($('.imgCheck')[index]).attr('src',this.srcChecked);
          this.imgList.dynamicPics2[index].payStatus = 1;
        }else{
          $($('.imgCheck')[index]).attr('src',this.srcCheckno);
          this.imgList.dynamicPics2[index].payStatus=0;
        }
      },
      
      // 点击完成，发布动态
      clickFinish(){
        var payStatus=[];
        for(var i = 0; i < this.imgList.dynamicPics2.length; i++) {
          if(this.imgList.dynamicPics2[i].payStatus==1){
            payStatus.push(this.imgList.dynamicPics2[i].payStatus);
          }
        }
        // 判断是否付费 0：公开  1：付费
        if(payStatus.length==0){
          this.imgList.payStatus=0;
        }else{
          this.imgList.payStatus=1;
        }
        api.addDynamicInfo(
          this.imgList
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
      },
    }
  }
</script>

<style scoped>
  .selectPaidConMain{
    width: 96%;
    height: 100%;
    margin: 0 auto;
  }
  .selectPaidMain{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .selectPaid{
    width: 33.3%;
    height: 120px;
    margin-top: 10px;
  }
  .positionCheck{
    position: relative;
    width: 120px;
    height: 100%;
    margin: 0 auto;
  }
  .selectPaid .photo{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .selectPaid .imgCheck{
    position: absolute;
    top: 7px;
    right: 7px;
    width: 23px;
    height: 23px;
  }
  .selectPaidErrorMain{
  
  }
  .paidMain{
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
  .Finish{
    width: 94%;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
