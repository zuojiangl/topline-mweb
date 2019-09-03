import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    try {
      // data数据可能不是标准的JSON格式 """字符串"""，否则会导致JSONbig.parse(data)转换失败报错
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }],
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})

// 获取到服务器返回的数据,处理数据之前
// transformRequest是在响应拦截器之前前执行
// request.defaults.transformRequest = [function (data) {
//   try {
//     // data数据可能不是标准的JSON格式字符串，否则会导致JSONbig.parse(data)转换失败报错
//     // return JSONbig.parse(data)
//     return data
//   } catch (err) {
//     return data
//   }
// }]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  // 判断是否是登录状态   此处是一个js文件，不是组件，要导入store
  if (store.state.user) {
    // 是登录状态的请求，自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // console.log(response)
  // 接口返回的数据中都有data统一返回接口中的data
  // 如果没有data返回axios响应对象的data属性
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default request
