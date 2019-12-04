<template>
  <div class="content content-main-card">
    <div class="card p-3 p-sm-5">
      <div class='row mb-5'>
        <div class='col-5 text-left'>
          <h6 style='line-height: 32px;'><i class="tim-icons icon-calendar-60 mr-3"></i>Scheduler</h6>
        </div>
        <div class='col-6 text-right'>
          <button class='btn btn-light btn-sm px-5 text-white' @click='createEvent = true'>Create Event</button>
        </div>
      </div>
      <div style='width:90%;margin:0px auto 50px;'>
        <FullCalendar :selectable='true' defaultView="dayGridMonth" :plugins="calendarPlugins" @dateClick="handleDateClick" @eventClick="handleEventClick" @select='handleSelect' :events="events" />
        <p class='text-mutted mt-3' style='font-size:12px;'>You can create event by clicking or multiple day events by selecting multiple days</p>
      </div>

      <modal :show.sync="createEvent" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" style='transform:translate(0,0);'>
        <template slot="header">
          <h5 class="modal-title ml-2" id="exampleModalLabel">Create Event</h5>
        </template>
        <form class='row text-center mb-4 mt-4 pt-2 pb-2' role="form" v-on:submit.prevent>
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Title:</label>
          <input type='text' class='form-control col-7' name='Title' placeholder='Event name' v-model='newEvent.title' />
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Description:</label>
          <input type='text' class='form-control col-7' name='Description' placeholder='Event description' v-model='newEvent.description' />
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Start:</label>
          <input type="date" class="form-control col-7" v-model='newEvent.start'><br>
          <label v-if='newEvent.end !== null'  class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>End:</label>
          <input v-if='newEvent.end !== null' type="date" class="form-control col-7" v-model='newEvent.end'>
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Hour:</label>
          <input type="time" class="form-control col-7" v-model='newEvent.time'><br>
          <label class='col-3 ml-3 text-mutted' style='font-size:12px;line-height:40px;color:#555;'>Color</label>
          <div class='col-7 pl-0 ml-0'>
            <span class='square' v-for="(color,index) in colors" :style="{ background: color }" @click='selectColor(color)' :key='index' :class="{ 'colorSelected' : color == newEvent.color}"></span>
          </div>
        </form>
        <template slot="footer">
          <base-button type="danger" @click="createEvent = false" style='opacity:0.5;'>Close</base-button>
          <base-button type="light" @click='createNewEvent'>Create</base-button>
        </template>
      </modal>

      <modal :show.sync='viewEvent' body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" style='transform:translate(0,0);'>
        <div class='mb-3 p-5'>
          <h6>{{event.title}}</h6>
          <p>{{event.description}}</p>
          <div> <span>{{event.start}}</span> <span v-if='event.end && (event.start !== event.end)'>/ {{event.end}}</span> <span v-if='event.hour'>at {{event.hour}}</span></div>
        </div>
        <template slot="footer" class="text-center">
          <base-button type="danger" @click="viewEvent = false" style='opacity:0.5;'>Close</base-button>          
        </template>
      </modal>

    </div>
  </div>
</template>
<script>
import {
  Modal, BaseButton
} from '@/components/index'
import { userSession } from '@/userSession'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction' // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'

const STORAGE_FILE = 'events.json'
export default {
  components: {
    Modal,
    BaseButton,
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      calendarPlugins: [ dayGridPlugin, interactionPlugin ],
      events: [],
      createEvent: false,
      viewEvent: false,
      newEvent: {
        title: '',
        description: '',
        start: '',
        end: null,
        time: '',
        color: '#263148'
      },
      //colors: ['#263148', '#1abc9c', '#2980b9', '#7f8c8d', '#f1c40f', '#d35400', '#27ae60'],
      colors: ['#263148', '#1abc9ca3', '#263148a3', '#7f8c8d', '#f1c40f', '#d354009e', '#2980b991'],
      event: {}
    }
  },
  methods: {
    selectColor (color){
      this.newEvent.color = color
    },
    handleDateClick (info) {
      this.newEvent.start = info.dateStr
      this.newEvent.end = null
      this.createEvent = true
    },
    handleEventClick (info) {
      this.event = {
        title: info.event.title,
        description: info.event.extendedProps.description,
        start: info.event.start.getMonth()+'-'+info.event.start.getDate()+'-'+info.event.start.getFullYear(),
        end: info.event.end ? info.event.end.getMonth()+'-'+info.event.end.getDate()+'-'+info.event.end.getFullYear() : null,
        hour: info.event.extendedProps.time,
        color: info.event.color,
      }
      this.viewEvent = true
    },
    handleSelect (info) {
      this.newEvent.start = info.startStr
      this.newEvent.end = info.endStr
      this.createEvent = true
    },
    fetchData () {
      userSession.getFile(STORAGE_FILE, this.$DECRYPT).then((events) => {
        this.events = JSON.parse(events || '[]')
        this.addEventStyles(this.events)
      })
    },
    addEventStyles (events) {
      events.map((event) => {
        event.backgroundColor = event.color
        event.borderColor = event.color
        event.textColor = '#fff'
      })
    },
    createNewEvent () {
      this.addEventStyles([this.newEvent])
      this.events.push(this.newEvent)

      userSession.putFile(STORAGE_FILE, JSON.stringify(this.events), this.$ENCRYPT)
      this.newEvent = {
        title: '',
        description: '',
        start: '',
        end: null,
        time: '',
        color: '#263148'
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
  mounted () {
    this.fetchData()

    if(this.$route.query.newEvent){
      this.createEvent = true
    }
  }
}
</script>

<style scoped>
  /deep/ .fc-toolbar h2{
    font-size: 1.25em !important;
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
  .square {
    width: 18px;
    height: 18px;
    margin: .5em;
    display: inline-block;
    border: 1px solid #777;
    cursor: pointer;
    margin-top:10px;
  }
  .colorSelected{
    box-shadow: 0 15px 35px rgba(50,50,93,0.2),0 5px 15px rgba(0,0,0,0.57);
    border: 1px solid #444 !important;
  }
</style>

<style lang='scss'>
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
</style>
