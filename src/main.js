import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import UUID from 'vue-uuid'

import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notify from '@/components/NotificationPlugin'
import i18n from './i18n'
import SideBar from '@/components/SidebarPlugin'
import VueOffline from 'vue-offline'

import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = {
  globalOptions: { currency: 'USD' }
}
Vue.use(VueCurrencyInput, pluginOptions)

// router setup
import routes from './router'

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false
//Vue.http.headers.common["can't-be-evil"] = true

Vue.prototype.$ENCRYPT = {
  encrypt: true
}
Vue.prototype.$DECRYPT = {
  decrypt: true
}

// configure router
const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes, // short for routes: routes
  linkExactActiveClass: 'active'
})

Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(SideBar)
Vue.use(Notify)
Vue.use(UUID)
Vue.use(VueOffline)
Vue.use(require('vue-moment'))

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
