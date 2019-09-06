<template>
<!-- 不能使用v-model="value
value是通过props单向传递的
当dialog组件中input事件触发说明要去更改value"
@input="handleInput(i)-->
  <van-dialog
  :value="value"
  @input="$emit('input',$event)"
  :show-confirm-button="false"
  close-on-click-overlay
>
  <van-cell-group v-show="!showReports">
    <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')" />
    <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports= true"/>
    <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')" />
  </van-cell-group>
  <van-cell-group v-show="showReports">
    <van-cell icon="arrow-left" @click="showReports= false"/>
    <van-cell title="标题夸张"/>
    <van-cell title="低俗色情"/>
    <van-cell title="错别字多"/>
  </van-cell-group>
</van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
import { blacklists } from '@/api/user'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传递的文章对象
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // 控制举报组件显隐
      showReports: false
    }
  },
  methods: {
    handle (type) {
      switch (type) {
        case 'dislike':
          // 不感兴趣
          this.dislike()
          break
        case 'blacklist':
          // 拉黑作者
          this.blacklistUser()
          break
      }
    },
    // 拉黑作者
    async blacklistUser () {
      try {
        await blacklists(this.article.aut_id)
        // 通知父组件，拉黑成功
        // 隐藏对话框，删除数据
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 不感兴趣
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        // 隐藏，移除掉数据
        // 告知父组件，操作成功
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>

</style>
