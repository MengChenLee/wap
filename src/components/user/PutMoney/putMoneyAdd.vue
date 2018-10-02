<template>
    <div class="app">
       <div class="container">

    <header class="mint-header">
        <div class="mint-header-button is-left">
            <router-link to="my">
            <button class="mint-button mint-button--default mint-button--normal">
                <span class="mint-button-icon">
                    <i class="mintui mintui-back"></i>
                    </span> <label class="mint-button-text">
                        </label>
            </button>
          
           </router-link>
            </div> <span class="mint-header-title">新增账户</span> <div class="mint-header-button is-right">
        </div>
    </header>

<p class="accounts">账户</p>
<input type="text" v-model="input1" class="account" placeholder="请输入账户">

<p class="persons">所属人</p>
<input type="text" v-model="input2" class="person" placeholder="请输入">


<button class="Preservation" @click="PreservationClick"> 保存</button>


       </div>
    </div>
</template>
<script>

import api from '../../../service/api.js'
export default {
    data(){
        return {
            input1:" ",
            input2:" "

        }
    },
    created(){
        this.getInfo();
    },
    methods:{
        getInfo(){
            this.input1 = this.$route.params.NextNumber
        },
        PreservationClick(){
            console.log("哈哈");
        api.addAccountByMember({
            accessToken:JSON.parse(localStorage.getItem("accessToken")),
            memberId:JSON.parse(localStorage.getItem("memberId")),  
            accountNo: this.input1   ,
            accountType:0,
            accountName:this.input2  
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
</script>
<style scoped>

*{
    margin: 0;
    padding: 0;
}
input{
    color: #fff;
}
.app{
    margin: 0;
    padding: 0;
    color: #fff;
}

.container{
    height: 100%;
    background-color: #111111;
    padding:10px;
    font-size: 16px;
    box-sizing: border-box;

}
.mint-header{
    background-color: #111111;
    font-size: 18px;
 }

.account{
    width: 100%;
    height: 40px;
    background-color: #111111;
    border: 1px solid #303030;
    text-indent: 10px;
}
.person{
      width: 100%;
    height: 40px;
    background-color: #111111;
    border: 1px solid #303030;  
    text-indent: 10px;
}
.accounts{
    line-height: 50px;
}
.persons{
    margin-top: 10px;
    line-height: 50px;
}
.Preservation{
        position: absolute;
        left: 0;
        bottom: 10px;
        right: 0;
        margin: auto;
        border: none;
        background-color: #EF2A3B;
        width: 90%;
        padding: 10px;
        font-size: 18px;
        font-weight: bolder;
        color: #fff;
        border-radius: 5px;
}
</style>
