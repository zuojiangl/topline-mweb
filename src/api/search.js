import request from '@/utils/request'

// 获取搜索建议
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 获取用户搜索历史
export const getSearchHistories = () => {
  return request.get('/app/v1_0/search/histories')
}

// 删除用户搜索历史
export const deleteSearchHistories = () => {
  return request.delete('/app/v1_0/search/histories')
}
