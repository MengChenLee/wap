<template>
  <div id="ChangePassword" style="position: relative;width: 100%;height: 100%;">
    <div class="ChangePassword" style="position: relative;width: 100%;height: 100%;">
      <div class="ChangePasswordHeader publicFlex">
        <span class="backBtn"><router-link to="/setUp"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link></span>
        <span class="ChangePassword headerRes">修改密码</span>
        <span class="flexClear"></span>
      </div>
    
    <!----输入已登录的手机号---->
      <div class="ChangePasswordMain" style="position: relative;height: 60%;">
        <div class="ChangePasswordFirst" v-show="show_01" style="position: relative;height: 100%;">
          <ul style="position: relative;height: 100%;">
            <li class="mainList">
              <span>手机号</span>
              <input type="text" value=""  v-model="phoneNumber" class="phoneNumber" disabled="disabled">
            </li>
            <li class="mainList">
              <span>验证码</span>
              <div class="inputIC">
                <input type="text" placeholder="请输入....." value="" class="identifyingCode">
                <span class="brS">|</span>
                <span v-show="!show" class="count ICode">重发（{{count}}s）</span>
                <span v-show="show" class="ICode" @click="getCode">{{text}}</span>
              </div>
            </li>
            <li class="mainList footerBtn HomemadeButton Next">
              <a class="next HomemadeButtonSon" @click="clickNext">下一步</a>
            </li>
          </ul>
        </div>
        <!----密码输入验证修改---->
        <div class="ChangePasswordFinish" v-show="!show_01" style="position: relative;height: 100%;">
          <ul style="position: relative;height: 100%;">
            <li class="mainList">
              <span>新密码</span><br>
              <input type="password" placeholder="请输入....." class="newPassword" @click="passwordJudge">
            </li>
            <li class="mainList">
              <span>确认密码</span><br>
              <input type="password" placeholder="请输入....." class="confirmPassword" @click='confirmPasswordJudge'><br>
              <span class="alertInfo">*注意：密码由8-16位英文字母、数字组成</span>
            </li>
            <li class="mainList footerBtn HomemadeButton Confirm">
              <a class="nextConfirm HomemadeButtonSon" @click="clickConfirm">确认修改</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="messageAlert">
        <img src="../../assets/success.png" alt="" class="icon_success">
        <span class="message">修改成功</span>
        <span class="alertMes">请重新登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../service/api.js';
  import {Toast} from 'mint-ui';
  
  export default {
    name: "ChangePassword",
    data() {
      return {
        show: true,
        show_01: true,
        count: '',
        timer: null,
        text: '获取验证码',
        mobile:''
      }
    },
    created(){
      var data1 = JSON.parse(localStorage.getItem('mobile'));
      this.mobile= data1;
      this.phoneNumber= this.mobile;
    },
    methods: {
      // 发送验证码并接收
      getCode() {
        Api.sendMessage({"mobile" : $('.phoneNumber').val()}).then(({status, data = {}}) => {
          if (data.success != true) {
            Toast({
              message: data.msg.message,
            });
          }else{
            const TIME_COUNT = 60;
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
              }, 1000);
            }
            Toast({
              message: '发送成功',
            });
          }
        });
      },
      // 点击切换下一步 校验验证码及手机号
      clickNext() {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if ($('.identifyingCode').val().trim() == '') {
          Toast({
            message: '验证码未输入',
            position: 'bottom',
            duration: 2000
          });
        }else {
          Api.checkVerifyCode({
            "mobile": $('.phoneNumber').val(),
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
        var pasReg = /^([0-9a-zA-Z]{8,16})$/;// /[0-9A-Za-z](?=[\x21-\x7e]+){6,20}$/;
        $(".newPassword").on('blur', function () {
          if (pasReg.test($(".newPassword").val()) == false) {
            Toast({
              message: '密码不符合规则，请重新输入',
              position: 'bottom',
              duration: 2000
            });
            $(".newPassword").focus();
          } else {
            Toast({
              message: '请再次输入密码，两次密码保持一致',
              position: 'bottom',
              duration: 2000
            })
          }
        });
      },
      confirmPasswordJudge() {
        $(".confirmPassword").on('blur', function () {
          if ($(".confirmPassword").val() != $(".newPassword").val()) {
            Toast({
              message: '两次输入密码不一致，请重新输入',
              position: 'bottom',
              duration: 2000
            })
          }
        });
      },
      // 点击切换修改密码 校验密码
      clickConfirm() {
        Api.updateUser({
          "accessToken": JSON.parse(localStorage.getItem("accessToken")),
          "memberId": JSON.parse(localStorage.getItem("memberId")),
          "password": $('.newPassword').val()
        }).then(({status, data = {}}) => {
          if (data.success != true) {
            Toast(data.msg.message);
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
      }
    }
  }
</script>

<style scoped>
  .ChangePasswordHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
  .ChangePasswordMain{
    margin: 20px 20px 0;
    position: relative;
  }
  .ChangePasswordMain ul{
    position: relative;
  }
  .mainList{
    margin: 15px auto;
    color: #e8e8e8;
  }
  .mainList span{
    font-size: 14px;
    line-height: 30px;
  }
  .mainList input{
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    background-color: #111;
    color: #e8e8e8;
  }
  .mainList input.phoneNumber{
    border: 0;
    font-size: 16px;
    line-height: 30px;
    margin-left: 20px;
    background-color: #111;
    color: #e8e8e8;
  }
  input.newPassword,
  input.confirmPassword{
    width: 100%;
    text-indent: 15px;
    border:1px solid #323232;
  }
  .mainList .inputIC{
    width: 100%;
    height: 40px;
    border:1px solid #323232;
    display: flex;
    flex-direction: row;
  }
  .mainList .inputIC input{
    border: 0;
    width: 55%;
    padding: 0 11px;
  }
  .mainList .inputIC span{
    line-height: 40px;
  }
  .mainList span.alertInfo{
    font-size: 12px;
  }
  .mainList .inputIC span.ICode{
    width: 105px;
    text-align: center;
    color: #D42734;
  }
  .mainList .inputIC span.brS{
    line-height: 40px;
    margin: 0 10px;
    color: #323232;
  }
  .mainList.footerBtn.Next,
  .mainList.footerBtn.Confirm{
    width: 100%;
    left: 50%;
    bottom: 1%;
    transform: translateX(-50%);
  }
</style>
