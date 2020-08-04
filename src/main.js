import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//完整引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
// 全局配置element-ui
// Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app');

