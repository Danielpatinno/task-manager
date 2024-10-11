import { isAxiosError } from 'axios';
import { ref, Ref } from 'vue';

interface useError {
  error: Ref<any | null>; 
  handleErrorEdit: (err: unknown) => void;
  clearError: () => void; 
}

export function useError(): useError {
  const error = ref<string[] | null>(null); 

  const handleErrorEdit = (err: unknown) => {
    if (isAxiosError(err)) {
      const errors = err.response?.data.errors; 
      if (Array.isArray(errors)) {
        error.value = errors; 
        console.log(error.value[0]); 
      } else {
        console.log('A estrutura de erros não é um array');
      }
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

