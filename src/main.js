import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import './main.scss'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueOffline from 'vue-offline'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueOffline)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Simeon
// Erik
// SofieK
// Sofia
// Patrik
