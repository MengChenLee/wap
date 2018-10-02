<template>
    <div class="APP">
 <!-- 这是我的账户的页面-->
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
        </div> <span class="mint-header-title">充值</span> <div class="mint-header-button is-right">
    </div>
</header>


<div class="ChoiceRecharge">
    <p>选择充值方式:</p>
    <ul>
        <li @click="CompanyAccounts">
            <span>公司入账</span>
            <i class="Circular" v-show="show_1"></i>
        </li>
        <li @click="OnlineRecharge">
            <span>在线充值</span>
            <i class="Circular" v-show="show_2"></i>
        </li>
    </ul>
  <span class="Tips">注意：公司转账必须要有明确的转账人姓名，否则转账是不会成功的！</span>
</div>


<button class="next" @click="NextClick">下一步</button>
    </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            show:true,
            show_1:true,
            show_2:false,
            count:''
        }
    },
    methods:{
        CompanyAccounts:function(){
            this.show_1=true;
            this.show_2 = false;
            this.count = 1
        },
        OnlineRecharge:function(){
            this.show_1=false;
            this.show_2 = true;
            this.count = 2
        },
        NextClick:function(count){
            if(this.count==1 || this.count==''){
            this.$router.push({
              path: "/companys",
              name: "companys",
            })
            }else if(this.count==2){
            this.$router.push({
              path:"/onlines",
              name:"onlines",
            })
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
    background-color: #000;
    letter-spacing: -1px;
	color: #fefefe;
  
}

.mint-header-title {
  font-size: 20px !important;
  
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
    background-color: #000;
    padding: 10px;
    color: #fff;
    position: relative;

}
.container p{
    line-height: 40px;
}

.container span {
  font-size: 16px;
}
ul li{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    padding-left: 50px;
    border-bottom: 1px solid #323232;
    position: relative;
    letter-spacing: 1px;
	color: #fefefe;
}
ul li:nth-child(1){
    border-top: 1px solid #323232;
}
.ChoiceRecharge p{
    font-size: 16px;
}

.ChoiceRecharge .Tips {
  font-size: 12px;
 letter-spacing: 0px;
color: #aaaaaa;
}
ul li::before{
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #C9C9C9;
    position: absolute;
    top: 15px;
    left: 8px;
}
.Circular{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ED2A3A;
    position: absolute;
    top: 15px;
    left: 8px;
}
.Circular::before{
    content: '';
    width: 2px;
    height: 10px;
    transform: rotate(-44deg);
    background-color: #fff;
    position: absolute;
    top: 6px;
    left: 4px;
}

.Circular::after{
    content: '';
    width: 2px;
    height: 15px;
    background-color: #fff;
    transform: rotate(48deg);
    position: absolute;
    top: 2px;
    left: 12px;
}
.next{
    width: 95%;
    height: 50px;
    border: none;
    border-radius: 4px;
    background-color: #ef2b3a;
    position: fixed;
    bottom: 20px;
    left: 2.5%;
    color: #fff;
    font-size: 18px;
}
</style>

