// import Home from './views/Home.vue'

import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import Invoices from '@/pages/Invoices.vue'
import Customers from '@/pages/Customers.vue'
import UserProfile from '@/pages/UserProfile.vue'
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
      path: 'Invoices',
      name: 'Invoices',
      component: Invoices
    },
    {
      path: 'customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: 'user',
      name: 'User Profile',
      component: UserProfile
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
