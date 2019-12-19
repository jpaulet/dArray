<template>
  <footer class="footer pt-0 pb-1">
    <div class="container-fluid px-2 row">
      <ul class="col-8 nav my-0 text-left pl-5">
        <li class="nav-item" v-if='false'>
          <a href="javascript:void(0)" class="nav-link">
            About Us
          </a>
        </li>
        <li class="nav-item">
          <a href="javascript:void(0)" class="nav-link" @click.prevent='showContent = true'>
            Support Us
          </a>
        </li>
        <li class="nav-item">
          <a href="https://jpaulet.typeform.com/to/sVUrrj" class="nav-link" target='_blank'>
            Contact Us & Bugs
          </a>
        </li>
        <li class="nav-item" v-if='false'>
          <a href="" class="nav-link" target='_blank'>
            Roadmap
          </a>
        </li>
        <li class="nav-item" v-if='false'>
          <a href="javascript:void(0)" class="nav-link">
            Terms & Privacity
          </a>
        </li>
      </ul>
      <div class="col-4 copyright my-0 text-right" style='margin-right:0px;'>
        &copy;
        {{ new Date().getFullYear() }} made with <i class="tim-icons icon-heart-2"></i> by
        <a href="http://www.jpaulet.com" alt='J.P. Aulet' target="_blank" style='color:#344675;'>J.P. Aulet</a>.
      </div>
    </div>

    <modal :show.sync="showContent" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg mt-2" style='transform:translate(0,0) !important;padding-top:80px;'>
      <template slot="header" class='row'>
        <h4 class="modal-title col-12 mt-3 mb-3" id="exampleModalLabel">Support Me, a solo indie maker</h4>
      </template>
      <div class="col-12 mb-3">
        <div class='col-8 text-dark' style='clear:both;margin:0px auto;'> 
          Hey! I'm J.P 👋, founder and solo developer of <strong>dArray</strong>. If you like my work, you could support me and my software journey!
          <br /><br />
          <strong>Thanks in advance 🙂</strong>
        </div>
        <div class="table-right" style="padding:20px 20px 30px 20px;">
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
        <div class="table-right pt-0" style="padding:20px 20px 30px 20px;">
          <table class='text-center' style='width:100%;'>
            <tr><th>Buy Me a Coffee</th></tr>
            <tr>
              <td class='text-center pt-1'>
                <a href='https://www.buymeacoffee.com/mpSEk0R' target='_blank'><img src='@/assets/img/landing/Button_orange.png' style='width:210px;margin:0px auto;opacity:0.8;'/></a>
              </td>
            </tr>
          </table>
        </div>
        <div class="table-right pt-0" style="padding:20px 20px 30px 20px;">
          <table class='text-center' style='width:100%;'>
            <tr><th>ProductHunt</th></tr>
            <tr>
              <td class='text-center pt-1'>
                <a href="https://www.producthunt.com/posts/darray?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-darray" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=176110&theme=dark" alt="dArray - The Private Accounting Software for your Business | Product Hunt Embed" style="width: 210px; height: 44px;" width="250px" height="54px" /></a>
              </td>
            </tr>
          </table>
        </div>
        <div class="table-right pt-o" style="padding:20px 20px 30px 20px;width:100%;">
          <table class='text-center' style='width:100%;'>
            <tr><th>Twitter</th></tr>
            <tr style='width:100%;'>
              <td class='' style='width:100%;'>
                <a href="https://twitter.com/darray_dapp?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false" style='color:#1d253b;'>Follow @darray_dapp</a> - <a href="https://twitter.com/jp_aulet?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false" style='color:#1d253b;'>Follow @jp_aulet</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </modal>

  </footer>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      showContent: false
    }
  },
  mounted () {
    this.$on('offline', () => {
        this.$notify({
          message: 'You are offline!',
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'danger',
          timeout: 2500
        })
    })
    this.$on('online', () => {
        this.$notify({
          message: 'You are online now!',
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'success',
          timeout: 2500
        })
    })
    let randomShow =  Math.floor(Math.random() * 100);
    if(randomShow === 0){
      this.showContent = true
    }
  }
}
</script>

<style scoped>
  #twitter-widget-0{
    min-width: 100% !important;
    width: 100% !important; 
  }
</style>