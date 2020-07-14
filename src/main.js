import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import UUID from 'vue-uuid'

import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notify from '@/components/NotificationPlugin'
import i18n from './i18n'
import SideBar from '@/components/SidebarPlugin'
import VueOffline from 'vue-offline'

import VueCurrencyInput from 'vue-currency-input'
import VueAnalytics from 'vue-analytics'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import DoughnutChart from './components/body/sub/DoughnutChart'
// import { store } from './store.js'

// router setup
import routes from './router'

Vue.use(VueAxios, axios)
Vue.component('icon', Icon)
Vue.component('doughnut-chart', DoughnutChart)

const pluginOptions = {
  globalOptions: { currency: 'USD' }
}
Vue.use(VueCurrencyInput, pluginOptions)

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false

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

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-154759330-1',
  router
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
  render: h => h(App),
  data: {
    // sharedState: store.state
  }
}).$mount('#app')
