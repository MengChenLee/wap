<!--
   title:社交详情页
   content：banner部分  个人资料和动态信息部分  底部发起聊天部分
   data:2018-8-22
   author:wangzichen
   -->

<template>
    <div>
     <!-- 个人信息轮播图  动态渲染  4S换图片-->
     <div class="banner">
       <a href="javaScript:;" onClick="history.go(-1)">
         <i class="mintui mintui-back left-icon"></i></a>
            <mt-swipe :auto="4000">
                
                <mt-swipe-item v-for="(a,b) in picList" :key="b">
                    <img :src="a.picPath" alt="">
                </mt-swipe-item>
            </mt-swipe>
            <span><img src="../../assets/social/location.png" alt=""><h1>{{personSocial.areaName}}</h1></span>
        </div>




 <!-- 个人资料及动态详情部分 -->
 <div class="container">
 <div class="topbar">
     <span  @click="showOne"><h1 class="active" ref="person">个人资料</h1></span>
     <span @click="showTwo"><h1  ref="info">相关动态</h1></span>
     
 </div>

 <div class="contentBar">
    <ul class="ks-clear">
        <!-- 控制个人资料部分的显示隐藏 -->
         <li class="personShows" v-if="userbarOne">
             <h1 class="baseInfo">基本信息</h1>
          <span class="nameTitle">昵称</span>
            <div class="nickName">
                  <span>{{personSocial.nickname}}</span>
                  <i> {{this.timeago(personSocial.updateTime)}}在线</i>
            </div>
           <span>年龄</span>
           <span class="yearsNum">{{personSocial.age }}</span>
           <span>身高</span>
           <span class="heightNum">{{personSocial.height}}cm</span>
           <span>体重</span>
           <span class="weightNum">{{personSocial.weight}}KG</span>
           <div class="tipsBox">
                <h1>标签</h1>
                <span v-for="(v,i) in tagsList" :key="i">{{v.tagName}}</span>
              
           </div>
        
        <h2 class="personalProduct">个人简介</h2>
        <p class="personInfo">
          {{personSocial.introduction}}
        </p>
        <img class="personalImg" :src="personSocial.gravatar" alt="">
       <button ref="colecBtn" @click="collecBtn" class="collection">{{this.collect == 1 ? '已关注':'关注'}}</button>
        </li>
      
      <!-- 控制动态信息部分的显示隐藏 -->
        <li v-if="userbarTwo" class="userInfoLists">
              <router-link  :to="{path:'/socialDynamicCenter/'+i}" v-for="(v,i) in personDynamic" :key="i">
            <!--用户动态详情的跳转，查看动态详情需要判断付费情况  -->
            <div class="usershow" >
                <img class="userImg" :src="v.gravatar" alt="">
                <span class="userName">{{v.nickname}}</span>
                <span class="userStartTime">{{getDate(v.createTime)}}</span>
                <p> {{v.dynamicContent}}
                </p>
                <div class="imgList">
                    <img :src="a.payStatus==1?'http://images.3dclo.com//FqP3M4Nr3syMxNmE5H_OSCt0KHwX':a.picPath" alt="" v-for="(a,b) in v.dynamicPicList" :key="b">
                 
                    
                </div>
            </div>
             </router-link>


             <!-- 无动态展示图片 -->
             <div class="noneImg" v-if="noneImg">
                 <img src="../../assets/social/shejiaoxiangqing_xiangguandongtaikongtai_400.png" alt="">
             </div>
        </li>
    </ul>

    
 </div>

 </div>
 


 <!-- 底部固定 -->
 <!-- <div class="footer">
     <router-link to="/noticeOnlineUser"> 发起聊天</router-link>
    
 </div> -->
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
         loading:false,
         //收藏功能
         collect:0,
         noneImg:false,//无动态时展示
         picList:[],//社交展示的banner
         tagsList:[]//社交标签
       
    }
},
methods: {
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
      collecBtn(){
      var iskeep;
          if(this.collect==1){
            iskeep=0
          }
          else{
              iskeep=1
          }
          api.collectUser({
                            socialId:+this.$route.params.id,
                            status:iskeep,
                           accessToken:JSON.parse(localStorage.getItem("accessToken")),
                            memberId:JSON.parse(localStorage.getItem("memberId"))
                       }).then(({status, data = {}}) => {
                 if(data.success==true){
                     console.log(data);
                     
                    if(this.collect==1){
           
            this.$refs.colecBtn.style.borderColor="#ff0000"
             this.$refs.colecBtn.style.color="#ff0000"
             this.$refs.colecBtn.style.backgroundColor="#111"
              this.$refs.colecBtn.style.color="#ef2b3a"
              this.getSocialInfo()
            
        }
        else {
             this.$refs.colecBtn.style.borderColor="#ccc"
             this.$refs.colecBtn.style.color="#ccc"
              this.$refs.colecBtn.style.backgroundColor="#ccc"
               this.$refs.colecBtn.style.color="#777"
             
              this.getSocialInfo()
        }
                 }
                   });
      
       
    },
    //获取社交用户信息  需要登录
     getSocialInfo(){
                 api.querySocialDetail({
                                socialId:+this.$route.params.id,  //查询的社交id
                                accessToken:JSON.parse(localStorage.getItem("accessToken")),
                               memberId:JSON.parse(localStorage.getItem("memberId"))
                       }).then(({status, data = {}}) => {
                 if(data.success==true ){
                     console.log(data);
                     
                    this.personSocial=data.data.socialInfo;
                    this.collect=data.data.isKeep;
                    this.picList=data.data.socialPicList
                    this.tagsList=data.data.tagInfoList
                    //储存余额是否充足
                    localStorage.setItem("MoneyEnough",data.data.isEnough)
                 }
                 
                   });
            },

            //获取社交用户动态  需要登录
              
                getSocialDy(){
                    api.queryDynamicInfo({
                            socialId:+this.$route.params.id,
                            accessToken:JSON.parse(localStorage.getItem("accessToken")),
                             memberId:JSON.parse(localStorage.getItem("memberId"))
                    }).then(({status, data = {}}) => {
                        console.log(data);
                        
                   if(data.success==true && data.data.dynamicInfoList.length>0){
                       
                        this.personDynamic=data.data.dynamicInfoList;
                        this.personDynamic=this.personDynamic.reverse()
                       
                        localStorage.setItem("personUserD",JSON.stringify(this.personDynamic))
                        //储存社交ID
                        localStorage.setItem('otherSocialId',this.$route.params.id)
                       
                       
                      
                   }
                   else{
                     this.noneImg=true
                 }
               
                   });
            },
            //格式时间转换
          getDate(date){
              if (!date) {
            return '无'
          } else {
            return DateForm(date)
          }
          },
          //判断关注信息，进入页面赋值样式
          getClass(){
               if(this.collect==1){
            
            this.$refs.colecBtn.style.borderColor="#ff0000"
             this.$refs.colecBtn.style.color="#ff0000"
          }
          else{
               this.$refs.colecBtn.style.borderColor="#ccc"
             this.$refs.colecBtn.style.color="#ccc"
          }
          },
          //登录用户点击页面增加社交浏览记录
          addRcord(){
               api.addBrowseRecord({
                            socialId:+this.$route.params.id,
                            type:1,
                            accessToken:JSON.parse(localStorage.getItem("accessToken")),
                            memberId:JSON.parse(localStorage.getItem("memberId"))
                       }).then(({status, data = {}}) => {
                 if(data.success==true ){
                  console.log(data.success)

                 }
                 
                   });
          },
          //判断用户是否是自己，进入个人界面、
          isUser(){
              var myId=localStorage.getItem("mySocialId")
              var userId=+this.$route.params.id;
             if(myId==userId){
                 this.$router.push('/socialmyCenter')
             }
          },
         //给关注附加样式绑定
         addBtn(){
                 if(this.collect==1){
                     this.$refs.colecBtn.style.borderColor="#ff0000"
                        this.$refs.colecBtn.style.color="#ff0000"
                        this.$refs.colecBtn.style.backgroundColor="#111"
                        this.$refs.colecBtn.style.color="#ef2b3a"
                      
                 }
                 else{
                          this.$refs.colecBtn.style.borderColor="#ccc"
                        this.$refs.colecBtn.style.color="#ccc"
                        this.$refs.colecBtn.style.backgroundColor="#ccc"
                        this.$refs.colecBtn.style.color="#777"
                 }
         },
         //转化时间状态
         timeago(dateTimeStamp){   
				// dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
	        var minute=1000*60;      //把分，时，天，周，半个月，一个月用毫秒表示
	        var  hour=minute*60;
	        var day=hour*24;
	        var week=day*7;
	        var halfamonth=day*15;
            var month=day*30;
            var result;
	    
	        var  now=new Date().getTime();   //获取当前时间毫秒
	        var diffValue=now - dateTimeStamp;//时间差
	      
	        if(diffValue<0){return;}
 
	        var  minC=diffValue / minute;  //计算时间差的分，时，天，周，月
	        var  hourC=diffValue / hour;
	        var  dayC=diffValue / day;
	       var  weekC=diffValue / week;     
	        var  monthC=diffValue / month;
 
	       if(monthC>=1){
				result="" + parseInt(monthC) + "月前";
			}
			else if(weekC>=1){
				result="" + parseInt(weekC) + "周前";
			}
			else if(dayC>=1){
				result=""+ parseInt(dayC) +"天前";
			}
			else if(hourC>=1){
				result=""+ parseInt(hourC) +"小时前";
			}
			else if(minC>=1){
				result=""+ parseInt(minC) +"分钟前";
			}else
			result="刚刚";
			return result;
	},
 
    //计算时间
    setTime(){
     
    }


},
created(){
   this. getSocialInfo()
   this. getSocialDy()
   this.addRcord()
   this.isUser()
   this.setTime()
},
mounted(){
    this.getClass()
}
}
</script>

