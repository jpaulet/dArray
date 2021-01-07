<template>
    <div class="content">
        <div class="">
          <div class='row'>
            <div class='col-6 text-left'>
              <h1 style='color:#000;line-height:28px;'>
                <span style='font-size:14px;margin-right:10px;'>Your Total Net Worth: </span> <strong>{{totalNet.toFixed(2)}} $</strong>
              </h1>
            </div>
            <div class='col-6 text-right'>
              <button class='btn btn-light btn-sm px-5 text-white' @click='showCrypto = true'>Add Crypto Tracker</button>
            </div>
          </div>
        </div>

        <div class="row">
            <div class='col-3' style='padding:10px;' v-for="(crypto, index) in cryptoList" :key="index">
                <card style='margin-bottom:0px;'>
                    <div style='position:absolute;top:5px;right:5px;opacity:0.8;'>
                        <button @click='showCrypto = true' class='btn btn-light text-white' style='border-radius:50px;height:30px;padding:8px 10px;line-height:18px;'>{{myCrypto[index]}}</button>
                    </div>

                    <template slot="header" style='padding:0px;'>
                        <h2 style='text-align:center;margin-bottom:0px; padding-bottom:0px;'>
                            <img :src='`/img/${index}.png`' style='max-width:50px;height:50px;margin-bottom:10px;' />
                            <br />{{index | capitalize}}
                        </h2>
                    </template>

                    <template v-if="currency == 'usd'">
                        <h3 style='margin-bottom:0px;'><strong>{{crypto.usd}} $</strong></h3>
                        <h6 style='margin-bottom:0px;'>({{ myCryptoValue[index].toFixed(2) }} $)</h6>
                        <br />24h Change:<span :class="(crypto.usd_24h_change > 0) ? 'green' : 'red'"> {{crypto.usd_24h_change.toFixed(2)}} $</span>
                        <br /><span>Market Cap: {{crypto.usd_market_cap.toFixed(2) | formatNumber}} $</span>
                    </template>

                    <template v-if="currency == 'eur'">
                        <h3 style='margin-bottom:0px;'><strong>{{crypto.eur}} €</strong></h3>
                        <h6 style='margin-bottom:0px;'>({{ myCryptoValue[index] }} €)</h6>
                        <br />24h Change:<span :class="(crypto.eur_24h_change > 0) ? 'green' : 'red'"> {{crypto.eur_24h_change.toFixed(2)}} €</span>
                        <br /><span>Market Cap: {{crypto.eur_market_cap.toFixed(2) | formatNumber}} €</span>
                    </template>
                </card>
            </div>
        </div>

        <modal :show.sync="showCrypto" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg" style='transform:translate(0,0);'>
            <template slot="header">
              <h3 class="modal-title ml-2" id="exampleModalLabel">Set Your Cryptos</h3>
            </template>
            <div class='row' style='padding:0px 30px;'>
                <div v-for="(crypto, index) in myCrypto" :key="index" class='col-3' style='padding:10px 20px;text-align:left;'>
                    <template  v-if='index !== "index"'>
                        {{index | capitalize}}: <br />
                        <input type='number' v-model='myCrypto[index]' />
                    </template>
                </div>
            </div>
            <div class='row' style="text-align:center;margin:20px auto;">
                <button style='margin:0px auto;' class="btn btn-light btn-sm px-4 px-md-5 text-white" fill="" @click='saveToFile()'>Save</button>
            </div>
        </modal>
    </div>
</template>

<script>
import { userSession } from '@/userSession'
import { Card, Modal } from '@/components/index'
var STORAGE_FILE = 'mycrypto.json'

export default {
  components: {
    Card, Modal
  },
  data () {
    return {
      showCrypto: false,
      cryptoList: null,
      totalNet: 0,
      myCrypto: {
        'aave': 1,
        'bancor': 0,
        'band-protocol': 0,
        'binancecoin': 0,
        'bitcoin': 0,
        'bitcoin-cash': 0,
        'cardano': 0,
        'chainlink': 0,
        'cosmos': 0,
        'dash': 0,
        'eos': 0,
        'ethereum': 0,
        'kyber-network': 0,
        'litecoin': 0,
        'monero': 0,
        'polkadot': 0,
        'ripple': 0,
        'stellar': 0,
        'tether': 0,
        'tezos': 0,
        'the-graph': 0,
        'uma': 0,
        'uniswap': 0,
        'yearn-finance': 0
      },
      myCryptoValue: {
        'aave': 0,
        'bancor': 0,
        'band-protocol': 0,
        'binancecoin': 0,
        'bitcoin': 0,
        'bitcoin-cash': 0,
        'cardano': 0,
        'chainlink': 0,
        'cosmos': 0,
        'dash': 0,
        'eos': 0,
        'ethereum': 0,
        'kyber-network': 0,
        'litecoin': 0,
        'monero': 0,
        'polkadot': 0,
        'ripple': 0,
        'stellar': 0,
        'tether': 0,
        'tezos': 0,
        'the-graph': 0,
        'uma': 0,
        'uniswap': 0,
        'yearn-finance': 0
      },
      isLoading: true,
      currency: 'usd'
    }
  },
  mounted () {
    this.fetchLocalData()
  },
  methods: {
    fetchExternalData () {
      this.axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin%2Cchainlink%2Ctezos%2Ctether%2Cripple%2Cbitcoin-cash%2Cpolkadot%2Ccardano%2Cbinancecoin%2Cstellar%2Cmonero%2Ceos%2Cuniswap%2Caave%2Ccosmos%2Cdash%2Cband-protocol%2Cyearn-finance%2Cuma%2Cbancor%2Ckyber-network%2Cthe-graph&vs_currencies=usd%2Ceur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`).then(response => {
        this.cryptoList = response.data
        this.calculateTotal()
      })
    },
    fetchLocalData () {
      userSession.getFile(STORAGE_FILE, this.$DECRYPT).then((myCrypto) => {
        if (myCrypto) {
          this.myCrypto = JSON.parse(myCrypto)
        }
        this.fetchExternalData()
      })
    },
    saveToFile () {
      userSession.putFile(STORAGE_FILE, JSON.stringify(this.myCrypto), this.$ENCRYPT)
      this.calculateTotal()
      this.showCrypto = false
    },
    calculateTotal () {
      let i = 0
      for (i in this.cryptoList) {
        this.myCryptoValue[i] = this.myCrypto[i] * this.cryptoList[i].usd
        this.totalNet += this.myCryptoValue[i]
      }
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    formatNumber: function (n) {
      let ending = ['K', 'M', 'B', 'T']
      if (n.length < 4) {
        return n
      } else {
        return `${n[0]}${n[1] !== '0' ? `.${n[1]}` : ''} ${ending[Math.floor((n.length - 1) / 3) - 1]}`
      }
    }
  }
}
</script>

<style>
.red{
    color:#800303;
}
.green{
    color:#03800b;
}
</style>
