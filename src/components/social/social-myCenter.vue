<template>
    <div class="app">
     <!-- 个人信息轮播图 -->
       <div class="header">
                 <router-link class="userEdit" to="/socialEditCenter"><img src="../../assets/social/gerenshouye_bianji_baise_100.png" alt=""></router-link>
                      <a href="javaScript:;" @click="goScial">
                   <img src="../../assets/social/shejiaoxiangqing_fanhui_baise_100.png" alt=""></a>
                    </div>
     <div class="banner" >
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(v,i) in personImageList" :key="i"><img :src="v.picPath" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>




  <!-- 个人资料及动态详情部分 -->
 <div class="container">
 <div class="topbar">
     <span  @click="showOne"><h1 class="active" ref="person">个人中心</h1></span>
     <span @click="showTwo"><h1  ref="info">动态信息</h1></span>
 </div>

 <div class="contentBar">
    <ul class="ks-clear">
        <!-- 控制个人资料部分的显示隐藏 -->
         <li class="personShows" v-if="userbarOne">
             <h1 class="baseInfo">基本信息</h1>
          <span class="nameTitle">昵称</span>
            <div class="nickName">
                  <span>{{personSocial.nickname}}</span>
                
            </div>
           <span>年龄</span>
           <span class="yearsNum">{{personSocial.age}}</span>
           <span>身高</span>
           <span class="heightNum">{{personSocial.height}}cm</span>
           <span>体重</span>
           <span class="weightNum">{{personSocial.weight}}KG</span>
           <div class="tipsBox">
                <h1>标签</h1>
                <span v-for="(v,i) in tagInfo" :key="i">{{v.tagName}}</span>
               
           </div>
        
        <h2 class="personalProduct">个人简介</h2>
        <p class="personInfo">
           {{personSocial.introduction}}
        </p>
        <img class="personalImg" :src="personSocial.gravatar" alt="">
       
        </li>
      
      <!-- 控制动态信息部分的显示隐藏 -->
        <li v-if="userbarTwo" class="userInfoLists">
            
            <!--用户动态详情的跳转，查看动态详情需要判断付费情况  -->
            <div class="usershow" v-for="(v,i) in personDynamic" :key="i">
               <img class="userImg" :src="v.gravatar" alt="">
                <span class="userName">{{v.nickname}}</span>
                <span class="userStartTime">{{getDate(v.createTime)}}</span>
                <p> {{v.dynamicContent}}</p>
                <div class="imgList">
                    <img :src="a.picPath" alt="" v-for="a in v.dynamicPicList" :key="a">
                </div>
            </div>
              <!-- 无动态展示图片 -->
             <div class="noneImg" v-if="noneImg">
                 <img src="../../assets/social/shejiaoxiangqing_xiangguandongtaikongtai_400.png" alt="">
             </div>
             
        </li>
    </ul>
 </div>

 </div>
 


 <!-- 底部固定 -->
 <div class="footer">
    <router-link to="/socialAddDynamic"> 发布动态</router-link>
 </div>
    </div>
</template>

