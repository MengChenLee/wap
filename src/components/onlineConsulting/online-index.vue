<template>
    <div class="app">
  
      <!-- 模态框微信客服 -->
  
      <div v-if="weChatShow" class="modelWechat">
        <div class="weChatm">
          <img v-bind:src="weiService.serviceWay" alt="">
          <h1>{{weiService.serviceName}}</h1>
          <span>长按保存二维码，在微信中添加</span>
        </div>
        <img @click="weChatShow=false" src="../../assets/onlineConsulting/icon_off@2x.png" alt="">
      </div>
  
      <!-- 模态框QQ -->
      <div v-if="qqShow" class="modelWechat qqmodelBox">
        <div class="weChatm qqmodel">
          <img src="../../assets/onlineConsulting/qq.png" alt="">
          <h2>{{qqService.serviceWay}}</h2>
          <h1>{{qqService.serviceName}}</h1>
          <span id="qqservice">长按复制qq</span>
          <span id="addFriend">并在QQ中添加好有</span>
        </div>
        <img @click="qqShow=false" src="../../assets/onlineConsulting/icon_off@2x.png" alt="">
      </div>
  
      <div class="header">
            <h1>联系客服</h1>
        <a href="#" onClick="history.go(-1)">
         <i class="mintui mintui-back left-icon"></i>
         </a>
        </div>
         <div class="banner">
  
  
           <img src="../../assets/onlineConsulting/customer_banner@2x.png" alt="">
        </div>
        <div class="questionSearch">
            <h1>问题查询</h1>
            <div class="searchInfo">
               <router-link to="/onlineSelfSearch">
                  <div class="Recharge">
                    <img src="../../assets/onlineConsulting/customer_icon_recharge@2x.png" alt="">
                    <h1>充值提现问题</h1>
                  </div>
              </router-link>
              <div class="service">
                <img src="../../assets/onlineConsulting/customer_icon_online@2x.png" alt="">
                <h1 @click="sendInfo">在线客服</h1>
              </div>

            </div>
        </div>

            <div class="serverFooter">
              <a @click="weChatShow=true" href="javascrip:;">
                <img src="../../assets/onlineConsulting/customer_icon_wechat@2x.png" alt="">
                <h1>微信客服</h1>
               
  
              </a>
              <a @click="qqShow=true" href="javascrip:;">
                <img src="../../assets/onlineConsulting/customer_icon_qq@2x.png" alt="">
                <h1>QQ客服</h1>
              </a>
                <h1>如有更多疑问，请添加客服微信或QQ咨询</h1>
                 <i class="iCenter">|</i>
            </div>


   <!-- 模态框，登录界面 -->
    <div class="toLoginModel" v-if="isLogin">
     <div class="center">
       
       <button @click="login" class="login">立即登录</button>
       <button @click="register" class="rightNow">现在注册</button>
       <i>请登录后操作</i>
       <img src="../../assets/onlineConsulting/customer_pic_window_login@2x.png" alt="">
     </div>

    </div>
    </div>
    

 
</template>

<script>
//y引入web云信

import api  from '../../service/api.js'
import axios from 'axios'
import '../../../static/js/chat.js'
  export default {
    data() {
      return {
        weChatShow: false,
        qqShow: false,
        serviceInfo:[],
        weiService:{},
        qqService:{},
        isLogin:false,//判断登录模态框
      }
    },
    methods:{
       getService(){
                 api.queryAdvisoryServiceInfo({   }).then(({status, data = {}}) => {
                 
                 if(data.success==true){
                   for(var i=0;i<data.data.length;i++){
                       if(data.data[i].serviceType==1){
                          this.qqService=data.data[i]
                       
                       }
                       else if(data.data[i].serviceType==2){
                          this.weiService=data.data[i]
                         
                       }
                   }
                 }
              
                
                   });
            },
          
            sendInfo(){
              location.href = ysf.url();
            
            },
            //跳转登录页面
            login(){
              this.$router.push('/login');
            },
            //跳转注册
            register(){
               this.$router.push('/register');
            },
            //判断用户是否登录
            socialInfoBtn(){
        api.isLogin({
          accessToken: JSON.parse(localStorage.getItem("accessToken")),
          memberId: JSON.parse(localStorage.getItem("memberId"))
        }).then(({status, data = {}}) => {
          if(data.success!=true){
            this.isLogin=true
          }
          else {
             this.isLogin=false
          }
          
        });
      },
    },
    created(){
      this.getService(),
      this.socialInfoBtn()
 
    },
  //   components: {
  //  'remote-js': {
  //   render(createElement) {
  //     return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
  //   },
  //   props: {
  //     src: { type: String, required: true },
  //   },
  // },
  // },

}

