import Vue from 'vue'
import Router from 'vue-router'
import My from '@/components/my'

// 首页
import webIndex from '@/components/webIndex/webIndex'

// 二级路由  我的账户
import Myaccount from '@/components/user/Myaccount/Myaccount'

// 二级路由  充值页面
import Recharge from '@/components/user/Recharge/Recharge'


import Companys from '@/components/user/Companys'

//三级路由 在线充值
import onlines from '@/components/user/onlines'
import MyAttention from '@/components/user/MyAttention/MyAttention'

// 二级路由  我的收藏页面
// import MyCollection from '@/components/user/MyCollection/MyCollection'

// 二级路由  我的动态页面
import MyDynamics from '@/components/user/MyDynamics/MyDynamics'

// 三级路由  基本信息页面
import Information from '@/components/user/MyDynamics/Information/Information'

//提现部分
import putMoneyIndex from '@/components/user/PutMoney/putMoneyIndex'

//提现  空
import putMoneyEmpty from '@/components/user/PutMoney/putMoneyEmpty'

//提现 新增
import putMoneyAdd from '@/components/user/PutMoney/putMoneyAdd'

//提现 编辑
import putMoneyEdit from '@/components/user/PutMoney/putMoneyEdit'

//提现  确定

import putMoneyDet from '@/components/user/PutMoney/putMoneyDet'






// 银联支付的 过度页面
import payexcessive from '@/components/user/payexcessive'


// 三级路由  详情页面
import Details from '@/components/user/Recharge/Details/Details'



// 登录
import login from '@/components/login/login'

// 忘记密码
import forgetPassword from '@/components/forgetPassword/forgetPassword'

// 忘记密码(默认)
import ForgotPassword from '@/components/forgetPassword/ForgotPassword/ForgotPassword'

// 注册
import register from '@/components/register/register'

// 设置
import setUp from '@/components/setUp/setUp'

// 设置中个人信息
import personalData from '@/components/personalData/personalData'

// 设置中修改手机号
import ChangePhone from '@/components/ChangePhone/ChangePhone'

// 设置中修改密码
import ChangePassword from '@/components/ChangePassword/ChangePassword'

// 我的会员（无会员）
import NotOpenVIP from '@/components/myVip/NotOpenVIP/NotOpenVIP'

// 我的会员（VIP会员）
import opennedVIP from '@/components/myVip/opennedVIP/opennedVIP'

// 用户协议
import userAgreement from '@/components/userAgreement/userAgreement'

// 邀请好友页面
import inviteFriends from '@/components/inviteFriends/inviteFriends'
import ClassUser from '@/components/inviteFriends/ClassUser/ClassUser'

//社交模块
import socialIndex from '@/components/social/social-index'
import socialFilter from '@/components/social/social-filter'
import socialUserCenter from '@/components/social/social-user-center'
import socialDynamicCenter from '@/components/social/social-dynamicCenter'
import selectPaidContent from '@/components/social/social-selectPaidContent'
// import selectPaidContentError from '@/components/social/social-selectPaidContentError'
import socialDynamic from '@/components/social/social-addDynamic'
import socialmyCenter from '@/components/social/social-myCenter'
import socialEditCenter from '@/components/social/social-editCenter'
//消息模块
import noticeIndex from '@/components/noticeMessage/notice-index'
import noticeSysterm from '@/components/noticeMessage/notice-systerm'
import noticeOnlineService from '@/components/noticeMessage/notice-onlineService'
import noticeOnlineUser from '@/components/noticeMessage/notice-onlineUser'

//游戏模块
import gameIndex from '@/components/games/game-index'
import gameInfo from '@/components/games/game-info'

//在线咨询模块
import onlineConsultingIndex from '@/components/onlineConsulting/online-index'
import onlineSelfSearch from '@/components/onlineConsulting/online-selfSearch'
import onlineQuestionInfo from '@/components/onlineConsulting/online-questionInfo'
//三级路由 公司入账
// import Company from '@/components/user/Extract/Company/Company'


// //二级路由 实名认证页面
import authentication from '@/components/user/authentication'
// NotLogging  未登录页面
import NotLogging from '@/components/NotLogging'
Vue.use(Router);


