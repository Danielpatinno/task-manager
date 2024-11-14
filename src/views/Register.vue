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

    @media (max-width: 768px) {
    main {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .div1, .div2 {
      width: 100%;  /* Ambas as divs ocupam 100% da largura */
    }

    .div2 {
      padding: 20px;  /* Adiciona um padding para não ficar colado nas bordas */
    }
  }
  </style>