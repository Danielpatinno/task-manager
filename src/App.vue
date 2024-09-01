<template>
    <div class="container">
      <NavBar />

      <div class="mainContainer">
        <Home />
      </div>
    </div>

</template>
  
<script setup lang="ts">
  import NavBar from './components/NavBar.vue'; 
  import Home from './views/Home.vue';
  
</script>
  
<style scoped>
  .container {
    display: flex;
  }

  .mainContainer {
    margin-left: 200px;
    width: 100%;
    padding: 20px;
    flex-wrap: 1;
  }

</style>
  