import request from '@/utils/request'

/**
 * 获取频道列表
 * 1.用户登录，获取登录用户保存的频道列表
 * 2.没有登陆，获取默认的频道列表
 */
export const getDefaultOrUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}

// 获取全部频道
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
