<template>
  <card type="user">
    <h5 class='text-left mb-4'> <strong>Preview</strong> </h5>
    <div class="author">
      <a href="#" @click='saveLogo'>
        <input type="file" accept="image/*" @change="onFileChange" id="file-input" ref='uploadImage' style='display:none;'>
        <img style='height:124px;width:124px;border-radius:0px;' class="avatar" :src="imageSrc" alt="Logo" id='imageLogo'>
        <h5 class="title">{{ company.company }}</h5>
      </a>
      <p class="description">
        {{company.firstName}} {{company.lastName}}
      </p>
    </div>

    <p class="card-description my-3 pb-3">
      {{company.address}}<br />
      {{company.city}} - {{company.country}} - {{company.zip}}<br />
      {{company.email}}<br /><br />
    </p>

    <div class='col-12 text-left' v-if='company.tax'>
      <h6>Tax Nº</h6>
      <div class='ml-2'>{{company.tax}}</div>
    </div>

    <div class='col-12 text-left mb-2 mt-3' v-if='company.comments'>
        <h6>Comments</h6>
        <div style="white-space: pre-line;" class='ml-2'>{{company.comments}}</div>
    </div>
    <div class='col-12 text-left mt-3 mb-5' v-if='company.payment'>
        <h6>Payment Method</h6>
        <div style="white-space: pre-line;" class='ml-2'>{{company.payment}}</div>
    </div>
  </card>
</template>

<script>
import {
  Card
} from '@/components/index'

import BaseButton from '@/components/BaseButton'
const LOGO_FILE = 'logo.json'

export default {
  components: {
    Card,
    BaseButton
  },
  props: {
    company: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data(){
    return {
      imageSrc: null
    }
  },
  methods: {
    saveLogo (event) {
      const elem = this.$refs.uploadImage
      elem.click()
    },
    onFileChange (e) {
      let reader = new FileReader();
      const file = e.target.files[0]
      var url = URL.createObjectURL(file)

      reader.onload = (event) => {
        const content = reader.result;
        document.getElementById('imageLogo').src = content
        userSession.putFile( file.name, content )
      };
      reader.onerror = (e) => {
        console.error(e)
      }
      reader.readAsDataURL(file);
      
      this.$emit('newLogo', file.name)
    },
    fetchFile(path) {
      if(path === null){
        this.imageSrc = null;
        return;
      }
      userSession.getFile(path).then((logoImage) => {
        this.imageSrc = logoImage;
      })
    }
  },

  mounted () {
    this.fetchFile(this.company.logo)
  }
}
</script>
