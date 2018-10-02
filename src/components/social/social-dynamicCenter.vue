<!--
   title:社交详情页
   content：banner部分  个人资料和动态信息部分  底部发起聊天部分
   data:2018-8-22
   author:wangzichen
   -->

<template>
    <div class="app">
     <!-- 个人信息轮播图  动态渲染  4S换图片-->
     <div class="banner">
       <a href="javaScript:;" onClick="history.go(-1)">
         <i class="mintui mintui-back left-icon"></i></a>
            <mt-swipe :auto="4000">

                <mt-swipe-item v-for="(a,b) in personDynamic.dynamicPicList" :key="b">
                   <img :src="a.payStatus==1?'http://images.3dclo.com//FuHwWtzuD0x4LUtSx1ut6sZfQb48':a.picPath" alt="">
                    </mt-swipe-item>
              
            </mt-swipe>
        </div>

 <!-- 个人资料及动态详情部分 -->
 <div class="container">
 

 <div class="contentBar">
    <ul class="ks-clear">
      <!-- 控制动态信息部分的显示隐藏 -->
        <li  class="userInfoLists">
           
            <!--用户动态详情的跳转，查看动态详情需要判断付费情况  -->
            <div class="usershow">
                <img class="userImg" :src="personDynamic.gravatar" alt="">
                <span class="userName">{{personDynamic.nickname}}</span>
                <span class="userStartTime">{{getDate(personDynamic.createTime)}}</span>
                <p> {{personDynamic.dynamicContent}}
              
                <div class="imgList">
                    <img :src="a.payStatus==1?'http://images.3dclo.com//FqP3M4Nr3syMxNmE5H_OSCt0KHwX':a.picPath" alt="" v-for="(a,b) in personDynamic.dynamicPicList" :key="b">
                    
                </div>
            </div>
    
        </li>
    </ul>
 </div>

 </div>
 


 <!-- 底部固定 -->
 <div class="footer" @click="sendMoney" v-if="showAll">
    <h1>支付￥{{personDynamic.payAmount}}.00</h1>
    <span>查看完整内容</span>
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
      
        //用户动态信息
        personDynamic:[],
        showAll:true,//展示支付按钮
        DtInfo:[] ,//动态图片的数组,
        dymicId:''
    }
},
methods: {
   
    getDynamic(){
        var count=+this.$route.params.id;
        var userDynamic=JSON.parse(localStorage.getItem("personUserD"));
        this.personDynamic=userDynamic[count];
        this.DtInfo=this.personDynamic.dynamicPicList
        this.dymicId=+userDynamic[count].dynamicId
       console.log(this.personDynamic)
       
            if(this.personDynamic.payStatus==1){
                this.showAll=true;
            }
            else{
                 this.showAll=false;
            }
        
        //判断有没有图片状态需要付费，没有的话隐藏付费按钮 
       
    },
        //格式时间转换
          getDate(date){
              if (!date) {
            return '无'
          } else {
            return DateForm(date)
          }
          },
          //支付动态图片付费
          sendMoney(){
              var isPull=localStorage.getItem('MoneyEnough');
              if(isPull){
                  this.payMoney()
              }
              else{
                  
                    this.$message({
                    message: '余额不足哦，请充值',
                    type: 'warning'
        }); 
       
              }
          },
          //支付接口
          payMoney(){
               api.byDynamicInfo({
                         accessToken:JSON.parse(localStorage.getItem("accessToken")),
                         memberId:JSON.parse(localStorage.getItem("memberId")),
                         dynamicId:this.personDynamic.dynamicId
                }).then(({status, data = {}}) => {
                 
                 if(data.success==true){
                  
                  this.$message({
                    message: '付款成功！',
                    type: 'success'
        });
        this.upDateDynamic()
        this.showAll=false
                 }
                 else{
                      this.$message({
                     message: '余额不足，请充值！',
                     type: 'warning'
        });
        localStorage.setItem('onlineRcharge','user has no money,please to recharge right now!')
        this.$router.push('/Recharge')
                 }
                  });
          },
          //重新获取动态信息 更新
          upDateDynamic(){
              api.queryDynamicInfo({
                             socialId:+localStorage.getItem("otherSocialId"),
                             accessToken:JSON.parse(localStorage.getItem("accessToken")),
                             memberId:JSON.parse(localStorage.getItem("memberId"))
                    }).then(({status, data = {}}) => {
                   if(data.success==true && data.data.dynamicInfoList.length>0){
                    var count=+this.$route.params.id;
                        this.personDynamic=data.data.dynamicInfoList.reverse()[count];
                        console.log(this.personDynamic)
                       
                   }
                  
               
                   });
          },
           //登录用户点击页面增加社交浏览记录
          addRcord(){
               api.addBrowseRecord({
                            socialId:+localStorage.getItem('otherSocialId'),
                            type:2,
                            accessToken:JSON.parse(localStorage.getItem("accessToken")),
                            memberId:JSON.parse(localStorage.getItem("memberId")),
                            dynamicId:this.dymicId
                       }).then(({status, data = {}}) => {
                 if(data.success==true ){
                  console.log(data.success)

                 }
                 
                   });
          },

},
created(){
  this.getDynamic();
  this.addRcord();
},

}
</script>

<style scoped>
.app{
    overflow: scroll;
    padding-bottom: 44px;
    height: 100%;
   color: #fff;
}
.banner{
     width: 100%;
     height: 400px;
     position: relative;
     background-color: #ccc;
     
 }
 .banner img{
     display: block;
     width: 100%;
     height:400px;
   
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
 .container{
     width: 100%;
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
     height: 44px;
     border-top: 1px solid #000;
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
 }
 .userStartTime{
   position: absolute;
   left: 70px;
   top: 30px;
 }
 .usershow{
     width: 100%;
     margin-top: 20px;
 }
 .usershow p{
    display: block;
    margin: 20px 5px;
 }
 .imgList{
    
    width: 100%;
 }
 .imgList img{
   width: 30%;
   height: 100px;
   margin-right: 3%;
   
   
 }
 .imgList img:nth-child(3n){
      margin-right: 0;
 }

.mintui-back{
    color: #fff!important;
}
/* 底部样式 */
.footer h1{
    position: absolute;
    top: 3px;
    font-size: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: normal;
}
.footer span{
    position: absolute;
    bottom: 3px;
    font-size: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: normal;
    letter-spacing: 1px;
}
</style>
