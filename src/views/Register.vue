<template>
    <main>
      <div class="div1">
        <LoginRegister />
      </div>
      <div class="div2">
        
      </div>
    </main>
  
  </template>
  
  <script setup>
    import LoginRegister from '../components/Register/LoginRegister.vue'
  </script>
  
  <style scoped>
    main {
      display: flex;
      height: 95vh;
      justify-content: space-between;
    }
  
    .div1 {
      width: 40%;
    }
  
    .div2 {
      width: 60%;
    }
  </style>