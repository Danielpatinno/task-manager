<template>
  <main>
    <div class="div1">
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
</script>

<style scoped>
  main {
    display: flex;
    height: 95vh;
    justify-content: space-between;
  }

  .div1 {
    width: 60%;
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

    .div1,
    .div2 {
      width: 100%;
    }
  }
</style>