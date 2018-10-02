<template>
  <div id="personalData">
    <div class="personalData">
      <div class="personalDataHeader publicFlex">
        <span class="backBtn"><router-link to="/setUp"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link></span>
        <span class="personalData headerRes">个人资料</span>
        <span class="flexClear"></span>
      </div>
      <div class="personalDataCon footerBtnClear">
        <ul>
          <li class="listOption" @click="">
            <span class="link personalData">个人资料</span>
            <span class="into"><img src="../../assets/forever.jpg" alt=""></span>
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link user">用户名</span>
            <input class="into" value="梦辰" disabled="disabled" :placeholder="isEmptyVal" @blur="blurInput($event)">
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link nick">昵称</span>
            <input class="into" value="梦若红尘" disabled="disabled" :placeholder="isEmptyVal" maxlength="10" @blur="blurInput($event)">
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link email">邮箱</span>
            <input class="into" value="xxxxxxxxxx" disabled="disabled" :placeholder="isEmptyVal" maxlength="20" @blur="blurInput($event)">
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link phone">手机号</span>
            <input class="into" value="176xxxx9486" disabled="disabled" :placeholder="isEmptyVal" maxlength="11" @blur="blurInput($event)">
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link website">网站</span>
            <input class="into" value="MengChenLee.github.io" disabled="disabled" :placeholder="isEmptyVal" @blur="blurInput($event)">
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link birthday">生日</span>
            <input class="into" value="xxxxxxxxxx" disabled="disabled" :placeholder="isEmptyVal" @blur="blurInput($event)">
          </li>
          <li class="listOption" @click="clickInput($event)">
            <span class="link introduction">自我介绍</span>
            <input class="into" value="介绍一下自己吧..." disabled="disabled" :placeholder="isEmptyVal" maxlength="50" @blur="blurInput($event)">
          </li>
        </ul>
      </div>
      <div class="Back footerBtn HomemadeButton">
        <router-link to="/setUp" class="HomemadeButtonSon">返回</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "personalData",
      data() {
        return {
          isEmptyVal:'',
        }
      },
      created(){
        console.log();
      },// v-model="isEmptyVal" this.isEmptyVal=
      methods:{
        clickInput(event){
          this.isEmptyVal=$(event.target).val();
          localStorage.setItem('isEmptyVal',$(event.target).val());
          $(event.target).attr('disabled',false);
          $(event.target).focus();
          // console.log(event.target);
        },
        blurInput(event){
          $(event.target).attr('disabled',true);
          if($(event.target).val().trim()==''){
            $(event.target).val(localStorage.getItem("isEmptyVal"));
          };
          // console.log(event.target);
        },
      }
    }
</script>

<style scoped>
  .personalDataHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
  .personalDataCon{
    width: 100%;
  }
  .personalDataCon li {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 0 #545454;
  }
  .listOption span{
    font-family: "Micrsoft YaHei", "PingFangSC-Semibold";
    line-height: 50px;
    font-size: 15px;
    color: #CECECE;
  }
  .link{
    margin-left: 15px;
  }
  .into{
    font-family: "Micrsoft YaHei", "PingFangSC-Semibold";
    height: 49px;
    font-size: 15px;
    padding-right: 15px;
    line-height: 49px;
    border: none;
    color: #CECECE;
    background-color: #111111;
    text-align: right;
  }
  .listOption img{
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }
  .Back{
    width: 94%;
    bottom: 2%;
    margin-left: 3%;
  }

</style>
