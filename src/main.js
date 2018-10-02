// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
//引入mint-ui组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'




import './service/api.js'

import "./service/cookie.js"

//引入页面样式重置
import '../static/css/reset.css'
//引入animate.css
import '../static/css/animate.css';
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
//引入vuex
import store from './service/store'
Vue.prototype.$axios = axios;
Vue.use(MintUI);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
