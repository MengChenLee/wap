<template>
    <div class="APP">
        <div class="container">
 <header class="mint-header">
    <div class="mint-header-button is-left">
        <router-link to="/recharge">
        <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon">
                <i class="mintui mintui-back"></i>
                </span>
          <label class="mint-button-text">
                    </label>
        </button>
        </router-link>
        </div> <h1 class="mint-header-title">在线充值</h1> <div class="mint-header-button is-right">
    </div>
</header>
<p>充值金额</p>
<div class="RechargeAmount">
<input type="text" placeholder="请输入" v-model="input1">
<i class="yuan">元</i>
</div>   
      
<p class="PayStyle">选择付款方式：</p>
<div class="Paymethod">
    <ul>
        <li>
            <img src="../../assets/Recharge/Recharge_02.png" class="pay">
            <span>支付宝</span>
            <div class="Pay" @click="PayClick">
                <img src="../../assets/Recharge/Recharge_04.png" class="empty" v-show="show1">
                <img src="../../assets/Recharge/Recharge_01.png" class="have" v-show="show2">
            </div>
        </li>
        <li>
            <img src="../../assets/Recharge/Recharge_03.png" class="bankC">
            <span>银行卡</span>
            <div class="BankCard" @click="BankCardClick">
                <img src="../../assets/Recharge/Recharge_04.png" class="empty" v-show="show3">
                <img src="../../assets/Recharge/Recharge_01.png" class="have" v-show="show4">
            </div>
        </li>
    </ul>
</div>

<input type="submit" value="确认支付" class="confirm" @click="confirmClick" v-show="IsOriginHei"  :disabled="isDisable">

      </div>
  </div>
</template>
<script>

import api from '../../service/api.js'
  

export default {
    data(){
        return {
            show:true,
          IsOriginHei:true,
          screenHeight: document.documentElement.clientHeight, 
          originHeight: document.documentElement.clientHeight,            
            show1:true,
            show3:true,
            show2:false,
            show4:false,
            input1:'',
            UnionPayURL:'',
            ApyUrl:'',
            count:'',
            isDisable: false
        }
    },
                  // 监听事件  判断页面的大小 由此判断确定按钮的显示隐藏
        mounted(){
            let self = this;
            window.onresize = function(){
                return (function(){
                    self.screenHeight = document.documentElement.clientHeight;
                })()
            }
        },
        watch:{
            screenHeight(val){
                if(this.originHeight> val ){
                    this.IsOriginHei = false;
                }else{
                    this.IsOriginHei = true
                }
            }
        },
    methods:{
        PayClick:function(){
            this.show2= true
            this.show4 = false;
            this.count = 1

        },
        BankCardClick:function(){
            this.show4=true
            this.show2 = false
             this.count = 2
        },
        confirmClick:function(){



        this.isDisable = true
        setTimeout(() => {
          this.isDisable = false
        }, 1000)



    







        if(this.count==1){
            // 支付宝支付模块
            api.RechargeAmount({
                 accessToken:JSON.parse(localStorage.getItem("accessToken")),
                 memberId:JSON.parse(localStorage.getItem("memberId")),
                 amount:this.input1,
                 attach:'dada'                 
            }).then(({data={}})=>{
                console.log(data);
                this.ApyUrl = data.data.qrUrl
                if(data.success=true){
            const div = document.createElement('div')
            div.innerHTML = this.ApyUrl
            document.body.appendChild(div)
            document.forms[0].submit()
            console.log(this.UnionPayURL);                  

                }
            })




            
        }else if(this.count==2){
            // 银联支付模块
        api.addUnionPay({
            accessToken:JSON.parse(localStorage.getItem("accessToken")),
            memberId:JSON.parse(localStorage.getItem("memberId")),
            amount:this.input1,
            attach:'dada',
            channel:'bank'

        }).then(({data={}})=>{
            console.log(data);
            this.UnionPayURL = data.data.qrUrl
            if(data.success=true){
        localStorage.setItem("name",JSON.stringify(this.UnionPayURL))  
                this.$router.push({
                         path:'payexcessive',
                 })             

            }
        })
        }else{
            console.log("找不到");
            
        }


        }
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.mint-header{
    background-color: #111;
   font-size: 18px;
}

.APP{
    height: 100%;
    width: 100%;
    border: 2px solid #3D3C3C;
    box-sizing: border-box;
  
}

.container{
    height: 100%;
    box-sizing: border-box;
    background-color: #111;
    padding: 10px;
    color: #fff;
  position: relative;

}
.RechargeAmount{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    border: 1px solid #545454;
    margin-top: 20px;
    margin-bottom: 10px;

}
.RechargeAmount input{
    width: 90%;
    height: 40px;
    border: none;
    background-color: #111;
    font-size: 16px;
    letter-spacing: 0px;
	color: #cccccc;
    text-indent: 10px;
}
.yuan{
    position: absolute;
    top: 0;
    right: 2%;
    font-size: 20px;
}
.PayStyle {
    margin-top: 30px;
    margin-bottom: 10px;
}
.Paymethod ul li{
    width: 100%;
    height: 52px;
    line-height: 52px;
    border-top: 1px solid #333333;
    padding-left: 50px;
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
}
.Paymethod ul li:nth-child(2){
    border-bottom: 1px solid #333333;
}
.Paymethod ul li .pay{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    left: 10px;
    
}
.Paymethod ul li .bankC{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 12px;
    left: 10px;
}
.Pay{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;

}
.Pay .empty{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
}
.Pay .have{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
}
.BankCard{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
        z-index: 100;

}
.BankCard .have{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
}
.BankCard .empty{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
}
.confirm{
    height: 50px;
    border: none;
    border-radius: 3px;
    position: fixed;
    left: 2.5%;
    bottom: 15px;
    width: 95%;
    background-color: #ef2b3a;
    font-size: 18px;
    letter-spacing: 1px;
	color: #ffffff;
}
</style>

