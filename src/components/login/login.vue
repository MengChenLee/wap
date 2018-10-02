<template>
  <div id="login" >
    <div class="login">
      <div class="loginHeader publicFlex">
        <span class="backBtn" @click="clickBack">
          <img src="../../assets/nav_button_back@2x.png" alt="">
        </span>
        <span class="userRegister headerRes"><router-link to="/register">现在注册</router-link></span>
      </div>
      <div class="loginMainCon">
        <div class="loginLogo" v-show="logoShow">
         <img src="../../assets/logo_title.png" alt="" style="width: 200px;height: 200px;"> <!--login_logo@2x.png-->
        </div>
        <div class="loginContent">
          <div class="loginMain">
            <div class="user userN">
              <input type="text" class="username userInput" placeholder="用户名" @blur="usernameBlurJudge" @focus="usernameFocusJudge" autocomplete="off" >
              <img src="../../assets/login_icon_del@2x.png" alt="" class="delUsername" @click="delUsername">
            </div>
            <div class="user userP">
              <input type="password" class="userpassword userInput" placeholder="密码" @blur="userpasswordBlurJudge" @focus="userpasswordFocusJudge" autocomplete="off" >
              <img src="../../assets/login_icon_del@2x.png" alt="" class="delUserpassword" @click="delUserpassword">
            </div>
            <!--<h4 class="errorMes" v-show="showError_01" v-html="error"></h4>-->
            <p><router-link to="/forgetPassword/ForgotPassword" class="logForget">忘记密码？</router-link></p>
          </div>
          <div class="btnLogin">
            <a class="loginBtn" href="javaScript:;" @click="clickLogin">登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../service/api.js';
  import '../../../static/css/animate.css';
  // import Cookie from '.../../service/cookie.js';
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        logoShow:true,
        screenHeight: document.documentElement.clientHeight,
        originHeight: document.documentElement.clientHeight,
      }
    },
    created(){
      localStorage.clear();
    },
    mounted(){
      let self = this;
      window.onresize = function(){
        return (function(){
          self.screenHeight = document.documentElement.clientHeight;
          // console.info(self.screenHeight);
        })()
      }
    },
    watch:{
      screenHeight(val){
        // console.info(val);
        if(this.originHeight> val ){
          this.logoShow=false;
          $('.loginContent').css({
            top:'50px'
          })
        }else{
          var _this=this;
          $('.loginContent').animate({
            top:'300px'
          },500,function () {
            _this.logoShow=true;
          })
        }
      }
    },
    methods: {
      // 用户名获焦验证
      usernameFocusJudge(){
        if ($(".username").val().trim() != '') {
          $('.delUsername').fadeIn();
        }
        $(".username").bind("input propertychange", function (event) {
          event.preventDefault() || event.stopPropagation();
          if ($(".username").val().trim() != '') {
            $('.delUsername').fadeIn();
          }else{
            $('.delUsername').fadeOut();
          }
          if ($(".username").val().trim() != '' && $(".userpassword").val().trim() != '') {
            $('.loginBtn').css({
              'background-color': '#EF2B3A',
              'border-color': '#EF2B3A',
              color: '#fff'
            });
          } else {
            $('.loginBtn').css({
              'background-color': '#5B111B',
              'border-color': '#5B111B',
              color: '#606060'
            });
          }
        });
      },
      // 密码获焦验证
      userpasswordFocusJudge(){
        if ($(".userpassword").val().trim() != '') {
          $('.delUserpassword').fadeIn();
        }
        $(".userpassword").bind("input propertychange", function (event) {
          event.preventDefault() || event.stopPropagation();
          if ($(".userpassword").val().trim() != '') {
            $('.delUserpassword').fadeIn();
          }else{
            $('.delUserpassword').fadeOut();
          }
          if ($(".userpassword").val().trim() != '' && $(".username").val().trim() != '') {
            $('.loginBtn').css({
              'background-color': '#EF2B3A',
              'border-color': '#EF2B3A',
              color: '#fff'
            });
          } else {
            $('.loginBtn').css({
              'background-color': '#5B111B',
              'border-color': '#5B111B',
              color: '#606060'
            });
          }
        });
      },
      // 用户名失焦验证
      usernameBlurJudge() {
        $('.delUsername').fadeOut();
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        reg.test($(".username").val()) == true ? Toast("用户可登录") : (
          $(".username").val().trim() == '' ? Toast("用户名不能为空") : Toast("请输入正确的手机号或密码"));
      },

      // 密码失焦验证
      userpasswordBlurJudge() {
        $('.delUserpassword').fadeOut();
        var pasReg = /^([0-9a-zA-Z]{8,16})$/;
        pasReg.test($(".userpassword").val()) == true ? true : (
          $(".userpassword").val().trim() == '' ? Toast("密码不能为空") : Toast("请输入正确的手机号或密码"));
      },
      // 删除用户名
      delUsername() {
        $(".username").val('');
        $(".username").focus();
        $('.loginBtn').css({
          'background-color': '#5B111B',
          'border-color': '#5B111B',
          color: '#606060'
        });
      },
      // 删除密码
      delUserpassword() {
        $('.loginBtn').css({
          'background-color': '#5B111B',
          'border-color': '#5B111B',
          color: '#606060'
        });
        $(".userpassword").val('');
        $(".userpassword").focus();
      },
      clickLogin() {
        Api.login({
          "mobile": $('.username').val(),
          "password": $('.userpassword').val()
        }).then(({status, data = {}}) => {
          // console.log(data);
          if(data.success != true){
            Toast({
              message: data.msg.message,
              position: 'bottom',
              duration: 3000
            })
          } else{
            localStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(data.data.refreshToken));
        //  localStorage.setItem('jSessionId', JSON.stringify(data.data.MEMBER_SESSION_KEY));
            localStorage.setItem('memberId',JSON.stringify(data.data.memberId));
            localStorage.setItem('mobile', JSON.stringify($('.username').val()));
            this.$router.push({path: '/'});
          }

        });
      },
      clickBack(){
        this.$router.push({
          path: window.history.go(-1)
        });
      }
    }
  };
