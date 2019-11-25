// import Home from './views/Home.vue'

import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import Invoices from '@/pages/Invoices.vue'
import Expenses from '@/pages/Expenses.vue'
import Customers from '@/pages/Customers.vue'
import Tasks from '@/pages/Tasks.vue'
import Calendar from '@/pages/Calendar.vue'
import TableList from '@/pages/TableList.vue'
import Settings from '@/pages/Settings.vue'
import Files from '@/pages/Files.vue'

const routes = [{
  path: '/',
  component: DashboardLayout,
  redirect: 'invoices',
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
      path: 'expenses',
      name: 'Expenses',
      component: Expenses
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
    },
    {
      path: 'files',
      name: 'Files',
      component: Files
    }
  ]
}]

export default routes
