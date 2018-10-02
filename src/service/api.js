/**
* @author wangzi
*
* @date 2018/8/22 下午2:18
* @description
*/
import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import store from './store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
 axios.defaults.baseURL="http://47.99.116.134:8080/jtx-wap";
 axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

// axios拦截
axios.interceptors.response.use(function (res) {
   if (res.data.success ==true){
     return res;
   }else if(!res.data.hasOwnProperty('msg')){
     return res;
   }else if(res.data.msg.code==150001){
     Vue.prototype.$message.error('您还没有登录');
     localStorage.clear();
     return setTimeout(()=>{
       router.push({path:'/login'});
     },1000)
   }else{
     return res;
   }
 }, function (error) {
  Vue.prototype.$message.error({message: '服务器开了小差，请联系管理员',});
   //对请求错误做些什么
   return Promise.reject(error);
 })

export default {
// --------------------------------------------------------------------------------//
//登录接口
  login:(params)=>axios.post('/member/visit/login',params),
//创建用户接口
  register:(params)=>axios.post('/member/visit/register',params),
//修改用户信息接口
updateUser:(params)=>axios.post('/member/center/updateDetail',params),
//查询用户信息接口
searchUserInfo:(params)=>axios.post('/member/center/queryDetail',params),
//检查手机号是否被注册
checkMobile :(params)=>axios.post('/member/visit/checkMobile',params),
//检查昵称是否重复
checkNickname:(params)=>axios.post('/member/visit/checkNickname',params),
//校验短信验证码
checkVerifyCode:(params)=>axios.post('/member/visit/checkVerifyCode',params),
//发送短信验证码
sendMessage:(params)=>axios.post('/member/visit/sendMessage',params),
//登出接口
logout:(params)=>axios.post('member/visit/logout',params),
//找回密码
updatePassword:(params)=>axios.post('/member/visit/updatePassword',params),
// 判断是否登录
isLogin:(params)=>axios.post('/member/visit/isLogin',params),

// -------------------------------------------------------------------------------//

// 获取省一级的区域信息
queryAreaList:(params)=>axios.post('/soc/queryAreaList',params),
// 获取社交用户的列表信息
querySocialList:(params)=>axios.post('/soc/querySocialList',params),
// 获取社交用户的详情信息
querySocialDetail:(params)=>axios.post('/soc/querySocialDetail',params),

// 获取社交用户的动态信息
queryDynamicInfo:(params)=>axios.post('/soc/queryDynamicInfo',params),
// 当动态信息被查询时，新增动态浏览记录，如果登录用户是本人不计入统计
addBrowseRecord:(params)=>axios.post('/soc/addBrowseRecord',params),
// 动态收藏
collectUser:(params)=>axios.post('/soc/updateSocialKeep',params),
// 更新社交用户个人资料
updateSocialInfo:(params)=>axios.post('/soc/updateSocialInfo',params),
// 新增社交用户动态信息
addDynamicInfo:(params)=>axios.post('/soc/addDynamicInfo',params),
// 查询登录用户的社交信息
querySocialByMember:(params)=>axios.post('/soc/querySocialByMember',params),

// 购买付费动态的查看权利
byDynamicInfo:(params)=>axios.post('/soc/addOrderByDynamicInfo',params),
//--------------------------------------------------------------------------------//

//公司入账接口
addRecharge:(params)=>axios.post('/artificialPay/addRecharge',params),
// 支付交易模块
// 充值金额到我的账户
RechargeAmount :(params)=>axios.post('/alipay/addRecharge',params),

// 支付 银联支付
addUnionPay:(params)=>axios.post('unionpay/addUnionPay',params),

//实名认证
addidentity:(params)=>axios.post('/sys/addidentity',params),
//获取实名认证信息接口
getidauthinfo:(params)=>axios.post('/sys/getidauthinfo',params),

//人工提现功能
addWithdraw:(params)=>axios.post('/artificialPay/addWithdraw',params),

// 提现部分账户
queryAccountByMember:(params)=>axios.post('/member/account/queryAccountByMember',params),

addAccountByMember:(params)=>axios.post('/member/account/addAccountByMember',params),

updateAccountByMember:(params)=>axios.post('/member/account/updateAccountByMember',params),

// 查询充值信息
queryRechargeInfo:(params)=>axios.post('/alipay/queryRechargeInfo',params),
//查询当前登录用户的账单明细
queryOrderDetailByMember:(params)=>axios.post('/member/account/queryOrderDetailByMember',params),
//--------------------------------------------------------------------------------//

// 创建云信账号接口
  createimuser:(params)=>axios.post('/msg/createimuser',params),
// 获取当前用户云信帐号接口
  getimuser:(params)=>axios.post('/msg/getimuser',params),
// 获取社交用户云信帐号接口
  getsocialimuser:(params)=>axios.post('/msg/getsocialimuser',params),
  


//客服系统模块
queryAdvisoryServiceInfo:(params)=>axios.post('/sys/queryAdvisoryServiceInfo',params),
//根据问题类型查询常见
queryQuestionAnswerByType:(params)=>axios.post('/sys/queryQuestionAnswerByType',params),
//我的关注模块
getMyKeep:(params)=>axios.post('member/social/querySocialKeep',params),


//--------------------------------------------------------------------------------//
// 首页
  gethomeall:(params)=>axios.post('/home/gethomeall',params),
  //addbulletinreadflag:()=>axios.post('/home/addbulletinreadflag?boardId=11&memberId=1744'),

  //七牛云获取token
  getToken:()=>axios.post('/member/qiniu/gettoken?name=product'),
  
  //--------------------------------------------------------------------------------//
// 邀请好友列表
  queryInviteList:(params)=>axios.post('/invite/queryInviteList',params),
// 邀请好友二维码
  getQRcode:(params)=>axios.post('/invite/getQRcode',params),
  
  
  //--------------------------------------------------------------------------------//
  // 游戏详情
  getGameDetailInfo:(params)=>axios.post('/gam/game/getGameDetailInfo',params),
  
}




