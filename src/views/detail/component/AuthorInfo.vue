<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | fmDate}}</p>
      </div>
    </div>
    <div>
      <van-button type="danger" :loading="loading" @click="handleFollow">
        {{article.is_followd ? '已' : ''}}关注
      </van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'

export default {
  name: 'AuthorInfo',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 点击按钮，关注或者取消关注作者
    async handleFollow () {
      this.loading = true
      // 判断是否登录
      try {
        // 判断是否已关注
        if (this.article.is_followd) {
          // 如果已经关注，取消关注
          await unFollowUser(this.article.aut_id)
          this.article.is_followd = false
        } else {
          // 如果未关注，就关注
          await followUser(this.article.aut_id)
          this.article.is_followd = TextTrackCue
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
}
</style>
