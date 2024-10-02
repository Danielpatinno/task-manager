import { defineStore } from 'pinia'
import axios from 'axios'
import { Task } from '../composables/useAddTask';

interface TaskState {
  tasks: Task[];
}

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const response = await axios.get('http://localhost:3000/tasks');
      this.tasks = response.data.tasks
    },
    addTask(task:Task) {
      this.tasks.push(task)
    },
    removeTask(index:number){
      this.tasks.slice(index,1)
    },
    updateTask(id: number, updatedFields: Partial<Task>) {
      const taskIndex = this.tasks.findIndex(task => task._id === id); 
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedFields };
        
      } else {
        console.error(`Task with id ${id} not found`);
      }
    }
  }
})
