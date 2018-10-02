<template>
    <div class="APP">
 <!-- 这是我的账户的页面-->


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
        </div> <h1 class="mint-header-title">我的账户</h1> <div class="mint-header-button is-right">
    </div>
</header>


<div class="Money">
<div class="MoneyBg">
    <p>账户余额(元）</p>
    <span>{{coin}}.00</span>
</div>
</div>

<div class="Info">
<span class="Detailed">账单明细</span>
<div class="classification" @click="CationClick">
    <img src="../../../assets/person/person-16.png" alt="">
    <span class="cation">账单分类</span>
</div>
<div></div>
</div>
<div class="main">
    <ul>
        <li v-for="(item,index) in AccountInfo" :key="index"> 
            <span class="left">{{item.remark}}</span>
            <span class="left">{{item.Detailed}}</span>
            <p>{{getTimes(item.createTime)}}</p>
            <!-- <span class="right"  :class=" item.orderType==3 ||item.orderType==7 ? 'red':'green'   " >{{item.remark2}}{{item.payAmount}}.00</span> -->
            <span class="displaying" :class=" item.remark2 == '-' ? 'green':'red'">{{item.remark2}}{{item.payAmount}}.00</span>
        </li>
    </ul>
</div>
        <!-- 模态框 -->
   <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
    <div  class="content animated" v-show="ContentShow" > 
        <div class="box">
            <p>账单分类</p>
            <ul>
                <li @click="CaBtn(index)" v-for="(item,index) in CationList" :key="index" v-bind:class="{actived:index==CationBtn}" >
                    <span>{{item.tit}}</span>
                </li>
            </ul>
        <div class="ResetDetermination">
            <div class="Reset " @click="ResetClick">
                <span>重置</span>
            </div>
            <div class="Determination" @click="DeterminationClick">
                <span>确定</span>
            </div>
        </div>
        </div>
   </div>
</transition>
</div>
</template>
<script>
  import api from '../../../service/api.js'
export default {
    data(){
        return {
            show:true,
            ContentShow:false,
            CationBtn:-1,
            AccountInfo:[],
            CationList:[
                {'tit':'充值'},
                {'tit':'提现'},           
                {'tit':'游戏'},
                {'tit':'社交'},                       
            ],
            actived:false,
            coin:'0',
            jSessionId:'',
            orderType:'',
            isred:false,
            isgreen:false,
            valueTime:''
        }
    },
    created:function(){
        this.getMoney()  
    },
    methods:{
        getTimes:function(valueTime){
           
            
    if(valueTime){
    var newData =  Date.parse(new Date());
    var diffTime = Math.abs(newData-valueTime); 
    console.log(diffTime);
    
    if(diffTime >=3 * 24 * 3600 * 1000){
    var date = new Date(valueTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('1' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return  m + '-' + d+' '+h+':'+minute;  
    }
    else if(diffTime < 1 * 24 * 3600 * 1000 && diffTime >3600 * 1000){
        // console.log("一天之内");
            var date = new Date(valueTime);
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            return "今天"+ " " + h + ":" + minute;
        
    }
    else if(diffTime < 3 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000){
            // //注释("一周之内");

      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      if(dayNum==1){
        var dayNums = "昨天"
    
      }
                  var date = new Date(valueTime);
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
      return dayNums + " " + h + ":" + minute;  
    }











    }








        },
        // 显示的金额
        getMoney:function(){
            // console.log(this.$route.params.Money);
            // this.coin = this.$route.params.Money
        api.queryOrderDetailByMember({ 
            accessToken:JSON.parse(localStorage.getItem("accessToken")),  
            memberId:JSON.parse(localStorage.getItem("memberId")),
            
        }).then(({data={}})=>{
            
            console.log(data);
        this.coin = data.data.balance
        this.AccountInfo = data.data.orderInfoList.rows
        for(var i=0;i<this.AccountInfo.length-1;i++){
            this.valueTime = this.AccountInfo[i].payTime
            // console.log(this.valueTime);
            
        }
        
            // console.log(this.AccountInfo);
        // this.adds = data.data.
            
        })

        },
                  
        CationClick:function(){
            this.ContentShow = true
        },
        DeterminationClick:function(){
            console.log(this.orderType);
            
            api.queryOrderDetailByMember({
            accessToken:JSON.parse(localStorage.getItem("accessToken")),        
            memberId:JSON.parse(localStorage.getItem("memberId")),  
            orderType:+this.orderType || ''                

            }).then(({data={}})=>{
                console.log(data);
                this.AccountInfo= data.data.orderInfoList.rows
               
            })
            this.ContentShow = false
        },
        CaBtn:function(index){
            this.CationBtn = index
            console.log(index);
            if(index==0){
            this.orderType = 3
            console.log(this.orderType);
            
            }else if(index==1){
            this.orderType = 4
            }else if(index==2){
                this.orderType = 2
            }else if(index==3){
                this.orderType = 1
            }

            
        },
        ResetClick:function(index){
          this.CationBtn = 100
            this.orderType = ''
        }
    },

}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.APP{
    width: 100%;
    height: 100%;
}
input{
    outline:none;
}
.mint-header{
    padding: 10px;
    box-sizing: border-box;
    background-color: #111111;

}

.headers{
 
    padding: 10px;  
    box-sizing: border-box;      
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    
}
.Money{
    width: 100%;
    height: 160px;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 1;
    text-align: center;
    color: #543D22;
}

.MoneyBg{
    width: 100%;
    height: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    background: url("../../../assets/person/person-myBG.png") center center no-repeat;
    background-size: 100% 100%;
}
.MoneyBg span{
    font-size: 30px;
}
.Info{
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 200px;
    color: #fff;
}
.classification{
    float: right;
    width: 100px;
    height: 45px;
    padding-left: 30px;
    box-sizing: border-box;
    position: relative;
}
.classification img{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 13px;
    left: 4px;
}
.main{
    width: 100%;
    height: 60%;
     overflow: scroll;
    position: absolute;
    left: 0;
    top: 245px;
    z-index: 50;
}

.main ul li{
    width: 100%;
    height: 70px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    border-top: 1px solid #4B4B4B;
    position: relative;
}
.main ul li .left{
    line-height: 43px;
    font-size: 16px;
    color: #F2F2F2;
}
/* .main ul li .right{
    position: absolute;
    top: 24%;
    right: 10px;
    font-size: 25px;
} */

.displaying{
    position: absolute;
    top: 24%;
    right: 10px;
    font-size: 25px;
}
.main ul li p{
    color: #929292;
}
.main ul li:nth-last-child(1){
    margin-bottom: 0;
}
.content{
         position: absolute;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     z-index: 999;
     background-color: rgba(0, 0, 0, .3);
     box-sizing: border-box;
     overflow: hidden;
}
.content .box{
    width: 70%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #111111;
    color: #B2B2B2;
    position: absolute;
    top: 0;
    right: 0;
}

.content .box ul li{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 3px;
    border: 1px solid #333333;
}

.ResetDetermination{
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
}
.ResetDetermination .Reset{
    float: left;
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #CCCCCC;
    color: #828282;
}
.ResetDetermination .Determination{
    float:right;
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #EF2B3A;
    color: #fff;
}

.actived{
    background-image: url("../../../assets/person/person-17.png");
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: 100% -5%;
    border: 1px solid #D72835 !important;
    color: #ef2b3a;
}

.content .box p{
    font-size: 16px;
    line-height: 30px;
}
.red{
    color: #E82A39;
}
/* .red::before{
    content: "+"
} */
.green{
    color: #04900E;
}
/* .green::before{
    content: '-'
} */
</style>

