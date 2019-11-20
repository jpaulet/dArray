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
        <a class="navbar-brand" href=""> {{ $route.name }}</a>
      </div>

      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav addMoreItems" style='display:none;'>
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
                  <a href="#" class="nav-item dropdown-item">
                    <i class="tim-icons icon-paper text-info" style='color:#222 !important;'></i> New Invoice
                  </a>
              </li>
              <li class="nav-link mb-2">
                  <a href="#" class="nav-item dropdown-item">
                    <i class="tim-icons icon-pin text-info" style='color:#222 !important;'></i> New Expense
                  </a>
              </li>
              <li class="nav-link mb-2">
                  <a href="#" class="nav-item dropdown-item">
                    <i class="tim-icons icon-single-02 text-info" style='color:#222 !important;'></i> New Customer
                  </a>
              </li>
              <li class="nav-link mb-2">
                  <a href="#" class="nav-item dropdown-item">
                    <i class="tim-icons icon-pin text-info" style='color:#222 !important;'></i> New Task
                  </a>
              </li>
              <li class="nav-link mb-2">
                  <a href="#" class="nav-item dropdown-item">
                    <i class="tim-icons icon-calendar-60 text-info" style='color:#222 !important;'></i> New Event
                  </a>
              </li>
            </ul>
          </drop-down>
        </ul>

        <ul class="navbar-nav ml-auto">

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
              <li class="nav-link"><router-link to="" class="nav-item dropdown-item">Profile</a></router-link>
              <li class="nav-link"><router-link to="settings" class="nav-item dropdown-item">Settings</a></router-link>
              <li class="dropdown-divider"></li>
              <li class="nav-link">
                 <a href="#" id="signout-button" @click.prevent="signOut" class="nav-item dropdown-item">Log out</a>
              </li>
            </ul>
          </drop-down>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import DropDown from '@/components/Dropdown.vue'
import Modal from '@/components/Modal.vue'
import { userSession } from '@/userSession'

var STORAGE_FILE = 'company.json'
export default {
  components: {
    DropDown,
    Modal
  },
  data () {
    return {
      searchModalVisible: false,
      searchQuery: '',
      showMenu: false,
      blockstack: window.blockstack,
      avatar: 'https://s3.amazonaws.com/onename/avatar-placeholder.png',
      givenName: 'Anonymous',
      imageSrc: null,
      messages: [
        {
          title : 'Add Company Info',
          msg : 'Add your company basic info to create better invoices, expenses & more.',
          url : '/settings'
        }
      ]
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
    checkInicialization (){
      blockstack.getFile('company.json').then((fileContents) => {
        if(!fileContents){
          let message = {}
          message.title = 'Add Company Info'
          message.msg = 'Add your company basic info to create better invoices, expenses & more.'
          message.url = 'settings'
          this.messages.push(message)
        }
      });
    }
  },
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      const profile = blockstack.loadUserData().profile
      const user = new blockstack.Person(profile)
      this.givenName = user.name() ? user.name() : 'Nameless Person'
      if (user.avatarUrl()) this.avatar = user.avatarUrl()
      this.imageSrc = user.avatarUrl()
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
<style>
</style>
