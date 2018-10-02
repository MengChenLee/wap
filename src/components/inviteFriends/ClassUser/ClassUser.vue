<template>
    <div class="ClassUser">
      <div class="ClassUserHeader">
        <span class="backBtn">
          <router-link to="/inviteFriends"><img src="../../../assets/yaoqinghaoyou_fanhui_baise_100@2x.png" alt="" style=""></router-link>
        </span>
        <span class="invitation headerRes">{{User}}({{preson}})</span>
        <span class="Scavenging"></span>
      </div>
      
      
      
      <div class="ClassUserMain">
        <ul style="width: 96%;margin: 10px auto;">
          <li class="rankingList">
            <img src="../../../assets/eternal.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>你</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><img src="../../../assets/yijiyonghu_diyiming_jinse_80@2x.png" alt="" class="first rank"></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/forever.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>我</span>
              <span>贡献奖励:<i>4.00</i>元</span>
            </div>
            <i class="Number"><img src="../../../assets/yijiyonghu_dierming_yinse_80@2x.png" alt="" class="first rank"></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/Invariable.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>他</span>
              <span>贡献奖励:<i>3.00</i>元</span>
            </div>
            <i class="Number"><img src="../../../assets/yijiyonghu_disanming_huangse_80@2x.png" alt="" class="first rank"></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/eternal.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>你</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>4</span></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/forever.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>我</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>5</span></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/Invariable.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>他</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>6</span></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/eternal.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>你</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>7</span></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/forever.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>我</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>8</span></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/Invariable.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>他</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>9</span></i>
          </li>
          <li class="rankingList">
            <img src="../../../assets/Invariable.jpg" alt="" class="HeadPortrait">
            <div class="ranking">
              <span>他</span>
              <span>贡献奖励:<i>5.00</i>元</span>
            </div>
            <i class="Number"><span>10</span></i>
          </li>
        </ul>
      </div>
      
      
      
    </div>
</template>

<script>
  import Api from '../../../service/api.js';
  import {Toast} from 'mint-ui';
    export default {
      name: "ClassUser",
      data() {
        return {
          User: JSON.parse(localStorage.getItem('ClassUser')),
          preson: JSON.parse(localStorage.getItem('preson'))
        }
      },
      created(){
        this.getClassList()
      },
      methods: {
        getClassList(){
          Api.queryInviteList({
            memberId: localStorage.getItem('memberId'),
            inviteLevel:1,
            invitePage:1
          }).then(({status, data = {}}) => {
            console.log(data);
          });
        },
      }
    }
</script>

<style scoped>
  .ClassUserHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #111;
    z-index: 10;
    text-align: center;
  }
  .ClassUserHeader .invitation{
    line-height: 70px;
  }
  .ClassUserHeader span img{
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
  
  
  .ClassUserMain{
    margin-top: 75px;
  }
  .ClassUserMain li{
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-shadow: inset 0 -1px 0 0 #545454;
  }
  .ClassUserMain li:nth-child(1){
    padding-top: 0;
  }
  .rankingList .HeadPortrait{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #CFCFCF;
    margin-right: 15px;
    position: relative;
  }
  .rankingList .Number{
    position: absolute;
    right: 15px;
  }
  .rankingList .Number span,
  .rankingList .Number img{
    width: 60px;
    height: 60px;
  }
  .rankingList .Number span{
    display: inline-block;
    font-size: 16px;
    line-height: 60px;
    color: #989898;
    text-align: center;
  }
  .rankingList .ranking{
    display: flex;
    flex-direction: column;
  }
  .ranking span{
    font-size: 15px;
    line-height: 30px;
    color: #ffffff;
  }
  .ranking span:nth-child(2){
    color: #cccccc;
  }
</style>
