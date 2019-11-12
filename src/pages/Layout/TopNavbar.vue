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
        <ul class="navbar-nav addMoreItems">
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
          <li class="search-bar input-group"  @click="searchModalVisible = true">
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
          <drop-down>
            <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle nav-link">
              <div class="notification d-none d-lg-block d-xl-block"></div>
              <i class="tim-icons icon-sound-wave"></i>
              <p class="d-lg-none text-left">
                Notifications
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li class="nav-link">
                  <a href="#" class="nav-item dropdown-item">
                    <p class="title" style="color:#000;">Abc Def</p>
                      <p style="color:#333;">Mike John responded to your email</p>
                    <label style="color:#ccc;font-size:11px;">Yesterday, 12:00</label>
                  </a>
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">You have 5 more tasks</a>
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">Your friend Michael is in town</a>
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">Another notification</a>
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">Another one</a>
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
              <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Profile</a></li>
              <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Settings</a></li>
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

import {
  SidebarPlugin
} from '@/components/index'

var STORAGE_FILE = 'company.json'
export default {
  components: {
    DropDown,
    Modal,
    SidebarPlugin
  },
  data () {
    return {
      searchModalVisible: false,
      searchQuery: '',
      showMenu: false,
      blockstack: window.blockstack,
      avatar: 'https://s3.amazonaws.com/onename/avatar-placeholder.png',
      givenName: 'Anonymous',
      imageSrc: null
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
    }
  },
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      const profile = blockstack.loadUserData().profile
      const user = new blockstack.Person(profile)
      this.givenName = user.name() ? user.name() : 'Nameless Person'
      if (user.avatarUrl()) this.avatar = user.avatarUrl()

      userSession.getFile(STORAGE_FILE).then((company) => {
        this.model = JSON.parse(company || '{}')
        let path = this.model.logo

        if(path === null){
          this.imageSrc = null;
          return;
        }
        userSession.getFile(path).then((logoImage) => {
          //@/assets/img/anime3.png
          this.imageSrc = logoImage;
        })
      })
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
