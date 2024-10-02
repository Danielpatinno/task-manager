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

export const useCommitmentStore = defineStore('commitment', {
  state: (): CommitmentState => ({
    commitments: [],
  }),
  actions: {
    async fetchCommitments() {
      const response = await axios.get('http://localhost:3000/commitments');
      this.commitments = response.data.tasks
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
