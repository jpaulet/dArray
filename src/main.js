import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// import '@/assets/scss/white-dashboard.scss';
// import '@/assets/css/nucleo-icons.css';
// import "@/assets/demo/demo.css";

import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notify from '@/components/NotificationPlugin'
import i18n from './i18n'
import SideBar from '@/components/SidebarPlugin'

// router setup
import routes from './router'

// var $ = window.jQuery = require('jquery')

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'active'
})

Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(SideBar)
Vue.use(Notify)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
