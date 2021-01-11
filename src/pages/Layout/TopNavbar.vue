<template>
  <nav class="navbar navbar-expand-lg navbar-absolute" :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href=""> <img src='@/assets/img/darray.png' style='width:32px;margin-right:5px;margin-left:-10px;' /> <strong>DARRAY</strong> / {{ $route.name }}</a>
      </div>

      <button class="navbar-toggler" type="button" @click="toggleMenu" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav addMoreItems" v-if="location !== '/subscribe'">
          <drop-down>
            <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle nav-link">
              <div class="d-none d-lg-block d-xl-block"></div>
              <i class="tim-icons icon-simple-add"></i>
              <p class="d-lg-none text-left">
                Add New
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar py-3">
              <li class="nav-link mb-2">
                  <router-link to="invoices?newInvoice=true" class="nav-item dropdown-item">
                    <i class="tim-icons icon-paper text-info" style='color:#222 !important;'></i> New Invoice
                  </router-link>
              </li>
              <li class="nav-link mb-2">
                  <router-link to="expenses?newExpense=true" class="nav-item dropdown-item">
                    <i class="tim-icons icon-pin text-info" style='color:#222 !important;'></i> New Expense
                  </router-link>
              </li>
              <li class="nav-link mb-2">
                  <router-link to="customers?newCustomer=true" class="nav-item dropdown-item">
                    <i class="tim-icons icon-single-02 text-info" style='color:#222 !important;'></i> New Customer
                  </router-link>
              </li>
              <li class="nav-link mb-2">
                  <router-link to="tasks" class="nav-item dropdown-item">
                    <i class="tim-icons icon-pin text-info" style='color:#222 !important;'></i> New Task
                  </router-link>
              </li>
              <li class="nav-link mb-2">
                  <router-link to="calendar?newEvent=true" class="nav-item dropdown-item">
                    <i class="tim-icons icon-calendar-60 text-info" style='color:#222 !important;'></i> New Event
                  </router-link>
              </li>
            </ul>
          </drop-down>
        </ul>

        <ul class="navbar-nav ml-auto">
          <!-- Subscription -->
          <li v-if='!isSubscribed' class="input-group" @click="showSubscriptionModal = true" style='margin-top:5px;'>
            <span style='padding-top:10px;'>
              You have <strong>{{ timeLeft }}</strong> days left of free trial.
              <span class='btn-secondary btn-sm' style='font-weight:600;padding-left:5px;padding-right:5px;margin-left:5px;margin-right:10px;'>?</span>
            </span>
          </li>
          <li v-if='!isSubscribed'>
            <!-- id="subscribe-button" data-toggle="modal" data-target="#subscribeModal" -->
            <button class="btn btn-link" @click='subsribeModalVisible = true' style='border:1px solid #1d253b;border-radius:8px;padding:10px 10px 8px;color:#fff;background-color:#1d253b;margin-top:6px;'>
              <span class="d-md-block">Subscribe</span>
            </button>
          </li>

          <!-- SEARCH -->
          <li class="search-bar input-group"  @click="searchModalVisible = true" style='display:none;'>
            <button class="btn btn-link" id="search-button" data-toggle="modal" data-target="#searchModal"><i class="tim-icons icon-zoom-split"></i>
              <span class="d-lg-none d-md-block">Search</span>
            </button>
          </li>
          <modal :show.sync="searchModalVisible"
                 class="modal-search"
                 id="searchModal"
                 :centered="false"
                 :show-close="true">
            <input slot="header" v-model="searchQuery" type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH">
          </modal>

          <!-- NOTIFICATIONS -->
          <drop-down v-if='messages.length !== 0'>
            <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle nav-link">
              <div class="notification d-none d-lg-block d-xl-block"></div>
              <i class="tim-icons icon-sound-wave"></i>
              <p class="d-lg-none text-left">
                Notifications
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li v-for='(message,index) in messages' :key='index'>
                <router-link :to="message.url" class="nav-item dropdown-item">
                  <p class="title" style="color:#000;">{{message.title}}</p>
                  <p style="color:#333;">{{message.msg}}</p>
                  <label style="color:#ccc;font-size:11px;text-decoration: underline">Do it now</label>
                </router-link>
              </li>
            </ul>
          </drop-down>

          <!-- PROFILE Dropdown -->
          <drop-down v-if="location !== '/subscribe'">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo">
                <img :src="imageSrc" alt="Profile Photo"> {{ givenName }}
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <p class="d-lg-none">
                <a href="#" id="signout-button" @click.prevent="signOut">Log out</a>
              </p>
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link"><router-link to="settings" class="nav-item dropdown-item">Settings</router-link>
              <li class="dropdown-divider"></li>
              <li class="nav-link">
                 <a href="#" id="signout-button" @click.prevent="signOut" class="nav-item dropdown-item">Log out</a>
              </li>
            </ul>
          </drop-down>
        </ul>
      </div>
    </div>

    <modal :show.sync="showSubscriptionModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg mt-2" style='transform:translate(0,0) !important;padding-top:80px;'>
      <template slot="header" class='row'>
        <h3 class="modal-title col-12 mt-3 mb-3" id="exampleModalLabel" style='text-decoration: underline;margin-bottom:20px;'>Important Announcement</h3>
      </template>
      <div class="col-12 mb-3">
        <div class='col-12 text-dark' style='clear:both;margin:0px auto;text-align:justify;'>
          Hey! I'm J.P 👋, founder and solo developer of <strong>dArray</strong>. <br /><br />
          As you may know, <u>Blockstack ended their dApps "Reward Program"</u> several months ago and as a solo-developer this program was the <u>only way to monetize dArray</u>.<br /><br />
          For this reason, in order to be able to pay the server, <strong>keep working on this dApp</strong>, make updates, solve bugs and provide new <strong>requested features</strong> I'm in the obligation to change the conditions and request a <strong>small yearly payment</strong>. <span style='text-decoration:underline;'>This payment will be used to pay for the server and development costs</span>. <br /><br />But don't worry, dArray is a open-source software, you will always be able to download the source code and run your own private server with your data! If you prefer to keep using dArray.org, with all your information and ready-to-use dApp, updates and new features, you will have 30 days to pay the subscription to keep accessing to your data. <br /><br />
          I hope you all understand this situation and comprehend that as a Freelancer & Developer <u>I need some help from you</u> to keep this amazing journey!<br /><br />
          <strong>Thanks in advance 🙂</strong><br />
          J.P. Aulet!<br />
        </div>
        <div>
          <button class="btn btn-link" id="subscribe-button" data-toggle="modal" data-target="#subscribeModal" @click="subsribeModalVisible = true;showSubscriptionModal = false" style='border:1px solid #1d253b;border-radius:8px;padding-top:10px;padding:8px 10px;color:#fff;background-color:#1d253b;'>
              <span class="d-md-block">Subscribe Now!</span>
          </button>
        </div>
      </div>
    </modal>

    <modal :show.sync="subsribeModalVisible" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg mt-2" style='transform:translate(0,0) !important;padding-top:80px;'>
      <template slot="header" class='row'>
        <h3 class="modal-title col-12 mt-3 mb-3" id="exampleModalLabel" style='text-decoration: underline;'>Subscribe</h3>
      </template>
      <div class="col-12 mb-3" v-if='!subscribe'>
        <div class='col-12 text-dark' style='clear:both;margin:0px auto;text-align:center;'>
          Get full access to <strong>dArray</strong> for less than 5$/month!<br /><br />

          <div style='max-width:460px;margin:0px auto 30px;text-align:center;border:1px solid #ccc;border-radius:8px;padding:30px;background-color:#0e0b4f0d;box-shadow:3px 3px 5px #0e0b4f3b;'>
            <div style='text-align:center;'>
              <img src='darray_sm.png' style='margin:0px auto 20px;width:100px;' />
              <br />1 year subscription
              <br />Unlimited Invoices & Expenses
              <br />Unlimited Customers
              <br />Pomodoro + Tasks + Documents
              <br />Crypto Tracker + Personal Finance (WIP)
              <br />New Features for free
              <br /><span style='font-size:12px;font-weight:200;margin-top:20px;'>+ Support a solo-maker</span>
              <br /><span style='font-size:13px;font-weight:600;margin-top:20px;text-decoration: line-through;'>99$</span>
              <br /><span style='font-size:16px;font-weight:600;margin-top:20px;'>59.88$ <span style='font-size:13px;'>(early bid)</span></span>
            </div>
          </div>
          <div style='text-align:center;'>
            <button class="btn btn-link" v-on:click="purchase" style='margin:10px auto;border:1px solid #1d253b;border-radius:8px;padding-top:10px;padding:8px 10px;color:#fff;background-color:#1d253b;min-width:220px;padding:12px 5px;'>Buy</button>
            <br />
            <span style='margin:0px auto;font-size:12px;'>(You will be redirected to Stripe)</span>
          </div>
        </div>
      </div>
    </modal>
  </nav>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import DropDown from '@/components/Dropdown.vue'
