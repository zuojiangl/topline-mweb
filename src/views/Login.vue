<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
      v-validate="'required|digits:11'"
      name="mobile"
      :error-message="errors.first('mobile')"
      v-model="user.mobile"
      clearable
      left-icon="phone-o"
      placeholder="请输入手机号" />

      <van-field
      v-validate="'required|digits:6'"
      name="code"
      :error-message="errors.first('code')"
      v-model="user.code"
      left-icon="envelop-o"
      clearable
      placeholder="请输入验证码">
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
        // 表单验证
        // validate() 返回的是一个Promise对象，所以可以使用await调用
        const valid = await this.$validator.validate()
        // 验证失败
        if (!valid) {
          return
        }
        // 验证成功
        const data = await login(this.user)
        // 储存登录状态
        this.setUser(data)
        // 跳转到首页
        this.$router.push('/')
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    }
  },
  created () {
    // 配置VeeValidate的自定义验证信息
    const dict = {
      custom: {
        // 验证的文本框
        mobile: {
          // 验证规则失败之后的提示信息
          required: '请输入手机号码',
          digits: '手机号码必须是11位的数字上'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位的数字'
        }
      }
    }
    this.$validator.localize('custom', dict)
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
