<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <van-cell icon="cross" @click="$emit('input',false)"></van-cell>
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <van-grid>
        <van-grid-item v-for="value in 8" :key="value" text="文字">
          <van-icon slot="icon" class="close-icon" name="close"></van-icon>
        </van-grid-item>
    </van-grid>
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-grid>
        <van-grid-item v-for="value in 8" :key="value" text="文字">
        </van-grid-item>
    </van-grid>
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
    return {}
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
