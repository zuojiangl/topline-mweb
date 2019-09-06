<template>
  <div>
    <van-nav-bar title="首页" fixed></van-nav-bar>
    <van-tabs animated v-model="activeIndex">
      <!-- 频道列表 -->
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!-- 下拉加载更多组件 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 文章列表,不同的标签页下有不同的列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <div slot="label">
                <!-- grid显示封面 article.cover.type   0 没有图片   1 1个图片 3 3个图片-->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(img,index) in article.cover.images" :key="img+index">
                    <van-image lazy-load height="80px" :src="img" />
                    <!-- 图片加载的提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20"></van-loading>
                      </template>
                      <!-- 自定义加载失败 -->
                      <template v-slot:error>加载失败</template>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{article.aut_name}}</span>&nbsp;
                  <span>{{article.comm_count}}评论</span>&nbsp;
                  <span>{{article.pubdate | fmDate}}</span>&nbsp;
                  <!-- 点击X，记录当前文章对象 -->
                  <van-icon name="cross" class="close" @click="handleAction(article)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层组件 -->
    <!-- v-model等价于
    v-bind:value="showMoreAction"
    v-on:input="showMoreAction = $event" -->
    <!-- 如果article的值为null 不显示more-action -->
    <more-action v-if="currentArticle" :article="currentArticle" v-model="showMoreAction"></more-action>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import Vue from 'vue'
import { Lazyload } from 'vant'
import MoreAction from './components/MoreAction'

Vue.use(Lazyload)
export default {
  components: {
    MoreAction
  },
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
      activeIndex: 0,
      // 下拉更新完成之后，成功的提示
      successText: '',
      showMoreAction: false,
      // 点击X的时候记录的文章对象
      currentArticle: null
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
        data.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          // 上拉加载
          channel.loading = false
          channel.finished = false
          // 下拉加载
          channel.pullLoading = false
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
    },
    // 下拉加载更多
    async onRefresh () {
      try {
        const data = await getArticles({
          channel_id: this.currentChannel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        this.currentChannel.pullLoading = false
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加载了${data.results.length}条数据`
      } catch (err) {
        console.log(err)
      }
    },
    // 点击X按钮弹出MoreAction，记录当前文章对象
    handleAction (article) {
      this.showMoreAction = true
      this.currentArticle = article
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
    right: 0px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
</style>
