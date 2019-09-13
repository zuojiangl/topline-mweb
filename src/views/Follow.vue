<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      title="关注/粉丝"
      left-arrow
      @click-left="$router.back()">

    </van-nav-bar>
    <van-tabs v-model="active" color="blue">
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
  },
  // keep-alive的钩子函数，当组件激活的时候执行
  activated () {
    const type = this.$route.query.type
    if (type === '1') {
      this.active = 0
    } else {
      this.active = 1
    }
  }
}
</script>

<style>

</style>