<script>
import api from '../../service/api.js'
import DateForm from '../../service/dateForm.js'
export default {
data () {
    return {
        //个人资料和动态信息的切换
        userbarOne:true,
        userbarTwo:false,
        //个人资料数据
        personSocial:{},
        //社交用户图片
        personImageList:[],
        //用户动态信息
        personDynamic:[],
        //用户标签
        tagInfo:[],
         noneImg:false,//无动态时展示
  
    }
},
methods: {
  // 获取社交用户云信帐号
  getSocialYunxin(){
    api.getsocialimuser({
      socialId: JSON.parse(localStorage.getItem("mySocialId"))
    }).then(({status, data = {}}) => {
        localStorage.setItem('imAccid', data.imAccid);
        localStorage.setItem('imToken',data.imToken);
    });
  },
    showOne(){
         this.$refs.person.style.color="#fc060c"
          this.$refs.person.style.borderBottom="1px solid #fc060c"
           this.$refs.info.style.borderBottom="none";
         this.$refs.info.style.color="#fff"
        this.userbarOne=true;
        this.userbarTwo=false;
       
    },
    showTwo(){
            this.$refs.person.style.color="#fff"
            this.$refs.info.style.color="#fc060c"
            this.$refs.info.style.borderBottom="1px solid #fc060c"
            this.$refs.person.style.borderBottom="none";
            this.userbarOne=false;
            this.userbarTwo=true;
        
    },
    getMyinfo(){
        api.querySocialByMember(
            {
              
                    accessToken:JSON.parse(localStorage.getItem("accessToken")),
                     memberId:JSON.parse(localStorage.getItem("memberId"))
            }
        ).then(({status, data = {}}) => {
                
                 if(data.success==true){
                     this.personSocial=data.data.socialInfo;
                     this.personImageList=data.data.socialPicList;
                     this.tagInfo=data.data.tagInfoList
                     //把个人信息编辑传到编辑页面
                     localStorage.setItem("personnalInfo",JSON.stringify(this.personSocial))
                     //把标签 和动态展示的图片传递到下个编辑页面
                      localStorage.setItem("personTags",JSON.stringify(this.tagInfo))
                      localStorage.setItem("personImgs",JSON.stringify(this.personImageList))
                  
                 }

                   });
    },
    goScial(){
        this.$router.push('/socialIndex')
    },
    //获取自己的动态信息
    getSocialDy(){
                    api.queryDynamicInfo({
                             socialId:+localStorage.getItem("mySocialId"),
                             accessToken:JSON.parse(localStorage.getItem("accessToken")),
                             memberId:JSON.parse(localStorage.getItem("memberId"))
                    }).then(({status, data = {}}) => {
                   if(data.success==true && data.data.dynamicInfoList.length>0){
                        // this.loading=false;
                        // this.personSocial=data.data.socialInfo;
                        this.personDynamic=data.data.dynamicInfoList.reverse();
                        // localStorage.setItem("personUserD",JSON.stringify(this.personDynamic))
                        // console.log( data.data.dynamicInfoList)
                      
                   }
                   else{
                     this.noneImg=true
                 }
               
                   });
            },

  getDate(date){
              if (!date) {
            return '无'
          } else {
            return DateForm(date)
          }
          },


//删除本地储存的添加动态数据
deletInfo(){
  localStorage.removeItem("sumImg");
  localStorage.removeItem("uploadedImg");
  localStorage.removeItem("editableImg");
  localStorage.removeItem("myaddDynamicInfo");
  localStorage.removeItem("dynamicContent")
}

},
 created(){
   this.getSocialYunxin();
   this.getMyinfo();
   this.getSocialDy();
   this.deletInfo();
 }
}
</script>

<style scoped>
.app{
    overflow: scroll;
    padding-bottom: 40px;
    height: 100%;
    color: #fff;
    position: relative;
    box-sizing: border-box;
}
.banner{
     width: 100%;
     height: 300px;
     position: relative;
 }
 .banner img{
     display: block;
     width: 100%;
     height:300px;
 }
 .banner a:last-child{
     width: 50px;
     height: 50px;
     line-height: 50px;
     text-align: center;
     z-index: 666;
     color: #fff;
     position: absolute;
     left: 0;
     top: 0;
     
 }
  .banner a:first-child{
       width: 30px;
     height: 30px;
     line-height: 30px;
     text-align: center;
     z-index: 666;
     position: absolute;
     right: 0;
     top: 0;
  }
 .banner a i{
       width: 30px;
       height: 30px;
       display: block;
       font-size: 20px;
       color: white;
 }
 .container{
     width: 100%;
 }

