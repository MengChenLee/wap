<template>
    <div class="app">
        <div class="container">
  
          <div class="header">
    
            <div class="NoLogon" v-show="NoLogonShow">
              <div class="Set">
                <router-link to="" >
                  <img src="../assets/person/person-07.png" alt="">
                </router-link>
              </div>
      
              <div class="Info">
                <img src="../assets/person/person-10.png" alt="">
              </div>
      
              <div class="PicBox">
                <img src="../assets/person/person-06.png" alt="">
              </div>
      
              <div class="LoginRegistration">
                <router-link to="/login">
                  <span class="Sign">登录</span>
                </router-link>
                <router-link to="/register">
                  <span class="register">注册</span>
                </router-link>
              </div>


          <div class="RechargeForward">
            <div class="Recharged">
              <router-link to="/Recharge"> 
                <img src="../assets/person/person-01.png" alt="">
                <span>在线充值</span>
              </router-link>
            </div>
            <i class="bar"></i>
            <div class="Forward">
              <router-link to="/putMoneyIndex">
                    <img src="../assets/person/person-09.png" alt="">
                    <span>急速提现</span>
                  </router-link>
            </div>
          </div>










            </div>

        <div class="HavueLogon" v-show="HavueLogonShow">

          <img :src="infomation.gravatar" alt="">
          
          
          <div class="Set" >
           <router-link to="/setUP">
              <img src="../assets/person/person-07.png" alt="">
          </router-link>
          </div>
  
          <div class="Info">
            <router-link to="/noticeIndex">
               <img src="../assets/person/person-10.png" alt="">
               <i class="spot"></i>
            </router-link>
         
          </div>
  

        <img :src="infomation.gravatar" class="XuPic">
          <div class="PicBox" >




<el-upload
  class="avatar-uploader"
  action="http://up-z0.qiniu.com"
  list-type='picture'
  accept="image/jpeg,image/gif,image/png,image/bmp"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="qiniu">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon "></i>
</el-upload>

          </div>
  
          <div class="AccountInfos">
            <p>{{infomation.nickname || "诗情画意的名字"}}</p>
            <div class="Account">
              <span>Lv {{infomation.level || 1 }}</span>
        </div>
          </div>
  
  
          <div class="RechargeForward">
            <div class="Recharged">
              <router-link to="/Recharge">
                <img src="../assets/person/person-01.png" alt="">
                <span>在线充值</span>
              </router-link>
            </div>
            <i class="bar"></i>
            <div class="Forward">
              <router-link to="/putMoneyIndex">
                    <img src="../assets/person/person-09.png" alt="">
                    <span>急速提现</span>
                  </router-link>
            </div>
          </div>
            </div>
          </div>
          <div class="main">
        <ul>
          <li @click="MoneyClick">
               
                  <i class="left">
                    <img src="../assets/person/person-12.png" alt="">
                  </i>
                <span>我的账户</span>
                  <span class="money">￥{{infomation.balance || 0 }}.00</span>
                  <i class="right"></i>
              
            </li>
          <li>
            <router-link to="/authentication">
              <i class="left">
                <img src="../assets/person/person-08.png" alt="">
              </i>
              <span>实名认证</span>
              <i class="right"></i>
            </router-link>
            </li>
          <li>
            <router-link to="/myattention">
              <i class="left">
                <img src="../assets/person/person-02.png" alt="">
              </i>
              <span>我的关注</span>
              <i class="right"></i>
            </router-link>
            </li>
          <li>
            <router-link to="/myVip/opennedVIP">
              <i class="left">
                <img src="../assets/person/person-03.png" alt="">
              </i>
              <span>我的会员</span>
              <i class="right"></i>
            </router-link>
            </li>
          <li>
            <router-link to="/inviteFriends">
              <i class="left">
                <img src="../assets/person/person-11.png" alt="">
              </i>
              <span>邀请好友</span>
              <i class="right"></i>
            </router-link>
            </li>

        </ul>
    </div>
  
          <div class="footer">
             <router-link to="/">
                 <img src="../assets/home/dibu_shouyeweixuanzhong_huise_60@2x.png" alt="">
                 <h1>首页</h1>
             </router-link>
             <router-link to="/gameIndex">
               <img src="../assets/home/dibu_youxiweixuanzhong_huise_60@2x.png" alt="">
                 <h1>游戏</h1>
             </router-link>
             <router-link to="/socialIndex">
               <img src="../assets/home/dibu_shejiaoweixuanzhong_huise_60@2x.png" alt="">
                 <h1>社交</h1>
             </router-link>
             <router-link to="/my">
                  <img src="../assets/home/dibu_wodexuanzhong_hongse_60@2x.png" alt="">
               <h1 class="selectH1">我的</h1>
             </router-link>
          </div>

        </div>
    </div>
