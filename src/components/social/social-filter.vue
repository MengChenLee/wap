<!--
 title:社交主页
 content：头部 底部 固定样式 中间社交列表
 data:2018-8-22
 author:wangzichen
 -->


<template>

  <div class="app">

    <!-- 头部固定 -->
    <div class="header">
      <!-- 跳转到筛选模块 -->
      <span ref="socialFilter" @click="socialShow=!socialShow" class="tp-ione"><img src="../../assets/social/shejiao_shaixuan_100.png" alt=""></span>
      <!-- 跳转到消息模块 -->
      <router-link to="/noticeIndex"> <span class="tp-itwo"><img src="../../assets/social/shejiao_xiaoxi_100.png" alt=""></span></router-link>
      <h3>社交</h3>
    </div>

    <!-- 中间容器 渲染社交用户列表 -->

    <div class="container" v-if="noneSocialList"   ref="moreInfo">



      <!-- 跳转到社交用户详情，传递社交用户id -->


      <div @click="socialInfoBtn(v.socialId)" class="userinfo" v-for="(v,i) in socialList" :key="i">
        <div class="userbox">
          <img :src="v.gravatar" alt="">
          <span>{{v.areaName}}</span>
        </div>
        <h1>{{v.nickname}}</h1>

      </div>



    </div>

    <!--   固定尾部-->

    <div class="footer">
      <router-link to="/">
        <img src="../../assets/home/home.png" alt="">
        <h1>首页</h1>
      </router-link>
      <router-link to="/gameIndex">
        <img src="../../assets/home/game.png" alt="">
        <h1>游戏</h1>
      </router-link>
      <router-link to="/socialIndex">
        <img src="../../assets/home/socialC.png" alt="">
        <h1 class="selectH1">社交</h1>
      </router-link>
      <router-link to="/my">
        <img src="../../assets/home/my.png" alt="">
        <h1>我的</h1>
      </router-link>
    </div>

    <!-- 固定定位个人中心  跳转到我的社交主页-->
    <div class="personalCenter" v-if="nonePersonSocial">
      <router-link to="socialmyCenter"><img src="../../assets/social/shejiao_gerenshouye_122.png" alt=""></router-link>
    </div>
    <!-- 无社交资料填充背景 -->
    <div class="noneSocial" v-if="noneImg">
      <img src="../../assets/social/shejiaokongtai_zhanweitu_400.png" alt="">
    </div>
    <!-- 筛选模态框 -->

    <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
      <div v-show="socialShow" class="socialFilter animated">
        <!-- 筛选的盒子  删选条件的内容 -->
        <div class="socialContent">
          <!-- 年龄区间 身高区间 体重区间 -->
          <div class="ageRange">
            <h1>年龄区间</h1>
            <div class="ageInputBox">
              <!--<input type="text" placeholder="全部" v-model="params.beginHeight">
               v-model="selectionConPro"
               v-model="selectionCon01"
               v-model="selectionCon02"
               v-model="selectionCon03"
               v-model="selectionCon04"-->
              <span>{{selectionConPro}}</span>
              <span>岁</span>
            </div>
            <div class="ageRangeSelect">
              <ul>
                <li class="selection" v-for="(item, index) in selectionCon">
                  <span class="selectionCon" @click="clickSelect(index,$event)">{{item}}</span>
                </li>
                <!--<li class="selection">
                  <span class="selectionCon">{{selectionCon02}}</span>
                </li>
                <li class="selection">
                  <span class="selectionCon">{{selectionCon03}}</span>
                </li>
                <li class="selection">
                  <span class="selectionCon">{{selectionCon04}}</span>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="ageRange">
            <h1>身高区间</h1>
            <div class="ageInputBox">
              <span>全部</span>
              <span>cm</span>
            </div>
          </div>
          <div class="ageRange">
            <h1>体重区间</h1>
            <div class="ageInputBox">
              <span>全部</span>
              <span>kg</span>
            </div>
          </div>
          <!-- 所在省份 -->
          <div class="provinceRange">
            <h1>所在省份</h1>
            <button
              v-for="(v,i) in areaList"
              :key="i" @click="btn(i)"
              v-bind:class="{active:i==guigeSpan}">
              {{v.areaName}}</button>
          </div>

        </div>
        <div class="confirmBtn">
          <button @click="resetBtn">重置</button>
          <button @click="sendTiaojian">确定</button>
        </div>



      </div>

    </transition>

  </div>

