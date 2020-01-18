import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './assets/css/global.css'
import axios from './axios/http'

// 注册全局Vue过滤器，显示时间格式
Vue.filter('date', function (dateVal) {
  const dt = new Date(dateVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const h = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const s = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${h}:${mm}:${s}`
})


Vue.prototype.$axios=axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
