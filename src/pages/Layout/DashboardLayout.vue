<template>
  <div class="wrapper">
    <side-bar :background-color="backgroundColor" v-if="user && location !== '/subscribe'" :title="user.name">
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
          <p>Pomodoro</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/crypto">
        <i class="tim-icons icon-coins"></i>
        <template>
          <p>Crypto</p><span class='badge badge-light' style='font-size:6px;float:right;margin-top:-22px;opacity:0.6;'>new</span>
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
      isSubscribed: true,
      timeLeft: 0,
      location: null,
      firstDay: null
    }
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    checkSubscription (user) {
      let today = new Date()
      var fileName = user.username + '_subscribed.json'
      var firstDay = 'firstDay.json'

      userSession.getFile(firstDay, this.$DECRYPT).then((date) => {
        if (date) {
          this.firstDay = JSON.parse(date)
        } else {
          userSession.putFile(firstDay, JSON.stringify(today), this.$ENCRYPT)
          this.firstDay = today
        }

        userSession.getFile(fileName, this.$DECRYPT).then((subscribed) => {
          this.isSubscribed = JSON.parse(subscribed || 'false')

          if (this.isSubscribed.subscribed && today.toISOString() < this.isSubscribed.date) {
            this.isSubscribed = true
          } else {
            var subscriptionDate = new Date(this.firstDay)
            var plusOneMonth = new Date(subscriptionDate.getFullYear(), subscriptionDate.getMonth() + 1, subscriptionDate.getDate())
            let oneDay = 1000 * 60 * 60 * 24
            this.timeLeft = Math.ceil((plusOneMonth.getTime() - today.getTime()) / (oneDay))
            if (this.timeLeft < 0) {
              this.timeLeft = 0
            }
            this.isSubscribed = false
          }

          var getUrl = window.location
          if (!this.isSubscribed && this.timeLeft <= 0 && window.location.pathname !== '/subscribe' && window.location.pathname !== '/paymentSuccess') {
            var baseUrl = getUrl.protocol + '//' + getUrl.host + '/subscribe'
            window.location = baseUrl
          }
        })
      })
    }
  },
  created () {
    this.userSession = userSession
    this.location = window.location.pathname
  },
  mounted () {
    if (userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData()
      this.user = new Person(this.userData.profile)
      this.user.username = this.userData.username
      this.user.name = this.userData.name ? this.userData.name : (this.userData.username ? this.userData.username.substr(0, this.userData.username.indexOf('.')) : 'Anonymous')
      this.checkSubscription(this.userData)
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
