<template>
  <div>
    <van-nav-bar title="首页"></van-nav-bar>
    <van-tabs>
    <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
     内容 {{ index }}
    </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
