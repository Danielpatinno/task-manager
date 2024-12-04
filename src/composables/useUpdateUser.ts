import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api"

interface User {
  id: string;
  name: string;
  email: string;
}

interface UpdateUser { 
  id: number;
  name?: string;
  password?: string;
}

async function updateUser(user: UpdateUser):Promise<User> {
  const { id, ...data} = user;
  const response = await api.put(`/updateUser/${id}`, data)
  return response.data;
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser
  })
}
