// composables/useAddTask.ts
import { useMutation } from '@tanstack/vue-query';
import { api } from '../services/api';

interface CreateTaskProps {
  title: string;
  priority: string;
  status: string;
  dateConclusion?: Date | null;
  activitys: string[];
}

export interface Task {
  title: string;
  priority: string;
  status: string;
  dateConclusion: string;
  activitys: string[];
  _id: number;
}

async function createTask(task: CreateTaskProps): Promise<Task> {
  const response = await api.post('/newTask', task);
  return response.data;
}

export function useAddTask() {
  return useMutation({
    mutationFn: createTask,
  });
}
