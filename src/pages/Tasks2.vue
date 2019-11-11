<template>
  <div class="content">
    <div class='card'>
        
      <div class="ui container pusher">
        <div class="ui grid">
          <div class="six wide column">              
            <div id="todo" class="tasklist">
              <div class="ui header">
                <i class="icon play circle orange"></i>In Progress Tasks ({{todoTasks.length}})
              </div>
              
              <task v-bind:task="task" v-for="task in todoTasks"></task>         
            </div>

            <div id="completed" class="tasklist">
              <div class="ui header">
                  <i class="icon check circle orange"></i>Completed Tasks ({{completedTasks.length}})
              </div>
              
              <task v-bind:task="task" v-for="task in completedTasks"></task>
            </div>
          </div>

          <div class="six wide column">
            <div id="editor" class="details ui raise segment purple">                
              <div class="ui header grid">
                <div class="left floated nine wide column">
                  <i class="icon edit violet"></i>Details
                </div>
                <div class="right floated five wide column">
                    <button class="ui green button right floated" @click="clear"> 
                      <i class="icon plus circle"></i>New
                    </button>
                </div>
              </div>

              <div class="ui segment">
                <form class="ui form" 
                    @submit.prevent="(action == 'create') ? createTask($event) : updateTask($event, task.id)" >                    
                  <input type="hidden" name="id" v-model="task.id"/>
                  
                  <div class="field">
                    <label for="">Name</label>
                    <input type="text" name="name" placeholder="Name" required="true" v-model="task.name"/>
                  </div>
                  
                  <div class="field">
                    <label for="">Description</label>
                    <input type="text" name="description" placeholder="Description" required="true" v-model="task.description"/>
                  </div>
                  
                  <div class="field inline">
                    <label for="">Completed</label>
                    <input type="checkbox" ref="checkbox" name="completed" v-model="task.completed"/>
                  </div>

                  <button class="ui button green">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>    

    </div>
  </div>
</template>
<script>
// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0'

export default {
  components: {
    'task': { props: ['task'],
      template: `
      <div class="ui segment task" 
          :class="task.completed ? 'done' : 'todo'">
          <div class="ui grid">
            <div class="left floated twelve wide column">
              <div class="ui checkbox">
                <input type="checkbox" ref="task" name="task" @click="$parent.toggleDone($event, task.id)" :checked="task.completed">
                <label>{{task.name}} <span class="description">{{ task.description }}</span> {{task.id}}</label>
              </div>
            </div>                    
            <div class="right floated three wide column">
              
              <i class="icon pencil blue" alt="Edit" @click="$parent.editTask($event, task.id)"></i>
              <i class="icon trash red" alt="Delete" @click="$parent.deleteTask($event, task.id)"></i>
            </div>                    
          </div>
      </div> 
      `
    }
  },
  data: {
    tasks: [
      { id: 1, name: 'Todo 1', description: 'This is a ToDo', completed: false},
      { id: 2, name: 'Todo 2', description: 'This is another ToDo', completed: true},
      { id: 3, name: 'Todo Three', description: 'This is a complete ToDo', completed: true},
      { id: 4, name: 'Four', description: 'This is another complete ToDo', completed: true}
    ],
    task: {},
    action: 'create',
    message: 'Welcome'
  },
  computed: {
    completedTasks: function() {
      return this.tasks.filter( item => item.completed == true);
      
    },
    todoTasks: function() {
      return this.tasks.filter( item => item.completed == false);
      
    },
    nextID: function() {
      return (this.tasks.sort(function(a,b){ return a.id - b.id; }))[this.tasks.length -1].id + 1;
    }
  },
  methods: {
    clear: function(){
      this.task = {};
      this.action = 'create';
      this.message = '';
      this.completed = false;
    },
    toggleDone: function(event, id) {
      event.stopImmediatePropagation();
      let task = this.tasks.find(item => item.id == id);
      if (task) {
        task.completed = !task.completed;    

        this.message = `Task ${id} Updated.`
      }
    },
    deleteTask: function(event, id) {
      event.stopImmediatePropagation();
      let taskIndex = this.tasks.findIndex(item => item.id == id);

      if (taskIndex > -1) {
        this.$delete(this.tasks, taskIndex)
      }

      this.message = `Task ${id} Deleted.`
    },
    editTask: function(event, id) {
      this.action = 'edit';
      let task = this.tasks.find(item => item.id == id);
      
      if (task) {
        this.task = { id: task.id, 
                      name: task.name, 
                      description: task.description, 
                      completed: task.completed };
      }
      this.message = `Editing Task ${id}`
    },
    updateTask: function(event, id) {
      event.stopImmediatePropagation();

      let task = this.tasks.find(item => item.id == id);
      if (task) {
        task.name = this.task.name;
        task.description = this.task.description;
        task.completed = this.task.completed;
        this.message = `Task ${id} Updated.`
      };
    },

    createTask: function(event) {
      event.stopImmediatePropagation();

      if (!this.task.completed){
        this.task.completed = false;
      } else {
        this.task.completed = true;
      }

      let taskID = this.nextID;      
      this.task.id = taskID;
      this.tasks.push(this.task);
      this.clear();

      this.message = `Task ${taskID} Created.`
    }
  }
}

</script>
<style>
  .tasklist {
    padding-top: 2em !important;
  }

  .task.done label {
    text-decoration: line-through;
  }

  .task.done {
    background-color: lightgreen !important;
  }

  .task.todo {
    background-color: lightgoldenrodyellow !important;
  }

  .description {
    color: slategray;
    font-style: italic;
  }
</style>
