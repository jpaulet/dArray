<template>
 	<div class="content content-main-card" :class="{'is-play': isPlay}">
		<card class='p-2 p-md-3 p-lg-5'>
		  <div class="modal-box">
	        <div class="modal-content-area">
	          <div class="tab-container">
	            <div id="tab1" class="tab-content todo-list-content">
	              <div class="add-list" style='border:1px solid #999;border-radius:22px;padding:2px;margin-bottom:20px;'>
	                <input
	                  type="text"
	                  class="form-control input-text"
	                  placeholder="Add a New Mission..."
	                  v-model="newTodo"
	                  @keyup.enter="addTodo"
	                />
	                <a href="javascript:;" class="add-btn" @click.prevent="addTodo">
	                  <i class="tim-icons icon-simple-add"></i>
	                </a>
	              </div>
	              <div class="todo-list-collapse">
	              	<a class="btn btn-light col-12" data-toggle="collapse" href="#collapseTodo" role="button" aria-expanded="false" aria-controls="collapseTodo">TO-DO</a>
	              	<div class="collapse show" id="collapseTodo">
	              		<ul class="todo-list-group px-3">
	              			<li class="list-group-item" v-for="(item, key) in filterTodoList">
		                      <div class="i-content item-custom todo-content mt-2 mb-2" style='line-height:14px;'>
		                        <input type="checkbox" :id="item.id" class="todo-list-chk mr-3" v-model="item.completed" />
		                        <label :for="item.id" :class="{'completed' : item.completed}">
		                          {{ item.title }}
		                        </label>
		                        <div class="i-play">
		                          <i class="tim-icons icon-triangle-right-17"></i>
		                        </div>
		                      </div>
		                      <a href="javascript:;" class="del-btn" @click.prevent="removeTodo(item)">
		                        <i class="tim-icons icon-simple-remove"></i>
		                      </a>
		                    </li>
	              		</ul>
	              	</div>
	              	<a class="btn btn-light col-12" data-toggle="collapse" href="#collapseDone" role="button" aria-expanded="false" aria-controls="collapseDone">DONE</a>
	              	<div class="collapse show" id="collapseDone">
	                  <ul class="done-list-group px-3">
	                    <li v-if="item.completed" class="list-group-item item-done" v-for="(item, key) in todoList">
	                      <div class="i-content item-custom mt-2 mb-2" style='line-height:14px;'>
	                        <input type="checkbox" :id="item.id" class="todo-list-chk mr-3" v-model="item.completed" />
	                        <label :for="item.id" :class="{'completed' : item.completed}"> {{ item.title }} </label>
	                      </div>
	                      <div class="i-record">
	                        <i class="count"></i>
	                        <i class="count"></i>
	                        <i class="count"></i>
	                        <i class="count"></i>
	                      </div>
	                    </li>
	                  </ul>
	                </div>
	              </div>
	            </div>
	            <!--
	            <div id="tab3" class="tab-content ringtones-content">
	              <div class="type">
	                <div class="t-name">Work</div>
	                <div class="t-checkbox-list">	                  
	                    <label><input type='radio' label="none" v-model='radio1' name='radio1' value='none' /> none</label>
	                    <label><input type='radio' label="alarm" v-model='radio1' name='radio1' value='none' /> alarm</label>
	                    <label><input type='radio' label="beep" v-model='radio1' name='radio1' value='beep' /> beep</label>
	                    <label><input type='radio' label="bell" v-model='radio1' name='radio1' value='bell' /> bell</label>
	                    <label><input type='radio' label="bird" v-model='radio1' name='radio1' value='bird' /> bird</label>
	                    <label><input type='radio' label="bugle" v-model='radio1' name='radio1' value='bugle' /> bugle</label>
	                    <label><input type='radio' label="digital" v-model='radio1' name='radio1' value='digital' /> digital</label>
	                    <label><input type='radio' label="drop" v-model='radio1' name='radio1' value='drop' /> drop</label>
	                    <label><input type='radio' label="horn" v-model='radio1' name='radio1' value='horn' /> horn</label>
	                    <label><input type='radio' label="music" v-model='radio1' name='radio1' value='music' /> music</label>
	                    <label><input type='radio' label="ring" v-model='radio1' name='radio1' value='ring' /> ring</label>
	                    <label><input type='radio' label="warning" v-model='radio1' name='radio1' value='warning' /> warning</label>
	                    <label><input type='radio' label="whistle" v-model='radio1' name='radio1' value='whistle' /> whistle</label>	                  
	                </div>
	              </div>
	              <div class="type">
	                <div class="t-name">Break</div>
	                <div class="t-checkbox-list">
	                  	<label><input type='radio' label="none" v-model='radio2' name='radio2' value='none' /> none</label>
	                    <label><input type='radio' label="alarm" v-model='radio2' name='radio2' value='none' /> alarm</label>
	                    <label><input type='radio' label="beep" v-model='radio2' name='radio2' value='beep' /> beep</label>
	                    <label><input type='radio' label="bell" v-model='radio2' name='radio2' value='bell' /> bell</label>
	                    <label><input type='radio' label="bird" v-model='radio2' name='radio2' value='bird' /> bird</label>
	                    <label><input type='radio' label="bugle" v-model='radio2' name='radio2' value='bugle' /> bugle</label>
	                    <label><input type='radio' label="digital" v-model='radio2' name='radio2' value='digital' /> digital</label>
	                    <label><input type='radio' label="drop" v-model='radio2' name='radio2' value='drop' /> drop</label>
	                    <label><input type='radio' label="horn" v-model='radio2' name='radio2' value='horn' /> horn</label>
	                    <label><input type='radio' label="music" v-model='radio2' name='radio2' value='music' /> music</label>
	                    <label><input type='radio' label="ring" v-model='radio2' name='radio2' value='ring' /> ring</label>
	                    <label><input type='radio' label="warning" v-model='radio2' name='radio2' value='warning' /> warning</label>
	                    <label><input type='radio' label="whistle" v-model='radio2' name='radio2' value='whistle' /> whistle</label>
	                </div>
	              </div>
	            </div>
	        	-->
	          </div>
	        </div>
	        <div class="modal-close-info">
	          <a href="javascript:;" class="close-btn" @click.prevent="closeModal">
	            <i class="tim-icons icon-simple-remove"></i>
	          </a>
	        </div>
	      </div>

	      <div class="main row">
	        <div class="panel-list-area main-area col-12 col-md-6">
	          <div class="add-list" style='border:1px solid #999;border-radius:22px;padding:2px;margin-bottom:20px;'>
	            <input
	              type="text"
	              class="form-control input-text"
	              placeholder="Add a New Mission..."
	              v-model="newTodo"
	              @keyup.enter="addTodo"
	            />
	            <a href="javascript:;" class="add-btn" @click.prevent="addTodo">
	              <i class="tim-icons icon-simple-add"></i>
	            </a>
	          </div>
	          <div class="current-list">
	            <div class="c-chk-item item-custom">
	              <input type="checkbox" id="check-1" class="todo-list-chk" />
	              <label for="check-1">the First thing to do today</label>
	              <div class="count">
	                <span></span>
	                <span></span>
	                <span></span>
	                <span></span>
	              </div>
	            </div>
	            <div class="timer">{{ time }}</div>
	          </div>
	          <ul class="todo-list-group">
	            <li class="list-group-item" v-for="(item, key) in filterTodoList">
	              <div class="i-content item-custom">
	                <input type="checkbox" :id="item.id" class="todo-list-chk" v-model="item.completed" />
	                <label :for="item.id" :class="{'completed' : item.completed}"> {{ item.title }} </label>
	                <div class="i-play">
	                  <i class="tim-icons icon-triangle-right-17"></i>
	                </div>
	              </div>
	              <a href="javascript:;" class="del-btn" @click.prevent="removeTodo(item)">
	                <i class="tim-icons icon-simple-remove"></i>
	              </a>
	            </li>
	            <li class="list-group-item last-group-item" v-if="filterTodoList.length">
	              <a href="javascript:;" class="btn-more" @click.prevent="showModalList">More</a>
	            </li>
	          </ul>
	        </div>
	        <div class="panel-menu-area main-area">
	          <div class="menu-all">
	            <a href="javascript:;" id="btn-todo-list" class="menu-btn" data-num="1" @click.pret="showModal">
	              <i class="tim-icons icon-bullet-list-67"></i>
	            </a>
	        	<!-- 
	            <a href="javascript:;" id="btn-ringtones" class="menu-btn" data-num="2" @click.prevent="showModal">
	              <i class="tim-icons icon-volume-98"></i>
	            </a>
	    		-->
	          </div>
	        </div>
	        <div class="clock-enable main-area col-12 col-md-6">
	          <div class="clock">
	            <a href="javascript:;" class="btn-play" v-if="!isPlay" @click="timerRun">
	              <i class="tim-icons icon-triangle-right-17"></i>
	            </a>
	            <a href="javascript:;" class="btn-reset" v-if="!isPlay" @click="timerReset">
	              <div class="dot"></div>
	            </a>
	            <a href="javascript:;" class="btn-pause" v-else @click="timerPause">
	              <i class="tim-icons icon-button-pause"></i>
	            </a>
	          </div>
	        </div>
	      </div>
	    </card>
    </div>
