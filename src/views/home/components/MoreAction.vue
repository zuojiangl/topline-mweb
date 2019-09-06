<template>
  <van-dialog
  v-model="show"
  :show-confirm-button="false"
  close-on-click-overlay
>
  <van-cell-group v-show="!showReports">
    <van-cell title="不感兴趣" icon="location-o" />
    <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports= true"/>
    <van-cell title="拉黑作者" icon="location-o" />
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
export default {
  data () {
    return {
      show: true,
      // 控制举报组件显隐
      showReports: false
    }
  }
}
</script>

<style>

</style>
