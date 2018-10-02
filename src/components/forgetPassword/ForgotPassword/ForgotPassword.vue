<template>
  <div class="ForgotPassword">
  
    <!----第一步操作：输入已注册的手机号  START---->
    <div class="first" v-show="show_01">
      <div class="firstMain">
        <div class="user">
          <input type="text" class="userPhone" placeholder="请输入已注册的手机号" value="" @click="userPJudge">
          <img src="../../../assets/login_icon_del@2x.png" alt="" class="delUserPhone" @click="delUserPhone">
        </div>
        <div class="user">
          <div class="usercode">
            <input type="text" class="identifyingCode" placeholder="请输入6位验证码" value="" @click="">
            <span class="obtainICode">
              <span v-show="!show" class="count">{{count}}s后重新获取</span>
              <span v-show="show" class="ICode" @click="getCode">{{text}}</span>
            </span>
          </div>
        </div>
        <!--<h4 class="errorMes" v-show="" v-html=""></h4>/forgetPassword/next-->
      </div>
      <div class="btnRegister">
        <a class="next" @click="clickNext">下一步</a>
      </div>
    </div>
  
    <!----第二步操作：根据规则输入新密码验证确认---->
    <div class="next" v-show="!show_01">
      <div class="nextMain">
        <div class="user">
          <input type="password" class="password" placeholder="请输入8-16位英文数字密码" value=""
                 @blur="passwordJudge">
        </div>
        <div class="user">
          <input type="password" class="confirmPassword" placeholder="请再次输入密码" value=""
                 @blur="confirmPasswordJudge">
        </div>
        <!--<h4 class="errorMes" v-show="" v-html=""></h4>-->
      </div>
      <div class="btnRegister">
        <a class="to_login" @click="clickToLogin">完成</a>
      </div>
      <!----------- END ----------->
      <div class="messageAlert">
        <img src="../../../assets/success.png" alt="" class="icon_success">
        <span class="message">修改成功</span>
        <span class="alertMes">请重新登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../../service/api.js';
  import {Toast} from 'mint-ui';
  
  export default {
    name: "ForgotPassword",
    data(){
      return {
        show: true,
        show_01: true,
        count: '',
        timer: null,
        text: '获取验证码'
      }
    },
    methods: {
      userPJudge() {
        var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        var _this= this;
        if($(".userPhone").focus()){
          if($(".userPhone").val().trim() != ''){
            $('.delUserPhone').fadeIn();
          }
          $(".userPhone").bind("input propertychange",function(event){
            event.preventDefault() || event.stopPropagation();
            if($(".userPhone").val()!= ''){
              $('.delUserPhone').fadeIn();
            }else{
              $('.delUserPhone').fadeOut();
            }
          });
        }
        $(".userPhone").on('blur',function(){
          $('.delUserPhone').fadeOut();
          if($(".userPhone").val().trim() == ''){
            Toast({
              message: '用户名不能为空',
              position: 'bottom',
              duration: 2000
            })
          }else if(reg.test($(".userPhone").val()) == false){
            Toast({
              message: '请输入正确的手机号',
              position: 'bottom',
              duration: 2000
            });
          }else{
            Api.checkMobile({
              "mobile" : $('.userPhone').val(),
              "methodType" : 2
            }).then(({status, data = {}}) => {
              if(data.success != true){
                Toast({
                  message: data.msg.message,
                  position: 'top',
                  duration: 2000
                });
              }else{
                Toast({
                  message: data.data,
                  position: 'top',
                  duration: 2000
                });
              }
            });
          }
        });
      },
      getCode() {
        const TIME_COUNT = 60;
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if ($(".userPhone").val().trim() == '') {
          Toast({
            message: '用户名不能为空',
            position: 'top',
            duration: 2000
          })
        } else if (reg.test($(".userPhone").val()) == false) {
          Toast({
            message: '请输入正确的手机号',
            position: 'top',
            duration: 2000
          });
        } else {
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 1 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                this.text = '重新获取';
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
          Api.sendMessage({"mobile" : $('.userPhone').val()}).then(({status, data = {}}) => {
            if (data.success != true) {
              Toast({
                message: data.msg.message,
              });
            }else{
              Toast({
                message: '发送成功',
              });
            }
          });
          
        }
      },
      clickNext() {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if($(".userPhone").val().trim() == '' || $('.identifyingCode').val().trim()==''){
          Toast({
            message: '用户名或验证码未输入',
            position: 'top',
            duration: 2000
          });
        }else if(reg.test($(".userPhone").val()) == false){
          Toast({
            message: '请输入正确的手机号',
            position: 'top',
            duration: 2000
          });
        }else {
          Api.checkVerifyCode({
            "mobile": $('.userPhone').val(),
            "verify": $('.identifyingCode').val()
          }).then(({status, data = {}}) => {
            if (data.success != true) {
              Toast(data.msg.message);
            } else {
              this.show_01 = false;
            }
          });
        }
      },
      // 验证密码
      passwordJudge() {
        var pasReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
          if(pasReg.test($(".password").val()) == false) {
            Toast({
              message: '密码不符合规则，请重新输入',
              position: 'top',
              duration: 2000
            });
            $(".password").focus();
          }else{
            Toast({
              message: '请再次输入密码，两次密码保持一致',
              position: 'top',
              duration: 2000
            })
          }
      },
      confirmPasswordJudge() {
        if($(".confirmPassword").val() != $(".password").val()) {
          Toast({
            message: '两次密码必须一致，请重新输入',
            position: 'top',
            duration: 2000
          })
        }
      },
      clickToLogin() {
        Api.updatePassword({
          "mobile": $('.userPhone').val(),
          "password": $('.password').val()
        }).then(({status, data = {}}) => {
          if (data.success != true) {
            Toast({
              message: data.msg.message
            });
          } else {
            var _this=this;
            $('.messageAlert').fadeIn(500,function(){
              $(this).fadeOut(1500,function(){
                _this.$router.push({path: '/login'});
                Toast({
                  message: '欢迎登录！',
                  position: 'top',
                  duration: 3000
                });
              })
            });
          }
        });
      },
      // 删除input框内容后，让其获焦
      delUserPhone() {
        $(".userPhone").val('');
        $(".userPhone").focus();
        this.show = true;
        this.text = '获取验证码';
        clearInterval(this.timer);
        this.timer = null;
      },
    }
  }
