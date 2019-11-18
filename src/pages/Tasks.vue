<template>
  <div class="content content-main-card">
    <card style='background: linear-gradient(90deg, rgba(231,236,250,1) 0%, rgba(231,236,250,1) 33.5%, rgba(202,215,251,1) 33.6%, rgba(255,255,255,1) 33.5%, rgba(255,255,255,1) 100%);'>
        <div class="row">
          <div class="col-4">
            <div id="editor">
              <div class="pr-3">
                <div class="text-left" style='line-height:30px;'>
                  <i class="tim-icons icon-pin text-light mr-3"></i>Details
                </div>

                <form class="form px-3" @submit.prevent="(action == 'create') ? createTask($event) : updateTask($event, task.id)" >
                  <input type="hidden" name="id" v-model="task.id"/>

                 <div class='row text-left mt-4'>
                    <label for="">Name</label>
                    <input class='form-control' type="text" name="name" placeholder="Name" required="true" v-model="task.name" style='background: #fff;' />
                  </div>

                  <div class='row text-left'>
                    <label for="">Description</label>
                    <input class='form-control' type="text" name="description" placeholder="Description" required="true" v-model="task.description" style='background: #fff;' />
                  </div>

                  <div class="row text-left">
                    <label for="">Completed</label>
                    <input class='ml-3' type="checkbox" ref="checkbox" name="completed" v-model="task.completed"/>
                  </div>

                  <button type="button" class="btn btn-danger btn-sm px-3 text-white mt-3 mr-3" @click='clear' style='opacity:0.8;'>Clear</button>
                  <button type="submit" class="btn btn-light btn-sm px-5 text-white mt-3">Submit</button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-8 text-left px-3">
            <div class='row mb-3'>
              <div class="text-left col-4" style='line-height:30px;'>
                <i class="tim-icons icon-notes text-light mr-3"></i>Your Tasks
              </div>

              <div v-if='tasks.length' class='col-8 text-right'>
                <button type="button" class="btn btn-light btn-sm px-5 text-white" @click='saveTasks'>Save</button>
              </div>
            </div>

            <div v-if='!tasks.length' class='text-center mt-5'>
              <p>No tasks yet. </p>
              <img src='@/assets/img/tasks.jpg' class='mt-3 mb-5' height='200' />
            </div>

            <div v-if='tasks.length' id="todo" class="tasklist pt-2">
              <div class="ui">
                <h6><i class="tim-icons icon-triangle-right-17 text-light mr-3"></i>In Progress Tasks ({{todoTasks.length}})</h6>
              </div>

              <task v-bind:task="task" v-for="task in todoTasks" @editTaskParent='editTask' @deleteTaskParent='deleteTask' @toogleTaskParent='toggleDone' v-bind:key='task.id'></task>
              <p v-if='!todoTasks.length' class='text-center my-1' style='font-size:12px;'>No pending tasks</p>
            </div>

            <div v-if='tasks.length' id="completed" class="tasklist pt-3">
              <div class="ui">
                  <h6><i class="tim-icons icon-check-2 text-light mr-3"></i>Completed Tasks ({{completedTasks.length}})</h6>
              </div>

              <task v-bind:task="task" v-for="task in completedTasks" @editTaskParent='editTask' @deleteTaskParent='deleteTask' @toogleTaskParent='toggleDone' v-bind:key='task.id'></task>
              <p v-if='!completedTasks.length' class='text-center my-1' style='font-size:12px;'>No completed tasks yet</p>
            </div>
          </div>
      </div>

    </card>
  </div>
</template>
<script>
// localStorage persistence
import { userSession } from '@/userSession'
import {
  Card
} from '@/components/index'
var STORAGE_FILE = 'todos.json'

// <i class="tim-icons icon-pencil text-light mr-1 text-white" alt="Edit" @click="$parent.editTask($event, task.id)"></i>

