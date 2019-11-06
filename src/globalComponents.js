import BaseButton from './components/BaseButton.vue'
import BaseCheckbox from './components/BaseCheckbox.vue'
import BaseRadio from './components/BaseRadio.vue'
import DropDown from './components/Dropdown.vue'
import Notify from './components/NotificationPlugin'

import '@/assets/scss/white-dashboard.scss'
import '@/assets/css/nucleo-icons.css'
import '@/assets/demo/demo.css'

/*
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
*/

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
const GlobalComponents = {
  install (Vue) {
    Vue.component('base-button', BaseButton)
    Vue.component('base-checkbox', BaseCheckbox)
    Vue.component('base-radio', BaseRadio)
    Vue.component('drop-down', DropDown)
    Vue.component('notify', Notify)
  }
}

export default GlobalComponents