</script>

<style scoped>
  .ForgotPassword{
    max-width: 750px;
    min-width: 320px;
    height: 100%;
    margin: 70px auto 0;
  }
  .ForgotPassword .user{
    position: relative;
    width: 300px;
    height: 44px;
    margin: 35px auto 0;
    border: 1px solid #545454;
    border-radius: 4px;
    background-color: #262626;
    overflow: hidden;
  }
  .firstMain .user .usercode{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }
  .ForgotPassword .user input{
    border: 0;
    width: 300px;
    height: 44px;
    line-height: 44px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #CCCCCC;
    border-radius: 4px;
    text-indent: 40px;
    background-color: #262626;
    background-repeat: no-repeat;
    background-position: 5px center;
    background-size: 10%;
  }
  .ForgotPassword .nextMain .user input{
    background-image: url("../../../assets/login_icon_password@2x.png");
  }
  .userPhone{
    background-image: url("../../../assets/regsiter_icon_phone@2x.png");
  }
  .firstMain .user input.identifyingCode{
    width: 190px;
    background-image: url("../../../assets/regsiter_icon_code@2x.png");
    background-size: 13%;
    background-position: 8px center;
  }
  .obtainICode{
    width: 110px;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #CCCCCC;
  }
  .ForgotPassword p{
    width: 302px;
    font-size: 14px;
    line-height: 40px;
    color: #545454;
    margin: 0 auto;
  }
  .btnRegister{
    width: 302px;
    height: 45px;
    text-align: center;
    margin: 20% auto;
  }
  .btnRegister a{
    display: block;
    line-height: 45px;
    font-size: 20px;
    color: #fff;
    background: #EF2B3A;
    border-radius: 4px;
  }
  .delUserPhone{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 6px;
    margin-top: -12px;
    display: none;
  }
</style>