</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  background: #111111;
  position: relative;
}
.header {
  position: relative;
  width: 100%;
  height: 50px;
  color: white;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
}
.header a {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  color: #fff;
}
.header a i {
  width: 50px;
  height: 50px;
  display: block;
  font-size: 20px;
}
.banner {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.banner img {
  width: 100%;
  height: 160px;
}
.questionSearch{
    margin-top: 20px;
}
.questionSearch h1 {

    height: 40px;
  color: #ccc;
    line-height: 40px;
  font-size: 15px;
  text-indent: 10px;
  
}
.searchInfo{
    width: 100%;
    height: 200px;
}
.Recharge{
    width: 44%;
  height: 70px;
    border: 1px solid #ccc;
    float: left;
    margin-left: 4%;
  position: relative;
  background-color: #262626;
}

.Recharge img {
  width: 36px;
  height: 36px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  
}

.Recharge h1 {
  font-size: 12px;
  position: absolute;
  left: 56px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;

}
.service{
    width: 44%;
  height: 70px;
    float: right;
    border: 1px solid #ccc;
    margin-right: 4%;
  position: relative;
  background-color: #262626;
}

.service img {
  width: 36px;
  height: 36px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.service h1 {
  font-size: 12px;
  position: absolute;
  left: 56px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}
.serverFooter{
    width: 100%;
    height: 100px;
    position: absolute;
    left: 0;
    bottom: 0;
}

.serverFooter a img {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
.serverFooter a:first-child{
  width: 110px;
  height: 45px;
    position: absolute;
    color: white;
  left: 20%;
}
.serverFooter a:nth-child(2){
  width: 110px;
  height: 45px;
    position: absolute;
    color: white;
    right: 15%;
}
.iCenter{position:absolute; right: 50%; top: 12%; color: #FFF;transform: translateX(-50%)}
.serverFooter a h1 {
  width: 50px;
  height: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;

}
.serverFooter h1{
    width: 100%;
    text-align: center;
    position: absolute;
    font-weight: 300;
    color: white;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

/* 微信客服 */
.modelWechat {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
}

.modelWechat .weChatm {
  width: 200px;
  height: 250px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -125px;
}

.modelWechat .weChatm img {
  width: 167px;
  height: 167px;
  position: absolute;
  left: 16px;
  top: 16px;
  
}

.weChatm h1 {
  width: 100%;
  position: absolute;
  top: 190px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 15px;
  height: 21px;
  color: black;
}

.weChatm span {
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 15px;
  text-align: center;
  font-size: 11px;
  color: #ccc;
}

.modelWechat > img {
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 133px;
  left: 50%;
  transform: translateX(-50%);
}

/* qq模态框 */

.qqmodelBox .qqmodel {
  position: relative;
}

.qqmodelBox .qqmodel img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.qqmodel h2 {
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 19px;
}

.qqmodelBox .qqmodel h1 {
  font-size: 11px;
  top: 160px;
}

#qqservice {
  position: absolute;
  bottom: 50px;
}

#addFriend {
  bottom: 30px;
}
/* 登录模态框 */
.toLoginModel{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.40);
  z-index: 999;
}
.toLoginModel .center{
  width: 270px;
  height: 225px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: #262626;
  border: 1px solid #545454;
border-radius: 4px;
}
.toLoginModel .center .login{
  width: 197px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  background: #EF2B3A;
  border-radius: 4px;
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-size:14px;
  color: #FFF;
}

.toLoginModel .center .rightNow{
  display: block;
  width: 52px;
  height: 18px;
  font-size: 13px;
  color: #FFF;
  position: absolute;
  bottom: 15px;
   left: 50%;
  transform: translateX(-50%);
   background: #262626;
}
.toLoginModel .center i{
    width: 90px;
    height: 21px;
   position: absolute;
   top: 80px;
   left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 15px;
  color: #FFF;
}
.toLoginModel .center img{
  width:270px;
  height: 140px;
  position: absolute;
  bottom: 155px;
    left: 50%;
  transform: translateX(-50%);
}
</style>