</script>

<style scoped>
  @media screen and (min-width: 320px) {
    .loginHeader{
      height: 405px;
    }
    .loginMain{
      margin-top: -31%;
    }
  }
  @media screen and (min-width: 350px) {
    .loginHeader{
      height: 440px;
    }
    .loginMain{
      margin-top: -20%;
    }
  }
  @media screen and (min-width: 450px) {
    .loginHeader{
      height: 467px;
    }
    .loginMain{
      margin-top: -13%;
    }
  }
  @media screen and (min-width: 620px) {
    .loginHeader{
      height: 600px;
    }
    .loginMain{
      margin-top: 0;
    }
  }
  .login{
    position: relative;
  }
  .loginHeader{
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/login_bg@2x.png');
    overflow: hidden;
  }
  .userRegister{
    font-size: 16px;
  }
  .loginMainCon{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
  .loginLogo{
    position: absolute;
    top: 18%;
    left: 50%;
    transform: translateX(-50%);
  }
  .loginContent{
    position: absolute;
    top: 300px;
    transform: translateX(-50%);
  }
  .loginMain{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }
  .loginMain .user{
    width: 300px;
    height: 44px;
    border: 1px solid #545454;
    border-radius: 4px;
    margin: 4% auto;
    position: relative;
    background-color: #262626;
    background-repeat: no-repeat;
    background-position: 6px center;
    /*background-color: rgb(250, 255, 189);*/
  }
  .loginMain input{
    width: 70%;
    height: 100%;
    line-height: 44px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #CCCCCC;
    border: 0;
    margin: 0 15%;
    background-color: #262626;
    /*background-color: rgb(250, 255, 189);*/
  }
  .loginMain p{
    width: 302px;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
  }
  .loginMain .logForget{
    font-size: 14px;
    color: #CCCCCC;
  }
  .loginMain .logForget:hover{
    color: #f00;;
  }
  .loginMain .user.userN{
    background-image: url("../../assets/login_icon_account.png");
  }
  .loginMain .user.userP{
    background-image: url("../../assets/login_icon_password.png");
  }
  .loginMain img{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 13px;
    margin-top: -12px;
    display: none;
  }
  .loginBtn{
    display: block;
    width: 300px;
    height: 44px;
    line-height: 44px;
    border: 1px solid #5B111B;
    border-radius: 4px;
    background-color: #5B111B;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #606060;
    text-align: center;
    margin: 10% auto 5%;
  }
  /***错误信息样式***/

</style>
