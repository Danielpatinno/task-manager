<template>
    <div class="container">
      <form @submit.prevent="handleLogin">
        <h2>Cadastre-se</h2>

        <label>
          Nome:
          <input type="text" v-model="name" required />
        </label>
        
        <label>
          Email:
          <input type="email" v-model="email" required />
        </label>
      
        <label>
          Senha:
          <input type="password" v-model="password" required />
        </label>
      
        <button type="submit">Cadastrar</button>
        
        <p class="register-link">
          Já tem conta? <router-link to="/login">Faça login</router-link>
        </p>
      </form>    

      <AlertBanner 
        :isAlertVisible="isAlertVisible"
        :text="error"
        color="error"
        @update:isAlertVisible="isAlertVisible = $event"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useSignUp } from '../../composables/useSignUp'
  import { ResponseUserSignUp } from '../../composables/useSignUp';
  import { useRouter } from 'vue-router'; 
  import { useError } from '../../composables/useError';
  import AlertBanner from '../common/AlertBanner.vue';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const { mutate } = useSignUp();
  const { error, handleErrorEdit } = useError();
  const router = useRouter(); 

  const session = ref<ResponseUserSignUp | null>(null); 
  const isAuthenticated = ref(false);
  const TASK_MANAGER_SESSION_KEY = 'task_manager_session';
  const isAlertVisible = ref()
  
  const handleLogin = () => {
    mutate({
      name: name.value,
      email: email.value,
      password: password.value
    },{
      onSuccess: (response: ResponseUserSignUp) => {
        const newSession: ResponseUserSignUp = {
            user: response.user,  
            accessToken: response.accessToken,  
          };   
          session.value = newSession;
          localStorage.setItem(TASK_MANAGER_SESSION_KEY, JSON.stringify(newSession));
          isAuthenticated.value = true;
          
          router.push({ name: 'Home' }); 
      },
        onError: (err) => {
          isAlertVisible.value = true
          handleErrorEdit(err);
          setTimeout(() => {
            isAlertVisible.value = false
          }, 3000)
        },
    })
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }
  
  form {
    background-color: #fff;
    border-radius: 10px;
    /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); */
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  label {
    color: #666;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    color:black;
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    border-color: rgba(0, 0, 255, 0.555);
  }
  
  button[type="submit"] {
    background-color: rgba(0, 0, 255, 0.973);
    color: #fff;
    border: none;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button[type="submit"]:hover {
    background-color: rgba(0, 0, 255, 0.904);
  }
  
  button[type="submit"]:active {
    background-color: #722;
  }
  
  .register-link {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: blue;
  }
  
  .register-link a {
    color: rgba(0, 0, 255, 0.966);
    text-decoration: none;
    font-weight: bold;
  }
  
  .register-link a:hover {
    text-decoration: none;
  }
  </style>
  