</template>

<script>
import { userSession } from '@/userSession'
import {
  Card
} from '@/components/index'

var STORAGE_FILE = 'pomodoro.json'

export default {  
	components: {
		Card
	},
    data() {
      return {
        newTodo: '',
        todoList: [],
        isPlay: false,
        activeName: ['1', '2'],
        radio: 2,
        radio2: 4,
        chart: null,
        chartConfig: {},
        totalTime: 25 * 60,
        timerPaused: false,
        interval: null
      };
    },
    mounted() {
      this.$nextTick(() => {
        let _showTab = 0;
        let $defaultLi = $('.menu-tabs a')
          .eq(_showTab)
          .addClass('current');
        $($defaultLi.find('a').attr('href'))
          .siblings()
          .hide();
        $('.menu-tabs a').click(function() {
          let $this = $(this);
          $this
            .addClass('current')
            .siblings('.current')
            .removeClass('current');
          let N = $(this)
            .attr('href')
            .substr(4);
          $('.tab-content').hide();
          $('.tab-content').removeClass('active');
          $('#tab' + N)
            .fadeIn()
            .addClass('active');
          return false;
        });
      });
    },
    methods: {
      addTodo() {
        let value = this.newTodo.trim();
        let timestamp = Math.floor(Date.now());
        if (!value) return;
        this.todoList.push({
          id: timestamp,
          title: value,
          completed: false
        });
        this.newTodo = '';
        this.saveToFile()
      },
      removeTodo(todo) {
        let newIndex = '';
        this.todoList.forEach((item, key) => {
          if (todo.id === item.id) {
            newIndex = key;
          }
        });
        this.todoList.splice(newIndex, 1);
        this.saveToFile()
      },
      saveToFile(){
      	userSession.putFile(STORAGE_FILE, JSON.stringify(this.todoList), this.$ENCRYPT)
      },
      showModal(e) {
        let btnId = e.target.parentNode.id;
        let dataNum = Number(e.target.parentNode.dataset.num);
        $('.main-area').css({
          opacity: 0,
          display: 'none'
        });
        $('.modal-box').css({
          opacity: 1,
          display: 'flex'
        });
        $('.menu-tabs .menu-btn').removeClass('current');
        $('.' + btnId).addClass('current');
        $('.tab-content').css('display', 'none');
        $('#tab' + dataNum)
          .css('display', 'block')
          .addClass('active');
        if ($('.btn-analytics').hasClass('current')) {
          console.log('Y');
          this.createChart();
        }
      },
      closeModal() {
        $('.main-area').css({
          opacity: 1,
          display: 'flex'
        });
        $('.modal-box').css({
          opacity: 0,
          display: 'none'
        });
        $('.menu-tabs .menu-btn').removeClass('current');
        $('.tab-content')
          .css('display', 'none')
          .removeClass('active');
      },
      showModalList() {
        $('.main-area').css({
          opacity: 0,
          display: 'none'
        });
        $('.modal-box').css({
          opacity: 1,
          display: 'flex'
        });
        $('.menu-tabs .menu-btn').removeClass('current');
        $('.btn-todo-list').addClass('current');
        $('.tab-content').css('display', 'none');
        $('#tab1').css('display', 'block');
      },
      timerRun() {
        this.isPlay = true;
        this.interval = setInterval(this.countdownTimer, 1000);
      },
      timerPause() {
        this.isPlay = false;
        clearInterval(this.interval);
      },
      timerReset() {
        this.isPlay = false;
        clearInterval(() => {
          this.interval;
        });
        this.totalTime = 25 * 60;
      },
      timerCountdown() {
        this.interval = setInterval(this.updateCurrentTime, 1000);
        setInterval(() => {
          this.timerMinutes--;
        }, 60 * 1000);

        if (this.timerSeconds === '00') {
          this.timerSeconds = 59;
          setInterval(() => {
            this.timerSeconds--;
          }, 1000);
        } else {
          setInterval(() => {
            this.timerSeconds--;
          }, 1000);
        }
      },
      countdownTimer() {
        this.totalTime--;
      },
      fetchData(){
      	userSession.getFile(STORAGE_FILE, this.$DECRYPT).then((pomodoro) => {
	        if(pomodoro){
	        	this.todoList = JSON.parse(pomodoro)
	        }
	    })
      }
    },
    computed: {
      time() {
        return this.minutes + ':' + this.seconds;
      },
      minutes() {
        let min = Math.floor(this.totalTime / 60);
        return min >= 10 ? min : '0' + min;
      },
      seconds() {
        let sec = this.totalTime - this.minutes * 60;
        return sec >= 10 ? sec : '0' + sec;
      },

      filterTodoList() {
        let newTodoList = [];
        this.todoList.forEach(function(item) {
          if (!item.completed) {
            newTodoList.push(item);
          }
        });
        return newTodoList;
      }
    },
    mounted() {
    	this.fetchData()
    }
}
</script>
<style scoped>

