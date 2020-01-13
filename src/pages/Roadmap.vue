<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12" v-if='!loadingPage'>
        <card>
          <template slot="header">
            <h5 class="title">Roadmap</h5>
          </template>

          <div class="col-12 col-md-8 col-lg-6 mt-3" style='margin:0px auto;'>
            <h6>Done</h6>
            <div class="col-12 pr-md-1 text-left">
              <ul>
                <li style='line-height:22px;'><span class='badge badge-light'>31/12/19</span> - Improved mobile responive & solved bugs in mobile view.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>30/12/19</span> - Solved problems with tabs.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>28/12/19</span> - Added <i>`Cryptocurrencies`</i> page.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>27/12/19</span> - Solved bugs in <i>`Invoice`</i> & <i>`Expenses`</i> page.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>23/12/19</span> - Improved <i>`Settings`</i> page visually. Added required fields.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>19/12/19</span> - Added <i>`Roadmap`</i> page.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>18/12/19</span> - Added <i>`Multiple Currencies`</i> support.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>12/12/19</span> - Improved <i>`Invoices & Expenses`</i> creation.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>10/12/19</span> - Solved <i>`Dashboard`</i> bugs.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>05/12/19</span> - Improved <i>`Files`</i> upload & download.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>04/12/19</span> - Improved all pages with responsive features.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>04/12/19</span> - Added offline/online badge.</li>
                <li style='line-height:22px;'><span class='badge badge-light'>30/11/19</span> - Launched v1.0</li>
              </ul>
            </div> 

            <h6 class='mt-5'>ToDo</h6>
            <div class="col-12 pr-md-1 text-left">
              <ul style='line-height:22px;'>
                <li style='line-height:22px;'>Create <i>`Reports Page`</i>.</li>
              </ul>
            </div>            
          </div>

          <div class="col-12 col-md-8 col-lg-6 mt-5 text-center pt-5" style='margin:0px auto;'>
            Have any suggestion? Question? Found any bug? <br />Contact me throught <a href='https://jpaulet.typeform.com/to/sVUrrj' style='color:#344675;font-weight:600;'>this form</a>.
          </div>
          <div class="col-12 col-md-8 col-lg-6 mt-3 text-center mb-5" style='margin:0px auto;'>
            Want to support me & my job?
            <div class='row mt-3'>
              <div class="col-6" style="padding:20px 20px 30px 20px;">
                <table class='text-center' style='width:100%;'>
                  <tr><th>Patreon</th></tr>
                  <tr>
                    <td class='text-center pt-1'>
                      <a href="https://www.patreon.com/bePatron?u=11297370" target='_blank'>
                        <img src='@/assets/img/Patreon+Button.png' style='width:210px;margin:0px auto;opacity:0.8;' />
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="col-6" style="padding:20px 20px 30px 20px;">
                <table class='text-center' style='width:100%;'>
                  <tr><th>Buy Me a Coffee</th></tr>
                  <tr>
                    <td class='text-center pt-1'>
                      <a href='https://www.buymeacoffee.com/mpSEk0R' target='_blank'><img src='@/assets/img/landing/Button_orange.png' style='width:210px;margin:0px auto;opacity:0.8;'/></a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </card>
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
import {
  Card
} from '@/components/index'

export default {
  components: {
    Card,
    BreedingRhombusSpinner
  },
  data () {
    return {
      loadingPage: true      
    }
  },
  methods: {
    showModal(){
      var x = document.getElementByClassName("modal");
      x.style.display = "block";
    }
  },
  mounted () {
    this.loadingPage = false
  }
}
</script>