<style scoped>
.app{
    overflow: scroll;
    padding-bottom: 40px;
    height: 100%;
   
    
}
.banner{
     width: 100%;
     height: 300px;
     position: relative;
     background-color: #ccc;
     
 }
 .banner img{
     display: block;
     width: 100%;
     height:300px;
   
 }
 .banner a{
    
     width: 30px;
     height: 30px;
     display: block;
     line-height: 30px;
     text-align: center;
     z-index: 666;
     position: absolute;
     left: 0;
     top: 0;
     
 }
 .banner a i{
       width: 30px;
       height: 30px;
       display: block;
       font-size: 20px;
       color: black;
 }
 .banner span{
     position: absolute;
     width: 60px;
     height: 25px;
     font-size: 14px;
     right: 0;
     bottom: 20px;
     background-color: #111;
     border-radius: 4px 0px 0px 4px;
     letter-spacing: -1px;
     opacity: 0.7;
 }
 .banner span img{
     width:15px;
     height: 15px;
     margin:5px 0 0 9px;
    
 }
 .banner span h1{
    position: absolute;
    right:5px;
    top:50%;
    transform: translateY(-52%);
    color: #fff!important;
 }
 .container{
     width: 100%;
     color: #fff;
     padding-bottom: 40px;
 }

.topbar{
    width: 100%;
    height: 40px;
   border-bottom: 1px solid #000

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
.contentBar >h1{
    display: block;
    font-size: 14px;
    width: 80px;
    height: 23px;
    font-weight: normal;
    color: #333;
    background-color: #ccc;
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
     margin-left: 10px;
    
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
    font-size: 13px;
 }
 .imgList{
    
    width: 100%;
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
    margin-top: 10px;
}
.tipsBox h1{
    text-indent: 15px;
    text-align: left;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    
}
.tipsBox span{
    display:inline-block;
    width: 18%;
    height: 30px;
    border: 1px solid #ccc;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    margin-left: 2.3%;
  letter-spacing: 1px;
	color: #fffefe;
    
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
.collection{
    position: absolute;
    width: 80px;
    height: 28px;
   border-radius: 4px;
    top: 151px;
    right: 17px;
    border: 1px solid red;
    background-color: #000;
    color: red;
}
.footer a{
    display: block;
}
.mintui-back{
    color: #fff!important;
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
