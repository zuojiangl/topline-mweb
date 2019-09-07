<template>
  <van-popup
   v-model="show"
   position="bottom"
   :style="{ height: '80%' }">
    hello world
   </van-popup>
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
