import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/global.css'

// import Nprogress from "nprogress"
// import 'nprogress/nprogress.css'

import axios from './utils/myaxios'
Vue.prototype.$http=axios

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