</template>

<script>
  import api from '../../service/api.js'
  import BScroll from 'better-scroll'
  export default {

    data(){
      return {
        //筛选模态框的控制
        socialShow:false,
        selectionConPro:'全部',
        selectionConP:[],
        selectionCon:['20岁及以下','21岁至25岁','26岁至30岁','31岁及以上'],
        // selectionCon01:'20岁及以下',
        // selectionCon02:'21岁至25岁',
        // selectionCon03:'26岁至30岁',
        // selectionCon04:'31岁及以上',
        //省一级区域信息
        areaList:[],
        selectionShow:true,

        //社区列表用户信息
        socialList:[],
        active:false,
        guigeSpan:-1 ,
        loading2:false,
        noneImg:true,//无社交数据展示
        noneSocialList:false,//无社交设局修改
        nonePersonSocial:false,//不是社交用户，
        socialId:'',
        //社交筛选传参
        params:{
          accessToken:JSON.parse(localStorage.getItem("accessToken")),
          memberId:JSON.parse(localStorage.getItem("memberId")),
          page:1,
          areaId:'',
          beginAge:'',
          endAge:'',
          beginWeight:'',
          endWeight:'',
          beginHeight:'',
          endHeight:'',
        },
        allLoaded:false
      }
    },
    methods: {
      clickSelect(index,event){
        this.selectionConP.push(this.selectionConPro);
        if(this.selectionConPro=='全部'){
          this.selectionConPro=this.selectionCon.slice(index,index+1);
          this.selectionCon.splice(0, 1, this.selectionConP[0]);
          this.selectionConP=[];
        }else{
          this.selectionCon.splice(index, 1, this.selectionConP[0]);
          this.selectionConP=[];
        }
        // this.selectionConPro=this.selectionCon.slice(index,index+1);
        this.selectionConPro=this.selectionCon.slice(index,index+1);
        // this.selectionCon.slice(index,index+1);

      },
      btn:function(index){  //当点击时候点亮，同级的span标签删除Class .splice(index, 0, item);$(event.currentTarget)
        this.guigeSpan = index;
        this.params.areaId=index+1
      },

      //获取社交列表
      getSocialList(){
        if(localStorage.getItem('saveFilter')){
          var getFilter=JSON.parse(localStorage.getItem('saveFilter'))
          this.params.areaId=+this.params.areaId || getFilter.areaId ||'';
          this.params.beginAge=+this.params.beginAge ||getFilter.beginAge ||'',
            this.params.endAge=+this.params.endAge || getFilter.endAge ||'',
            this.params.beginWeight=+this.params.beginWeight || getFilter.beginWeight ||'',
            this.params.endWeight=+this.params.endWeight|| getFilter.endWeight ||'',
            this.params.beginHeight=+this.params.beginHeight || getFilter.beginHeight ||'',
            this.params.endHeight=+this.params.beginHeight || getFilter.endHeight ||''
          this.guigeSpan = this.params.areaId-1
        }
        api.querySocialList(

          this.params
        ).then(({status, data = {}}) => {
          if(data.success==true && data.data.rows.length>0){
            this.socialList=data.data.rows;
            this.socialList.concat(this.socialList)
            this.noneSocialList=true
            this.noneImg=false;
            // 保存用户的筛选信息
            localStorage.setItem("saveFilter",JSON.stringify(this.params))
            //  console.log(this.params)
            //清空社交条件
            //   this.params.areaId='';
            //   this.params.beginAge='',
            //     this.params.endAge='',
            //     this.params.beginWeight='',
            //     this.params.endWeight='',
            //     this.params.beginHeight='',
            //     this.params.endHeight=''
            //   this.guigeSpan=-1
          }
          else{
            this.noneImg=true;
            this.noneSocialList=false
          }
        });
      },
      //获取区域信息
      getAreaList(){
        api.queryAreaList({   }).then(({status, data = {}}) => {
          if(data.success==true){
            // this.loading2=false
            this.areaList=data.data;
          }
        });
      },
      //跳转详情页
      socialInfoBtn(index){
        api.isLogin({
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
            this.$router.push('/socialUserCenter/'+index)
          }

        });
      },
      // 判断登录用户身份是社交用户展示logo跳转到个人社交
      getSocialInfo(){
        api.querySocialByMember({
          accessToken:JSON.parse(localStorage.getItem("accessToken")),
          memberId:JSON.parse(localStorage.getItem("memberId"))
        }).then(({status, data = {}}) => {
          if(data.success==true){
            localStorage.setItem("mySocialId",data.data.socialInfo.socialId);
            this.nonePersonSocial=true  // 隐藏小风车
            this.noneImg=false,         // 无社交数据图片隐藏
              this.noneSocialList=true    // 展示社交数据
          }
          //不是社交用户，隐藏社交logo  隐藏社交数据。展位图替换
          else {
            this.nonePersonSocial=false;    // 隐藏小风车
            this.noneSocialList=false;      // 社交数据隐藏
            this.noneImg=true;              // 无数据图片显示
          }
        });
      },
      sendTiaojian(){
        this.socialShow=false;
        this.getSocialList()
      },
      //重置筛选
      resetSocial(){
        this.params.areaId='';
        this.params.beginAge='',
          this.params.endAge='',
          this.params.beginWeight='',
          this.params.endWeight='',
          this.params.beginHeight='',
          this.params.endHeight=''
        this.guigeSpan=-1;
        localStorage.setItem("saveFilter",'')
      },
      resetBtn(){
        this.resetSocial()
      },

      //滚动加载
    },
    created(){
      this.getSocialList()
      this. getAreaList()
      this.getSocialInfo()


    },

    mounted(){


    }
  }
