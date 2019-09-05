<template>
  <div>
    <van-nav-bar title="首页" fixed></van-nav-bar>
    <van-tabs animated v-model="activeIndex">
      <!-- 频道列表 -->
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!-- 文章列表 -->
        <van-list
        v-model="currentChannel.loading"
        :finished="currentChannel.finished"
        finished-text="没有更多了"
        @load="onLoad">
          <van-cell
          v-for="article in currentChannel.articles"
          :key="article.art_id.toString()"
          :title="article.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'

export default {
  data () {
    return {
      // // 列表用的数据
      // list: [],
      // loading: false,
      // finished: false,
      // 频道列表
      channels: [],
      // tab是组件中默认显示的tab项的索引
      // 通过该index，可以找到当前的频道对象
      activeIndex: 0
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 加载频道列表
    async loadChannels () {
      try {
        const data = await getDefaultOrUserChannels()
        // 给所有的频道设置，时间戳和文章数组
        data.channels.forEach((channel) => {
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      const data = await getArticles({
        channel_id: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        with_top: 1
      })
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      // 加载状态结束
      // this.loading = false
      this.currentChannel.loading = false
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
  /deep/ .van-tab {
    width: 20px;
  }
}
</style>
