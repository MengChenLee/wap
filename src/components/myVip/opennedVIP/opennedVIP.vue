<template>
    <div id="opennedVIP">
        <div class="opennedVIP">
          <div class="opennedVIPHeader publicFlex">
            <span class="backBtn"><router-link to="/my"><img src="../../../assets/nav_button_back@2x.png" alt=""></router-link></span>
            <span class="opennedVip headerRes">我的会员</span>
            <span class="flexClear"></span>
          </div>
          <div class="VipICode"><img src="./openned_vip.png" alt=""></div>
          <div class="opennedVIPMain">
            <div class="VipTitle">
              <img src="../../../assets/vip_icon_left.png" alt="">
              <span class="title">会员特权</span>
              <img src="../../../assets/vip_icon_right.png" alt="">
            </div>
            <div class="VipPrivilege">
              <ul>
                <li class="privilegeList" v-for="item in itemList">
                  <img :src= "item.src"  alt="">
                  <span class="privilege">{{item.text}}</span>
                </li>
              </ul>
            </div>
            <div class="VipTitle nextVipTitle">
              <img src="../../../assets/vip_icon_left.png" alt="">
              <span class="title">下级会员特权</span>
              <img src="../../../assets/vip_icon_right.png" alt="">
            </div>
            <div class="VipPrivilege">
              <ul>
                <li class="privilegeList" v-for="item in itemList">
                  <img :src= "item.src"  alt="">
                  <span class="privilege">{{item.text}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="OpeningVip"><router-link to="/">开通会员</router-link></div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "opennedVIP",
      data() {
        return {
          itemList:[
            {
              'src': require('../../../assets/vip_privilege@26.png'),
              'text': '特权1'
            },{
              'src': require('../../../assets/vip_privilege@26.png'),
              'text': '特权1'
            },{
              'src': require('../../../assets/vip_privilege@26.png'),
              'text': '特权1'
            },{
              'src': require('../../../assets/vip_privilege@26.png'),
              'text': '特权1'
            },{
              'src': require('../../../assets/vip_privilege@26.png'),
              'text': '特权1'
            },{
              'src': require('../../../assets/vip_privilege@26.png'),
              'text': '特权1'
            }
          ]
        };
      },
      /*mounted(){
          this.$nextTick(() => {
            const scroll = new BScroll('.bscroll')
          })
        },*/
      methods: {
      
      }
    }
</script>

<style scoped>
  .opennedVIPHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
    overflow: hidden;
  }
  .VipICode{
    width: 336px;
    margin: 5% auto 4%;
  }
  .VipTitle{
    width: 33%;
    display: flex;
    justify-content: space-between;
    font-size: 0.838rem;
    color: #EBEBEB;
    margin: 6% auto;
    overflow: hidden;
  }
  .VipTitle.nextVipTitle{
    width: 42%;
  }
  .VipTitle img{
    width: 16px;
    height: 16px;
    margin: 0 5px;
  }
  .VipPrivilege{

  }
  .VipPrivilege ul{
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .privilegeList img{
    width: 26px;
    height: 26px;
    margin: 5px;
  }
  .privilegeList{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
    color: #ebebeb;
    align-items: center;
    margin: 8px 0;
    overflow: hidden;
  }
  .privilegeList span{
    font-size: 13px;
    line-height: 24px;
    font-weight: 200;
  }
  .OpeningVip{
    width: 350px;
    height: 44px;
    border: 1px solid #DFCB80;
    border-radius: 2px;
    background-color: #DFCB80;
    margin: 7% auto 4%;
  }
  .OpeningVip a{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 44px;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
</style>
