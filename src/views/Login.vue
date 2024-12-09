<template>
  <main>
    <div class="div1">
      <img :src="tarefas" />
    </div>
    <div class="div2">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </main>
</template>

<script setup>
  import LoginForm from '../components/Login/LoginForm.vue'
  import RegisterForm from '../components/Register/RegisterForm.vue'
  import tarefas from '../images/tarefas.png'
</script>

<style scoped>
  main {
    display: flex;
    height: 90vh;
    justify-content: space-around;
  }

  .div1 {
    display: flex;
    width: 60%;
    justify-content: right;
    align-items: center;

      img {
       height: 500px;
       border-radius: 10px 0 0 10px;
    }
  }

  .div2 {
    width: 40%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
      overflow: hidden;
    }

    .div2 {
      width: 100%;
    }

    .div1 {
      display: none;
    }
  }
</style>