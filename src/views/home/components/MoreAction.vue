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
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>

</style>
