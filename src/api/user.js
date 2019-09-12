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
