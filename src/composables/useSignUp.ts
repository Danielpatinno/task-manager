import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api"

interface RegisterUserProps {
  name: string;
  email:string;
  password: string;
}

export interface ResponseUserSignUp {
  user: {
    id: number;
    name: string;
    email:string;
  }
  accessToken: string;
}

async function RegisterUser({name, email, password}:RegisterUserProps):Promise <ResponseUserSignUp> {
  const response = await api.post('/createUser' , { name, email, password })

  return response.data
}

export function useSignUp() {
  return useMutation({
    mutationFn: RegisterUser
  })
}

