<template>
  <card type="user" style='color:#888;'>
    <h5 class='text-left mb-4'> <strong>PREVIEW</strong> </h5>
    <div class="author">
      <a @click='saveLogo' style='width:100%;height:100%;display:block;cursor:pointer;'>
        <input type="file" accept="image/*" @change="onFileChange" id="file-input" ref='uploadImage' style='display:none;'>
        <img v-if='!imageLogo' style='height:124px;width:124px;border-radius:0px;' class="avatar" src="@/assets/img/company.png" alt="Logo Default" id='imageLogo' v-on:load='fetchFile'>
        <img v-if='imageLogo' style='height:124px;width:124px;border-radius:0px;' class="avatar" :src="imageSrc" alt="Logo" id='imageLogo'>
        <div class='col-12 text-center'><button class='btn btn-light btn-sm' style='font-size:11px;clear:both;background:#eee;color:#344675;background-color:#eee;'> Upload your logo </button></div>
      </a>
    </div>
    <div class="col-12 text-left mb-2 mt-4 pl-3">
      <h5 class="title mb-1">{{ company.company }}</h5>
      <div class='ml-2'>
        {{company.firstName}} {{company.lastName}}<br />
        {{company.address}}<br />
        {{company.city}} - {{company.country}} - {{company.zip}}<br />
        {{company.email}}<br />
      </div>
    </div>
    <div class='col-12 text-left mb-2 mt-3' v-if='company.tax'>
      <h6 style='text-transform: capitalize;color:#555;'>Tax Nº</h6>
      <div class='ml-2'>{{company.tax}}</div>
    </div>
    <div class='col-12 text-left mb-2 mt-3' v-if='company.comments'>
      <h6 style='text-transform: capitalize;color:#555;'>Comments</h6>
      <div style="white-space: pre-line;" class='ml-2'>{{company.comments}}</div>
    </div>
    <div class='col-12 text-left mb-2 mt-3' v-if='company.payment'>
      <h6 style='text-transform: capitalize;color:#555;'>Payment Method</h6>
      <div style="white-space: pre-line;" class='ml-2'>{{company.payment}}</div>
    </div>
    <div class='col-12 text-left mb-2 mt-3'>
      <h6 style='text-transform: capitalize;color:#555;'>Currency:</h6>
      <CurrencyInput v-model="value" :currency="currency" :locale="company.locale" class="demo__currency-input" style='border:0px;padding-left:10px;background:none;' disabled='disabled' />
    </div>
  </card>
</template>
<script>
import { userSession } from '@/userSession'
import { CurrencyInput } from 'vue-currency-input'
import {
  Card
} from '@/components/index'

export default {
  components: {
    Card,
    CurrencyInput
  },
  props: {
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      imageSrc: null,
      value: 1234.5
    }
  },
  methods: {
    saveLogo (event) {
      const elem = this.$refs.uploadImage
      elem.click()
    },
    onFileChange (e) {
      let reader = new FileReader()
      const file = e.target.files[0]

      reader.onload = (event) => {
        const content = reader.result
        document.getElementById('imageLogo').src = content
        userSession.putFile(file.name, content)
      }
      reader.readAsDataURL(file)

      this.$emit('newLogo', file.name)
    },
    fetchFile () {
      this.$nextTick(() => {
        let path = this.company.logo
        if (path === null) {
          return null
        }
        userSession.getFile(path).then((logoImage) => {
          if (logoImage) {
            this.imageSrc = logoImage
          }
        })
      })
    }
  },
  computed: {
    imageLogo () {
      if (this.company.logo !== null) {
        this.fetchFile()
      }
      return this.company.logo
    },
    currency () {
      return { [this.company.position]: this.company.currencySymbol }
    }
  }
}
</script>
