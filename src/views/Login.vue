<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
    v-model="user.mobile"
    required
    clearable
    placeholder="请输入手机号"
  />

  <van-field
    v-model="user.code"
    clearable
    placeholder="请输入验证码"
    required>
    <van-button slot="button" type="primary" size="small">发送验证码</van-button>
  </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button class="btn" type="info" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async handleLogin () {
      try {
        const data = await login(this.user)
        // console.log(data)
        // 存储登录状态
        // this.$store.commit('setUser', data)
        this.setUser(data)
        // 跳转页面，提示
        this.$router.push('/')
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    }
  }
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
