<template>
  <div id="forgetPassword" >
    <div class="forgetPassword">
      <div class="forgetPasswordHeader publicFlex">
        <span class="backBtn"><router-link to="/login"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link></span>
        <span class="userRes headerRes">找回密码</span>
        <span class="flexClear"></span>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Api from '../../service/api.js';
  import { Toast } from 'mint-ui';
    export default {
      name: "forgetPassword",
      methods: {

      }
    }
</script>

<style scoped>
  .forgetPasswordHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
</style>