import Modal from '@/components/Modal.vue'
import { userSession } from '@/userSession'

var stripe = Stripe('pk_live_PAcBsMNCSaxAJ8AlVrvrJcQc00gUSBpm2f')

var STORAGE_FILE = 'company.json'
export default {
  props: ['isSubscribed', 'timeLeft'],
  components: {
    DropDown,
    Modal
  },
  data () {
    return {
      location: null,
      subscribeModal: false,
      showSubscriptionModal: false,
      subsribeModalVisible: false,
      searchModalVisible: false,
      searchQuery: '',
      showMenu: false,
      blockstack: window.blockstack,
      avatar: 'https://darray.org/img/avatar-placeholder.png',
      givenName: 'Anonymous',
      imageSrc: null,
      messages: [],
      subscribe: false,
      loading: false
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    signOut () {
      userSession.signUserOut()
      location.reload()
    },
    checkInicialization () {
      const blockstack = this.blockstack
      blockstack.getFile(STORAGE_FILE).then((fileContents) => {
        if (!fileContents) {
          let message = {}
          message.title = 'Add Company Info'
          message.msg = 'Add your company basic info to create better invoices, expenses & more.'
          message.url = 'settings'
          this.messages.push(message)
        }
      })
    },
    async purchase () {
      var host = location.protocol.concat('//').concat(window.location.host)
      stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1I8Tr8CjpkHqiQ9gXtraE1xe', // Replace with the ID of your price
          quantity: 1
        }],
        // mode: 'subscription',
        mode: 'payment',
        successUrl: host + '/paymentSuccess?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: host + '/paymentCancel'
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      })
    }
  },
  mounted () {
    this.location = window.location.pathname
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      var getUrl = window.location
      if (!this.isSubscribed && this.timeLeft <= 0 && window.location.pathname !== '/subscribe' && window.location.pathname !== '/paymentSuccess') {
        var baseUrl = getUrl.protocol + "//" + getUrl.host + '/subscribe'
        window.location = baseUrl
      }
      if (!localStorage.getItem('showSubscription')) {
        localStorage.setItem('showSubscription', true)
        this.loading = false
        this.showSubscriptionModal = true
      }
      const profile = blockstack.loadUserData().profile
      const user = new blockstack.Person(profile)
      this.givenName = user.name() ? user.name() : 'Nameless Person'
      if (user.avatarUrl()) {
        this.avatar = user.avatarUrl()
        this.imageSrc = user.avatarUrl()
      } else {
        this.imageSrc = 'https://darray.org/img/avatar-placeholder.png'
      }
      this.checkInicialization()
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
        .then((userData) => {
          window.location = window.location.origin
        })
    }
  }
}
</script>
