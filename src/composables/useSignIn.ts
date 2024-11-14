import { useMutation } from "@tanstack/vue-query";
import { api } from "../services/api"

// Interfaces
interface LoginUserProps {
  email: string;
  password: string;
}

export interface ResponseUser {
  user: {
    id: number;
    name: string;
    email: string;
  };
  accessToken: string;
}

// Função de login
async function loginUser({ email, password }: LoginUserProps): Promise<ResponseUser> {
  const response = await api.post('/login', { email, password });
  return response.data;
}

// Função para usar o hook de sign-in
export function useSignIn() {
  return useMutation<ResponseUser, Error, LoginUserProps>({
    mutationFn: loginUser,
  });
}
