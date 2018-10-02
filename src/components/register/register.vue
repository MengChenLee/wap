
<template>
  <div id="register" >
    <div class="register">
      <div class="registerHeader publicFlex">
        <span class="backBtn" @click="clickBack">
          <img src="../../assets/nav_button_back@2x.png" alt="">
        </span>
        <span class="userRes headerRes">注册</span>
        <span class="flexClear"></span>
      </div>
      <div style="width: 100%;height: 2px;"></div>
      <div class="tab">
        <div class="tabItem">
          <span class="bindPhone active">绑定手机号</span><!--class="bindPhone active"-->
        </div>
        <div class="tabItem">
          <span class="setPassword">设置登录密码</span>
        </div>
        <div class="tabItem">
          <span class="perfectInformation">完善信息</span>
        </div>
      </div>
      <!--<keep-alive>
        <router-view></router-view>
      </keep-alive>-->
      <div class="bindPhone" v-show="show_01">
        <div class="bindPhoneMain main">
          <div class="user userFirst">
            <input type="text" class="userPhone" v-model="username" placeholder="请输入未注册的手机号" value="" @click="userPhoneJudge">
            <img src="../../assets/login_icon_del@2x.png" alt="" class="delUserPhone" @click="delUserPhone">
          </div>
          <div class="user userIC">
            <div class="usercode">
              <input type="text" class="identifyingCode" placeholder="验证码" value="" @click="">
              <span class="obtainICode">
                <span v-show="!show" class="count">{{count}}s后重新获取</span>
                <span v-show="show" class="ICode" @click="getCode">{{text}}</span>
              </span>
            </div>
          </div>
          <!--<h4 class="errorMes" v-show="" v-html=""></h4>-->
          <p>注册即表示已阅读并同意<a href="javascript:;" @click="clickAgreement">《用户协议》</a></p>
        </div>
        <div class="btnRegister">
          <a class="next" @click="clickStyleFirst">下一步</a>
        </div>
      </div>
      <div class="setPassword" v-show="show_02">
        <div class="setPasswordMain main">
          <div class="user">
            <input type="password" class="password" placeholder="请输入8-16位英文数字密码" value="" @click="passwordJudge">
          </div>
          <div class="user">
            <input type="password" class="confirmPassword" placeholder="请再次输入密码" value="" @click="confirmPasswordJudge">
          </div>
          <p><span class="alertInfo">*注意：密码由8-16位英文字母、数字组成</span></p>
        </div>
        <div class="btnRegister">
          <a class="next" @click="clickStyleNext">下一步</a>
        </div>
      </div>
      <div class="perfectInformation" v-show="show_03">
        <div class="perfectInformationMain main">
          <div class="user userNick">
            <input type="text" class="userNickname" placeholder="请输入昵称" value="" @click="userNickJudge">
          </div>
          <div class="user InvitationC">
            <input type="text" class="InvitationCode" placeholder="请输入邀请码（无邀请码可跳过）" value="" @click="">
          </div>
          <!--<p>注册即表示已阅读并同意<router-link to="/userAgreement" @click="userPhoneJudge">《用户协议》</router-link></p>-->
        </div>
        <div class="btnRegister">
          <a class="finishRegister" href="javascript:;" @click="clickStyleFinish">完成</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../service/api.js';
  import {Toast} from 'mint-ui';

  export default {
    name: 'register',
    data() {
      return {
        show: true,
        show_01: true,
        show_02: false,
        show_03: false,
        nextText: '下一步',
        id: '',
        ReceiveId:'',
        count: '',
        timer: null,
        text: '获取验证码',
        //reg: /^[1][3,4,5,7,8][0-9]{9}$/,
        userNum:'',
      }
    },
    created(){
      var userData = JSON.parse(localStorage.getItem('userName'));
      this.userNum= userData;
      this.username=this.userNum;
    },
    methods: {
      // 协议
      clickAgreement(){
        localStorage.setItem('userName', JSON.stringify($('.userPhone').val()));
        this.$router.push({path: '/userAgreement'});
      },
      // 手机号注册验证
      userPhoneJudge() {
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
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this=this;
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
              "methodType" : 1
            }).then(({status, data = {}}) => {
              if(data.success!= true){
                Toast(data.msg.message);
              }else{
                localStorage.setItem('userName', JSON.stringify($('.userPhone').val()));
                Toast({
                  message: '手机号可以注册',
                  position: 'top',
                  duration: 2000
                });
              }
            });
          }
        });
      },
      // 短信验证码发送倒计时    this.$options.methods.userPhoneJudge();
      getCode(){
        const num = 60;
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if ($(".userPhone").val().trim() == '') {
          Toast({
            message: '用户名或验证码未输入',
            position: 'bottom',
            duration: 2000
          });
        } else if (reg.test($(".userPhone").val()) == false) {
          Toast({
            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 2000
          });
        } else {
          Api.checkMobile({
            "mobile" : $('.userPhone').val(),
            "methodType" : 1
          }).then(({status, data = {}}) => {
            if(data.success!= true){
              Toast(data.msg.message);
            }else{
              localStorage.setItem('userName', JSON.stringify($('.userPhone').val()));
              Api.sendMessage({"mobile": $('.userPhone').val()}).then(({status, data = {}}) => {
                if (data.success != true) {
                  Toast({
                    message: data.msg.message,
                    position: 'bottom',
                    duration: 2000
                  });
                } else {
                  if (!this.timer) {
                    this.count = num;
                    this.show = false;
                    $('.identifyingCode').focus();
                    this.timer = setInterval(() => {
                      if (this.count > 1 && this.count <= num) {
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
              });
            }
          });


        }
      },

      // 点击切换页面 校验验证码及手机号
      clickStyleFirst() {
        Api.checkVerifyCode({
          "mobile": $('.userPhone').val(),
          "verify": $('.identifyingCode').val()
        }).then(({status, data = {}}) => {
          if (data.success != true) {
            Toast(data.msg.message);
          } else {
            $('.tabItem span.setPassword').addClass('active');
            this.show_01 = false;
            this.show_02 = true;
            this.show_03 = false;
          }
        });
      },
      // 验证密码
      passwordJudge() {
        var pasReg = /^([0-9a-zA-Z]{8,16})$/;
        $(".password").on('blur',function(){
          if(pasReg.test($(".password").val()) == false) {
            Toast({
              message: '密码不符合规则，请重新输入',
              position: 'bottom',
              duration: 2000
            });
            $(".password").focus();
          }else{
            Toast({
              message: '请再次输入密码，两次密码保持一致',
              position: 'bottom',
              duration: 2000
            })
          }
        });
      },
      confirmPasswordJudge() {
        $(".confirmPassword").on('blur',function(){
          if($(".confirmPassword").val() != $(".password").val()) {
            Toast({
              message: '两次密码必须一致，请重新输入',
              position: 'bottom',
              duration: 2000
            })
          }else{
            Toast({
              message: '请完善信息',
              position: 'bottom',
              duration: 1000
            })
          }
        });
      },

      // 点击切换页面 校验密码
      clickStyleNext() {
        if ($(".confirmPassword").val() != $(".password").val()) {
          Toast({
            message: '两次密码必须一致，请重新输入',
            position: 'bottom',
            duration: 3000
          });
        } else {
          $('.tabItem span.perfectInformation').addClass('active');
          this.show_01 = false;
          this.show_02 = false;
          this.show_03 = true;
        }
      },


      // 验证昵称
      userNickJudge() {
        var nickReg = /^.+$/;
        $(".userNickname").on('blur',function(){
          if(nickReg.test($(".userNickname").val()) == false) {
            Toast({
              message: '昵称不合法，请重新输入',
              position: 'bottom',
              duration: 2000
            });
            $(".userNickname").focus();
          }else if($(".userNickname").val() == ''){
            Toast({
              message: '请输入您的昵称，完善信息',
              position: 'bottom',
              duration: 2000
            });
          }else{
            Api.checkNickname({
              "nickname" : $('.userNickname').val()
            }).then(({status, data = {}}) => {
              if (data.success != true) {
                Toast({
                  message: data.msg.message,
                  position: 'top',
                  duration: 3000
                });
                $('.userNickname').focus();
              } else {
                Toast({
                  message: $('.userNickname').val()+'，别来无恙',
                  position: 'top',
                  duration: 3000
                });
              }
            });
          }
        });
      },

      // 点击切换页面 完善信息，同时完成注册
      clickStyleFinish() {
        var nickReg = /^.+$/;
        if(nickReg.test($(".userNickname").val()) == true && $(".userNickname").val() != '') {
          Api.register({
            "password":$('.password').val(),
            "mobile" : $('.userPhone').val(),
            "nickname" : $('.userNickname').val(),
            "verify" : $('.identifyingCode').val(),
            "inviteCode" : $('.InvitationCode').val()
          }).then(({status, data = {}}) => {
            if (data.success != true) {
              Toast({
                message: data.msg.message,
                position: 'top',
                duration: 3000
              });
            } else{
              Api.createimuser({
                "mobile" : $('.userPhone').val(),
                "name" : $('.userNickname').val()
              }).then(({status, data = {}}) => {
                console.log(data)
                if (data.code != 200) {
                  Toast({
                    message: data.desc,
                    position: 'top',
                    duration: 3000
                  });
                } else{
                  this.$router.push({path: '/login'});
                }
              });
            }
          });
        }
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
      clickBack(){
        this.$router.push({
          path: window.history.go(-1)
        });
      }
    },
    /*created(id) {
      var routerParams = this.$route.params.id[0];
      // 将数据放在当前组件的数据内
      this.id=routerParams;
      this.username=this.id;
      console.log(this.id);
    }*/
  };
</script>

<style scoped>
  .registerHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
  .tab{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    font-size: 16px;
  }
  .tab .tabItem{
    flex: 1;
    text-align: center;
  }
  .tab .tabItem span{
    display: block;
    font-family: PingFangSC-Medium;
    color: #545454;
    letter-spacing: 0;
  }
  .active{
    color: #fff !important;
    margin-top: -3px;
    border-top: 3px solid #EF2B3A;
  }
  .btnRegister{
    width: 302px;
    height: 45px;
    text-align: center;
    margin: 20px auto;
  }
  .btnRegister a{
    display: block;
    line-height: 45px;
    font-size: 20px;
    color: #fff;
    background: #EF2B3A;
    border-radius: 4px;
  }
  .main{
    width: 100%;
    margin: 70px auto 0;
  }
  .main span.alertInfo{
    font-size: 14px;
    line-height: 30px;
    color: #e8e8e8;
  }
  .user{
    position: relative;
    width: 300px;
    height: 44px;
    margin: 35px auto 0;
    border: 1px solid #545454;
    border-radius: 4px;
    background-color: #262626;
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 10%;
    overflow: hidden;
  }
  .bindPhoneMain .user .usercode{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }
  .user input{
    border: 0;
    width: 245px;
    height: 44px;
    line-height: 44px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #CCCCCC;
    border-radius: 4px;
    /*text-indent: 35px;*/
    margin: 0 10px 0 45px;
    background-color: #262626;
  }
  .user.userFirst{
    background-image: url("../../assets/regsiter_icon_phone@2x.png");
  }
  .user.userIC{
    background-image: url("../../assets/regsiter_icon_code@2x.png");
  }
  .user input.identifyingCode{
    width: 52%;
  }
  .setPasswordMain .user{
    background-image: url("../../assets/login_icon_password@2x.png");
  }
  .user.userNick{
    background-image: url("../../assets/login_icon_account@2x.png");
  }
  .user.InvitationC{
    background-image: url("../../assets/login_icon_Invited@2x.png");
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
  .obtainICode{
    width: 110px;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #CCCCCC;
  }
  .main p{
    width: 302px;
    font-size: 14px;
    line-height: 40px;
    color: #545454;
    margin: 0 auto;
  }
</style>
