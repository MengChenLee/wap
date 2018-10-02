<template>
<div class="inviteFriends">
  <div class="inviteFriendsHeader">
    <span class="backBtn">
      <router-link to="/my"><img src="../../assets/yaoqinghaoyou_fanhui_baise_100@2x.png" alt=""></router-link>
    </span>
    <span class="invitation headerRes">邀请好友</span>
    <span class="Scavenging" @click="showScavenging"><img src="../../assets/yaoqinghaoyou_saoma_baise_100@2x.png" alt="" style=""></span>
  </div>
  <div class="myInvitation">
    <h4>本周奖励(元)</h4>
    <h1>188.00</h1>
    <div class="myInvite">
      <span style="margin-right: 5px;">我的邀请码:</span>
      <span>{{inviteCode}}</span>
    </div>
    <div class="Total">
      <div class="weekTotal">
        <span>50</span>
        <span>本周邀请(人)</span>
      </div>
      <div class="accumulativeTotal">
        <span>100</span>
        <span>累计邀请(人)</span>
      </div>
      <div class="profitTotal">
        <span>1000.00</span>
        <span>累计收益(元)</span>
      </div>
    </div>
  </div>
  
  
  <div class="AUser User">
    <div class="classAUser classUser" @click="intoClassUser(1)">
      <span class="classA class">一级用户</span>
      <span class="into"><b class="num">345人</b><img src="../../assets/yaoqinghaoyou_xingqingjiantou_huise_60@2x.png" alt=""></span>
    </div>
    <div class="Displacement">
      <div class="RunnerUp">
        <span><img src="../../assets/forever.jpg" alt=""><img src="../../assets/yaoqinghaiyou_huangguan_yinse_50@2x.png" alt=""></span>
        <span>我</span>
        <span><i>￥</i>{{money02}}</span>
      </div>
      <div class="Champion">
        <span><img src="../../assets/eternal.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_jinse_50@2x.png" alt=""></span>
        <span>你</span>
        <span><i>￥</i>{{money01}}</span>
      </div>
      <div class="SeasonArmy">
        <span><img src="../../assets/Invariable.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_huangse_50@2x.png" alt=""></span>
        <span>他</span>
        <span><i>￥</i>{{money03}}</span>
      </div>
    </div>
    <div class="TotalProportion">
      <div class="proportion">
        <span>40%</span>
        <span>贡献比例</span>
      </div>
      <div class="SegmentingLine"></div>
      <div class="total">
        <span><i>￥</i>6888.00</span>
        <span>贡献总额</span>
      </div>
    </div>
  </div>
  
  
  <div class="BUser User">
    <div class="classBUser classUser" @click="intoClassUser(2)">
      <span class="classB class">二级用户</span>
      <span class="into"><b class="num">1246人</b><img src="../../assets/yaoqinghaoyou_xingqingjiantou_huise_60@2x.png" alt=""></span>
    </div>
    <div class="Displacement">
      <div class="RunnerUp">
        <span><img src="../../assets/forever.jpg" alt=""><img src="../../assets/yaoqinghaiyou_huangguan_yinse_50@2x.png" alt=""></span>
        <span>我</span>
        <span><i>￥</i>{{money02}}</span>
      </div>
      <div class="Champion">
        <span><img src="../../assets/eternal.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_jinse_50@2x.png" alt=""></span>
        <span>你</span>
        <span><i>￥</i>{{money01}}</span>
      </div>
      <div class="SeasonArmy">
        <span><img src="../../assets/Invariable.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_huangse_50@2x.png" alt=""></span>
        <span>他</span>
        <span><i>￥</i>{{money03}}</span>
      </div>
    </div>
    <div class="TotalProportion">
      <div class="proportion">
        <span>40%</span>
        <span>贡献比例</span>
      </div>
      <div class="SegmentingLine"></div>
      <div class="total">
        <span><i>￥</i>6888.00</span>
        <span>贡献总额</span>
      </div>
    </div>
  </div>
  
  
  <div class="CUser User">
    <div class="classCUser classUser" @click="intoClassUser(3)">
      <span class="classC class">三级用户</span>
      <span class="into"><b class="num">46人</b><img src="../../assets/yaoqinghaoyou_xingqingjiantou_huise_60@2x.png" alt=""></span>
    </div>
    <div class="Displacement">
      <div class="RunnerUp">
        <span><img src="../../assets/forever.jpg" alt=""><img src="../../assets/yaoqinghaiyou_huangguan_yinse_50@2x.png" alt=""></span>
        <span>我</span>
        <span><i>￥</i>{{money02}}</span>
      </div>
      <div class="Champion">
        <span><img src="../../assets/eternal.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_jinse_50@2x.png" alt=""></span>
        <span>你</span>
        <span><i>￥</i>{{money01}}</span>
      </div>
      <div class="SeasonArmy">
        <span><img src="../../assets/Invariable.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_huangse_50@2x.png" alt=""></span>
        <span>他</span>
        <span><i>￥</i>{{money03}}</span>
      </div>
    </div>
    <div class="TotalProportion">
      <div class="proportion">
        <span>40%</span>
        <span>贡献比例</span>
      </div>
      <div class="SegmentingLine"></div>
      <div class="total">
        <span><i>￥</i>6888.00</span>
        <span>贡献总额</span>
      </div>
    </div>
  </div>
  
  
  
  <div class="DUser User">
    <div class="classDUser classUser" @click="intoClassUser(4)">
      <span class="classD class">四级用户</span>
      <span class="into"><b class="num">146人</b><img src="../../assets/yaoqinghaoyou_xingqingjiantou_huise_60@2x.png" alt=""></span>
    </div>
    <div class="Displacement">
      <div class="RunnerUp">
        <span><img src="../../assets/forever.jpg" alt=""><img src="../../assets/yaoqinghaiyou_huangguan_yinse_50@2x.png" alt=""></span>
        <span>我</span>
        <span><i>￥</i>{{money02}}</span>
      </div>
      <div class="Champion">
        <span><img src="../../assets/eternal.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_jinse_50@2x.png" alt=""></span>
        <span>你</span>
        <span><i>￥</i>{{money01}}</span>
      </div>
      <div class="SeasonArmy">
        <span><img src="../../assets/Invariable.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_huangse_50@2x.png" alt=""></span>
        <span>他</span>
        <span><i>￥</i>{{money03}}</span>
      </div>
    </div>
    <div class="TotalProportion">
      <div class="proportion">
        <span>40%</span>
        <span>贡献比例</span>
      </div>
      <div class="SegmentingLine"></div>
      <div class="total">
        <span><i>￥</i>6888.00</span>
        <span>贡献总额</span>
      </div>
    </div>
  </div>
  
  
  <div class="EUser User">
    <div class="classEUser classUser" @click="intoClassUser(5)">
      <span class="classE class">五级用户</span>
      <span class="into"><b class="num">146人</b><img src="../../assets/yaoqinghaoyou_xingqingjiantou_huise_60@2x.png" alt=""></span>
    </div>
    <div class="Displacement">
      <div class="RunnerUp">
        <span><img src="../../assets/forever.jpg" alt=""><img src="../../assets/yaoqinghaiyou_huangguan_yinse_50@2x.png" alt=""></span>
        <span>我</span>
        <span><i>￥</i>{{money02}}</span>
      </div>
      <div class="Champion">
        <span><img src="../../assets/eternal.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_jinse_50@2x.png" alt=""></span>
        <span>你</span>
        <span><i>￥</i>{{money01}}</span>
      </div>
      <div class="SeasonArmy">
        <span><img src="../../assets/Invariable.jpg" alt=""><img src="../../assets/yaoqinghaoyou_huangguan_huangse_50@2x.png" alt=""></span>
        <span>他</span>
        <span><i>￥</i>{{money03}}</span>
      </div>
    </div>
    <div class="TotalProportion">
      <div class="proportion">
        <span>40%</span>
        <span>贡献比例</span>
      </div>
      <div class="SegmentingLine"></div>
      <div class="total">
        <span><i>￥</i>6888.00</span>
        <span>贡献总额</span>
      </div>
    </div>
  </div>
  
  
  <div class="QRCodeBoss">
    <div class="maskLayer"></div>
    <div class="QRCodeBox">
      <span>扫码邀请</span>
      <span class="QRCode"><img :src=getQRcode(this.QRcode) alt=""></span>
      <span>扫描二维码即可下载</span>
      <span>http://www.sdf.com/</span>
    </div>
    <div class="closeQR" @click="closeQR">
      <img src="../../assets/saomayaoqing_guanbi_baise_150@2x.png" alt="">
    </div>
  </div>
  
  
  <!--<div class="randomNumber" @click="clickObtain">
    <span class="randomNum" >{{code}}</span>
  </div>
  <div class="clickInvite">
    <span class="immediateInvitation" @click="">立即邀请</span>
  </div>-->
