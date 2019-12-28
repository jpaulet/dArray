<template>
  <div class="content">
    <card v-if='openNewTracker'>
      <template slot="header">
            <div class='row'>
                <h6 class='col-8'><a href='' @click.prevent='openNewTracker = false'><i class="tim-icons icon-minimal-left text-light mr-5 pr-4"></i></a> New Tracker</h6>
                <a class='col-4 float-right text-right' href='' @click.prevent='openNewTracker = false'><i class="tim-icons icon-simple-remove text-dark mr-3"></i></a>
            </div>
        </template>

        <div class='row mb-3 mt-3 px-4 pl-0'>
          <div class='col-12'>
            <label class='control-label'>Coin</label>
            <select v-model="cypto.coin" class='form-control' style='border:1px solid rgba(34, 42, 66, 0.4);'>
              <option v-for='(coin,index) in sharedState.cryptoCurrencies' :value='coin.name'>{{coin.name}}</option>
            </select>
          </div>
          <div class='col-12'>
            <base-input label="* Amount" v-model="crypto.amount" placeholder="Amount" required></base-input>
          </div>
        </div>

        <template slot="footer">
          <base-button type="light" fill class='float-right' @click='saveCrypto()'>Save</base-button>
        </template>
    </card>

    <template v-if='!openNewTracker'>
      <div class='row col-12'>
        <button type="button" class="btn btn-light btn-sm px-4 px-md-5 text-white ml-4" fill="" @click="openNewTracker = true">+ New Tracker</button>
      </div>

      <div class="columns" style="margin: 0px 10px">
        <div v-for="cryptoCurrency in firstFiveCryptoCurrencies" class="column">
          <router-link :to="`cryptocurrencies/${cryptoCurrency.id}`">
            <div class="card mb-0" style='background-color: #fff;'>
              <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}">
                <figure class="image is-4by3">
                  <img :src="`/img/${cryptoCurrency.id}_logo.png`">
                </figure>
              </div>
              <div class="card-content">
                <p class="title is-5 mb-5" :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.name }} <span class='badge badge-light' style='font-size:8px;border-radius:8px;'>{{cryptoCurrency.rank}}</span></p>
                <p class="title price-title is-5" :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }} 
                  <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ getPercentChange(cryptoCurrency) }}% 
                    <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                    <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                  </span>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="columns" style="margin: 0px 10px">
        <div v-for="cryptoCurrency in secondFiveCryptoCurrencies" class="column">
          <router-link :to="`cryptocurrencies/${cryptoCurrency.id}`">
            <div class="card mb-0" style='background-color: #fff;'>
              <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}">
                <figure class="image is-4by3">
                  <img :src="`/img/${cryptoCurrency.id}_logo.png`">
                </figure>
              </div>
              <div class="card-content">
                <p class="title is-5 mb-5" :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.name }} <span class='badge badge-light' style='font-size:8px;border-radius:8px;'>{{cryptoCurrency.rank}}</span></p>
                <p class="title price-title is-5" :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }}  
                  <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ getPercentChange(cryptoCurrency) }}% 
                    <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                    <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                  </span>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="columns" style="margin: 0px 10px">
        <div v-for="cryptoCurrency in thirdFiveCryptoCurrencies" class="column">
          <router-link :to="`cryptocurrencies/${cryptoCurrency.id}`">
            <div class="card mb-0" style='background-color: #fff;'>
              <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}">
                <figure class="image is-4by3">
                  <img :src="`/img/${cryptoCurrency.id}_logo.png`">
                </figure>
              </div>
              <div class="card-content">
                <p class="title is-5 mb-5" :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.name }} <span class='badge badge-light' style='font-size:8px;border-radius:8px;'>{{cryptoCurrency.rank}}</span></p>
                <p class="title price-title is-5" :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }}  
                  <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ getPercentChange(cryptoCurrency) }}% 
                    <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                    <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                  </span>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { store } from '../../store.js'
import { BreedingRhombusSpinner } from 'epic-spinners'
import {
  Card, BaseButton, BaseCheckbox, BaseTable, Modal
} from '@/components/index'

export default {
  props: {},
  name: 'bodyHero',
  components: {
    Card,
    BaseButton,
    BaseTable,
    BaseCheckbox,
    Modal,
    BreedingRhombusSpinner
  },
  data () {
    return {
      sharedState: store.state,
      isOpenedInIFrame: false,
      openNewTracker: false
    }
  },
  created () {
    if (window.self !== window.top) {
      this.isOpenedInIFrame = true
    }
  },
  computed: {
    firstFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(0, 5)
    },
    secondFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(5, 10)
    },
    thirdFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(10,15)
    }
  },
  methods: {
    getDifferenceInChange (cryptoCurrency) {
      cryptoCurrency.positivePercentChange = !(cryptoCurrency.percent_change_24h.indexOf('-') > -1)
      cryptoCurrency.percentChange24h = cryptoCurrency.percent_change_24h.replace(/^-/, '')
    },
    getPriceUSD (cryptoCurrency) {
      const priceUsd = cryptoCurrency.price_usd
      return Number(priceUsd).toFixed(2)
    },
    getPercentChange (cryptoCurrency) {
      return cryptoCurrency.percentChange24h
    }
  }
}
</script>

<style scoped>
.card {
   background-color: initial;
   position: relative;
   cursor: pointer;
   box-shadow: 0 0 50px 5px rgba(0, 0, 0, .25);
}
 @media screen and (max-width: 768px) {
   .card {
     max-width: 300px;
     display: block;
     margin: 0 auto;
  }
}
 @media screen and (max-width: 590px) {
   .card {
     max-width: 200px;
  }
}
 .card:hover {
   border-radius: 4px;
   box-shadow: 0 0 5px 0 #fd6721;
   transition: 0.5s;
}
 .card .card-image .image {
   top: -15px;
}
 @media screen and (max-width: 590px) {
   .card .card-image .image img {
     height: 90%;
     width: 90%;
     margin: 0 auto;
  }
}
 .card .card-image-iframe .image {
   top: -23px;
}
 .card .card-content {
   padding: 0;
}
 .card .card-content .title {
   position: absolute;
   bottom: 15%;
   left: 0;
   right: 0;
}
 .card .card-content .title-iframe {
   font-size: 0.9rem;
   position: absolute;
   bottom: 12%;
   left: 0;
   right: 0;
}
 .card .card-content .price-title {
   font-size: 1rem;
   font-weight: 600;
}
 .card .card-content .price-title .positive-percent-change {
   font-size: 0.9em;
   color: #00d1b2;
}
 .card .card-content .price-title .positive-percent-change .arrow-down {
   display: none;
}
 .card .card-content .price-title .negative-percent-change {
   font-size: 0.9em;
   color: #ff3860;
}
 .card .card-content .price-title .negative-percent-change .arrow-up {
   display: none;
}
 .card .card-content .price-title-iframe {
   font-size: 0.9rem;
}
 @-webkit-keyframes spinner {
   from {
     -webkit-transform: rotateY(0deg);
  }
   to {
     -webkit-transform: rotateY(-360deg);
  }
}
 @keyframes spinner {
   from {
     -moz-transform: rotateY(0deg);
     -ms-transform: rotateY(0deg);
     transform: rotateY(0deg);
  }
   to {
     -moz-transform: rotateY(-360deg);
     -ms-transform: rotateY(-360deg);
     transform: rotateY(-360deg);
  }
} 
</style>
