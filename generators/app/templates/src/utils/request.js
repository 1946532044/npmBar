
import axios from 'axios'
import { Message } from 'element-ui'
/* 允许跨域带session */
axios.defaults.withCredentials = true
const storage = window.sessionStorage

const Axios = axios.create({
  timeout: process.env.VUE_APP_TIMEOUT // request timeout
})
Axios.defaults.baseURL = process.env.VUE_APP_BASEURL

// 返回状态判断(添加响应拦截器)
Axios.interceptors.request.use(
  config => {
    if (config.url !== '/login' && storage.token) {
      config.headers.Authorization = storage.token
    }
    return config
  },
  error => {
    // 返回 response 里的错误信息
    // console.log(error.message)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => response,
  error => {
    console.log('err==>', error) // for debug
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 3 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default Axios
