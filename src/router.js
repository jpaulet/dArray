const DashboardLayout = () => import('@/pages/Layout/DashboardLayout.vue')
const Dashboard = () => import('@/pages/Dashboard.vue')
const Invoices = () => import('@/pages/Invoices.vue')
const Expenses = () => import('@/pages/Expenses.vue')
const Customers = () => import('@/pages/Customers.vue')
const Tasks = () => import('@/pages/Tasks.vue')
const Calendar = () => import('@/pages/Calendar.vue')
const TableList = () => import('@/pages/TableList.vue')
const Settings = () => import('@/pages/Settings.vue')
const Files = () => import('@/pages/Files.vue')
const Roadmap = () => import('@/pages/Roadmap.vue')
const Pomodoro = () => import('@/pages/Pomodoro.vue')
const BodyHero = () => import('@/components/body/BodyHero.vue')
const SelectedHero = () => import('@/components/body/SelectedHero.vue')

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
    /*
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
    */
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