</div>
</template>

<script>
  //var num;
  import Api from '../../service/api.js';
  import {Toast} from 'mint-ui';
    export default {
      name: "inviteFriends",
      data() {
        return {
          show: false,
          inviteCode: '',
          money01:'6666.00',
          money02:'666.00',
          money03:'66.00',
          QRcode:''
        }
      },
      created(){
        this.clickShowFriends();
      },
      methods:{
        clickShowFriends(){
          Api.queryInviteList({
            memberId: localStorage.getItem('memberId'),
          }).then(({status, data = {}}) => {
            console.log(data);
            this.inviteCode=data.data.inviteCode;
          });
        },
        closeQR() {
          $(".QRCodeBoss").fadeOut(1000);
          // this.QRcode='';
        },
        showScavenging(){
          Api.getQRcode({
            memberId: localStorage.getItem('memberId'),
          }).then(({status, data = {}}) => {
            console.log(data);
            this.QRcode=data.data;
            // localStorage.setItem('QRcode', JSON.stringify(data.data));
            $(".QRCodeBoss").fadeIn(1000);
          });
        },
        intoClassUser(classId){
          if(classId===1){
            localStorage.setItem('ClassUser', JSON.stringify($('.classA').text()));
            localStorage.setItem('preson', JSON.stringify($('.classAUser .num').text()));
          }else if(classId===2){
            localStorage.setItem('ClassUser', JSON.stringify($('.classB').text()));
            localStorage.setItem('preson', JSON.stringify($('.classBUser .num').text()));
          }else if(classId===3){
            localStorage.setItem('ClassUser', JSON.stringify($('.classC').text()));
            localStorage.setItem('preson', JSON.stringify($('.classCUser .num').text()));
          }else if(classId===4){
            localStorage.setItem('ClassUser', JSON.stringify($('.classD').text()));
            localStorage.setItem('preson', JSON.stringify($('.classDUser .num').text()));
          }else{
            localStorage.setItem('ClassUser', JSON.stringify($('.classE').text()));
            localStorage.setItem('preson', JSON.stringify($('.classEUser .num').text()));
          }
          this.$router.push({path: '/inviteFriends/ClassUser/'+classId});
        },
        getQRcode(QRcode){
          return "data:image/png;base64,"+QRcode
        },
        clickObtain() {
         /* num='';
          var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          for(var i=0;i<4;i++){
            num+=Math.floor(Math.random()*10);
          }
          this.code=num.substr(num.length-4);*/

        }

      }
    }
