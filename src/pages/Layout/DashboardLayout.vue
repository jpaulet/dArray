<template>
  <div class="wrapper">
    <side-bar :background-color="backgroundColor" v-if="user" :title="user.name">
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-chart-pie-36"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <!--
      <sidebar-link to="/cryptocurrencies">
        <i class="tim-icons icon-coins"></i>
        <template>
          <p>Cryptocurrencies</p>
        </template>
      </sidebar-link>
      -->
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
      <sidebar-link to="/pomodoro">
        <i class="tim-icons icon-time-alarm"></i>
        <template>
          <p>Pomodoro</p><span class='badge badge-light' style='font-size:6px;float:right;margin-top:-22px;opacity:0.6;'>new</span>
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
      <sidebar-link to="/settings">
        <i class="tim-icons icon-settings"></i>
        <p>Settings</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel" :data="backgroundColor" v-if="user" :user="user">
      <top-navbar :isSubscribed='isSubscribed' :timeLeft='timeLeft'></top-navbar>
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>

    <landing v-if="!userSession.isUserSignedIn() && !isLoadingPage"></landing>

    <div class='text-center pt-5 mt-5' v-if='isLoadingPage'>
      <breeding-rhombus-spinner
        :animation-duration="2000"
        :size="65"
        color="#344675"
        style='margin:0px auto;'
      />
    </div>
  </div>
</template>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './DashboardContent.vue'
import SideBar from '@/components/SidebarPlugin/SideBar.vue'
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue'
import Landing from '@/components/Landing.vue'
import { Person } from 'blockstack'
import { userSession } from '@/userSession'
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    Landing,
    BreedingRhombusSpinner
  },
  data () {
    return {
      backgroundColor: 'green',
      userSession: null,
      user: null,
      isLoadingPage: false,
      isSubscribed: false,
      timeLeft: null
    }
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    checkSubscription (user) {
      // api call
      console.log(user)
      /*
      if (this.isSubscribed) {
        var url = 'https://darray.org/api/checkSSID'
        axios.post(url, {username: user.username }, {'headers': {'Accepts': 'application/json'}}.then((response)) => {
          if(response.data === true){
            this.isSubscribed = true
          }else{
            this.isSubscribed = false
            this.timeLeft = response.data
          }
        })
      } else {
        var url = 'https://darray.org/api/checkSubscription'
        axios.post(url,  {username: user.username }, {'headers': {'Accepts': 'application/json'}}.then((response)) => {
          this.isSubscribed = response.data.subscribed
          this.timeLeft = response.data.timeLeft
          this.ssid = response.ssid
        })
      }
      */
      this.isSubscribed = false
      this.timeLeft = '2'
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
      this.user.name = this.userData.name ? this.userData.name : (this.userData.username ? this.userData.username.substr(0, this.userData.username.indexOf('.')) : 'Anonymous')
      this.isSubscribed = this.checkSubscription(this.userData)
    } else if (userSession.isSignInPending()) {
      this.isLoadingPage = true
      userSession.handlePendingSignIn()
        .then((userData) => {
          this.isLoadingPage = false
          window.location = window.location.origin
        })
    }
  }
}
</script>
