import axios from 'axios'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 获取到服务器返回的数据,处理数据之前
// transformRequest是在响应拦截器之前前执行
request.defaults.transformRequest = [function (data) {
  try {
    // data数据可能不是标准的JSON格式字符串，否则会导致JSONbig.parse(data)转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  console.log(response)
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
