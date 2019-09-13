<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      title="关注/粉丝"
      left-arrow
      @click-left="$router.back()">

    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="关注"></van-tab>
      <van-tab title="粉丝"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Follow',
  data () {
    return {
      active: 1
    }
  }
}
</script>

<style>

</style>
