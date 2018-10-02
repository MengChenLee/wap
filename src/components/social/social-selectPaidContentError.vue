<template>
    <div id="selectPaidContentError">
        <div class="selectPaidContentError">
          <div class="selectPaidErrorHeader">
            <div class="selectPaidHeader">
              <span class="backBtn"><router-link to="/socialAddDynamic"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link></span>
              <span class="socialDynamic headerRes">选择付费内容</span>
              <span class="Scavenging"></span>
            </div>
            
          </div>
        </div>
    </div>
</template>

<script>
  import api from '../../service/api.js'
  import { Toast } from 'mint-ui'
    export default {
        name: "selectPaidContentError"
    }
</script>

<style scoped>
  .selectPaidHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 10;
    background-color: #111111;
    text-align: center;
  }
  .selectPaidHeader .socialDynamic{
    line-height: 60px;
  }
  .selectPaidHeader span img{
    position: absolute;
    top: 10px;
    width: 40px;
    height: 40px;
  }
  .Scavenging img{
    right: 10px;
  }
  .backBtn img{
    left: 10px;
  }
</style>