export default new Router({
  //mode:'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    
    {
      path: '/notlogging',
      name: 'notlogging',
      component: NotLogging
    },
    {
      path: '/',
      name: 'webIndex',
      component: webIndex
    },{
      /** 登录 **/
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresAuth: true
      }
    },{
      /** 忘记密码 **/
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword,
      children: [  //这里就是二级路由的配置
        {
          path: '/forgetPassword/ForgotPassword',
          name: 'ForgotPassword',
          component: ForgotPassword
        }
      ]
    },{
      /** 注册 **/
      path: '/register',
      name: 'register',
      component: register,
    
    },{
      /** 用户协议 **/
      path: '/userAgreement',
      name: 'userAgreement',
      component: userAgreement
    }, {
      /** 我的 **/
      path:'/my',
      name:'my',
      component: My
    },{
      /** 设置 **/
      path: '/setUp',
      name: 'setUp',
      component: setUp
    },{
      /** 设置中个人信息 **/
      path: '/setUp/personalData',
      name: 'personalData',
      component: personalData
    },{
      /** 设置中修改手机号 **/
      path: '/setUp/ChangePhone',
      name: 'ChangePhone',
      component: ChangePhone
    },{
      /** 设置中修改密码 **/
      path: '/setUp/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    // 我的账户（二级路由）
    {
      path:'/myaccount',
      name:'myaccount',
      component:Myaccount
    },
    // 二级路由  充值页面
    {
      path:'/recharge',
      name:'recharge',
      component:Recharge
    },
  
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },



    {
      path: '/payexcessive',
      name: 'payexcessive',
      component: payexcessive
    },


//提现部分 


{
  path: '/putMoneyIndex',
  name: 'putMoneyIndex',
  component: putMoneyIndex
},

{
  path: '/putMoneyEmpty',
  name: 'putMoneyEmpty',
  component: putMoneyEmpty
},
{
  path: '/putMoneyAdd',
  name: 'putMoneyAdd',
  component: putMoneyAdd
},
{
  path: '/putMoneyEdit',
  name: 'putMoneyEdit',
  component: putMoneyEdit
},
{
  path: '/putMoneyDet',
  name: 'putMoneyDet',
  component: putMoneyDet
},


 
    // 三级路由 在线充值页面

    {
      path:'/onlines',
      name:'onlines',
      component:onlines
    },
    // 二级级路由 我的关注
    {
      path:'/myattention',
      name:'myattention',
      component:MyAttention
    },
    // 二级级路由 我的收藏
    // {
    //   path:'/mycollection',
    //   name:'mycollection',
    //   component:MyCollection
    // },
    // 二级级路由 我的动态
    {
      path:'/mydynamics',
      name:'mydynamics',
      component:MyDynamics
    },
    // 三级路由 基本信息
    {
      path:'/information',
      name:'information',
      component:Information
    },
    // 三级路由 详情页
    {
      path:'/details',
      name:'details',
      component:Details
    },{
      /** 我的会员（无会员）**/
      path: '/myVip/NotOpenVIP',
      name: 'NotOpenVIP',
      component: NotOpenVIP
    },{
      /** 我的会员（VIP会员）**/
      path: '/myVip/opennedVIP',
      name: 'opennedVIP',
      component: opennedVIP
    },{
      /** 邀请好友页面 **/
      path: '/inviteFriends',
      name: 'inviteFriends',
      component: inviteFriends
    },{
      /** 邀请好友等级用户页面 **/
      path: '/inviteFriends/ClassUser/:classId',
      name: 'ClassUser',
      component: ClassUser
    },
    {
      path: '/companys',
      name: 'companys',
      component: Companys
    },
  
    //社交页面
    {
      path: '/socialIndex',
      name: 'social-index',
      component: socialIndex
    },
    {
      path: '/socialFilter',
      name: 'social-filter',
      component: socialFilter
    },
    {
      path: '/socialUserCenter/:id',
      name: 'social-user-center',
      component: socialUserCenter
    },
    {
      path: '/socialDynamicCenter/:id',
      name: 'social-dynamicCenter',
      component: socialDynamicCenter
    },
    {
      path: '/selectPaidContent',
      name: 'social-selectPaidContent',
      component: selectPaidContent
    },
    /*{
      path: '/selectPaidContentError',
      name: 'social-selectPaidContentError',
      component: selectPaidContentError
    },*/
    {
      path: '/socialAddDynamic',
      name: 'social-addDynamic',
      component: socialDynamic
    },
    {
      path: '/socialmyCenter',
      name: 'social-myCenter',
      component: socialmyCenter
    },
    {
      path: '/socialEditCenter',
      name: 'social-editCenter',
      component: socialEditCenter
    },
  
    //消息页面
    {
      path: '/noticeIndex',
      name: 'noticeIndex',
      component: noticeIndex
    },
    {
      path: '/noticeSysterm',
      name: 'notice-systerm',
      component: noticeSysterm
    },
    {
      path: '/noticeOnlineService',
      name: 'notice-onlineService',
      component: noticeOnlineService
    },
    {
      path: '/noticeOnlineUser',
      name: 'notice-onlineUser',
      component: noticeOnlineUser
    },
    {
      path: '/onlineQuestionInfo/:qaId',
      name: 'notice-questionInfo',
      component: onlineQuestionInfo
    },
    //游戏页面
    {
      path: '/gameIndex',
      name: 'game-index',
      component: gameIndex
    },
    {
      path: '/gameInfo/:id',
      name: 'game-info',
      component: gameInfo
    },
    //在线咨询板块
    {
      path: '/onlineConsultingIndex',
      name: 'onlineConsulting-index',
      component: onlineConsultingIndex
    },
    {
      path: '/onlineSelfSearch',
      name: 'online-selfSearch',
      component: onlineSelfSearch
    }
  ]
});
