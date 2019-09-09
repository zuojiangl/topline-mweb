import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
import CheckLogin from '@/utils/CheckLogin'

// 导入语言包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { fmDate } from '@/utils/dayjs'

// 注册插件
Vue.use(CheckLogin)

// 获取相对时间的过滤器
Vue.filter('fmDate', fmDate)
Vue.use(Vant)
Vue.use(VeeValidate, {
  // 文本框中触发验证的事件默认是input
  // 如果为空的话，文本框输入过程中不验证，需要调用validate方法验证
  events: ''
})
// 配置中文
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
