<template>
  <div class="app">
    <!-- 固定头部 -->
    <div class="appBox appCon">
      <div class="header">
        <router-link to="/onlineConsultingIndex" class="tp-ione"><img src="../../assets/home/nav_icon_customer.png" alt=""></router-link>
        <router-link to="/noticeIndex" class="tp-itwo"><img src="../../assets/home/nav_icon_newinfo.png" alt=""></router-link>
        <h3>首页</h3>
      </div>
      <div class="container">
        <!-- swiper部分 -->
        <div class="banner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(items,index) in homeBanner" :key="index" :class="index">
              <a :href= "items.recommendLink">
                <img :src="items.imageUrl" :alt= "items.recommendName" :title="items.recommendName">
              </a>
            </mt-swipe-item>
          </mt-swipe>
        </div>

        <!-- 充值提现部分 -->
        <div class="save">
          <router-link to="/Recharge"  class="tpc1">
            <img src="../../assets/home/home_chongzhi@2x.png" alt="">
          </router-link>
          <router-link to="/putMoneyIndex" class="tpc2">
            <img src="../../assets/home/home_tixian@2x.png" alt="">
          </router-link>
        </div>

        <!-- 消息提示部分 -->
        <div class="info" v-for="(bul,i) in bulletinResult" :key="i">
          <span class="iconInfo"><img src="../../assets/home/home_icon_notice.png" alt=""></span>
          <div class="content">
            <span class="NoticeContent">{{bul.boardContent}}</span>
          </div>
          <span class="NoticeTime">今天</span>
        </div>


        <!-- 推荐游戏部分 -->
        <div class="pushGame">
          <mt-cell title="推荐游戏" to="/gameIndex" is-link value="" class="cellList"></mt-cell>
          <div class="gameList">
            <router-link :to="{path:'/gameInfo/'+gaN.gameId}" class="gameLogo" v-for="(gaN,i) in gameList" :key="i" v-if="">
              <img :src="gaN.iconPath" :alt="gaN.gameName" :title="gaN.gameName">
              <span class="imgName">{{gaN.gameName}}</span>
            </router-link>
            <router-link to="/gameIndex" class="gameLogo">
              <div class="imgIcon"><i class="positionCenter"></i></div>
              <span class="imgName">更多</span>
            </router-link>

          </div>
        </div>

        <!-- 热门直播部分 -->
        <!--<div class="hotShow">
          <h1>热门直播</h1>
        </div>-->

        <!-- 推荐达人部分 -->
        <div class="fashionPerson">
          <mt-cell title="推荐达人" to="/socialIndex" is-link value="" class="cellList"></mt-cell>
          <div class="fashionPersonList">
            <div class="fashionPersonBox" v-for="(soc,i) in socialList" :key="i" @click="clickIntoSocialUserCenter(soc.socialId)">
              <router-link to="" class="fashionPersonLink">
                <img src="../../assets/home/Rectangle.png" :alt="soc.areaName" :title="soc.areaName">
                <div class="fashionPersonLabel">
                  <span class="TransparentLayer"></span>
                  <span class="fashionPersonWhere">{{soc.areaName}}</span>
                </div>
                <div class="fashionName">{{soc.nickname}}</div>
              </router-link>
            </div>
          </div>
        </div>

      </div>


      <!--   固定尾部-->
      <div class="footer">
        <router-link to="/">
          <img src="../../assets/home/dibu_shouyexuanzhong_hongse_60@2x.png" alt="">
          <h1 class="selectH1">首页</h1>
        </router-link>
        <router-link to="/gameIndex">
          <img src="../../assets/home/dibu_youxiweixuanzhong_huise_60@2x.png" alt="">
          <h1>游戏</h1>
        </router-link>
        <router-link to="/socialIndex">
          <img src="../../assets/home/dibu_shejiaoweixuanzhong_huise_60@2x.png" alt="">
          <h1>社交</h1>
        </router-link>
        <router-link to="/my">
          <img src="../../assets/home/dibu_wodeweixuanzhong_huise_60@2x.png" alt="">
          <h1>我的</h1>
        </router-link>
      </div>
    </div>
    <!--- 系统公告 -->
    <div class="SystemBulletin">
      <div class="maskLayer"></div>
      <div class="ModalFrame">
        <img src="../../assets/home/gonggao.png" alt="">
        <div class="soySauce"></div>
        <h1>系统公告</h1>
        <p>为了保障服务器性能的稳定性,我们需要对平台进行维护,维护期间服务器关闭,将无法进行充值及提现。因维护给大家带来的不便,敬请谅解。</p>
        <span class="hideBtn" @click="clickHide">我知道了</span>
      </div>
    </div>
  </div>


