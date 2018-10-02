<template>
  <div id="setUp" style="position: relative;width: 100%;height: 100%;">
    <div class="setUp footerBtnParent" style="width: 100%;height: 100%;">
      <div class="setUpHeader publicFlex">
        <span class="backBtn"><router-link to="/My"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link></span>
        <span class="setUP headerRes">设置</span>
        <span class="flexClear"></span>
      </div>
      <div class="intoNext footerBtnClear">
        <ul>
          <!--<li class="listOption" @click="clickPersonalData">
            <span class="link personalData">个人资料</span>
            <span class="into"><img src="../../assets/nav_button_into@2x.png" alt=""></span>
          </li>-->
          <li class="listOption" @click="clickChangePhone">
            <span class="link ChangePhone">修改手机号</span>
            <span class="into"><img src="../../assets/nav_button_into@2x.png" alt=""></span>
          </li>
          <li class="listOption" @click="clickChangePassword">
            <span class="link ChangePassword">修改密码</span>
            <span class="into"><img src="../../assets/nav_button_into@2x.png" alt=""></span>
          </li>
        </ul>
      </div>
      <div class="quitLogin HomemadeButton footerBtn">
        <a class="loginOut HomemadeButtonSon" @click="clickLoginOut">退出登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../service/api.js';
  import {Toast} from 'mint-ui';
  
  export default {
    name: "setUp",
    data(){
      return{
        memberId:JSON.parse(localStorage.getItem('memberId'))
      }
    },
    
    methods: {
      /*clickPersonalData(){
        this.$router.push({path: '/setUP/personalData'});
      },*/
      clickChangePhone(){
        this.$router.push({path: '/setUP/ChangePhone'});
      },
      clickChangePassword(){
        this.$router.push({path: '/setUP/ChangePassword'});
      },
      clickLoginOut: function () {
        Api.logout({
          "memberId": this.memberId
        }).then(({status, data = {}}) => {
          localStorage.clear();
          this.$router.push({path: '/login'});
          Toast({
            message: '欢迎登录',
            position: 'top',
            duration: 3000
          });
        });
      }
    }
  }
</script>

<style scoped>
  .setUpHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
  .quitLogin{
    width: 94%;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  
  .intoNext{
    width: 100%;
  }
  .intoNext li {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 0 #545454;
  }
  .listOption span{
    line-height: 50px;
    font-size: 15px;
    color: #CECECE;
  }
  .link{
    margin-left: 15px;
  }
  .into{
    margin-right: 10px;
  }
  .listOption img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
</style>