.add-list {
  width: 445px;
  height: 56px;
  display: flex;
}

.input-text {
  width: calc(445px - 56px);
  height: 56px;
  padding: 18px 16px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
  border: 0;
}

.add-btn {
  width: 42px;
  height: 42px;
  margin-top:3px;
  border-radius: 28px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222a42;
}
.add-btn:hover {
  background-color: #d2ddff;
}

.list-group-item {
  font-size: 16px;
  color: #003164;
  text-transform: uppercase;
  font-weight: 600;
  padding: 12px 0;
  border:0px;
  border-bottom: 1px solid rgba(0, 49, 100, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.list-group-item:last-child {
  border-bottom: 0;
  display: flex;
}

.item-custom {
  display: flex;
}
.item-custom .i-play {
  margin-left: 20px;
  transition: all 0.4s ease-out;
}

.del-btn {
  color: #a0a0a0;
  transition: all 0.4s ease-out;
}
.del-btn:hover {
  color: #222a42;

}
.completed {
  text-decoration: line-through;
  font-style: italic;
}

.last-item {
  display: flex;
  justify-content: flex-end;
}

/*----------  panel-list-area  ----------*/
.panel-list-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 450px);
  float: left;  
}
.panel-list-area .item-custom input {
  position: absolute;
  opacity: 0;
}
.panel-list-area .item-custom input:checked + label:after {
  content: '';
  position: absolute;
  top: 7px;
  left: 12px;
  width: 25px;
  height: 13px;
  border: 3px solid #003164;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(45deg);
  transform: rotate(-45deg);
  transition: all 0.4s ease-out;
}
.panel-list-area .item-custom input + label {
  position: relative;
  cursor: pointer;
  padding: 0;
  transition: all 0.4s ease-out;
}
.panel-list-area .item-custom input + label:before {
  content: '';
  display: inline-block;
  vertical-align: top;
  width: 20px;
  height: 20px;
  border-radius: 30%;
  background: transparent;
  border: 2px solid #003164;
  margin-right: 16px;
}
.panel-list-area .current-list {
  width: 445px;
  color: #003164;
  text-transform: uppercase;
}
.panel-list-area .current-list .item-custom input {
  position: absolute;
  opacity: 0;
}
.panel-list-area .current-list .item-custom input:checked + label:after {
  content: '';
  position: absolute;
  top: 15px;
  left: 12px;
  width: 25px;
  height: 13px;
  border: 3px solid #003164;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(45deg);
  transform: rotate(-45deg);
  transition: all 0.4s ease-out;
}
.panel-list-area .current-list .item-custom input + label {
  position: relative;
  cursor: pointer;
  padding: 0;
  transition: all 0.4s ease-out;
}
.panel-list-area .current-list .item-custom input + label:before {
  content: '';
  display: inline-block;
  vertical-align: top;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #003164;
  margin-right: 16px;
}
.panel-list-area .current-list .c-chk-item {
  position: relative;
  font-size: 24px;
  font-weight: 600;
  width: 454px;
}
.panel-list-area .current-list .c-chk-item .count {
  position: absolute;
  top: 33px;
  left: 74px;
  display: flex;
}
.panel-list-area .current-list .c-chk-item span {
  width: 12px;
  height: 12px;
  border: 1px solid #222a42;
  border-radius: 50%;
  margin-right: 5px;
}
.panel-list-area .current-list .c-chk-item span:last-child {
  margin-right: 0;
}
.panel-list-area .current-list .timer {
  color: #222a42;
  font-size: 125px;
  font-weight: 600;
}
.panel-list-area .todo-list-group {
  width: 445px;
}
.panel-list-area .todo-list-group .item-custom input:checked + label:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 6px;
  width: 9px;
  height: 5px;
  border: 2px solid #003164;
  border-top: none;
  border-right: none;
}
.panel-list-area .todo-list-group .btn-more {
  font-size: 16px;
  color: #222a42;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 10px;
}
.panel-list-area .todo-list-group .btn-more:hover {
  color: #c30043;
}
.panel-list-area .todo-list-group .completed + .i-play {
  color: #a1a1a1;
}
.panel-list-area .todo-list-group .completed {
  color: #a1a1a1;
}
.panel-list-area .todo-list-group .list-group-item {
  font-size: 16px;
  color: #003164;
  text-transform: uppercase;
  font-weight: 600;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 49, 100, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.panel-list-area .todo-list-group .list-group-item:last-child {
  border-bottom: 0;
  display: flex;
  justify-content: flex-end;
}
.panel-list-area .todo-list-group .list-group-item .del-btn {
  color: #003164;
  transition: all 0.4s ease-out;
}
.panel-list-area .list-group-item {
  font-size: 16px;
  color: #e4ceda;
  text-transform: uppercase;
  font-weight: 600;
  padding: 12px 0;
  border-bottom: 1px solid rgba(228, 206, 218, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.panel-list-area .list-group-item:last-child {
  border-bottom: 0;
  display: flex;
  justify-content: flex-end;
}
.panel-list-area .list-group-item .del-btn {
  color: #e4ceda;
  transition: all 0.4s ease-out;
}

/*----------  panel-menu-area  ----------*/
.panel-menu-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  top: 40px;
  right: 40px;
  position: absolute;
  float: right;
  color: #fff;
}
.panel-menu-area .menu-all {
  display: flex;
  flex-direction: column;
  height: 105px;
  align-items: flex-end;
  justify-content: space-between;
}
.panel-menu-area a {
  width: 36px;
  height: 36px;
  color: #333;
}
.panel-menu-area a:hover {
  color: #222a42;
}
.panel-menu-area i {
  font-size: 22px;
}
.panel-menu-area h1 {
  font-size: 24px;
  text-transform: uppercase;
  -webkit-writing-mode: vertical-lr;
      -ms-writing-mode: tb-lr;
          writing-mode: vertical-lr;
}

/*----------  clock-area  ----------*/
.clock-enable {
  display: flex;
  justify-content: center;
  align-items: center;
  /*
  position: absolute;
  top: 280px;
  right: 100px;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  border: 4px solid #222a42;
  border-radius: 50%;
  */
  clear: both;
  width: 340px;
  height: 340px;
}
.clock-enable .clock {
  width: 310px;
  height: 310px;
  background-color: #222a42;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clock-enable .btn-play {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: #fff;
}
.clock-enable .btn-play:hover i {
  color: #003164;
}
.clock-enable .btn-play i {
  font-size: 96px;
  color: #fff;
  transition: all 0.4s ease-out;
}
.clock-enable .btn-reset {
  display: flex;
  align-items: flex-end;
  height: 96px;
}
.clock-enable .btn-reset:hover .dot {
  background-color: #003164;
}
.clock-enable .btn-reset .dot {
  width: 12px;
  height: 12px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: all 0.4s ease-out;
}

.is-play .clock {
  background-color: #fff;
}
.is-play .btn-pause {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: #fff;
}
.is-play .btn-pause:hover i {
  color: #003164;
}
.is-play .btn-pause:hover .dot {
  background-color: #003164;
}
.is-play .btn-pause i {
  font-size: 96px;
  color: #222a42;
  transition: all 0.4s ease-out;
}
.is-play .btn-pause .dot {
  width: 12px;
  height: 12px;
  background-color: #222a42;
  margin-bottom: 10px;
  transition: all 0.4s ease-out;
}

/*----------  modal-box  ----------*/
.modal-box {
  display: none;
  justify-content: space-between;
  width: 100%;
  color: #fff;  
}

.modal-panel-area {
  position: relative;
}

.menu-tabs {
  font-size: 36px;
  font-weight: 600;
  width: 242px;
  height: 240px;
  display: flex;
  align-content: space-between;
  flex-direction: column;
  justify-content: space-between;
}
.menu-tabs .menu-btn {
  color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
}
.menu-tabs .menu-btn.current {
  color: #222a42;
}
.menu-tabs .menu-btn.current:hover {
  cursor: default;
  color: #222a42;
}
.menu-tabs .menu-btn:hover {
  color: #fff;
}
.menu-tabs .menu-btn p {
  text-transform: uppercase;
  height: 36px;
  line-height: 36px;
}
.menu-tabs .material-icons {
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin-right: 8px;
  font-size: 36px;
}

.menu-status {
  width: 350px;
  position: absolute;
  bottom: -46px;
}
.menu-status .s-icon {
  position: absolute;
  top: -60px;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 116px;
  height: 116px;
  background-color: #222a42;
  border-radius: 50%;
  border: 12px solid #003164;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-status .s-icon:before {
  content: '';
  width: 102px;
  height: 102px;
  border: 2px solid #222a42;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%);
}
.menu-status .s-icon .material-icons {
  font-size: 62px;
}
.menu-status .s-circle {
  height: 175px;
  background-color: #ffedf7;
  border-radius: 350px 350px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-status .s-circle .s-timer {
  color: #222a42;
  font-size: 64px;
  font-weight: 600;
  margin-top: 57px;
}
.menu-status .s-circle .s-txt {
  color: #003164;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
}

.modal-content-area {
  width: 445px;
  margin:0px auto;
}
.modal-content-area #tab1 {
  display: none;
  flex-direction: column;
  justify-content: space-between;
}
.modal-content-area #tab1 .todo-list-collapse {
  margin-top: 48px;
  background-color: transparent;
}
.modal-content-area #tab1 .item-done input:checked + label {
  font-style: italic;
  text-decoration: line-through;
}
.modal-content-area #tab1 .item-done .i-record {
  height: 24px;
  display: flex;
  align-items: center;
}
.modal-content-area #tab1 .item-done .i-record .count {
  width: 12px;
  height: 12px;
  background-color: #fff;
  display: block;
  border-radius: 50%;
  margin-right: 8px;
}
.modal-content-area #tab1 .item-done .i-record .count:last-child {
  margin-right: 0;
}
.modal-content-area #tab2 {
  display: none;
  flex-direction: column;
  justify-content: space-between;
}
.modal-content-area #tab2 .info {
  width: 445px;
  margin-bottom: 60px;
}
.modal-content-area #tab2 .info:last-child {
  margin-bottom: 0;
}
.modal-content-area #tab2 .i-title {
  height: 44px;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  padding: 8px 16px;
}
.modal-content-area #tab2 .i-title.i-title-multi {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-content-area #tab2 .i-title .select-date {
  font-size: 16px;
  display: flex;
  align-items: center;
}
.modal-content-area #tab2 .i-title .s-btn {
  width: 24px;
  height: 24px;
  color: #fff;
}
.modal-content-area #tab2 .i-title .s-btn:hover {
  color: #222a42;
}
.modal-content-area #tab2 .i-title .s-prev {
  margin-right: 8px;
}
.modal-content-area #tab2 .i-title .s-next {
  margin-left: 8px;
}
.modal-content-area #tab2 .i-content {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  justify-content: space-between;
}
.modal-content-area #tab2 .unit {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}
.modal-content-area #tab2 .count {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.modal-content-area #tab2 .c-num {
  font-size: 64px;
  font-weight: 600;
  color: #222a42;
  margin-right: 8px;
}
.modal-content-area #tab2 .c-item {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
}
.modal-content-area #tab2 .chart-view {
  width: 445px;
  height: 243px;
  margin-top: 30px;
}
.modal-content-area #tab3 {
  display: none;
  flex-direction: column;
  width: 445px;
}
.modal-content-area #tab3 .type {
  margin-bottom: 46px;
}
.modal-content-area #tab3 .t-name {
  height: 44px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.modal-content-area #tab3 .t-checkbox-list .el-radio__label {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
}
.modal-content-area #tab3 .el-radio-group {
  display: flex;
  justify-content: space-between;
  width: 445px;
  flex-wrap: wrap;
}
.modal-content-area #tab3 .el-radio {
  width: 110px;
  margin-bottom: 18px;
}
.modal-content-area #tab3 .el-radio:nth-child(3n + 3) {
  margin-right: 0;
}
.modal-content-area #tab3 .el-radio:nth-last-child(-n + 3) {
  margin-bottom: 0;
}
.modal-content-area #tab3 .el-radio__inner {
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 2px solid #fff;
}
.modal-content-area #tab3 .el-radio__inner:after {
  width: 12px;
  height: 12px;
  background-color: #222a42;
}
.modal-content-area #tab3 .el-radio__input.is-checked .el-radio__inner {
  border: 2px solid #222a42;
}

.modal-close-info {
  width: 64px;
  position:absolute;
  top:30px;
  right:30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.modal-close-info .close-btn {
  width: 48px;
  color: #222a42 !important;
}
.modal-close-info .close-btn:hover {
  color: #000;
}
.modal-close-info .close-btn .material-icons {
  font-size: 48px;
}
.modal-close-info h3 {
  font-size: 24px;
  text-transform: uppercase;
  -webkit-writing-mode: vertical-lr;
      -ms-writing-mode: tb-lr;
          writing-mode: vertical-lr;
}
</style>