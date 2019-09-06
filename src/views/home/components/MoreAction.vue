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
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // 控制举报组件显隐
      showReports: false
    }
  }
}
</script>

<style>

</style>
