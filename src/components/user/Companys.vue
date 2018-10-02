
<template>
    <div class="APP">
      <div class="container">

<header class="mint-header">
    <div class="mint-header-button is-left">
        <router-link to="/recharge">
        <!-- <a href="recharge" class="router-link-active"> -->
        <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon">
                <i class="mintui mintui-back"></i>
                </span> <label class="mint-button-text">
                    </label>
        </button>
        <!-- </a> -->
        </router-link>
        </div> <h1 class="mint-header-title">公司入账</h1> <div class="mint-header-button is-right">
    </div>
</header>
  
  
        <div class="PaymentMethod" v-show="show_01">
          <p>选择付款方式</p>
          <ul>
            <li @click="AlipayClick">
              <i class="left">
                <img src="../../assets/Recharge/Recharge_02.png">
              </i>
              <span>支付宝</span>
              <i class="circular" v-show="Alipay"></i>
            </li>
            <li @click="BankCardClick">
              <i class="left">
                <img src="../../assets/Recharge/Recharge_03.png">
              </i>
              <span>银行卡</span>
              <i class="circular" v-show="BankCard "></i>
            </li>
    
          </ul>
    
          <input type="submit" value="下一步" class="next" @click="NextClick">
        </div>
  
  
        <div class="companyRecharged" v-show="show_02">
    
          <div class="RechargeInformation">
            <span>充值信息</span>
          </div>
    
          <div class="main">
            <div class="Top">
              <p>充值金额</p>
              <transition name="mybox">
              <div class="Tips" v-show="TipShow">
                <span>请输入正确的金额</span>
              </div>
              </transition>
              <input type="text" placeholder="请输入" v-model="Input1">
            </div>
            <div class="Down">
              <p>转款姓名</p>
              <transition name="mybox">
              <div class="Tips" v-show="TipsShow">
                <span>请输入正确的姓名</span>
              </div>
              </transition>              
              <input type="text" placeholder="请输入" v-model="Input2">
            </div>
</div>
    
          <div class="TransferInformation">
            <span>转账信息</span>
          </div>
    
          <div class="AccountName">
            <div class="Top">
              <span>收款账户</span>
              <span class="Account">{{receiptAccount}}</span>
            </div>
            <div class="Down">
              <span>收款姓名</span>
              <span class="Name">{{receiptRealName}}</span>
            </div>
          </div>
    
          <input @click="CompleteClick" type="submit" value="完成转账" class="Complete" v-show="IsOriginHei">

</div>
      </div>
     </div>


</template>
<script>

