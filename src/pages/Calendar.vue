<template>
  <div class="content content-main-card">
    <div class="card p-5">
      <div class='row mb-5'>
        <div class='col-6 text-left'>
          <h6 style='line-height: 32px;'><i class="tim-icons icon-calendar-60 mr-3"></i>Scheduler</h6>
        </div>
        <div class='col-6 text-right'>
          <button class='btn btn-light btn-sm px-5 text-white' @click='createEvent = true'>Create Event</button>
        </div>
      </div>
      <div style='width:90%;margin:0px auto 50px;'>
        <FullCalendar :selectable='true' defaultView="dayGridMonth" :plugins="calendarPlugins" @dateClick="handleDateClick" @eventClick="handleEventClick" @select='handleSelect' :events="events"
        />
        <p class='text-mutted mt-3' style='font-size:12px;'> You can create event by clicking or multiple day events by selecting multiple days </p>
      </div>

      <modal :show.sync="createEvent" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" style='transform:translate(0,0);'>
        <template slot="header">
          <h5 class="modal-title ml-2" id="exampleModalLabel">Create Event</h5>
        </template>
        <form class='row text-center mb-4 mt-4 pt-2 pb-2' role="form" v-on:submit.prevent>
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Title:</label>
          <input type='text' class='form-control col-7' name='Title' placeholder='Event name' v-model='newEvent.title' /> 
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Start:</label>
          <input type="date" class="form-control col-7" v-model='newEvent.start'><br>
          <label v-if='newEvent.end !== null'  class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>End:</label>
          <input v-if='newEvent.end !== null' type="date" class="form-control col-7" v-model='newEvent.end'>
        </form>
        <template slot="footer">
          <base-button type="danger" @click="createEvent = false" style='opacity:0.5;'>Close</base-button>
          <base-button type="light" @click='createNewEvent'>Create</base-button>
        </template>      
      </modal>

    </div>
  </div>
</template>
<script>
import {
  Card, Modal, BaseButton
} from '@/components/index'
import { userSession } from '@/userSession'
import { uuid } from 'vue-uuid'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'

const STORAGE_FILE = 'events.json'
export default {
  components: {
    Card,
    Modal,
    BaseButton,
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      calendarPlugins: [ dayGridPlugin, interactionPlugin ],
      events: [],
      createEvent: false,
      newEvent: {
        title: '',
        start: '',
        end: null
      }
    }
  }, 
  methods: {
    handleDateClick(info){
      this.newEvent.start = info.dateStr
      this.newEvent.end = null
      this.createEvent = true
    },
    handleEventClick(info){
      console.log('handleEventClick')
      console.log(info)
      console.log(info.event.title)
      console.log(info.event.start)
      console.log(info.event.end)
    },
    handleSelect(info){
      this.newEvent.start = info.startStr
      this.newEvent.end = info.endStr
      this.createEvent = true
    },
    fetchData(){
      userSession.getFile(STORAGE_FILE).then((events) => {
        this.events = JSON.parse(events || '[]')
        this.addEventStyles(this.events)
      })
    },
    addEventStyles(events){
      events.map((event) => {
        event.backgroundColor = '#263148'
        event.borderColor = '#263148'
        event.textColor = '#fff'
      })
    },
    createNewEvent(){
      this.addEventStyles([this.newEvent])
      this.events.push(this.newEvent)

      userSession.putFile(STORAGE_FILE,JSON.stringify(this.events))
      this.newEvent = {
        title: '',
        start: '',
        end: null
      }
      this.createEvent = false
      this.$notify({
        message: 'Event Created',
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      })
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style scoped>
  .fc-toolbar h2{
    font-size: 1.2em !important;
  }
  .fc-event{
    background-color: #263148 !important;
    color:#fff;
  }
  .fc-day-grid-event .fc-content{
    color:#fff !important;
  }
  .fc-unthemed td.fc-today {
    background: #e3effc !important;
  }
</style>

<style lang='scss'>
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
</style>