import request from '@/utils/request'

/**
 * 登录
 * @param {*} 登录提交服务器的数据mobile，code
 */
export const login = ({ mobile, code }) => {
  // console.log(mobile, code)
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

// 拉黑作者，作者id
export const blacklists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

// 关注用户
export const followUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    // 关注用户的id
    target: id
  })
}

// 取消关注用户
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}

// 获取当前登录用户信息
export const getUserInfo = () => {
  return request.get('/app/v1_0/user')
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}

// 上传图片
export const uploadPhoto = (key, file) => {
  // 请求头中的 Content-type，默认值application/x-www-form-urlencoded,告诉服务器发送过去的数据是key=value$key=value
  // 使用axios发送get请求，并且传递的参数是对象的时候，axios会自动把Content-type，改成application/json  发送的数据格式  JSON形式字符串
  // 在上传文件的时候，当调用xhr.send(formData) xhr会自动把Content-type改为multipart/form-data
  const formData = new FormData()
  formData.append(key, file)
  return request.patch('/app/v1_0/user/photo', formData)
}
