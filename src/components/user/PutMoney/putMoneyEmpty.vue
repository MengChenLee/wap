<template>


    <div class="app">
    
    
    
    <div class="container">
    
    
    
    <header class="mint-header">
        <div class="mint-header-button is-left">
          <router-link to="/my">
            <!-- <a href="my" class="router-link-active"> -->
            <button class="mint-button mint-button--default mint-button--normal">
                <span class="mint-button-icon">
                    <i class="mintui mintui-back"></i>
                    </span> <label class="mint-button-text">
                        </label>
            </button>
            <!-- </a> -->
            </router-link>
            </div> <span class="mint-header-title">提现账户</span> <div class="mint-header-button is-right">
        </div>
    </header>
    
    
    
    <div class="NoAccount"  v-show="show_01">
    
    <div class="box">
        <img src="../../../assets/weix.png" alt="">
    </div>
    
    </div>
    
    <div class="BankBox">
    <ul class="HaveAccount" v-show="show_02" >
      <li v-for="(tab,index) in tabs" :key="index">
            <div class="Top"> 
              <span class="TopLeft" >{{tab.accountName}}</span>
              <span class="right">银行卡</span>
              <p class="ACCount">{{tab.accountNo}}</p>
            </div>
        <div class="main">
          <span>{{tab.default}}</span>
          <i class="empty" @click="CircleClick(index)"></i>
          <i class="circle" v-show="activeIndex===index"></i>
             
                <span class="delete fr" @click="Delclick(index)" >删除</span>
    
                <div class="shan" @click="Delclick(index)">
                    <img src="../../../assets/person/shan.png" alt="">
                </div>
    
                <span class="edit fr" @click="EditClick(index)" >编辑</span>
    
                <div class="bian" @click="EditClick(index)">
                    <img src="../../../assets/person/xie.png" alt="">
                </div>
            </div>
        </li>
    </ul>
    </div>
    

      <button class="next" @click="NextClick" >新增</button>

    
    </div>
    
    </div>
    
    </template>
    <script>

