  <!--
   title:游戏详情主页
   content：游戏logo  游戏描述  游戏截图  跳转游戏接口
   data:2018-8-22
   author:wangzichen
   -->
<template>
    <div class="app">
        <div class="topBar" :style="{backgroundImage: 'url(' + gameDetailInfo.backPicPath + ')' }">
          <img :src=gameDetailInfo.iconPath :alt="gameDetailInfo.name">
          <a @click="clickBack()">
            <i class="mintui mintui-back left-icon"></i>
          </a>
          <span>{{gameDetailInfo.name}}</span>
        </div>

        <div class="gameTitle">
            <h1>游戏描述</h1>
        </div>
        <div class="gameInfo">
        {{gameDetailInfo.description}}
        </div>
        <div class="Screenshots">
            <h1>游戏截图</h1>
        </div>
        <div class="gameBanner">
            <ul>
                <li v-for="(detailPic,i) in gameDetailInfo.detailPicList" :key="i">
                  <img :src="detailPic.detailPicPath" :alt="detailPic.name">
                </li>
            </ul>
        </div>
      <div class="startGameBtn HomemadeButton footerBtn">
        <a class="startGame HomemadeButtonSon" @click="">开始游戏</a>
      </div>
    </div>
</template>

<script>
  import Api from '../../service/api'
  
export default {
  data(){
    return {
      gameDetailInfo:{},
    }
  },
  created(){
    this.getGameDetail();
  },
  methods:{
    getGameDetail(){
      // console.log(this.$route.params.id);
      Api.getGameDetailInfo({
        gameId: +this.$route.params.id,
        "accessToken": JSON.parse(localStorage.getItem("accessToken")),
        "memberId": JSON.parse(localStorage.getItem("memberId")),
      }).then(({status,data={}}) => {
        console.log(data);
        this.gameDetailInfo=data.data.gameDetailInfo;
      });
    },
    clickBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.app{
    background-color: black;
    overflow: hidden;
    
}
.topBar{
    width: 100%;
    height: 220px;
    position: relative;
    background-size: 100%;
  background-repeat: no-repeat;
    /*background: linear-gradient(to right, rgb(67, 198, 172), rgb(25, 22, 84));*/
    z-index: 1;
}
.topBar:after{
  content: "";
  width:100%;
  height:220px;
  position: absolute;
  left:0;
  top:0;
  background: inherit;
  filter: blur(3px);
  z-index: 2;
}
.topBar img{
    width: 72px;
    height: 72px;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top: 30%;
    z-index: 3;
  border-radius: 10px;
}
.topBar a{
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  text-align: center;
  
}
.topBar a i{
  font-size: 20px;
  line-height: 50px;
}
.topBar span{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  top: 64%;
  z-index: 3;
  font-size: 15px;
  color: #fff;
}
.gameTitle{
    width: 100%;
    height: 45px;
    color:rgba(204,204,204,1);
    font-size: 15px;
    line-height: 45px;
    text-indent: 10px;
    font-family: PingFangSC-Semibold;
}
.gameInfo{
    font-size: 12px;
    width: 94%;
    margin-left: 3%;
    color: rgba(204,204,204,1);
    overflow: hidden;
    text-overflow: ellipsis;
   

}
.Screenshots{
    width: 100%;
    height: 45px;
    margin-top: 16px;
    font-size: 15px;
    color: #ccc;
    text-indent: 10px;
    line-height: 45px;
}
.gameBanner{
    width: 100%;
    height: 160px;
    overflow: scroll;

}
.gameBanner::-webkit-scrollbar {
display: none;/*隐藏滚轮*/
}
.gameBanner ul{
  width: 300%;
  height: 160px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.gameBanner ul li{
    width: 33.33%;
    height: 100%;
}
.gameBanner img{
  width: 94%;
  height: 100%;
  margin-left: 3%;
  border-radius: 4px;
}
.startGameBtn{
  width: 94%;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
}


.mintui-back{
    color: white!important;
}
</style>
