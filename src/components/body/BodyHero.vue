<template>
  <div class="content">
    <card v-if='openNewTracker' style='background-color: #fff;'>
      <template slot="header">
            <div class='row'>
                <h6 class='col-8'><a href='' @click.prevent='openNewTracker = false'><i class="tim-icons icon-minimal-left text-light mr-5 pr-4"></i></a> New Tracker</h6>
                <a class='col-4 float-right text-right' href='' @click.prevent='openNewTracker = false'><i class="tim-icons icon-simple-remove text-dark mr-3"></i></a>
            </div>
        </template>

        <div class='row mb-3 mt-3 px-4 pl-0'>
          <div class='col-12 text-left'>
            <label class='control-label'>Coin</label>
            <select v-model="crypto.coin" class='form-control' style='border:1px solid rgba(34, 42, 66, 0.4);'>
              <option :key='`optioncoin`+index' v-for='(coin,index) in sharedState.cryptoCurrencies' :value='coin.name'>{{coin.name}}</option>
            </select>
          </div>
          <div class='col-12 text-left mt-3'>
            <base-input label="* Amount" v-model="crypto.amount" placeholder="Amount" required></base-input>
          </div>
        </div>

        <template slot="footer">
          <div class='col-12'>
            <base-button type="light" fill class='float-right' @click='saveCrypto()'>Save</base-button>
          </div>
        </template>
    </card>

    <template v-if='!openNewTracker && showDashboard'>
      <div class='row mb-3'>
        <div class='col-6 text-left'>
          <button type="button" class="btn btn-light btn-sm px-4 px-md-5 text-white ml-4" fill="" @click="openNewTracker = true">+ New Tracker</button>
        </div>
        <div class="col-6 text-right" style='margin-top:2px;'>
          <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
           <label v-for="(option, index) in coinOptions" :key="option" class="btn btn-light btn-sm btn-simple" :class="{' active' : (activeIndex === index) }" :id="index" @click.prevent="changeViewType(index,option)" style='margin-left:-2px;'>
              <input type="radio" name="options" autocomplete="off" :checked="activeIndex === index">
              {{ option }}
           </label>
          </div>
        </div>
      </div>

      <div class="columns" style="margin: 0px 10px">
        <div v-for="cryptoCurrency in firstFiveCryptoCurrencies" class="column">
          <router-link :to="`cryptocurrencies/${cryptoCurrency.id}`">
            <div class="card mb-0" style='background-color: #fff;'>
              <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}" style='height:80px;'>
                <figure class="image is-4by3">
                  <img :src="`/img/${cryptoCurrency.id}_logo.png`" style='max-width:150px;'>
                </figure>
              </div>
              <div class="card-content" style='height:90px;'>
                <p class="title is-5 mb-3 mt-3" style='position:relative;' :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.name }} <span class='badge badge-light' style='font-size:8px;border-radius:8px;'>{{cryptoCurrency.rank}}</span></p>
                <p class="title price-title is-5" style='position:relative;' :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }}
                  <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ getPercentChange(cryptoCurrency) }}%
                    <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                    <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                  </span>
                </p>
                <div v-if='false' style='position:relative;' class='text-dark' v-html='getTrackerPrice(cryptoCurrency.id)'></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="columns" style="margin: 0px 10px">
        <div v-for="cryptoCurrency in secondFiveCryptoCurrencies" class="column">
          <router-link :to="`cryptocurrencies/${cryptoCurrency.id}`">
            <div class="card mb-0" style='background-color: #fff;'>
              <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}" style='height:80px;'>
                <figure class="image is-4by3">
                  <img :src="`/img/${cryptoCurrency.id}_logo.png`" style='max-width:150px;'>
                </figure>
              </div>
              <div class="card-content" style='height:90px;'>
                <p class="title is-5 mb-3 mt-3" style='position:relative;' :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.name }} <span class='badge badge-light' style='font-size:8px;border-radius:8px;'>{{cryptoCurrency.rank}}</span></p>
                <p class="title price-title is-5" style='position:relative;' :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }}
                  <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ getPercentChange(cryptoCurrency) }}%
                    <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                    <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                  </span>
                </p>
                <div v-if='false' style='position:relative;' class='text-dark' v-html='getTrackerPrice(cryptoCurrency.id)'></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="columns" style="margin: 0px 10px">
        <div v-for="cryptoCurrency in thirdFiveCryptoCurrencies" class="column">
          <router-link :to="`cryptocurrencies/${cryptoCurrency.id}`">
            <div class="card mb-0" style='background-color: #fff;'>
              <div class="card-image" :class="{'card-image-iframe': isOpenedInIFrame}" style='height:80px;'>
                <figure class="image is-4by3">
                  <img :src="`/img/${cryptoCurrency.id}_logo.png`" style='max-width:150px;'>
                </figure>
              </div>
              <div class="card-content" style='height:90px;'>
                <p class="title is-5 mb-3 mt-3" style='position:relative;' :class="{'title-iframe': isOpenedInIFrame}">{{ cryptoCurrency.name }} <span class='badge badge-light' style='font-size:8px;border-radius:8px;'>{{cryptoCurrency.rank}}</span></p>
                <p class="title price-title is-5" style='position:relative;' :class="{'price-title-iframe': isOpenedInIFrame}">${{ getPriceUSD(cryptoCurrency) }}
                  <span :class="{'positive-percent-change': cryptoCurrency.positivePercentChange, 'negative-percent-change': !cryptoCurrency.positivePercentChange}"> {{ getPercentChange(cryptoCurrency) }}%
                    <icon class="arrow-up" name="arrow-up" height="9" width="9"></icon>
                    <icon class="arrow-down" name="arrow-down" height="9" width="9"></icon>
                  </span>
                </p>
                <div v-if='false' style='position:relative;' class='text-dark' v-html='getTrackerPrice(cryptoCurrency.id)'></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>

    <template v-if='!openNewTracker && !showDashboard'>
      <card style='background-color:#fff; min-height:650px;'>
        <div class='row mb-3'>
          <div class='col-6 text-left'>
            <button type="button" class="btn btn-light btn-sm px-4 px-md-5 text-white" fill="" @click="openNewTracker = true">+ New Tracker</button>
          </div>
          <div class="col-6 text-right" style='margin-top:2px;'>
            <div class="btn-group btn-group-toggle" data-toggle="buttons float-right">
             <label v-for="(option, index) in coinOptions" :key="option" class="btn btn-light btn-sm btn-simple" :class="{' active' : (activeIndex === index) }" :id="index" @click.prevent="changeViewType(index,option)">
              <input type="radio" name="options" autocomplete="off" :checked="activeIndex === index">
              {{ option }}
           </label>
            </div>
          </div>
        </div>
        <h6  v-if='cryptos.length' class="title d-inline text-left float-left mb-4 mt-3 pl-1">Your Portfolio ({{cryptos.length}})</h6>
        <div v-if='cryptos.length' class="table-responsive text-left mb-3" style='overflow-x:inherit;'>
          <table class='table tablesorter'>
            <thead class="text-primary">
              <tr>
                <th class='text-left'>COIN</th>
                <th class='text-right'>AMOUNT</th>
                <th class='text-right pr-3'>TOTAL</th>
                <th class='d-none d-sm-table-cell text-center'>STATUS</th>
                <th class='d-none d-sm-table-cell text-right'>1 HOUR</th>
                <th class='d-none d-sm-table-cell text-right'>1 DAY</th>
                <th class='d-none d-sm-table-cell text-right'>1 WEEK</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,index) in cryptos" :key='index'>
                <td class="text-left">
                  <p class="title">{{row.coin}}</p>
                </td>
                <td class="text-right">
                  {{row.amount}}
                </td>
                <td class="text-right pr-3" v-html='getTrackerPrice(row.coin)'></td>
                <td class="text-center d-none d-sm-table-cell" v-html='getStatusPrice(row.coin)'></td>
                <td class="d-none d-sm-table-cell text-right" v-html='get1HourPrice(row.coin)'></td>
                <td class="d-none d-sm-table-cell text-right" v-html='get1DayPrice(row.coin)'></td>
                <td class="d-none d-sm-table-cell text-right" v-html='get1WeekPrice(row.coin)'></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if='!cryptos.length && !loadingPage' class='py-4 text-center my-4'>
            <p class='mt-3'>No cryptocurrencies trackers yet. </p>
            <img src='@/assets/img/expense.jpg' class='mt-3 mb-5' height='200' />
        </div>
      </card>
    </template>
  </div>
