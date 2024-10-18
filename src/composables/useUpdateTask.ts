import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";
import { Task } from "./useAddTask";

export interface UpdateTaskProps {
  id: number;
  title?: string;
  newActivity?: string;
  activityIndex?: number
  status?: string;
  dateConclusion?: Date;
}

async function updateTask(task: UpdateTaskProps):Promise <Task> {
  const { id, ...data } = task
  const response = await api.put(`/updateTask?id=${id}`, data)
  return response.data
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask
  })
}