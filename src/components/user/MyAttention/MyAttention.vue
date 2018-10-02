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
                 </div> <h1 class="mint-header-title">我的关注</h1> <div class="mint-header-button is-right">
             </div>
        </header>
  
  
         <div class="NoConcern" v-show="show_1">
    
           <div class="box">
             <img src="../../../assets/Myattention/wodeguanzhu_zanwuguanzhu_400.png" alt="">
           </div>
           <div class="go">
             <router-link to="/socialIndex">
             <button>去逛逛</button>
             </router-link>
           </div>
  
         </div>
  
     
         <div class="FollowAnchor" v-show="show_2">
           <ul>
             <li  v-for="(item,index) in InfoArr" :key="index">
               <router-link :to="{path:'/socialUserCenter/'+item.socialId}">
               <span class="address">{{item.areaName}}</span>
               <img :src="item.gravatar" alt="">
               <span class="name">{{item.nickname}}</span>
               </router-link>
            </li>

    
           </ul>
         </div>


       </div>
    </div>

</template>
<script>
  import api from '../../../service/api.js'
  export default {
    data() {
      return {
        show: true,
        show_1: true,
        show_2: false,
        page:1,
        size:20,
        InfoArr:[], 
        memberId:''
      }
    }
    , 
    created:function(){
      this.getInfo();

    },
    methods:{
      getInfo(){
  
     api.getMyKeep({
      accessToken:JSON.parse(localStorage.getItem("accessToken")),
       memberId:JSON.parse(localStorage.getItem("memberId")),
       page:this.page,
       size:this.size
     }).then(({data={}}) =>{
       console.log(data);
       if(data.success = true && data.data.rows.length>0){
         this.InfoArr=data.data.rows;
        this.show_2 = true
        this.show_1 = false

       }
       else{
          this.show_2 = false
          this.show_1 = true
       }
       
     })
     
      }

    }
  };
</script>
<style scoped>

.app{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  background-color: #111111;
}
.container{
width: 100%;
  padding: 10px;
background-color: #111111;
color: #BCBCBC;
  box-sizing: border-box;
}
.mint-header{
    background-color: #111111;
    margin-bottom: 5%;
    font-size: 18px;
    font-weight: bolder;
}

.NoConcern {
  width: 100%;
  height: 100%;
}

.NoConcern button {
  border-radius: 5px;
  border: none;
  width: 80px;
  height: 30px;
  color: #7B1D24;
  background-color: #111111;
}

.NoConcern .go {
  width: 80px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #7B1D24;
  margin-left: 37%;
  
}
.NoConcern .go a{
  display: inline-block;
  width: 100%;
  height: 100%;
}
.box {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.box img {
  width: 100%;
  height: 100%;
}

.FollowAnchor {
  width: 100%;
  height: 500px;
  
}

.FollowAnchor ul li {
  float: left;
  width: 48.5%;
  height: 170px;
  margin-right: 2.8%;
  background-color: skyblue;
  margin-bottom: 2.8%;
    position: relative;
  
}

.FollowAnchor ul li:nth-child(2n) {
  margin-right: 0;
}

.FollowAnchor ul li img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
}

.FollowAnchor ul li .address {
    position: absolute;
  top: 10px;
    left: 0;
  width: 40px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  background-color: #494A4B;
  font-size: 14px;
  color: #EEEFEF;
}

.FollowAnchor ul li .name {
    position: absolute;
  bottom: 10px;
  left: 10px;
  color: #ffffff;
}

.FollowAnchor ul li a{
  width: 100%;
  height: 100%;
  display: block;
}
</style>
