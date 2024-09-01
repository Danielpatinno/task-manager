<template>
  
  <nav class="navContainer">
    <Bolt class="logo" size="27" />
    <button @click="showModal = true" class="newTaskIcon">
      <Plus  size="20" />
      <span>NOVA TAREFA</span>
    </button>

    <CreateNewTask
      v-if="showModal"
      @close="showModal = false"
    />
    
    <ul>
      <li>
        <BookCheck />
        <span>TAREFAS</span>
      </li>
      <li>
        <CalendarCheck />
        <span>HOJE</span>
      </li>
      <li>
        <CalendarDays />
        <span>AGENDA</span>
      </li>
    </ul>

    <Settings class="logoSettings" size="45" />
  </nav>
</template>
  
<script setup>
  import { BookCheck, CalendarCheck, CalendarDays, Bolt, Plus , Settings  } from 'lucide-vue-next'
  import CreateNewTask from './CreateNewTask.vue';
  import { ref } from 'vue'

  const showModal = ref(false);

</script>
  
<style scoped>
  .logo {
    margin-top: 10px;
    width: 100%;
    height: 65px;
    color: blue;
    text-align: center;
  }

  .newTaskIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;

    svg {
      color: blue;
      border: 2px solid blue;
      border-radius: 50%;  
      margin-right: 8px;  

      &:hover {
       border-color: white;
       color: white;
      }
    }

    
  }

  .navContainer {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 9999;
    height: 100vh;
    width: 170px;
    padding: 10px;
    background-color: #22272B;

    ul {
      margin-top: 20px;
      margin-left: -40px;
      width: 100%;
    }

    li {
      display: flex;
      flex-direction: column;
      list-style: none;
      justify-content: center;
      align-items: center;
      padding: 8px;
      height: 70px;
      margin-top: 10px;
      background-color: gainsboro;
      color: #000;

      span {
        margin-top: 4px;
      }

      &:hover {
        background-color: aliceblue;
        cursor: pointer;
      }
    }
  }

  .logoSettings {
    /* display: flex; */
    position: absolute;
    bottom: 25px;
    width: 100%;

    &:hover {
      color: grey;
      cursor: pointer;
    }
  }

</style>