</template>
<script>
  import api from '../service/api.js'
export default {
  data() {
    return {
      imageUrl: '',
      show:true,
      NoLogonShow:true,
      HavueLogonShow:false,
      level:"Lv.3",
      gravatar:require("../assets/1-1.jpg"),
      jSessionId:'',
      infomation:{},
      userInfo:{
        avatar:'../assets/1-1.jpg'
      },
      qiniu:{
        token:'',
        URL:''
      },
      datailImg:[]
    }
  },
  created(){
    this.getinfo();
    this.gettoken();
  },
  computed:{
    qiniuUrl:function () {
      return this.$store.state.qiniuUrl
    }
  },

  methods:{
      handleAvatarSuccess(value, fil,raw,index) {
        const path = this.qiniuUrl + '/' + value.key;
        this.imageUrl = path;
        if(index!==undefined){
            this.$set(this.datailImg,index,path)
        }else{
            this.datailImg.push(path);
             this.updateUser();
        }
       
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg/png/GIF';
        const isLt2M = file.size / 1024 / 1024 < 2;

      },
// 调用的方法
 getinfo:function(){
    
    api.searchUserInfo({
     accessToken:JSON.parse(localStorage.getItem("accessToken")),
     memberId:JSON.parse(localStorage.getItem("memberId"))
    }).then(({data={}}) => {
      // console.log(data);
      if(data.success = true){
         this.infomation = data.data
         this.HavueLogonShow  = true
         this.NoLogonShow = false
        // console.log(this.infomation)
      }
    })
    },
MoneyClick(){
    this.$router.push({
        path:'/myaccount',
        name:'myaccount',
        params:{
            Money:this.infomation.balance || 0
        }
    })
 },

  gettoken(){

    api.getToken().then(({status,data = {}}) =>{
      if(data.success == true){
        // console.log(data);
      this.qiniu.token = data.data.token
  
      }
    })
    
  },
  //更改用户资料
   updateUser(){
    api.updateUser({
                     accessToken:JSON.parse(localStorage.getItem("accessToken")),
                     memberId:JSON.parse(localStorage.getItem("memberId"))
                      ,gravatar:this.imageUrl
      }).then(({status,data = {}}) =>{
                              if(data.success == true){
                                // console.log(data)
                                this.getinfo()
                              }
    })
   }

    }
    
  }

</script>
<style scoped>
.HavueLogon .PIC{
  border-radius: 50%;
  width: 88px;
  height: 88px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%)
 
}
.HavueLogon .PIC img{
  border-radius: 50%;
  width: 100%;
  height: 100%;

}

.hiddenInput{
  display: none;
}

.bar{
  width: 1px;
  height: 20px;
  background-color: #9aa4bd;
  position: absolute;
  top: 25%;
  left: 50%;
}
.spot{
  width: 8px;
  height: 8px;
  background-color: red;
  position: absolute;
  top: 14px;
  left: 28px;
  border-radius: 50%;
}
 .avatar-uploader .el-upload {
    border: 2px solid  pink;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    text-align: center;
    /* border: 4px solid rgba(204, 204, 204, 0.4); */
  }
  .avatar {
    width: 88px !important;
    height: 88px !important;
    border-radius: 50%;
    border: 2px solid #8B8B8B;
    display: block;
  }

