<template>
  <div id="userAgreement" style="width: 100%;height: 100%;background-color: #111111;">
    <div class="userAgreement">
      <div class="userAgreementHeader publicFlex">
        <span class="backBtn">
          <!--<a  href="javascript:;" @click="clickRegister(id)"><img src="../../assets/nav_button_back.png" alt=""></a>-->
          <router-link to="/register"><img src="../../assets/nav_button_back@2x.png" alt=""></router-link>
        </span>
        <span class="headerRes">用户协议</span>
        <span class="flexClear"></span>
      </div>
      <div class="userAgreementMain">
        <div class="content">
          <h4>一、总则</h4>
          <p class="textSegment">1.1 XXX的所有权和运营权归XXXXXXXX有限公司所有。</p>
          <p class="textSegment">1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与公司之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。
          </p>
          <p class="textSegment">1.3 本协议则可由公司随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。</p>
        </div>
        <div class="content">
          <h4>二、服务内容</h4>
          <p class="textSegment">2.1 公司的具体内容由本站根据实际情况提供。</p>
          <p class="textSegment">2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。
          </p>
        </div>
        <div class="content">
          <h4>三、用户帐号</h4>
          <p class="textSegment">3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。保宝网有权对会员的权限设计进行变更。
          </p>
          <p class="textSegment">3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。
          </p>
        </div>
      </div>
      <div class="readingCompletion HomemadeButton">
        <router-link to="/register">阅读完成</router-link>
        <!--<a  href="javascript:;" @click="clickRegister(id)"></a>-->
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'userAgreement',
      data () {
        return {
          id: []
        }
      },
      methods: {
       /* clickRegister (id) {
          // 取到路由带过来的参数
          var routerParams = this.$route.params.id;
          // 将数据放在当前组件的数据内
          this.id.push(routerParams);
          this.$router.push({
            path:'/register',
            name:'register',
            params:{
              id:id
            }
          })
          console.log(this.id);
        }*/
      },
      watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
      }
    }
</script>

<style>
  .userAgreementHeader{
    box-shadow: inset 0 -0.5px 0 0 #545454;
  }
  .userAgreementMain{
    margin: 20px;
  }
  .content{
    color: #CCCCCC;
  }
  .content h4{
    font-size: 16px;
    line-height: 25px;
  }
  .content p{
    font-size: 12px;
    line-height: 16px;
  }
  .readingCompletion{
    width: 90%;
    height: 45px;
    text-align: center;
    margin: 50px auto;
  }
  .readingCompletion a{
    display: block;
    line-height: 45px;
    font-size: 20px;
    color: #ffffff;
  }
</style>
