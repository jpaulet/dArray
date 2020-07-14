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
        <ul class="navbar-nav addMoreItems" style=''>
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
          <li v-if='!isSubscribed' class="input-group"  @click="subsribeModalVisible = true" style='margin-top:5px;'>
            <span style='padding-top:10px;'>You have <strong>{{ timeLeft }}</strong> days left of free trial.</span>
            <button class="btn btn-link" id="subscribe-button" data-toggle="modal" data-target="#subscribeModal" onclick='subscribeModal = true' style='border:1px solid #1d253b;border-radius:8px;padding-top:10px;padding:8px 10px;color:#fff;background-color:#1d253b;'>
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
          <drop-down>
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
              <!-- <li class="nav-link"><router-link to="" class="nav-item dropdown-item">Profile</a></router-link> -->
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
          As you may know, <u>Blockstack ended their dApps "Reward Program"</u> and as a solo-developer this prorgram was the only way to monetize dArray.<br /><br />
          For this reason, in order to be able to pay the server, keep working on this app, make updates, solve bugs and provide new requested features I'm in the obligation to change the conditions and request a <strong>small yearly payment</strong>. This payment will be used to pay for the server and development costs. <br /><br />But don't worry, dArray is a open-source software, you will always be able to download the source code and run your own private server with your data! If you prefer to keep using dArray.org, with all your information and ready-to-use dApp, updates and new features, you will have 30 days to pay the subcription to keep accessing to your data. <br /><br />
          I hope you all understand this situation and comprenhend that as a Freelancer & Developer <u>I need some help from users</u> to keep this amazing journey!<br /><br />
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
      <div class="col-12 mb-3">
        <div class='col-12 text-dark' style='clear:both;margin:0px auto;text-align:justify;'>
          Get fully access to <strong>dArray</strong> for only 29.99€/year!<br /><br />

          <!-- <div ref="card" style='width:60%;margin:0px auto;'></div> <br /> -->
          <div style='width:60%;margin:0px auto 30px;text-align:center;border:1px solid #ccc;border-radius:8px;padding:30px;'>
            <div style='text-align:center;'>
              <img src='darray_sm.png' style='margin:20px auto;' />
              <br />1 year subscription - 29.99€
            </div>
          </div>
          <div style='text-align:center;'>
            <button class="btn btn-link" v-on:click="purchase" style='margin:10px auto;border:1px solid #1d253b;border-radius:8px;padding-top:10px;padding:8px 10px;color:#fff;background-color:#1d253b;'>Purchase</button>
          </div>
        </div>
      </div>
    </modal>
  </nav>
</template>

<script>
import DropDown from '@/components/Dropdown.vue'
import Modal from '@/components/Modal.vue'
import { userSession } from '@/userSession'

let stripe = Stripe(`pk_test_pALdYXC6f316H4PUGjaQDstY00JiQ39DRr`)
// let elements = stripe.elements()
// let card = undefined

var STORAGE_FILE = 'company.json'
export default {
  props: ['isSubscribed', 'timeLeft'],
  components: {
    DropDown,
    Modal
  },
  data () {
    return {
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
      messages: []
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
    purchase: function () {
      stripe.redirectToCheckout({
        lineItems: [{
          price: '1',
          quantity: 1
        }],
        mode: 'subscription',
        successUrl: 'https://darray.org/api/success',
        cancelUrl: 'https://darray.org/api/cancel',
        metadata: {
          userId: this.blockstack.loadUserData().userId
        }
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      })
      /*
      stripe.createToken(card).then(function (result) {
        console.log(result.token)
        // Access the token with result.token
      })
      */
    }
  },
  mounted () {
    // card = elements.create('card')
    // card.mount(this.$refs.card)

    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      if (!this.isSubscribed && this.timeLeft < 0) {
        window.location = 'https://darray.org/subsribe'
      }
      if (!localStorage.getItem('showSubscription')) {
        localStorage.setItem('showSubscription', true)
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
