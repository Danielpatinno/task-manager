import { defineStore } from 'pinia'
import axios from 'axios'

export interface Commitment {
  _id:number
  title: string
  dateConclusion: string
}

interface CommitmentState {
  commitments: Commitment[];
}

const TASK_MANAGER_SESSION_KEY = 'task_manager_session';

export const useCommitmentStore = defineStore('commitment', {
  state: (): CommitmentState => ({
    commitments: [],
  }),
  actions: {
    async fetchCommitments() {
      const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);
      const userId = sessionData ? JSON.parse(sessionData).user.id : null;

      if (!userId) {
        console.error('ID do usuário não encontrado na sessão.');
        return;
      }

      const response = await axios.get(`https://task-api-jet.vercel.app/commitments/${userId}`);
      this.commitments = response.data
    },
    addCommitment(commitments:Commitment) {
      this.commitments.push(commitments)
    },
    // updateTask(id: number, updatedFields: Partial<Task>) {
    //   const taskIndex = this.tasks.findIndex(task => task._id === id); 
    //   if (taskIndex !== -1) {
    //     this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedFields };
        
    //   } else {
    //     console.error(`Task with id ${id} not found`);
    //   }
    // }
  }
})
