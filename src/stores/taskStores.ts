import { defineStore } from 'pinia';
import axios from 'axios';
import { Task } from '../composables/useAddTask';

interface TaskState {
  tasks: Task[];
}

// Nome da chave do localStorage
const TASK_MANAGER_SESSION_KEY = 'task_manager_session';

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      // Recupera a sessão do localStorage e extrai o ID do usuário
      const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);
      const userId = sessionData ? JSON.parse(sessionData).user.id : null;

      if (!userId) {
        console.error('ID do usuário não encontrado na sessão.');
        return;
      }

      // Faz a requisição à rota com o ID do usuário
      const response = await axios.get(`https://task-api-jet.vercel.app/tasks/${userId}`);
      this.tasks = response.data;
    },
    addTask(task: Task) {
      this.tasks.push(task);
    },
    removeTask(index: number) {
      this.tasks.splice(index, 1); // Corrige para splice
    },
    updateTask(id: number, updatedFields: Partial<Task>) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedFields };
      } else {
        console.error(`Task with id ${id} not found`);
      }
    }
  }
});
