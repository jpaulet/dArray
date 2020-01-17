import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Invoices from '@/pages/Invoices.vue'
//import Cryptocurrencies from '@/pages/Cryptocurrencies.vue'
import Expenses from '@/pages/Expenses.vue'
import Customers from '@/pages/Customers.vue'
import Tasks from '@/pages/Tasks.vue'
import Calendar from '@/pages/Calendar.vue'
import TableList from '@/pages/TableList.vue'
import Settings from '@/pages/Settings.vue'
import Files from '@/pages/Files.vue'
import Roadmap from '@/pages/Roadmap.vue'
import Pomodoro from '@/pages/Pomodoro.vue'

import BodyHero from '@/components/body/BodyHero.vue'
import SelectedHero from '@/components/body/SelectedHero.vue'

const routes = [{
  path: '/',
  component: DashboardLayout,
  redirect: 'dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/cryptocurrencies',
      name: 'Crypto',
      component: BodyHero
    },
    {
      path: '/cryptocurrencies/:id',
      name: 'Crypto',
      component: SelectedHero
    },
    {
      path: '/invoices',
      name: 'Invoices',
      component: Invoices
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/table',
      name: 'Table List',
      component: TableList
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/files',
      name: 'Files',
      component: Files
    },
    {
      path: '/roadmap',
      name: 'Roadmap',
      component: Roadmap
    },
    {
      path: '/pomodoro',
      name: 'Pomodoro',
      component: Pomodoro
    }
  ]
}]

export default routes
