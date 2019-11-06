<template>
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
        <base-input label="Email address" type="email" placeholder="mike@email.com">
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
        <base-input label="Tax Nº" v-model="model.tax" placeholder="Tax">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 text-left">
        <textarea class='form-control px-2' v-model='model.comments' placeholder="Introduce any comment / note. It will appear by default in all invoices" style='border:1px solid rgba(34, 42, 66, 0.4);border-radius:6px;'></textarea>
      </div>
      <div class="col-md-6 text-left">
        <textarea class='form-control px-2' v-model='model.payment' placeholder="Payment info - It will appear by default in all invoices" style='border:1px solid rgba(34, 42, 66, 0.4);border-radius:6px;'></textarea>
      </div>
    </div>

    <template slot="footer">
      <base-button type="light" fill class='float-right'>Save</base-button>
    </template>
  </card>
</template>
<script>
import {
  Card,
  BaseInput
} from '@/components/index'

import BaseButton from '@/components/BaseButton'

export default {
  components: {
    Card,
    BaseInput,
    BaseButton
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }

}
</script>
<style>

</style>
