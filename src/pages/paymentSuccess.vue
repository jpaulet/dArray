<template>
    <div style='height:95vh;'>
        <div v-if='valid'>
            <h1 style='color:#000;padding-top:120px;'>Congratulations!</h1>
            <div>You purchased 1 year subscription for dArray</div>
            <div>Now, you can keep working in a private & descentralized dapp!</div>
        </div>
        <div v-if='!valid'>
            <h1 style='color:#000;padding-top:120px;'>Request not valid!</h1>
        </div>
    </div>
</template>

<script>
import { userSession } from '@/userSession'

export default {
  data () {
    return {
      valid: null,
      previousPath: null
    }
  },
  async mounted () {
    let sessionId = this.$route.query.session_id

    if (sessionId) {
      this.valid = true

      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth()
      var day = d.getDate()
      var finalDate = new Date(year + 1, month, day)

      this.userData = userSession.loadUserData()
      let username = this.userData.username
      var fileName = username + '_subscribed.json'
      let params = {
        subscribed: true,
        date: finalDate
      }
      userSession.putFile(fileName, JSON.stringify(params), this.$ENCRYPT)
    } else {
      this.valid = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // fetch from.path and set in Vue instance
      vm.previousPath = from.path
    })
  }
}
</script>
