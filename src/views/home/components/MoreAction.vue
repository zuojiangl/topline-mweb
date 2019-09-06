<template>
  <van-dialog
  v-model="show"
  title="标题"
  :show-confirm-button="false"
  close-on-click-overlay
>
hello
</van-dialog>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
