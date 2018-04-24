import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '@/assets/css/bootstrap.min.css'
// import '@/assets/js/bootstrap.min.js'

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://blog-server.damaradani.cf' // 'http://localhost:3000'
Vue.prototype.$isLogin = false
Vue.prototype.$userId = ''
Vue.prototype.$role = ''

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
