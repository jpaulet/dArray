<template>
  <div class="content content-main-card">
    <div class="card p-5">
      <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" :events="[
          { title: 'event 1', date: '2019-11-01' },
          { title: 'event 2', date: '2019-11-02' }
        ]"
      />
    </div>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      calendarPlugins: [ dayGridPlugin ]
    }
  }
}
</script>

<style lang='scss'>
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
</style>
