<template>
  <div>
    <van-nav-bar left-text="首页" fixed>
      <van-search @click="$router.push('search')" slot="title" placeholder="请输入搜索关键词"/>
      <van-icon name="search" slot="right" @click="$router.push('search')"/>
    </van-nav-bar>
    <van-tabs animated v-model="activeIndex">
      <!-- 小按钮，点击弹出频道管理的弹出层 -->
      <van-icon slot="nav-right" name="wap-nav" class="nav-btn" @click="showChannelEdit=true"/>
      <!-- 频道列表 -->
      <van-tab type="line" v-for="channel in channels" :key="channel.id" :title="channel.name">
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
    <more-action
      v-if="currentArticle"
      @handleSuccess="handleSuccess"
      :article="currentArticle"
      v-model="showMoreAction">
    </more-action>
    <channel-edit
      @activeChange="handleChange"
      :active="activeIndex"
      :channels="channels"
      v-model="showChannelEdit">
    </channel-edit>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import { getItem, setItem } from '@/utils/localStorage'
import Vue from 'vue'
import { Lazyload } from 'vant'
import MoreAction from './components/MoreAction'
// 导入频道管理的组件
import ChannelEdit from './components/ChannelEdit'

Vue.use(Lazyload)
export default {
  components: {
    MoreAction,
    ChannelEdit
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
      currentArticle: null,
      // 控制频道管理的显隐
      showChannelEdit: false
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
        let channels = []
        // 1.如果用户登录，发送请求，获取数据
        if (this.$store.state.user) {
          const data = await getDefaultOrUserChannels()
          channels = data.channels
        } else {
          //  2.如果用户没有登陆，先去本地储存中户取数据，如果没有再去发送请求
          // 如果本地储存中没有，获取的是null
          channels = getItem('channels')
          if (!channels) {
            const data = await getDefaultOrUserChannels()
            channels = data.channels
            // 储存到本地储存中
            setItem('channels', channels)
          }
        }
        // 给所有的频道设置，时间戳和文章数组
        channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          // 上拉加载
          channel.loading = false
          channel.finished = false
          // 下拉加载
          channel.pullLoading = false
        })
        this.channels = channels
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
    },
    // more-action中操作成功执行的方法
    handleSuccess () {
      // 隐藏
      this.showMoreAction = false
      // 去掉当前文章数据
      // this.currentArticle
      // 找到当前文章在数组中的索引
      // findIndex()查找第一个满足条件的元素索引
      const articles = this.currentChannel.articles
      const index = articles.findIndex((article) => {
        return article.art_id === this.currentArticle.art_id
      })
      articles.splice(index, 1)
    },
    handleChange (index) {
      this.activeIndex = index
      this.showChannelEdit = false
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
.nav-btn {
  position: fixed;
  right: 10px;
  line-height: 44px;
  background-color: #fff;
  opacity: 0.8;
  font-size: 22px;
}
.van-search {
  margin-top: 8px;
  height: 30px;
  border-radius: 20px;
  .van-search__content {
    background-color: #fff;
    height: 30px;
  }
}
.van-nav-bar__right {
  i {
    color: #fff;
    font-size: 20px;
  }
}
</style>
