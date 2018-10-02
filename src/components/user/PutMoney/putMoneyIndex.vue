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
            </div> <span class="mint-header-title">提现</span> <div class="mint-header-button is-right">
        </div>
    </header>
          
    <p class="mode">提现金额</p>

    <div class="money">
    <input type="text" class="enter-money" v-model="input1">
    <span class="yuan">元</span>
    </div>   
          
    <p class="mode">提现账户</p>
    <div class="centers">
     <input class="enter" type="text" placeholder="请输入" v-model="input2">  

     <div class="centerLeft">
         <img src="../../../assets/person/person-05.png" alt="">
    </div>   
        <!-- <span class="AccountName">小鸭子</span> -->  
    </div>

 
    <button class="next" @click="Confirmation" v-show="IsOriginHei">确认提现</button>

  
    </div>  

    </div>
</template>

<script>
// import api from '../../../service/api.js'
export default {
    data(){
        return {
            show:true,
            input1:'',
            input2:'',
            IsOriginHei:true,
          screenHeight: document.documentElement.clientHeight,
          originHeight: document.documentElement.clientHeight,            
        }
    },
    methods:{
        Confirmation(){
        var number = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
        var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;

          if (number.test(this.input1) === false) {
            this.TipShow = true
            return setTimeout(() => {
              this.TipShow = false
            }, 1000)
          }else if(pattern.test(this.input2) === false){
            this.TipShow = true
            this.cion = "请输入正确的账户！"
            return setTimeout(() => {
              this.TipShow = false
            }, 1000)   
          }else{
            //  api.queryAccountByMember({
            //     accessToken:JSON.parse(localStorage.getItem("accessToken")),
            //     memberId:JSON.parse(localStorage.getItem("memberId")), 
            //  }).then(({data={}})=>{
            //      console.log(data);
            //      if(data.success = true){
            //          if(data.data.rows = " "){
            //              console.log("空的");
            console.log(this.input2);
            
                         this.$router.push({
                             path:'/putMoneyEmpty',
                             name:"putMoneyEmpty",
                            params:{
                                     Number:this.input2
                                    } 
                         })
                         
            //          }
            //      }
                 
            //  })
             

          }
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
        height: 100%;
    }
    
    input{
        outline:none;
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
    
    .mode{
        line-height: 35px;
    }
    
    .centers{
      position: relative;
    }
    .AccountName{
      position: absolute;
      top: 25%;
      right: 40px;
    }
    .centerLeft{
      width: 30px;
      height: 30px;
      background-color: #111;
      position: absolute;
      top: 21%;
      right: 2px;
    }
    .centerLeft img{
      width: 100%;
      height: 100%;
    }
    .money{
      
        height: 50px;
        background-color: #111111;
        border: 1px solid #999;
        padding-right: 20px;
         line-height: 50px;
         position: relative;
    }
    
    .yuan{
        position: absolute;
        top: 0;
        right: 15px;
    
    }
    .enter-money{
        width: 94%;
        height: 97%;
        background-color: #111111;
        text-indent: 10px;
        outline: none;
        border: none;
        color: #fff;
      
       
    }
    .enter{
        width: 100%;
        height: 50px;
        background-color: #111111;
        border:1px solid #999;
        text-indent: 10px;
        outline: none;
        color: #fff;
        padding-right: 100px;
        box-sizing: border-box;
    }
    
    
    .next{
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
