<template>
  <main>
    <div class="div1">

    </div>
    <div class="div2">
      <LoginForm />
    </div>
  </main>

</template>

<script setup>
  import LoginForm from '../components/Login/LoginForm.vue'
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

  @media (max-width: 768px) {
    main {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;  
      overflow: hidden; 
    }

    .div1, .div2 {
      width: 100%;
    }

    .div2 {
      padding: 20px;
    }
  }
</style>