</script>

<style scoped>
  .app{
    width: 100%;
    height:100%;
    position: relative;
    padding: 50px 0;
    box-sizing: border-box;
    background-color: black;
    overflow: hidden;
  }

  .header {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: white;
    position: fixed;
    z-index: 666;
    top: 0;
    left: 0;

  }
  .header a{
    color: #fff;
  }

  .footer {
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
    color: white;
    position: relative;
  }
  .footer a h1{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3px;
    font-size: 10px;
  }
  .footer a img{
    position: absolute;
    width: 30px;
    height: 30px;
    left: 50%;
    top: 0;
    transform: translate(-50%);
  }
  .tp-ione{
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #000;
    position: absolute;
    left: 0;
    top: 0;
  }
  .tp-ione img{
    width: 50px;
    height: 50px;
  }
  .tp-itwo{
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #000;
    position: absolute;
    right: 0;
    top: 0;
  }
  .tp-itwo img{
    width: 50px;
    height: 50px;
  }
  .container{
    width: 100%;
    height: 100%;
    overflow:scroll;
    margin-top: 10px;
    box-sizing: border-box;
    z-index: 1;


  }
  .container::-webkit-scrollbar {
    display: none;/*隐藏滚轮*/
  }
  .userinfo{
    width: 45%;
    /* height: 172px; */
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    border-radius:5%;
    box-sizing: border-box;




  }
  .userinfo:nth-child(2n+1){
    float: left;
    margin-left: 3.3%;
  }
  .userinfo:nth-child(2n){
    margin-right: 3.3%;
    float: right;
  }
  .userbox{
    width: 100%;
    height: 172px;
    position: relative;
    border-radius: 0px 0px 4px 4px;

  }
  .userbox img{
    width: 100%;
    height: 100%;
  }
  .userbox span{
    position: absolute;
    width: 40px;
    height: 18px;
    line-height: 18px;
    left: 0;
    top: 10px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #111111;
    border-radius: 0px 4px 4px 0px;
    opacity: 0.7;
  }
  .userinfo h1{
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: white;
    font-size: 14px;
    letter-spacing: 1px;

  }

  .personalCenter{
    color: white;
    width: 61px;
    height: 61px;
    line-height: 61px;
    border-radius: 50%;
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 999;
  }
  .personalCenter a{
    color: white;
  }
  .personalCenter a{
    width: 61px;
    height: 61px;
  }
  .personalCenter a img{
    width: 61px;
    height: 61px;
  }
  /* 筛选模态框 */
  .socialFilter{
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
  .socialFilter .socialContent{
    width: 70%;
    height: 100%;
    position: absolute;
    overflow: scroll;
    right: 0;
    top: 0;
    background-color: #000;
    padding: 0 10px;
    box-sizing: border-box;
    padding-bottom:42px;

  }

  /* 年龄区间 体重区间 身高区间 */
  .heightRange,
  .ageRange{
    width: 100%;
    margin-bottom: 30px;
    margin-top: 10px;
    box-sizing: border-box;
    border: 4px solid #0E0E0E;
    border-radius: 5px;
    color: #CCCCCC;
    position: relative;
  }
  .ageRange h1{
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .ageInputBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    border: 1px solid #272727;
    border-radius: 5px;
  }
  .ageInputBox span{
    height: 40px;
    font-size: 14px;
    line-height: 40px;
  }
  .ageInputBox span:nth-child(1){
    width: 70%;
  }
  .ageRangeSelect{
    width: 100%;
    position: absolute;
    z-index: 2;
    background-color: #000000;
    margin-top: -1px;
  }
  .selection{
    width: 100%;
    height: 40px;
  }
  .selection:hover{
    background-color: #111111;
  }
  .selection span.selectionCon{
    display: inline-block;
    width: 100%;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    color: #cccccc;
  }
  /* 省份区间 */

  .provinceRange{
    width: 100%;
  }
  .provinceRange h1{
    display: block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    color:#565656;
  }
  .provinceRange button{
    width: 30%;
    height: 40px;
    float: left;
    margin-top: 10px;
    margin-right: 3.3%;
    color: #ccc;
    background-color: #000;
    border: 1px solid rgb(170, 168, 168);
    position: relative;
    font-size: 13px;
    border-radius: 2px;
  }

  .provinceRange button:nth-child(3n+1) {
    margin-right: 0;
  }
  .confirmBtn{
    width: 70%;
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
    background-color: red;
  }
  .confirmBtn button{
    width: 50%;
    height: 40px;
    float: left;
    border: none;
    background-color: #ccc;
    color: #777;
  }
  .confirmBtn button:last-child{
    background-color: #EF2B3A;
    color: white;
  }

  .active{
    background-image: url(../../assets/social/addclass.png);
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: 103% -5%;
    border: 1px solid red!important;
    color:#ef2b3a!important;

  }

  /* 展位图 */
  .noneSocial{
    width: 200px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
  }
  .noneSocial img{
    width: 200px;
    height: 200px;
  }

  /* 定位单位 */
  .ageInputBox .one{
    position: absolute;
    left: 33%;
    color: rgb(204,204,204);
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  .ageInputBox .two{
    position: absolute;
    right: 2%;
    color: rgb(204,204,204);
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  .oneH{
    position: absolute;
    left: 33%;
    color: rgb(204,204,204);
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  .oneW{
    position: absolute;
    left: 33%;
    color: rgb(204,204,204);
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }






</style>