.el-icon-plus:before{
  content:''!important;
}
.XuPic{
  border: 2px solid #8B8B8B;
  position: absolute;
  top: 31%;
  left: 50.5%;
  width: 88px !important;
  height: 88px !important;
  border-radius: 50%;
  z-index: 20;
  transform: translate(-50%,-50%)
  
}
  .main {
    width: 100%;
    height: 100%;
    
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .main ul li {
    background-color: #161616;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 1px solid #2A2A2A;
    padding-left: 50px;
    padding-right: 30px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 15px;
  }
  .main ul li:nth-last-child(1) {
    margin-bottom: 0;
  }
  .main ul li a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #DDD;
  }
  .main ul li .left img {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .main ul li .right {
    width: 30px;
    height: 30px;
    background: url("../assets/person/person-05.png") center center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 10px;
    right: 0;
  }
  .main ul li .money {
    position: absolute;
    top: 0;
    right: 30px;
    letter-spacing: 1px;
	  color: #ddd;
  }
.app{
    width: 100%;
    height: 100%;
    margin: 0;
  overflow: scroll;
    padding-bottom: 50px;
    box-sizing: border-box;
    color: #fff;
}
.container{
    width: 100%;
    box-sizing: border-box;
    background-color: #111111;
    position: relative;
}
a{
    text-decoration: none;
    color: #fff;
}
  .header {
    width: 100%;
    height: 270px;
  }
  .NoLogon {
    width: 100%;
    height: 100%;
    background: url("../assets/person/person-bg.png") center center no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .NoLogon .Set {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .NoLogon .Set img {
    width: 100%;
    height: 100%;
  }
  .NoLogon .Info {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .NoLogon .Info img {
    width: 100%;
    height: 100%;
  }
  .NoLogon .PicBox {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid #8B8B8B;
    position: absolute;
    top: 35%;;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .NoLogon .PicBox img {
    width: 100%;
    height: 100%;
  }
  .NoLogon .LoginRegistration {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: 140px;
    left: 0;
}
  .NoLogon .LoginRegistration span {
    display: inline-block;
    width: 66px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    border: 1px solid #BBBBBB;
  }
  .NoLogon .LoginRegistration .Sign {
    position: absolute;
    top: 10px;
    left: 80px;
  }
  .NoLogon .LoginRegistration .register {
    position: absolute;
    top: 10px;
    right: 80px;
  }
  .NoLogon .RechargeForward {
    width: 100%;
    height: 35px;
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    line-height: 35px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .NoLogon .RechargeForward a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .NoLogon .RechargeForward img {
    width: 35px;
    height: 35px;
  }
  .NoLogon .RechargeForward span {
    line-height: 35px;
  }
  .NoLogon .RechargeForward .Recharged {
    float: left;
    width: 50%;
    height: 35px;
    padding-left: 35px;
    box-sizing: border-box;
    position: relative;
  }
  .NoLogon .RechargeForward .Recharged img {
    position: absolute;
    top: 0;
    left: 25%;
  }
  .NoLogon .RechargeForward .Forward {
    float: right;
    width: 50%;
    height: 35px;
    position: relative;
  }
  .NoLogon .RechargeForward .Forward img {
    position: absolute;
    top: 0;
    left: 16%;
  }
  .HavueLogon {
    width: 100%;
    height: 100%;
    position: relative;
  }
   .HavueLogon img{
     width: 100%;
     height: 100%;
     opacity: 0.7;
   }
  .HavueLogon .Set {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .HavueLogon .Set img {
    width: 100%;
    height: 100%;
  }
  .HavueLogon .Info {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .HavueLogon .Info img {
    width: 100%;
    height: 100%;
  }
  .HavueLogon .PicBox {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: 30%;;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    
  }


  .HavueLogon .AccountInfos {
    width: 100%;
    height: 60px;
    text-align: center;
    position: absolute;
    bottom: 50px;
    left: 0;
  }
  .HavueLogon .AccountInfos p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .HavueLogon .AccountInfos .Account {
    margin: auto;
    width: 57px;
    height: 18px;
    text-indent: 10px;
    background: url("../assets/person/person-04.png") center center no-repeat;
    background-size: 100% 100%;
  }
  .HavueLogon .RechargeForward {
    width: 100%;
    height: 35px;
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    line-height: 35px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .HavueLogon .RechargeForward a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .HavueLogon .RechargeForward img {
    width: 35px;
    height: 35px;
  }
  .HavueLogon .RechargeForward span {
    line-height: 35px;
  }
  .HavueLogon .RechargeForward .Recharged {
    float: left;
    width: 50%;
    height: 35px;
    padding-left: 35px;
    box-sizing: border-box;
    position: relative;
  }
  .HavueLogon .RechargeForward .Recharged img {
    position: absolute;
    top: 0;
    left: 25%;
  }
  .HavueLogon .RechargeForward .Forward {
    float: right;
    width: 50%;
    height: 35px;
    position: relative;
  }
  .HavueLogon .RechargeForward .Forward img {
    position: absolute;
    top: 0;
    left: 16%;
  }
.footer{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 666;
    background-color: #000;
}
.footer a{
  float: left;
  width: 25%;
  height: 50px;
  color: white;
  position: relative;
}
.footer a h1{
  position: absolute;
  left: 50%;
  bottom: 3px;
  font-size: 10px;
  transform: translateX(-50%);
}
.footer a img{
  font-family: PingFangSC-Medium;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

</style>

