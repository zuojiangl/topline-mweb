import request from '@/utils/request'

/**
 *
 * @param {*} 参数 channel_id， timestamp，with_top
 */
export const getArticles = ({
  // 频道的ID
  channelId,
  // 时间戳
  timestamp,
  // 是否置顶
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
