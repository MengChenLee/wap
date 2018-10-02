  <!--
   title:游戏主页
   content：头部 底部 固定样式 banner部分 游戏列表部分
   data:2018-8-22
   author:wangzichen
   -->
<template>
    <div class="app">
        <div class="header">
            <!-- 跳转到在线咨询模块 -->
            <router-link to="/onlineConsultingIndex" class="iconLeft">
              <img src="../../assets/gamesImage/nav_icon_Customer.png" alt="">
            </router-link>
            <!-- 跳转到消息模块 -->
            <router-link to="/noticeIndex" class="iconRight">
              <img src="../../assets/gamesImage/nav_icon_Message_Normal.png" alt="">
            </router-link>
            <h1>游戏</h1>
        </div>
        <!-- 头部局部滚动游戏一级菜单 -->
        <div class="topMenu" ref="fixedTop">
            <ul>
                <li v-for="(v,i) in topInfo" :key="i" >
                  <a  @click="btn(i)" v-bind:class="{active:i==guigeSpan}"  href="#">{{v.gameName}}</a>
                </li>
            </ul>
        </div>
        <!-- 游戏banner -->
        <div class="gameBanner">
             <mt-swipe :auto="4000">
               <mt-swipe-item v-for="(items,index) in homeBanner" :class="index" :key="index">
                 <a :href= "items.recommendLink">
                   <img :src="items.imageUrl" :alt= "items.recommendName" :title="items.recommendName">
                 </a>
               </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 游戏列表部分 -->
          <div class="gameList clear" ref="wrapper">
            <mt-loadmore :bottom-method="loadTop" @bottom-status-change="handleTopChange">
            <ul class="clear" >
                <router-link :to="{path:'/gameInfo/'+gaN.gameId}" v-for="(gaN,index) in gameList" :class="index" :key="index">
                   <li>
                       <img :src="gaN.iconPath" :alt="gaN.gameName" :title="gaN.gameName">
                       <h1>{{gaN.gameName}}</h1>
                       <span>查看详情</span>
                   </li>
                 </router-link>
            </ul>
           
</mt-loadmore>
          </div>
          <div class="footer">
             <router-link to="/">
                 <img src="../../assets/home/home.png" alt="">
                 <h1>首页</h1>
             </router-link>
             <router-link to="/gameIndex">
                  <img src="../../assets/home/gameC.png" alt="">
               <h1 class="selectH1">游戏</h1>
             </router-link>
            <!--<router-link to="">
                 <img src="../../assets/home/tab_icon_live_normal.png" alt="">
                <h1>直播</h1>
            </router-link>-->

             <router-link to="/socialIndex">
               <img src="../../assets/home/social.png" alt="">
                 <h1>社交</h1>
             </router-link>
             <router-link to="/my">
               <img src="../../assets/home/my.png" alt="">
                 <h1>我的</h1>
             </router-link>
          </div>
    </div>
    
</template>

<script>
  import Api from '../../service/api'
import {Loadmore } from 'mint-ui';
  export default {
   data() {
      return {
        homeBanner:[],
        gameList:[],
       topInfo:[
           {
               gameName:"推荐"
           }, {
               gameName:"网络游戏"
           }, {
               gameName:"角色扮演"
           }, {
               gameName:"体育竞技"
           }, {
               gameName:"跑酷竞速"
           },
           
       ],
           guigeSpan:0,
          getScoreLog: [],
          topStatus: '',
       }
     
      },
  
    created(){
      this.loadTop();
    },
    methods: {
      btn(index){ this.guigeSpan = index},//当点击时候点亮，同级的span标签删除Class
      

      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(){
        Api.gethomeall({
          memberId: 1744,
        }).then(({status, data = {}}) => {
          this.homeBanner = data.homeBannerResultInfo.data;
          this.gameList = data.gameResultInfo.data;
        });
      }
    },
 
  
  };
</script>

<style scoped>
.app{
    width: 100%;
    height: 100%;
    /* background: #111111; */
    overflow: scroll;
    padding-bottom: 50px;
    box-sizing: border-box;
}
.header{
    width: 100%;
    height: 44px;
    position: relative;

}
.header .iconLeft{
    width: 44px;
    height: 44px;
    position: absolute;

}
.header .iconLeft img{
    width: 44px;
    height: 44px;
    transform-origin: center;
}
.header .iconRight{
    width: 44px;
    height: 44px;
    position: absolute;
    right: 0;
}
.header .iconRight img{
    width: 44px;
    height: 44px;
}
.header h1{
    font-size: 19px;
    color: white;
    width: 38px;
    height: 26.5px;
    display: block;
    position: absolute;
    left: 50%;
    top: 12px;
    transform: translateX(-50%);
}
.topMenu{
    width: 100%;
    height: 42px;
    overflow: scroll;

}
.topMenu ul{
    width: 672px;
    height: 40px;
 
}
.topMenu ul li{
    float: left;
    width: 84px;
    height: 40px;
    position: relative;
    text-align: center;
    

}

/* 底边框 */
.active{
   border-bottom: 2px solid #EF2A3B
}
.topMenu ul li a{
  font-size:13px;
  color: #ccc;
  height: 30px;
  padding-bottom: 10px;
  line-height:30px;
  box-sizing: content-box;
  


}
.gameBanner{
    width: 100%;
    height: 200px;
    text-align: center;
}
.gameBanner img{
  width: 100%;
    height: 200px;
}
.gameList{
    margin-top: 16px;
}
.gameList ul{
    width: 100%;
    height: 100%;
}
.gameList ul li{
    margin-top: 10px;
  width: 44%;
  height: 80px;
  position: relative;
  background:linear-gradient(to bottom, rgba(38, 38, 38,0.4) ,rgba(38, 38, 38,1)) ,url(../../assets/gamesImage/gameBg1.png) no-repeat;
  background-size: 100% 80px;
}
.gameList ul li:nth-child(2n-1){
    float: left;
    margin-left: 4%;
}
.gameList ul li:nth-child(2n){
    float: right;
    margin-right: 4%;
}
.gameList ul li img{
    width: 44px;
    height: 44px;
    position: absolute;
    left: 10px;
    top: 18px;
  border-radius: 50%;
}
.gameList ul li h1{
    font-size:12px;
    position: absolute;
    left: 60px;
    top: 21.5px;
    color: white;
    font-weight: 400;

}
.gameList ul li span{
    font-size: 10px;
    position: absolute;
    left: 60px;
    bottom: 21.5px;
    color: #ccc;
    font-weight: 400;
}
.footer{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 666;
    background-color: #000;
}
.footer a{
  
  float: left;
  width: 25%;
  height: 50px;
  color: white;
  position: relative;
}
.footer a h1{
  position: absolute;
  left: 50%;
  bottom: 3px;
  font-size: 10px;
  transform: translateX(-50%);
}
.footer a img{
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
  top: 0;


}
/* 添加加载更多 */
</style>
