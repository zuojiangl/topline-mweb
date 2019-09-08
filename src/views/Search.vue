<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="handleInput"
      clearable
      background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <!-- 只有v-html指令能够渲染标签，其他指令都不可以渲染标签 -->
    <van-cell-group v-show="value">
      <van-cell
       @click="onSearch(item)"
       v-for="(item,index) in suggestionList"
       :key="index"
       :title="item"
       icon="search">
       <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
      <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display: inline-block">
          <span @click="handleDeleteAll()">全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
        <van-icon v-show="!isEdit" @click="isEdit=true" name="delete" size="18px"></van-icon>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="(item,index) in histories"
        :title="item"
        :key="index"
        icon="search">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isEdit" @click="handleDelete(index)" name="close" size="18px"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion, getSearchHistories, deleteSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'

export default {
  data () {
    return {
      value: '',
      // 储存搜索建议
      suggestionList: [],
      // 编辑模式
      isEdit: false,
      // 历史记录
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async created () {
    // 加载历史记录
    if (this.user) {
      // 从服务器获取数据
      this.histories = await getSearchHistories() || []
      this.histories = this.histories.keywords
      return
    }
    // 没有登陆，从本地储存中获取数据
    this.histories = storageTools.getItem('history') || []
  },
  methods: {
    onSearch (item) {
      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
      // 判断histories中是否已经存在item
      if (this.histories.includes(item)) {
        return
      }
      // 记录搜索历史
      this.histories.push(item)
      // 判断用户是否登录
      if (this.user) {
        // 发送请求
        return
      }
      // 没有登陆，把历史记录储存到本地储存中
      storageTools.setItem('history', this.histories)
    },
    onCancel () {
      this.$router.push('/')
    },
    async handleInput () {
      // 判断是否为空
      if (this.value.length === 0) {
        return
      }
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    },
    // 点击历史记录的删除按钮
    handleDelete (index) {
      // 判断试否登录
      if (this.user) {
        this.$toast.fail('操作失败')
        return
      }
      this.histories.splice(index, 1)
      storageTools.setItem('history', this.histories)
    },
    async handleDeleteAll () {
      try {
        if (this.user) {
          this.histories = await deleteSearchHistories()
        }
      } catch (error) {
        console.log(error)
      }
      // 未登录清除历史记录
      this.histories = []
      storageTools.setItem('history', this.histories)
    },
    highlight (item) {
      // item是提示项目
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style="color:red">${this.value}</span>`)
    }
  }
}
</script>

<style>
</style>