export default {
  components: {
    Card,
    'task': { props: ['task'],
      template: `
      <div class="alert text-left alert-info task" :class="task.completed ? 'done' : 'todo'">
          <div class="row">
            <div class="col-9">
              <div class="text-white">
                <input class='mr-3' type="checkbox" ref="task" name="task" @click="toggleDone(task.id)" :checked="task.completed">
                <label>{{task.name}} <span class="description mr-2 ml-2">{{ task.description }}</span> {{task.id}}</label>
              </div>
            </div>                    
            <div class="col-3 text-right">              
              <i class="tim-icons icon-pencil text-light mr-2 text-white" alt="Edit" @click="editTask(task.id)" style='cursor:pointer'></i>
              <i class="tim-icons icon-trash-simple text-light mr-1 text-white" alt="Delete" @click="deleteTask(task.id)" style='cursor:pointer'></i>
            </div>                    
          </div>
      </div> 
      `,
      methods: {
        editTask: function (id) {
          this.$emit('editTaskParent', id)
        },
        deleteTask: function (id) {
          this.$emit('deleteTaskParent', id)
        },
        toggleDone: function (id) {
          this.$emit('toogleTaskParent', id)
        }
      }
    }
  },
  data: function () {
    return {
      tasks: [],
      task: {},
      action: 'create',
      message: 'Welcome'
    }
  },
  computed: {
    completedTasks: function () {
      return this.tasks.filter(item => item.completed === true)
    },
    todoTasks: function () {
      return this.tasks.filter(item => item.completed === false)
    },
    nextID: function () {
      if (this.tasks.length === 0) { return 1 }
      return (this.tasks.sort(function (a, b) { return a.id - b.id }))[this.tasks.length - 1].id + 1
    }
  },
  methods: {
    clear: function () {
      this.task = {}
      this.action = 'create'
      this.completed = false
    },
    toggleDone: function (id) {
      let task = this.tasks.find(item => item.id === id)
      if (task) {
        task.completed = !task.completed

        this.message = `Task ${id} Updated.`
      }
    },
    deleteTask: function (id) {
      let taskIndex = this.tasks.findIndex(item => item.id === id)

      if (taskIndex > -1) {
        this.$delete(this.tasks, taskIndex)
      }

      this.message = `Task ${id} Deleted.`
    },
    editTask: function (id) {
      this.action = 'edit'
      let task = this.tasks.find(item => item.id === id)

      if (task) {
        this.task = { id: task.id,
          name: task.name,
          description: task.description,
          completed: task.completed }
      }
      this.message = `Editing Task ${id}`
    },
    updateTask: function (event, id) {
      event.stopImmediatePropagation()

      let task = this.tasks.find(item => item.id === id)
      if (task) {
        task.name = this.task.name
        task.description = this.task.description
        task.completed = this.task.completed
        this.message = `Task ${id} Updated.`
      };

      this.clear()
    },
    createTask: function (event) {
      event.stopImmediatePropagation()

      if (!this.task.completed) {
        this.task.completed = false
      } else {
        this.task.completed = true
      }

      let taskID = this.nextID
      this.task.id = taskID
      this.tasks.push(this.task)
      this.clear()

      this.message = `Task ${taskID} Created.`
    },
    fetchData () {
      userSession.getFile(STORAGE_FILE).then((tasks) => {
        this.tasks = JSON.parse(tasks || '[]')
      })
    },
    saveTasks () {
      userSession.putFile(STORAGE_FILE, JSON.stringify(this.tasks))
      this.$notify({
        message: 'Tasks status saved successfully',
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success',
        timeout: 1500
      })
    }
  },
  async mounted () {
    this.fetchData()
  }
}

</script>
<style>
  .task.done label {
    text-decoration: line-through;
  }

  .task.done {
    background-color: #c2e8ce !important;
  }

  .task.todo {
    background-color: #f6cd90 !important;
  }

  .description {
    color: slategray;
    font-style: italic;
  }
</style>