import api from '../../../service/api.js'    
    export default {
    
    data(){
       return{
         count: '',
         activeIndex: 0,
         tabs: [
        //    {count: 1, name: "安东尼", card: "银行卡", number: 6228907366278746111, default: '默认账户'},
        //    {count: 2, name: "二娃子", card: "银行卡", number: 6228907366278746252, default: '默认账户'},
        //    {count: 2, name: "娃哈哈", card: "银行卡", number: 6228907366278746253, default: '默认账户'},
        //     {count: 2, name: "二嘎子", card: "银行卡", number: 6228907366278746251, default: '默认账户'},
        //     {count: 1, name: "安东尼", card: "银行卡", number: 6228907366278746111, default: '默认账户'},
        //    {count: 2, name: "二娃子", card: "银行卡", number: 6228907366278746252, default: '默认账户'},
        //    {count: 2, name: "娃哈哈", card: "银行卡", number: 6228907366278746253, default: '默认账户'},
        //      {count: 2, name: "二嘎子", card: "银行卡", number: 6228907366278746251, default: '默认账户'},
         ],
           show:true,
           show_01:true,
           show_02:false,
        accountId:'',
        accountst:''
         
         
         
       
       }
    },
      
      
      created(){
        
        
        this.getNumber();
        this.getInfo();
       
    },
    methods:{
        getNumber(){
            this.accountst = this.$route.params.Number
            console.log(this.accountst);
            
        },

        getInfo(){
            api.queryAccountByMember({
                accessToken:JSON.parse(localStorage.getItem("accessToken")),
                memberId:JSON.parse(localStorage.getItem("memberId")), 
            }).then(({data={}})=>{
                console.log(data);
                if(data.success=true){
                    console.log("成功");
                    if(data.data.rows.length==0){
                        console.log("空");
                        this.show_02 = false
                        this.show_01 = true
                        
                    }else if(data.data.rows.length >0){
                        console.log("不为空");
                        this.show_01 = false
                        this.show_02 = true
                        this.tabs = data.data.rows
                        
                    }
                    
                }
            })
        },
    
        // getParams(){
        //   var routerParams = this.$route.params.id;
        //     this.Id=routerParams;
        //     console.log( this.Id);
        //     if(this.Id=='1'){
        //     this.show_01=false,
        //     this.show_02=true
        //     }else{
        //         if(this.Id=='2'){
        //         this.show_01=true,
        //           this.show_02 = false
        //         }
        //     }
            
        // },
      
      CircleClick: function (index) {
        console.log(index);
        this.activeIndex = index;
      },
        Delclick:function(index){
        // this.tabs.splice(index,1)
        console.log(index);
        console.log(this.tabs);
        
        
        api.updateAccountByMember({
                accessToken:JSON.parse(localStorage.getItem("accessToken")),
                memberId:JSON.parse(localStorage.getItem("memberId")), 
                accountNo:this.tabs[index].accountNo,
                accountId:this.tabs[index].accountId,
                accountType:0,
                accountName:this.tabs[index].accountName,
                status:-1
        }).then(({data={}})=>{
            console.log(data);
            // this.$router.go(0)
            this.getInfo();
            
        })
    },
        EditClick:function(index){
        //   console.log(index);
        //   console.log(this.tabs[index].name);
        //   console.log(this.tabs[index].number);
    
        this.$router.push({
            path:'putMoneyEdit',
            name:'putMoneyEdit',
            params:{
                Number:this.tabs[index].accountNo,
                Name:this.tabs[index].accountName,
                accountId:this.tabs[index].accountId,
            }
        })
            // // 使用localstorage  存储accountNo
            // localStorage.setItem("IDcard",this.tabs[index].number)
            // localStorage.setItem("good",this.tabs[index].name)
      },
        NextClick:function(){
            this.$router.push({
            path:'putMoneyAdd',
            name:'putMoneyAdd',
            params:{
                NextNumber:this.accountst
            }
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
    
    .app{
        margin: 0;
        padding: 0;
        color: #fff;
        /* height: 100%; */
    }
    
    .fr{
        float: right;
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
    
    
    .box{
            margin: 50% auto;
            width: 200px;
            height: 200px;
    }
    .box img{
        width: 100%;
        height: 100%;
    }
    
    .bian{
        float: right;
        width: 30px;
        height: 30px;
    }
    .bian img{
        width: 100%;
        height: 100%;
    }
    .shan{
        float: right;
        width: 30px;
        height: 30px;
    }
    .shan img{
        width: 100%;
        height: 100%;
    }
    
    .BankBox{
        width: 100%;
        height: 80%;
        background-color: #0000;
        overflow: scroll;
    }
    
    ul li{
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        border: 1px solid #323232;
        position: relative;
        margin-top: 2%;
    }
    
    
    
    ul li .Top{
        width: 100%;
        height: 70px;
        border-bottom: 1px solid #323232;
        box-sizing: border-box;
        padding: 8px;
        position: relative;
        font-size: 12px;
    }
    
    .Top span{
        font-size: 12px;
    }
    .ACCount{
         height: 40px;
        position: absolute;
        bottom: 0;
        left: 10px;
        font-size: 12px;
    }
    
    .Top p{
        font-size: 16px;
        line-height: 40px;
    }
    
     ul li .Top .right{
         height: 20px;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
    }
    
    .TopLeft{
        width: 100px;
         height: 20px;
       position: absolute;
       top: 10px;
       left: 10px;
    }
    ul li .main{
        width: 100%;
        height: 50px;
        line-height: 34px;
      padding: 8px 8px 8px 40px;
        box-sizing: border-box;
      position: relative;
    }
    ul li .main span{
        font-size: 14px;
      
    }
    
    
    ul li .main .empty{
      position: absolute;
      top: 16px;
      left: 10px;
      width: 18px;
      height: 18px;
      border: 1px solid #C3C3C3;
      border-radius: 50%;
    }
    .circle {
      width: 20px;
      height: 20px;
      background-color: #EF2A3B;
      position: absolute;
      top: 16px;
      left: 10px;
      border-radius: 50%;
    }
    
    .circle::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 3px;
      width: 2px;
      height: 10px;
      background-color: #fff;
      transform: rotate(-44deg)
    }
    
    .circle::after {
      content: '';
      width: 2px;
      height: 15px;
      background-color: #fff;
      position: absolute;
      top: 2px;
      left: 11px;
      transform: rotate(45deg)
    }
    .edit,.delete{
        width: 40px;
        height: 40px;
        text-align: center;
    }
    .next{
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
    
    .red {
      color: #EF2A3B;
        }
    
    .editing p{
        line-height: 40px;
    }
    
    .editing .account{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid #333333;
        position: relative;
        margin-bottom: 10px;
    }
    .editing .account input{
        border: none;
        width: 89%;
        height: 100%;
        background-color: #111111;
        color: #E7E7E7;
    }
    .editing .account .del{
        width: 25px;
        height: 25px;
        border-radius: 50%;
    background-color: #CCCCCC;
        position: absolute;
        top: 6px;
        right: 6px;
    }
    .editing .account .del::before{
        content: '';
        width: 2px;
        height: 23px;
        background-color: #F0F0F0;
        position: absolute;
        top: 0;
        left: 44%;
        transform: rotate(45deg)
    }
    .editing .account .del::after{
        content: '';
        width: 2px;
        height: 23px;
        background-color: #F0F0F0;
        position: absolute;
        top: 0;
        left: 50%;
        transform: rotate(-45deg)
    }
    .editing  .Personal{
          width: 100%;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid #333333;
        position: relative;  
    }
    
    .editing .Personal input{
        border: none;
        width: 89%;
        height: 100%;
        background-color: #111111;
        color: #E7E7E7;
    }
    .editing .Personal .del{
        width: 25px;
        height: 25px;
        border-radius: 50%;
    background-color: #CCCCCC;
        position: absolute;
        top: 6px;
        right: 6px;
    }
    .editing .Personal .del::before{
        content: '';
        width: 2px;
        height: 23px;
        background-color: #F0F0F0;
        position: absolute;
        top: 0;
        left: 44%;
        transform: rotate(45deg)
    }
    .editing .Personal .del::after{
        content: '';
        width: 2px;
        height: 23px;
        background-color: #F0F0F0;
        position: absolute;
        top: 0;
        left: 50%;
        transform: rotate(-45deg)
    }
    </style>
    
    