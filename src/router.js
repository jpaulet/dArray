// import Home from './views/Home.vue'

import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import Invoices from '@/pages/Invoices.vue'
import Notifications from '@/pages/Notifications.vue'
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import Typography from '@/pages/Typography.vue'

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
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
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
      path: 'typography',
      name: 'Typography',
      component: Typography
    }
  ]
}]

export default routes
