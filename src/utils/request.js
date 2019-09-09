import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router'

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
}, async function (error) {
  // 判断状态码是否是401
  // console.dir(error)
  if (error.response.status === 401) {
    // 如果是401，使用refresh_token交换新的token
    const refreshToken = store.state.user.refresh_token

    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 新的2小时可用的token
      const token = response.data.data.token
      // 存储新的token
      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      // 重新发送上一次401的请求
      return request(error.config)
    } catch (err) {
      // console.log(err)
      // 跳转到首页
      // 如果refresh_token过期，跳转到登录页面
      router.push({
        path: '/',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(error)
})

export default request
