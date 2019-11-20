<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8" v-if='!loadingPage'>
        <card>
          <template slot="header">
            <h5 class="title">Profile</h5>
          </template>

          <h6 class='text-left mb-2'>You</h6>

          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="First Name" v-model="model.firstName" placeholder="First Name">
              </base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <base-input label="Last Name" v-model="model.lastName" placeholder="Last Name">
              </base-input>
            </div>
          </div>

          <h6 class='text-left mb-2 mt-3'>Company</h6>

          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Company"   placeholder="Company" v-model="model.company">
              </base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <base-input label="Email address" v-model="model.email" type="email" placeholder="mike@email.com">
              </base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 text-left">
              <base-input label="Address" v-model="model.address" placeholder="Home Address">
              </base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 pr-md-1 text-left">
              <base-input label="City" v-model="model.city" placeholder="City">
              </base-input>
            </div>
            <div class="col-md-4 px-md-1 text-left">
              <base-input label="Country" v-model="model.country" placeholder="Country">
              </base-input>
            </div>
            <div class="col-md-4 pl-md-1 text-left">
              <base-input label="Postal Code" placeholder="ZIP Code" v-model="model.zip">
              </base-input>
            </div>
          </div>

          <h6 class='text-left mb-2 mt-3'>Invoice</h6>

          <div class="row">
            <div class="col-md-8 text-left">
              <base-input label="Tax Nº" v-model="model.tax" placeholder="Tax Nº">
              </base-input>
            </div>
            <div class="col-md-4 text-left">
              <label class='control-label'>Default VAT (%)</label>
              <input class='form-control' type='number' v-model='model.vat' name='vat' min='0' />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 text-left">
              <label class='control-label'>Comments/Notes</label>
              <textarea class='form-control px-2' v-model='model.comments' placeholder="Introduce any comment / note. It will appear by default in all invoices" style='border:1px solid rgba(34, 42, 66, 0.4);border-radius:6px;'></textarea>
            </div>
            <div class="col-md-6 text-left">
              <label class='control-label'>Payment Info</label>
              <textarea class='form-control px-2' v-model='model.payment' placeholder="Payment info - It will appear by default in all invoices" style='border:1px solid rgba(34, 42, 66, 0.4);border-radius:6px;'></textarea>
            </div>
          </div>

          <template slot="footer">
            <base-button type="light" fill class='float-right' @click='saveCompany()'>Save</base-button>
          </template>
        </card>
      </div>

      <div class="col-md-4" v-if='!loadingPage'>
        <user-card :company="model" v-on:newLogo='saveLogo' style='height:96%;'></user-card>
      </div>

      <template v-if='loadingPage'>
        <div class='col-12' style='text-align:center;'>
          <div class='text-center pt-5 mt-5'>
            <breeding-rhombus-spinner
              :animation-duration="2000"
              :size="65"
              color="#344675"
              style='margin:100px auto;'
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
import { userSession } from '@/userSession'
import BaseButton from '@/components/BaseButton'
import UserCard from './Profile/UserCard.vue'
import {
  Card,
  BaseInput
} from '@/components/index'

var STORAGE_FILE = 'company.json'

export default {
  components: {
    Card,
    UserCard,
    BaseInput,
    BaseButton,
    BreedingRhombusSpinner
  },
  data () {
    return {
      loadingPage: true,
      model: {
        company: '',
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        logo: '',
        tax: '',
        vat: 0,
        payment: '',
        comments: ''
      }
    }
  },
  methods: {
    saveCompany () {
      userSession.putFile(STORAGE_FILE, JSON.stringify(this.model))

      this.$notify({
        message: 'Settings saved',
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      })
    },
    saveLogo (logo) {
      if (this.model.logo !== '@/assets/img/company.png') {
        userSession.deleteFile(this.model.logo).then(() => {
          // file was deleted
          this.$notify({
            message: 'File uploaded',
            icon: 'tim-icons icon-bell-55',
            horizontalAlign: 'center',
            verticalAlign: 'bottom',
            type: 'success',
            timeout: 1500
          })
        }).catch(() => {
          // file does not exist or is inaccessable
          this.$notify({
            message: 'Failed to delete the file',
            icon: 'tim-icons icon-bell-55',
            horizontalAlign: 'center',
            verticalAlign: 'bottom',
            type: 'danger',
            timeout: 1500
          })
        })
      }
      this.model.logo = logo
      this.saveCompany()
    },
    fetchData () {
      userSession.getFile(STORAGE_FILE).then((company) => {
        this.model = JSON.parse(company || '{}')
        setTimeout(() => { this.loadingPage = false }, 500)
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style>
</style>
