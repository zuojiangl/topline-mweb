<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
    v-model="value"
    required
    clearable
    placeholder="请输入手机号"
  />

  <van-field
    v-model="value"
    clearable
    placeholder="请输入验证码"
    required>
    <van-button slot="button" type="primary" size="small">发送验证码</van-button>
  </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button class="btn" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
