<template>
  <div id="ChangePhone" style="position: relative;width: 100%;height: 100%;">
    <div class="ChangePhone" style="position: relative;width: 100%;height: 100%;">
      <div class="ChangePhoneHeader publicFlex">
        <span class="backBtn"><router-link to="/setUp"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link></span>
        <span class="ChangePhone headerRes">修改手机号</span>
        <span class="flexClear"></span>
      </div>
      <div class="ChangePhoneMain">
        <ul>
          <li class="mainList">
            <span>旧手机号</span>
            <input type="text"  disabled="disabled" v-model="olderPhone" class="older" value="">
          </li>
          <li class="mainList">
            <span>新手机号</span>
            <div class="inputDelimg" style="position: relative;">
              <input type="text" placeholder="请输入..." class="new" value=""  @click="usernameJudge">
              <img src="../../assets/login_icon_del@2x.png" alt="" class="delUsername" @click="delUsername">
            </div>
          </li>
          <li class="mainList">
            <span>验证码</span>
            <div class="identifyingCode">
              <input type="text" placeholder="请输入..." class="input" @focus="focusMonitor" >
              <span class="brS">|</span>
              <span v-show="!this.show" class="count ICode">重发（{{count}}s）</span>
              <span v-show="this.show" class="ICode" @click="getCode">{{text}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="Confirm HomemadeButtonOriginal footerBtn">
        <a class="HomemadeButtonSon"  @click="clickConfirm">确认修改</a>
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
      name: "ChangePhone",
      data() {
        return {
          show: true,
          count: '',
          timer: null,
          text: '获取验证码',
          mobile:''
        }
      },
      created(){
        var data1 = JSON.parse(localStorage.getItem('mobile'));
        this.mobile= data1;
        this.olderPhone= this.mobile;
        // console.log(this.mobile);
      },
      methods: {
        usernameJudge() {
          if ($(".new").focus()) {
            if ($(".new").val().trim() != '') {
              $('.delUsername').fadeIn();
            }
            $(".new").bind("input propertychange", function (event) {
              event.preventDefault() || event.stopPropagation();
              if ($(".new").val().trim() != '') {
                $('.delUsername').fadeIn();
              }
              if ($(".input").val().trim() != '' && $(".new").val().trim() != '') {
                $('.Confirm').removeClass('HomemadeButtonOriginal');
                $('.Confirm').addClass('HomemadeButton');
              }else{
                $('.Confirm').removeClass('HomemadeButton');
                $('.Confirm').addClass('HomemadeButtonOriginal');
              }
            });
          }
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          $(".new").on('blur', function () {
            $('.delUsername').fadeOut();
            reg.test($(".new").val()) == true ? Toast("用户名正确") : (
              $(".new").val().trim() == '' ? Toast("用户名不能为空") : Toast("请输入正确的手机号或密码"));
          });
        },
        getCode() {
          const TIME_COUNT = 60;
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if ($(".new").val().trim() == '') {
             Toast({
               message: '用户名不能为空',
               position: 'bottom',
               duration: 2000
             })
           } else if ($(".new").val() === $(".older").val()) {
            Toast({
              message: '新手机号与旧手机号不能相同',
              position: 'bottom',
              duration: 2000
            });
          } else if (reg.test($(".new").val()) == false) {
             Toast({
               message: '请输入正确的手机号',
               position: 'bottom',
               duration: 2000
             });
           } else {
            Api.sendMessage({"mobile" : $('.older').val()}).then(({status, data = {}}) => {
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
          }
        },
        focusMonitor(){
          $(".input").bind("input propertychange", function (event) {
            event.preventDefault() || event.stopPropagation();
            if ($(".input").val().trim() != '' && $(".new").val().trim() != '') {
              $('.Confirm').removeClass('HomemadeButtonOriginal');
              $('.Confirm').addClass('HomemadeButton');
            }else{
              $('.Confirm').removeClass('HomemadeButton');
              $('.Confirm').addClass('HomemadeButtonOriginal');
            }
          });
        },
        blurMonitor(){
          if($(".new").val().trim() != ''){
            $(".input").bind("input propertychange", function (event) {
              event.preventDefault() || event.stopPropagation();
              if ($(".input").val().trim() != '') {
                $('.Confirm').removeClass('HomemadeButtonOriginal');
                $('.Confirm').addClass('HomemadeButton');
              }
            });
          }
        },
        clickConfirm() {
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if ($(".new").val().trim() == '' || $('.input').val().trim() == '') {
            Toast({
              message: '新用户名或验证码未输入',
              position: 'bottom',
              duration: 2000
            })
          } else if ($(".new").val() === $(".older").val()) {
            Toast({
              message: '新手机号与旧手机号相同',
              position: 'bottom',
              duration: 2000
            });
          } else if (reg.test($(".new").val()) == false) {
            Toast({
              message: '请输入正确的手机号',
              position: 'bottom',
              duration: 2000
            });
          } else {
            Api.checkVerifyCode({
              "mobile": $('.older').val(),
              "verify": $('.input').val()
            }).then(({status, data = {}}) => {
              if (data.success != true) {
                Toast(data.msg.message);
              } else {
                Api.updateUser({
                  "accessToken": JSON.parse(localStorage.getItem("accessToken")),
                  "memberId": JSON.parse(localStorage.getItem("memberId")),
                  "mobile": $('.new').val()
                }).then(({status, data = {}}) => {
                  // console.log(this);
                  if (data.success != true) {
                    Toast(data.msg.message);
                  } else {
                    var _this=this;
                    // console.log(_this);
                    $('.messageAlert').fadeIn(500,function(){
                      $(this).fadeOut(3000,function(){
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
            });
          }
        },
        delUsername() {
          $(".new").val('');
          $(".new").focus();
        }
      }
    }
</script>

<style scoped>
  .ChangePhone{
    position: relative;
  }
  .ChangePhoneHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
  .ChangePhoneMain{
    margin: 15px auto;
  }
  .ChangePhoneMain ul{
    width: 90%;
    margin: 0 auto;
  }
  .mainList{
    margin: 10px auto;
    color: #e8e8e8;
  }
  .mainList span{
    font-size: 14px;
    line-height: 30px;
  }
  .mainList input.new{
    width: 70%;
  }
  .mainList input{
    font-family: PingFangSC-Semibold;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    border:0;
    text-indent: 15px;
    background-color: #111;
    color: #e8e8e8;
  }
  .mainList .inputDelimg{
    height: 40px;
    border:1px solid #323232;
    background-color: #111;
  }
  .mainList input.older{
    line-height: 30px;
    margin-left: 20px;
  }
  .mainList .identifyingCode{
    width: 100%;
    border:1px solid #323232;
    display: flex;
    flex-direction: row;
  }
  .mainList .identifyingCode input{
    width: 55%;
  }
  .mainList .identifyingCode span{
    line-height: 40px;
  }
  .mainList .identifyingCode span.ICode{
    width: 105px;
    text-align: center;
    color: #D42734;
  }
  .mainList .identifyingCode span.brS{
    line-height: 40px;
    margin: 0 10px;
    color: #323232;
  }
  .Confirm{
    width: 90%;
    left: 50%;
    bottom: 30%;
    transform: translateX(-50%);
  }

  .mainList .new+img{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 13px;
    transform: translateY(-50%);
    display: none;
  }

</style>
