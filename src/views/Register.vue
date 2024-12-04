<template>
    <main>
      <div class="div1">
        <RegisterForm />
      </div>
      <div class="div2">
        
      </div>
    </main>
  
  </template>
  
  <script setup>
    import RegisterForm from '../components/Register/RegisterForm.vue'
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