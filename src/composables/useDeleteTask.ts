import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api";

async function deleteTask(taskId: number) {
  await api.delete(`/deleteTask?id=${taskId}`);
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: deleteTask, 
  });
}
