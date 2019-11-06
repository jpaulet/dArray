// import Home from './views/Home.vue'

import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import Invoices from '@/pages/Invoices.vue'
import Customers from '@/pages/Customers.vue'
import Tasks from '@/pages/Tasks.vue'
import Calendar from '@/pages/Calendar.vue'
import TableList from '@/pages/TableList.vue'
import Settings from '@/pages/Settings.vue'

const routes = [{
  path: '/',
  component: DashboardLayout,
  redirect: 'dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: 'invoices',
      name: 'Invoices',
      component: Invoices
    },
    {
      path: 'customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: 'tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: 'calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: 'table',
      name: 'Table List',
      component: TableList
    },
    {
      path: 'settings',
      name: 'Settings',
      component: Settings
    }
  ]
}]

export default routes
