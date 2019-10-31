<template>
  <div class="sidebar" :data="backgroundColor">
    <div class="sidebar-wrapper text-left">
      <div class="logo">
        <a href="javascript:void(0)" class="simple-text logo-mini" style='background-color:#0000000f;border-radius:40px;height:34px;margin-top:5px;line-height:17px;font-size:11px;'>
          {{ abv }}
        </a>

        <drop-down>
          <a href="javascript:void(0)" class="simple-text logo-normal text-left">
            {{ title }}
            <b class="caret d-none d-lg-block d-xl-block" style='float: right;right:20px;top:25px;color:#999;'></b>
          </a>          

          <ul class="dropdown-menu dropdown-navbar" style='float: right;right:0px;left:0px;box-shadow:0px 10px 10px 0px rgba(0, 0, 0, 0.2);'>
            <li class="nav-link">
              <a href="javascript:void(0)" class="nav-item dropdown-item">Startup 2</a>
            </li>
            <li class="nav-link">
              <a href="javascript:void(0)" class="nav-item dropdown-item">Startup 3</a>
            </li>            
          </ul>              
        </drop-down>
      </div>
      
      <ul class="nav">
        <slot>
          <sidebar-link></sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";

export default{
  name: "side-bar",
  components: {
    SidebarLink
  },
  props: {
    abv: {
      type: String,
      default: "JPA"
    },
    title: {
      type: String,
      default: " Aulet"
    },
    backgroundColor: {
      type: String,
      default: "green"
    },
    sidebarLinks:{
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      activeLinkIndex: 0
    }
  },
  methods:{
    findActiveLink(){
      this.links.forEach((link, index) => {
        if(link.isActive()){
          this.activeLinkIndex = index;
        }
      });
    }
  }
}
</script>
<style>
</style>