.topbar{
    width: 100%;
    height: 40px;
   border-bottom: 1px solid #000;

}
.topbar span{
    width: 50%;
    height: 100%;
    line-height: 40px;
    float: left;
   position: relative;
}
.topbar span h1{
    height: 100%;
    position: absolute;
    text-align: center;
}
.topbar span:first-child h1{
    right: 10%;
}
.topbar span:last-child h1{
    left: 10%;
}
.contentBar span{
    display:block;
    height: 30px;
    text-indent: 5px;
    padding-left: 10px;
    line-height: 30px;
}
.contentBar{
    width: 100%;
}
.contentBar ul{
    width: 100%;
    height: 100%;
}
.contentBar ul li{
    width: 100%;
    height: 100%;
    position: relative;
}
.contentBar h1{
    text-align: center;
    font-weight: 700;
    font-size: 13px;
}
 .footer{
     width: 100%;
     height: 40px;
     border-top: 1px solid #000;
     line-height: 40px;
     text-align: center;
     position: fixed;
     bottom: 0;
     left: 0;
     z-index: 666;
     background-color: #EF2B3A;
 }
 .userInfoLists{
     position: relative;
 }
.userImg{
     width: 40px;
     height: 40px;
     border-radius: 50%;
     margin-top: 15px;
    
 }
 .userName{
    position: absolute;
    left: 70px;
    top: 10px;
    font-size: 15px;
    color: #fff;
 }
 .userStartTime{
    position: absolute;
   left: 70px;
   top: 30px;
   font-size: 12px;
   color: #ccc;
 }
 .usershow{
     width: 100%;
     margin-top: 20px;
     position: relative;
 }
 .usershow p{
    display: block;
    margin: 20px 5px;
 }
 .imgList{
    
    width: 100%;
    padding-bottom: 50px;
 }
 .imgList img{
   width: 30%;
   height: 100px;
   margin:0 1.3% ;
   border-radius: 4px;
   
   
 }

 /* 修改社交个人信息样式 */
.baseInfo{
   text-align: center!important;
    background-color: #ccc;
    display:inline-block;
    width: 80px;
    height: 23px;
    line-height: 20px!important;
    color: #333;
    font-size: 14px;

}
.nickName{
    width: 60%;
    height: 30px;
    line-height: 30px;
    position: relative;
}
.nickName span{
    font-size: 16px;
    color: #fff!important;
}
.nickName i{
    position: absolute;
    right: 0;
    top: 0;
    color: #ccc;
    font-size: 10px;
}
.nameTitle{
    padding-top: 20px;
}
.yearsNum {
    font-size: 16px;
    color: #ccc;
}
.heightNum{
    font-size: 16px;
    color: #ccc;
}
.weightNum{
    font-size: 16px;
    color: #ccc;
}
.tipsBox{
    width: 100%;
    text-indent: 15px;
    margin-top: 10px;
}
.tipsBox h1{
    text-align: left;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    
}
.tipsBox span{
    width: 18%;
    height: 30px;
    border: 1px solid #ccc;
    display:inline-block;
    margin: 0 5px;
}
.tipsBox span:last-child{
    margin-left: 0;
}
.contentBar .personShow{
    width: 100%;
    height: 30px;
    display: block;
}
.personalProduct{
        width: 80px;
        height: 23px;
        color: #000;
        line-height: 23px;
        text-align: center;
        background-color: #ccc;
        margin-top: 10px;
        color: #333;
        font-size: 14px;
}
.personInfo{
    width:90%;
    padding-left: 5%;
    margin:20px 0;

}
.personalImg{
    position: absolute;
    width: 95px;
    height: 95px;
    top:30px;
    right: 10px;
    border-radius: 50%;

}

 .footer a{
   display: inline-block;
     width: 100%;
     height: 40px;
      background-color: #EF2B3A;
      border: none;
      color: #fff;
 }

 /* header 头部 */
 .header{
     width: 100%;
     height: 50px;
     position: absolute;
     left: 0;
     top: 0;
     z-index: 666;
 }
  .header a{
      width: 50px;
      height: 50px;
      position: absolute;
      top: 0;
     
  }
  .header a img{
     width: 50px;
     height: 50px;
  }
  .header a:first-child{
      right: 0;
  }
   .header a:last-child{
      left:0;
  }
  .active{
    color: #fc060c;
    border-bottom: 1px solid #fc060c;
}
/* 无动态展位图 */
.noneImg{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
}
.noneImg img{
    width: 200px;
    height: 200px;
}
</style>