import api from '../../service/api.js'

    export default {
  
      data() {
        return {
          show: true,
          IsOriginHei:true,
          screenHeight: document.documentElement.clientHeight, 
          originHeight: document.documentElement.clientHeight,
          show_01: true,
          show_02: false,
          Alipay: true,
          BankCard: false,
          TipShow:false,
          TipsShow:false,
          count: 1,
          Input1:'',
          Input2:'',
          payType:1,
          receiptRealName:'王甜甜',
          receiptAccount:6228907656789086534
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
      methods: {
        CompleteClick:function(){
          // 验证金额正则
      var number =/(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
      // 验证姓名
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;      
      if(number.test(this.Input1)===false) {
                this.TipShow = true
                return setTimeout(() =>{
                this.TipShow = false
             },1000)
      }else if(reg.test(this.Input2)===false){
                this.TipsShow = true
                return setTimeout(() =>{
                this.TipsShow = false
             },1000)   
      }   

      api.addRecharge({
        accessToken:JSON.parse(localStorage.getItem("accessToken")),
        memberId:JSON.parse(localStorage.getItem("memberId")),
        receiptRealName:this.receiptRealName,
        receiptAccount:this.receiptAccount,
        payType:this.payType,
        payAmount:this.Input1,
        payRealName:this.Input2

      }).then(({data={}})=>{
        console.log(data);
        
      })

      this.$router.push({
        path:'my',
        name:'my'
      })

        },
        
        AlipayClick: function () {
          this.Alipay = true;
          this.BankCard = false;
          this.count = 1
          this.payType = 1
      
        },
        BankCardClick: function () {
          this.Alipay = false;
          this.BankCard = true;
          this.count = 2
          this.payType = 2
      
        },
        NextClick: function () {
          this.show_02 = true;
          this.show_01 = false
        }
      }
  
  
    }
</script>
<style scoped>
*{
    padding: 0;
    margin: 0;
}
  .APP{
      width: 100%;
      color: #fff;
    max-width: 750px;
    min-width: 320px;
  }
  .container{
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
  
  }
  .mint-header{
    background-color: #111111;
    font-size: 18px;
  }

.companyRecharged .RechargeInformation {
  
  width: 80px;
  height: 26px;
  border-radius: 0px 3px 3px 0px;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  color: #494949;
  background-color: #CCCCCC;
  position: absolute;
  top: 66px;
  left: 0;
}

.companyRecharged .TransferInformation {
  width: 80px;
  height: 26px;
  border-radius: 0px 3px 3px 0px;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  color: #494949;
  background-color: #CCCCCC;
  position: absolute;
  top: 330px;
  left: 0;
}

.companyRecharged .main {
  width: 100%;
    height: 200px;
  margin-top: 55px;
  
}

.companyRecharged .main p {
  font-size: 16px;
  line-height: 30px;
}

.companyRecharged .main input {
  width: 99%;
  height: 40px;
  font-size: 16px;
  text-indent: 10px;
  margin-top: 10px;
  color: #B9B9B9;
  background-color: #111111;
  border: 1px solid #303030;
}

.companyRecharged .main .Top {
  margin-bottom: 30px;
    position: relative;
}
.companyRecharged .main .Down{
  position: relative;
}
.Tips{
  width:50%;
  height: 40px;
  line-height: 40px;
  z-index: 2;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  position: absolute;
  top: -17px;
  right: 31px;
  background-color:#000;
}

.mybox-leave-active,.mybox-enter-active{
    transition: all 1s ease;
}
.mybox-leave-active,.mybox-enter{
            opacity: 0;
        }
.mybox-leave,.mybox-enter-active{
           opacity: 1;
        }





.AccountName {
    width: 100%;
  height: 100px;
  color: #B9B9B9;
  margin-top: 70px;
  font-size: 16px;
}

.AccountName .Top {
  height: 50px;
  line-height: 50px;

  
}

.AccountName .Top .Account {
  margin-left: 20px;
}

.AccountName .Down {
  height: 50px;
  line-height: 50px;

}

.AccountName .Down .Name {
  margin-left: 20px;
}

.Complete {
  width: 95%;
  height: 50px;
  color: #fff;
  font-size: 18px;
  border: none;
  background-color: #EE2B3A;
  border-radius: 3px;
  position: fixed;
  bottom: 15px;
  left: 2.5%;
}

.PaymentMethod p {
  font-size: 16px;
  line-height: 40px;
}

.PaymentMethod ul li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 60px;
  padding-right: 60px;
  box-sizing: border-box;
  border-top: 1px solid #303030;
  position: relative;
  	letter-spacing: 1px;
	color: #fefefe;
}

.PaymentMethod ul li:nth-child(2) {
  border-bottom: 1px solid #303030;
}

.PaymentMethod ul li::after {
  content: '';
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid #CACACA;
  position: absolute;
  top: 15px;
  right: 15px;
}

.PaymentMethod ul li .left img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
}

.PaymentMethod ul li .right img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
}

.PaymentMethod ul li .right1 img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
}

.PaymentMethod ul li .circular {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #EE2B3A;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 666;
}

.PaymentMethod ul li .circular::before {
  content: '';
  width: 2px;
  height: 8px;
  transform: rotate(-45deg);
  background-color: #fff;
  position: absolute;
  top: 7px;
  right: 13px;
  
}

.PaymentMethod ul li .circular::after {
  content: '';
  width: 2px;
  height: 13px;
  transform: rotate(45deg);
  background-color: #fff;
  position: absolute;
  top: 3px;
  right: 6px;
}

.PaymentMethod .next {
  width: 95%;
  height: 50px;
    color: #fff;
  font-size: 18px;
  border: none;
  background-color: #EE2B3A;
    border-radius: 3px;
  position: absolute;
  bottom: 20px;
    left: 2.5%;
}
</style>


