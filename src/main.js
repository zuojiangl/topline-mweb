import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
// 导入语言包
import zhCN from 'vee-validate/dist/locale/zh_CN'

Vue.use(Vant)
Vue.use(VeeValidate)
// 配置中文
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
