<template>
    <div class="app">
        <div class="container">
            <div class="Top">
                <router-link to="putMoneyEmpty">
                <div class="ReturnBox">
                    <img src="../../../assets/person/person-05.png" alt="">
                </div>
                </router-link>
                <span>编辑账户</span>
                <span class="del">删除</span>
            </div>

            <span class="account">账户</span>
            <input type="text" placeholder="请输入" v-model="input1" >

            <span class="Belong">所属人</span>
            <input type="text" placeholder="请输入" v-model="input2">

            <button class="Preservation" v-show="IsOriginHei" @click="PreservationClick">保存</button>
        </div>
    </div>
</template>
<script>

import api from '../../../service/api.js'
export default {
    data(){
        return {
            IsOriginHei:true,
          screenHeight: document.documentElement.clientHeight,
          originHeight: document.documentElement.clientHeight, 
          input1:'',
          input2:'',
          accountId:''
        }
    },
              // 监听事件  判断页面的大小 由此判断确定按钮的显示隐藏
      mounted() {
        let self = this;
        window.onresize = function () {
          return (function () {
            self.screenHeight = document.documentElement.clientHeight;
          })()
        }
      },
      watch: {
        screenHeight(val) {
          if (this.originHeight > val) {
            this.IsOriginHei = false;
          } else {
            this.IsOriginHei = true
          }
        }
      },

      created(){
          this.getInfo();
      },

      methods:{
          getInfo(){
              this.accountId = this.$route.params.accountId
              console.log(this.accountId);
              this.input1 = this.$route.params.Number
              console.log(this.input1);
              
              this.input2 = this.$route.params.Name
              
          },
          PreservationClick(){
              console.log("哈哈哈");
            api.updateAccountByMember({
                accessToken:JSON.parse(localStorage.getItem("accessToken")),
                memberId:JSON.parse(localStorage.getItem("memberId")), 
                accountNo:this.input1,
                accountName:this.input2,
                accountType:0,     
                accountId: this.accountId   
            }).then(({data={}})=>{
                console.log(data);
                            this.$router.push({
                path:'/putMoneyEmpty',
                name:'putMoneyEmpty'
            })
            })
          }
      }
}
</script scoped>
<style>
.app{
    width: 100%;
    height: 100%;
    background-color: #111111;
}
.container{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}
.Top{
    width: 100%;
    height: 40px;
    background-color: #111111;
    position: relative;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #fff;
}
.ReturnBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
}
.ReturnBox img{
    width: 100%;
    height: 100%;
    transform: rotate(180deg)
}
.Top .del{
    position: absolute;
    top: 0;
    right: 0;
}
.account{
    line-height: 50px;
    font-size: 16px;
    color: #fff;
}
input{
    width: 100%;
    height: 50px;
    background-color: #111111;
    color: #fff;
    border: 1px solid #ccc;
    font-size: 16px;
    text-indent: 10px;
}
.Belong{
    line-height: 50px;
    font-size: 16px;
    color: #fff;
}

.Preservation{
          position: fixed;
      bottom: 15px;
      width: 95%;
      left: 2.5%;
      height: 50px;
      outline: none;
      border-radius: 5px;
        border: none;
      background-color: #EF2A3B;
      font-size: 20px;
        color: #fff;
}
</style>