</template>

<script>
import { store } from '../../store.js'
import { BreedingRhombusSpinner } from 'epic-spinners'
import {
  Card, BaseButton, BaseCheckbox, BaseInput, Modal
} from '@/components/index'

var CRYPTO_FILE = 'cryptos.json'

export default {
  props: {},
  name: 'bodyHero',
  components: {
    Card,
    BaseButton,
    BaseInput,
    BaseCheckbox,
    Modal,
    BreedingRhombusSpinner
  },
  data () {
    return {
      loadingPage: false,
      sharedState: store.state,
      isOpenedInIFrame: false,
      openNewTracker: false,
      crypto: {
        coin: null,
        amount: 0
      },
      cryptos: [],
      activeIndex: 0,
      showDashboard: true,
      coinOptions: [
        'Dashboard',
        'Portfolio'
      ]
    }
  },
  created () {
    store.getCryptoCurrencies()
    store.getTotalMarketCapUSD()

    if (window.self !== window.top) {
      this.isOpenedInIFrame = true
    }
    this.fetchData()
  },
  computed: {
    firstFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(0, 5)
    },
    secondFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(5, 10)
    },
    thirdFiveCryptoCurrencies () {
      return this.sharedState.cryptoCurrencies.slice(10, 15)
    }
  },
  methods: {
    getTrackerPrice (coin) {
      if (!coin) { return }
      let indexCoin = this.cryptos.findIndex((item) => {
        return item.coin.toLowerCase() === coin.toLowerCase()
      })

      if (indexCoin > -1) {
        var tracked = this.cryptos[indexCoin]
        let indexCoins = this.sharedState.cryptoCurrencies.findIndex((item) => {
          return item.id.toLowerCase() === coin.toLowerCase()
        })
        var cryptoCoin = this.sharedState.cryptoCurrencies[indexCoins]

        return `<div class="tracker" style="font-size:12px;">
                  <strong style="font-size:16px;">` + Number(parseFloat(tracked.amount) * parseFloat(cryptoCoin.price_usd)).toFixed(2) + `</strong> $
                </div>`
      } else {
        return `<div><br /></div>`
      }
    },
    getStatusPrice (coin) {
      if (!coin) { return }
      let indexCoin = this.cryptos.findIndex((item) => {
        return item.coin.toLowerCase() === coin.toLowerCase()
      })

      if (indexCoin > -1) {
        var tracked = this.cryptos[indexCoin]
        let indexCoins = this.sharedState.cryptoCurrencies.findIndex((item) => {
          return item.id.toLowerCase() === coin.toLowerCase()
        })
        var cryptoCoin = this.sharedState.cryptoCurrencies[indexCoins]

        if (!(cryptoCoin.percent_change_24h.indexOf('-') > -1)) {
          return `<span class='text-success'>⬆️</span>`
        } else {
          return `<span class='text-danger'>⬇️</span>`
        }
      } else {
        return `<div><br /></div>`
      }
    },
    get1DayPrice (coin) {
      if (!coin) { return }
      let indexCoin = this.cryptos.findIndex((item) => {
        return item.coin.toLowerCase() === coin.toLowerCase()
      })

      if (indexCoin > -1) {
        var tracked = this.cryptos[indexCoin]
        let indexCoins = this.sharedState.cryptoCurrencies.findIndex((item) => {
          return item.id.toLowerCase() === coin.toLowerCase()
        })
        var cryptoCoin = this.sharedState.cryptoCurrencies[indexCoins]

        if (cryptoCoin.percent_change_24h > 0) {
          return `<span class='text-success'>+` + cryptoCoin.percent_change_24h + `%</span>`
        } else {
          return `<span class='text-danger'>` + cryptoCoin.percent_change_24h + `%</span>`
        }
      } else {
        return `?`
      }
    },
    get1WeekPrice (coin) {
      if (!coin) { return }
      let indexCoin = this.cryptos.findIndex((item) => {
        return item.coin.toLowerCase() === coin.toLowerCase()
      })

      if (indexCoin > -1) {
        var tracked = this.cryptos[indexCoin]
        let indexCoins = this.sharedState.cryptoCurrencies.findIndex((item) => {
          return item.id.toLowerCase() === coin.toLowerCase()
        })
        var cryptoCoin = this.sharedState.cryptoCurrencies[indexCoins]

        if (cryptoCoin.percent_change_7d > 0) {
          return `<span class='text-success'>+` + cryptoCoin.percent_change_7d + `%</span>`
        } else {
          return `<span class='text-danger'>` + cryptoCoin.percent_change_7d + `%</span>`
        }
      } else {
        return `?`
      }
    },
    get1HourPrice (coin) {
      if (!coin) { return }
      let indexCoin = this.cryptos.findIndex((item) => {
        return item.coin.toLowerCase() === coin.toLowerCase()
      })

      if (indexCoin > -1) {
        var tracked = this.cryptos[indexCoin]
        let indexCoins = this.sharedState.cryptoCurrencies.findIndex((item) => {
          return item.id.toLowerCase() === coin.toLowerCase()
        })
        var cryptoCoin = this.sharedState.cryptoCurrencies[indexCoins]

        if (cryptoCoin.percent_change_1h > 0) {
          return `<span class='text-success'>+` + cryptoCoin.percent_change_1h + `%</span>`
        } else {
          return `<span class='text-danger'>` + cryptoCoin.percent_change_1h + `%</span>`
        }
      } else {
        return `?`
      }
    },
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
    },
    saveCrypto () {
      let indexCoin = this.cryptos.findIndex((item) => {
        return item.coin === this.crypto.coin
      })
      if (indexCoin > -1) {
        this.cryptos.splice(indexCoin, 1)
      }

      this.cryptos.push(this.crypto)
      userSession.putFile(CRYPTO_FILE, JSON.stringify(this.cryptos), this.$ENCRYPT)
      this.crypto = {
        coin: null,
        amount: 0
      }
      this.openNewTracker = false
    },
    fetchData () {
      userSession.getFile(CRYPTO_FILE, this.$DECRYPT).then((crypto) => {
        if (crypto) {
          this.cryptos = JSON.parse(crypto)
        }else{
          this.cryptos = []
        }
        setTimeout(() => { this.loadingPage = false }, 500)
      })
    },
    changeViewType (index, option) {
      this.activeIndex = index

      if (option === 'Dashboard') {
        this.showDashboard = true
      } else {
        this.showDashboard = false
      }
    }
  }
}
</script>

<style scoped>
.text-success{
  color:#428679 !important;
}
.text-danger{
  color:#a44464 !important;
}
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

}
 .card .card-content .title-iframe {
   font-size: 0.9rem;
}
 .card .card-content .price-title {
   font-size: 1rem;
   font-weight: 600;
}
 .card .card-content .price-title .positive-percent-change {
   font-size: 0.9em;
   color: #428679;
}
 .card .card-content .price-title .positive-percent-change .arrow-down {
   display: none;
}
 .card .card-content .price-title .negative-percent-change {
   font-size: 0.9em;
   color: #a44464;
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
