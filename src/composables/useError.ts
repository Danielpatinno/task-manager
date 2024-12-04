import { isAxiosError } from 'axios';
import { ref, Ref } from 'vue';

interface useError {
  error: Ref<string | null>; 
  handleErrorEdit: (err: unknown) => void;
  clearError: () => void; 
}

export function useError(): useError {
  const error = ref<string | null>(null); 
  const handleErrorEdit = (err: unknown) => {
    if (isAxiosError(err)) {
      const data = err.response?.data;

      if (data) {
        if (typeof data.error === 'string') {
          error.value = data.error;
          console.log(error.value); 
        } 

        else if (Array.isArray(data.errors)) {
          error.value = data.errors[0]; 
          console.log(error.value); 
        } 

        else {
          console.log('Formato inesperado de erro:', data);
        }
      } else {
        console.log('Erro sem resposta da API.');
      }
    } else {
      console.log('Erro não relacionado ao Axios:', err);
    }
  };

  const clearError = () => {
    error.value = null; 
  };

  return {
    error, 
    clearError,
    handleErrorEdit,
  };
}
