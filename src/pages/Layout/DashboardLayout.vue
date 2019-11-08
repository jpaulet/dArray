<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar :background-color="backgroundColor" v-if="user" :user="user">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-chart-pie-36"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/invoices">
        <i class="tim-icons icon-paper"></i>
        <template>
          <p>Invoices</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/expenses">
        <i class="tim-icons icon-pin"></i>
        <template>
          <p>Expenses</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/customers">
        <i class="tim-icons icon-single-02"></i>
        <template>
          <p>Customers</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/tasks">
        <i class="tim-icons icon-pin"></i>
        <template>
          <p>Tasks</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/calendar">
        <i class="tim-icons icon-calendar-60"></i>
        <template>
          <p>Calendar</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/files">
        <i class="tim-icons icon-upload"></i>
        <template>
          <p>Documents</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/table">
        <i class="tim-icons icon-puzzle-10"></i>
        <template>
          <p>Resources</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/settings">
        <i class="tim-icons icon-settings"></i>
        <p>Settings</p>
      </sidebar-link>
    </side-bar>

    <!-- <sidebar-share :background-color.sync="backgroundColor"></sidebar-share> -->

    <div class="main-panel" :data="backgroundColor" v-if="user" :user="user">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>

    <landing v-if="!userSession.isUserSignedIn()"></landing>

  </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './DashboardContent.vue'
import SidebarShare from './SidebarSharePlugin.vue'
import MobileMenu from './MobileMenu.vue'
import SideBar from '@/components/SidebarPlugin/SideBar.vue'
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue'

import Landing from '@/components/Landing.vue'

import { Person } from 'blockstack'
import { userSession } from '@/userSession'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    SideBar,
    SidebarLink,
    SidebarShare,
    Landing
  },
  data () {
    return {
      backgroundColor: 'green',
      userSession: null,
      user: null
    }
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    }
  },
  created () {
    this.userSession = userSession
  },
  mounted () {
    if (userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData()
      this.user = new Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then((userData) => {
          window.location = window.location.origin
        })
    }
  }
}
</script>
