<template>
  <footer class="footer pt-0">
    <div class="container-fluid px-2">
      <ul class="nav">
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
        <li class="nav-item" v-if='false'>
          <a href="javascript:void(0)" class="nav-link">
            Terms & Privacity
          </a>
        </li>
      </ul>
      <div class="copyright">
        &copy;
        {{ new Date().getFullYear() }} made with <i class="tim-icons icon-heart-2"></i> by
        <a href="http://www.jpaulet.com" alt='J.P. Aulet' target="_blank" style='color:#344675;'>J.P. Aulet</a>.
      </div>
    </div>

    <modal :show.sync="showContent" body-classes="p-0" modal-classes="modal-dialog-centered modal-md mt-2" style='transform:translate(0,0) !important;padding-top:50px;'>
      <template slot="header">
        <h4 class="modal-title ml-2" id="exampleModalLabel">Support Us</h4>
      </template>
      <div class="col-12 mb-3">
        <div class="table-right" style="padding:20px 20px 30px 20px;width:100%;">
          <table class='text-center' style='width:100%;'>
            <tr><th>Twitter</th></tr>
            <tr style='width:100%;'>
              <td class='' style='width:100%;'>
                <blockquote class="twitter-tweet" style='width:100%;min-width:100% !important;'>
                  <p lang="en" dir="ltr">
                    Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a>
                  </p>
                  &mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a>
                </blockquote>
              </td>
            </tr>
          </table>
        </div>
        <div class="table-right pt-0" style="padding:20px 20px 30px 20px;">
          <table class='text-center' style='width:100%;'>
            <tr><th>Buy Me a Coffee</th></tr>
            <tr>
              <td class='text-center pt-1'>
                <a href=''><img src='@/assets/img/landing/Button_orange.png' style='width:210px;margin:0px auto;opacity:0.8;'/></a>
              </td>
            </tr>
          </table>
        </div>
        <div class="table-right pt-0" style="padding:20px 20px 30px 20px;">
          <table class='text-center' style='width:100%;'>
            <tr><th>ProductHunt</th></tr>
            <tr>
              <td class='text-center pt-1'>
                <a href="https://www.producthunt.com/posts/roastme-4?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-roastme-4" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=137613&theme=light" alt="roastMe - Real feedback 🔥 and critics 🎯 from community & expert users | Product Hunt Embed" style="width: 210px; height: 44px;" width="250px" height="54px" /></a>
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
  }
}
</script>

<style scoped>
  #twitter-widget-0{
    min-width: 100% !important;
    width: 100% !important; 
  }
</style>