import request from '@/utils/request'

// 获取评论列表
export const getComments = ({
  // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
  isArticle,
  // 源id，文章id或评论id
  source,
  // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
  offset,
  //  获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    params: {
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

// 发布评论
// 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
// target,
// 评论内容
// content,
// 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
// art_id
export const sendComment = ({
  target,
  content,
  artId
}) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id: artId
  })
}
