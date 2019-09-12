<template>
  <van-dialog
  :value="value"
  @input="$emit('input',$event)"
  :show-confirm-button="false"
  close-on-click-overlay
  >
    <van-cell-group>
      <van-cell title="从相册选择图片"></van-cell>
      <van-cell title="拍照"></van-cell>
      <van-cell title="取消" @click="$emit('input',false)"></van-cell>
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  name: 'UploadFile',
  props: ['value'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
