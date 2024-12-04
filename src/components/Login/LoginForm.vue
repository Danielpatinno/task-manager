<template>
    <div class="container">
      <form @submit.prevent="handleLogin">
        <h2>Login</h2>
        
        <label>
          Email:
          <input type="email" v-model="email" required />
        </label>
      
        <label>
          Senha:
          <input type="password" v-model="password" required />
        </label>
      
        <button type="submit">Login</button>
        
        <p class="register-link">
          Não tem conta? <router-link to="/">Cadastre-se</router-link>
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
  import { useRouter } from 'vue-router'; 
  import { ResponseUser, useSignIn } from '../../composables/useSignIn';
  import { useError } from '../../composables/useError';
  import AlertBanner from '../common/AlertBanner.vue';
  
  const email = ref('');
  const password = ref('');
  const isAlertVisible = ref()
  const { mutate } = useSignIn();
  const router = useRouter(); 
  const { error, handleErrorEdit } = useError();
  
  const session = ref<ResponseUser | null>(null); 
  const isAuthenticated = ref(false);
  const SESSION_KEY = 'task_manager_session';
  
  const handleLogin = () => {
    mutate(
      { email: email.value, password: password.value },
      {
        onSuccess: (response: ResponseUser) => {
          const newSession: ResponseUser = {
            user: response.user,  
            accessToken: response.accessToken,  
          };
          session.value = newSession;
          localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
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
      }
    );
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
  