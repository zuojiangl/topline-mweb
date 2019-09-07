<template>
  <van-popup
   :value="value"
   @input="$emit('input',$event)"
   position="bottom"
   :style="{ height: '80%' }">
    hello world
   </van-popup>
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
    }
  }
}
</script>

<style>
</style>
