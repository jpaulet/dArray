<template>
  <footer class="footer pt-0 pb-1">
    <div class="container-fluid px-2 row">
      <ul class="col-4 nav my-0 text-left pl-5">
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
      <div class="col-8 copyright my-0 text-right" style='margin-right:0px;'>
        &copy;
        {{ new Date().getFullYear() }} made with <i class="tim-icons icon-heart-2"></i> by
        <a href="http://www.jpaulet.com" alt='J.P. Aulet' target="_blank" style='color:#344675;'>J.P. Aulet</a>.
      </div>
    </div>

    <modal :show.sync="showContent" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg mt-2" style='transform:translate(0,0) !important;padding-top:50px;'>
      <template slot="header">
        <h4 class="modal-title ml-2" id="exampleModalLabel">Support Us</h4>
      </template>
      <div class="col-12 mb-3">
        <div class="table-right" style="padding:20px 20px 30px 20px;width:100%;">
          <table class='text-center' style='width:100%;'>
            <tr><th>Twitter</th></tr>
            <tr style='width:100%;'>
              <td class='' style='width:100%;'>
                <a href='https://twitter.com/dArray_dapp/status/1199727746114605057' target='_blank'><img src='@/assets/img/twitter_img.png' alt='Twitter img' style='border:1px solid #eee;boder-radius:8px;padding:6px;' /></a>
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
        <div class="table-right pt-0" style="padding:20px 20px 30px 20px;">
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
  }
}
</script>

<style scoped>
  #twitter-widget-0{
    min-width: 100% !important;
    width: 100% !important; 
  }
</style>