</template>

<script>
  import Api from '../../service/api'
  export default {
    name: "webIndex",
    data() {
      return {
        homeBanner:[],
        gameList:[],
        bulletinResult:[],
        socialList:[],

      }
    },
    created(){
      Api.gethomeall({
        memberId: 1744,
      }).then(({status, data = {}}) => {
        this.homeBanner=data.homeBannerResultInfo.data;
        this.gameList=data.gameResultInfo.data;
        this.socialList=data.socialResultInfo.data;
        this.bulletinResult.push(data.bulletinResultInfo.data);
      });
    },
    methods:{
      clickHide() {
        $(".SystemBulletin").fadeOut(1000);
        $('.appBox').removeClass('appCon');
      },
      clickIntoSocialUserCenter(index){
        Api.isLogin({
          accessToken: JSON.parse(localStorage.getItem("accessToken")),
          memberId: JSON.parse(localStorage.getItem("memberId"))
        }).then(({status, data = {}}) => {
          if(data.success!=true){
            this.$message({
              message: '您还没有登录,请先登录！',
              type: 'warning'
            });
          }
          else {
            this.$router.push('/socialUserCenter/'+index);
          }
        });
      }
    }
  }
</script>

<style scoped>
  .app{
    width: 100%;
    height:100%;
    position: relative;
    background-color: #111;
    color: white;
  }

  /** 头部跳转 **/
  .header {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    position: fixed;
    z-index: 99;
    background-color: #111;
    top: 0;
    left: 0;

  }
  .header h1{
    font-family: SFProDisplay-Bold;
    font-size: 19px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
  }
  .tp-ione{
    position: absolute;
    left: 0;
    top: 3px;
    height: 44px;
    width: 44px;
  }
  .tp-itwo{
    position: absolute;
    right: 0;
    top: 3px;
    height: 44px;
    width: 44px;
  }

  .header img {
    width: 40px;
    height: 40px;
  }

  /** banner轮播 **/
  .container{
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
    overflow: scroll;
  }
  .banner{
    height: 200px;
    margin-top: 50px;
  }
  .banner img{
    width: 100%;
    height: 200px;
  }

  /** 充值提现分类 **/
  .save{
    display: flex;
    flex-direction: row;
  }
  .save .tpc1,
  .save .tpc2 {
    width: 43%;
    margin: 15px auto;
  }

  .save img {
    width: 100%;
    height: 100%;
  }

  /** 消息提示**字体动画 **/
  .info{
    width: 90%;
    display: flex;
    flex-direction: row;
    margin: 5px auto 10px;
    height: 35px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: #262626;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  .info span{
    line-height: 35px;
  }

  .info .iconInfo {
    padding: 3px 7px 3.5px 5px;
    z-index: 10;
    background-color: #262626;
  }

  .info .iconInfo img {
    height: 16.2px;
    width: 18px;
  }

  .content {
    width: 88%;
    height: 100%;
    font-size: 12px;
    display: flex;
    flex-direction: column;
  }

  .content .NoticeContent {
    animation: anis 35s linear infinite;
    white-space: nowrap;
  }

  .info .NoticeTime {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 3.5%;
    background-color: #262626;
    font-size: 11px;
  }

  @keyframes anis {
    0% {
      transform: translateX(110%)
    }
    100% {
      transform: translateX(-695%)
    }
  }

  /** 游戏列表 **/
  .pushGame{
    margin-bottom: 10px;
  }
  .gameList{
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 5px auto;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    background-color: #262626;
  }

  .gameList a {
    width: 25%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
  }
  .gameLogo img{
    width: 44px;
    height: 44px;
    margin: 0 auto;
    border-radius: 50%;
  }
  .gameLogo span{
    text-align: center;
    font-size: 12px;
    line-height: 30px;
    color: #ccc;
  }
  .gameLogo .imgIcon{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #545454;
    margin: 0 auto;
    position: relative;
  }
  .gameLogo .imgIcon i{
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #cccccc;
    box-shadow:-12px 0px 0px #ccc;
  }
  .gameLogo .imgIcon i:after{
    content: '';
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #cccccc;
  }
  /*.gameLogo .imgIcon i:before{
    content: '';
    position: absolute;
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #cccccc;
  }*/
  .cellList{
    font-size: 15px;
    background-color: #111 !important;
    color: #ccc;
  }

  /** 推荐达人 **/
  .fashionPerson{
    margin-bottom: 10px;
  }

  .cellList {
    font-size: 15px;
    background-color: black;
  }

  .fashionPersonList {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 5px auto;
  }

  .fashionPersonList .fashionPersonBox{
    width: 47%;
    display: flex;
    justify-content: flex-start;
    margin: 0 2% 10px;
  }
  .fashionPersonList .fashionPersonBox:nth-child(even){
    margin-left: 0;
  }
  .fashionPersonLink{
    position: relative;
  }
  .fashionPersonLink,
  .fashionPersonLink img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 5px;
  }

  .fashionPersonLabel {
    position: absolute;
    left: 0;
    top: 20px;
    width: 40px;
  }

  .fashionPersonLabel .TransparentLayer {
    width: 100%;
    height: 20px;
    display: inline-block;
    background-color: #111;
    opacity: 0.5;
  }

  .fashionPersonLabel .fashionPersonWhere {
    position: absolute;
    top: 0;
    left: 8px;
    font-size: 12px;
    line-height: 19px;
  }

  /** 底部nav **/
  .footer{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: #000;
  }
  .footer a{
    float: left;
    width: 25%;
    height: 50px;
    color: #ccc;
    position: relative;
  }

  .footer a h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3px;
    font-size: 10px;
    color: #ccc;
  }

  .footer a img {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 50%;
    top: 0;
    transform: translate(-50%);
  }


  /** 系统公告 **/
  .SystemBulletin {
    display: none;
    width: 100%;
    height: 100%;
  }

  .maskLayer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background: rgba(17, 17, 17, 0.70);
  }

  .SystemBulletin .ModalFrame {
    position: fixed;
    z-index: 201;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 320px;
    background: #262626;
    border: 1px solid #545454;
    border-radius: 4px;
    text-align: center;
  }

  .ModalFrame img {
    width: 120px;
    height: 120px;
    position: fixed;
    top: -15%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .soySauce {
    width: 100%;
    height: 15%;
  }

  .ModalFrame h1 {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    line-height: 40px;
    margin-top: 10px;
    color: #FFCC66;
    letter-spacing: 0;
  }

  .ModalFrame p {
    font-size: 13px;
    line-height: 22px;
    padding: 0 45px;
    text-align: left;
  }

  .ModalFrame span {
    display: inline-block;
    font-size: 15px;
    line-height: 40px;
    width: 70%;
    height: 40px;
    border: 2px solid #CCCCCC;
    border-radius: 4px;
    text-align: center;
    margin-top: 15%;
  }
/* 达人名字样式 */
.fashionName{
  position: absolute;
  font-size: 14px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.50);
  color: #fff;
  bottom: 6px;
  left: 6px;
}
  /** 使model下的页面变模糊 **/
  /*.appCon {
    -webkit-filter: blur(7px);
    filter: blur(7px);
  }
  .appCon {
    -webkit-filter: blur(0px);
    filter: blur(0px);
  }*/
</style>
