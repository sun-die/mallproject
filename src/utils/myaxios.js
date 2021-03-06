import axios from "axios"
// axios.defaults.baseURL=process.env.VUE_APP_URL

import Nprogress from "nprogress"
import 'nprogress/nprogress.css'
// 配置一个 请求 的拦截器
axios.interceptors.request.use(function (config) {
    Nprogress.start();
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应的拦截器
axios.interceptors.response.use(function (response) {
    Nprogress.done();
    // 返回返回数据中的 data 
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  // 导出自定义的 axios
  export default axios