</script>

<style scoped>
  @media screen and (min-width: 350px) {
    .myInvitation h4{
      padding-top: 3% !important;
    }
    .Total{
      padding: 3% 0 5% !important;
    }
  }
  @media screen and (min-width: 370px) {
    .myInvitation h4{
      padding-top: 5% !important;
    }
  
    .Total{
      padding: 4% 0 6% !important;
    }
  }
  @media screen and (min-width: 435px) {
    .myInvitation h4{
      padding-top: 5% !important;
    }
  
    .Total{
      padding: 5% 0 7% !important;
    }
  }
  @media screen and (min-width: 475px) {
    .myInvitation h4{
      padding-top: 7% !important;
    }
    .myInvitation h1{
      line-height: 40px !important;
    }
    .Total{
      padding: 6% 0 8% !important;
    }
  }
  @media screen and (min-width: 500px) {
    .myInvitation h4{
      padding : 6% 0 2%!important;
    }
    .myInvitation h1{
      line-height: 40px !important;
    }
    .Total{
      padding: 6% 0 10% !important;
    }
  }
  @media screen and (min-width: 645px) {
    .myInvitation h4{
      padding: 6% 0 2% !important;
    }
    .myInvitation h1{
      line-height: 50px !important;
    }
    .Total{
      padding: 8% 0 10% !important;
    }
  }
  .inviteFriendsHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #111;
    z-index: 10;
    text-align: center;
  }
  .inviteFriendsHeader .invitation{
    line-height: 70px;
  }
  .inviteFriendsHeader span img{
    position: absolute;
    top: 5px;
    width: 60px;
    height: 60px;
  }
  .Scavenging img{
    right: 5px;
  }
  .backBtn img{
    left: 5px;
  }
  .myInvitation{
    width: 94%;
    height: 100%;
    background-image: url('../../assets/yaoqinghaoyou_shujubeijing_baise_710x340@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 75px auto 2%;
    text-align: center;
  }
  .myInvitation h4{
    font-size: 16px;
    line-height: 30px;
    padding-top: 2%;
    color: #989898;
  }
  .myInvitation h1{
    font-size: 22px;
    line-height: 30px;
  }
  .myInvitation .myInvite span{
    font-size: 16px;
    line-height: 28px;
  }
  .myInvite span:nth-child(1){
    color: #666666;
  }
  .myInvite span:nth-child(2){
    color: #EE2E3D;
  }
  .Total{
    display: flex;
    flex-direction: row;
    padding: 2% 0 5%;
  }
  .Total div{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .Total div span{
    font-size: 14px;
    line-height: 24px;
  }
  .Total div span:nth-child(2){
    color: #666;
  }

  .classUser{
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .classUser span{
    line-height: 50px;
    font-size: 16px;
    color: #CECECE;
  }
  .class{
    margin-left: 15px;
  }
  .into img{
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-bottom: 3px;
  }
  .into b{
    font-weight: normal;
    color: #CECECE;
  }
  .Displacement{
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    margin-bottom: 10px;
  }
  .Displacement div{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    clear: both;
  }
  .Displacement div span:nth-child(1){
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .Displacement div span:nth-child(2){
    line-height: 20px;
    font-size: 14px;
    color: #ccc;
    margin-top: 100px;
  }
  .Displacement div span:nth-child(3){
    line-height: 28px;
    font-size: 14px;
    color: #ef2b3a;
  }
  .Displacement div span img:nth-child(2){
    position: absolute;
    top: -15px;
    width: 30px;
    height: 30px;
  }
  .Champion span:nth-child(1){
    top: 12.5px;
    border: 5px solid #FFC053;
  }
  .Champion span:nth-child(1),
  .Champion span:nth-child(1) img:nth-child(1){
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }
  .RunnerUp span:nth-child(1){
    top: 15px;
    border: 5px solid #dddddd;
  }
  .RunnerUp span:nth-child(1),
  .RunnerUp span:nth-child(1) img:nth-child(1){
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .SeasonArmy span:nth-child(1){
    top: 17.5px;
    border: 5px solid #E09542;
  }
  .SeasonArmy span:nth-child(1),
  .SeasonArmy span:nth-child(1) img:nth-child(1){
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  .Champion span img:nth-child(2){
    left: 45px;
  }
  .RunnerUp span img:nth-child(2){
    left: 42.5px;
  }
  .SeasonArmy span img:nth-child(2){
    left: 40px;
  }
  
  
  
  
  
  .TotalProportion{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    border-bottom: 1px dashed #393939;
  }
  .TotalProportion div{
    display: flex;
    flex-direction: column;
  }
  .proportion,
  .total{
    width: 50%;
    margin-bottom: 5px;
  }
  .TotalProportion div span{
    line-height: 24px;
    font-size: 14px;
    color: #CECECE;
  }
  .TotalProportion .SegmentingLine{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 0;
    height: 30px;
    border-left: 1px dashed #393939;
  }
  
  .QRCodeBoss{
    position: fixed;
    top: 0;
    right: 0;
    display: none;
    background: transparent;
  }
  .maskLayer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 201;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .QRCodeBox{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 320px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 202;
    background-image: url('../../assets/saomayaoqing_tankuang_750x600@2x.png');
    background-size: 100%;
    background-repeat: no-repeat;
    padding-bottom: 10px;
  }
  .QRCodeBox span{
    font-size: 1.2rem;
    line-height: 2.4rem;
    color: #CECECE;
  }
  .QRCodeBox span:nth-child(4){
    font-size: 0.8rem;
    line-height: 1.2rem;
  }
  .QRCodeBox span.QRCode img{
    margin-top: 15px;
    width: 130px;
    height: 130px;
  }
  .closeQR{
    position: fixed;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 202;
  }
  .closeQR img{
    width: 80px;
    height: 80px;
  }
 /* .randomNumber{
    width: 250px;
    height: 150px;
    border: 5px dashed #F2A02C;
    border-radius: 10px;
    margin: 30px auto;
    text-align: center;
  }
  .randomNumber .randomNum{
    font-size: 48px;
    line-height: 190px;
    color:#7A221F;
  }
  .clickInvite{
    width: 300px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #7A221F;
    border-radius: 22px;
    background-color: #F9B721;
    text-align: center;
    box-shadow: 0px 1px 1px #E0831E;
    margin: 0 auto;
  }
  .clickInvite .immediateInvitation{
  
  }*/
</style>
