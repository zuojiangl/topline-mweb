// 插件： 就是一个对象，具有install(Vue,options)

export default {
  install (Vue) {
    // 给Vue的实例增加方法
    Vue.prototype.$checkLogin = function () {
      // this 是vue的实例 this.$checkLogin()
      // 判断是否登录
      if (!this.$store.state.user) {
        // 如果没有登录，提示用户是否要登录
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否要跳转到登录页面'
        }).then(() => {
          // 确认
          // console.log(this.$route)
          this.$router.push({
            path: '/login',
            // params 动态路由参数
            // query 查询字符串
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(() => {

        })
        return false
      }
      return true
    }
  }
}
