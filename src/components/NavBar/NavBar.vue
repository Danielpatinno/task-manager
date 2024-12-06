<template>
  <nav class="navContainer">
    <Bolt class="logo" size="27" />

    <button @click="handleClick" class="newTaskIcon">
      <Plus size="20" />
      <span>{{ buttonText }}</span>
    </button>

    <CreateNewTask
      v-if="showModalTask"
      @close="closeModalTask"
    />

    <CreateNewAgenda 
      v-if="showModalAgenda"
      @close="showModalAgenda = false"
    />

    <ul>
      <li>
        <router-link 
          :class="['liContainer', { active: isActive('/home') }]"
          to="/home"
        >
          <BookCheck />
          <span>TAREFAS</span>
        </router-link>
      </li>
      <li>
        <router-link 
          :class="['liContainer', { active: isActive('/agenda') }]"
          to="/agenda"
        >
          <CalendarDays />
          <span>AGENDA</span>
        </router-link>
      </li>
    </ul>

    <ModalCreate :show="showModal" />

    <AlertBanner 
      color="success"
      text="Tarefa criada com sucesso"
      :isAlertVisible="showAlertTask"
    />
  </nav>
</template>

<script setup>
import { BookCheck, CalendarCheck, CalendarDays, Bolt, Plus, LogOut } from 'lucide-vue-next'
import CreateNewTask from './CreateNewTask.vue';
import CreateNewAgenda from './CreateNewAgenda.vue';
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router';

import AlertBanner from '../common/AlertBanner.vue'

const route = useRoute();
const showModalTask = ref(false);
const showModalAgenda = ref(false);
const showAlertTask = ref(false)

const showModal = ref()

const openModalTest = () => {
  showModal.value = true
}

const closeModalTask = () => {
  showModalTask.value = false
}

const isActive = (path) => {
  return route.path === path;
}

const buttonText = computed(() => {
  return route.path === '/agenda' ? 'NOVA AGENDA' : 'NOVA TAREFA';
});

const handleClick = () => {
  if (route.path === '/home') {
    showModalTask.value = true
  } else {
    showModalAgenda.value = true
  }
};
</script>

<style scoped>
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
      width: 100%;
    }

    .liContainer {
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
      text-decoration: none;

      span {
        margin-top: 4px;
      }

      &:hover {
        background-color: aliceblue;
        cursor: pointer;
      }
    }
  }

  .navContainer .liContainer.active {
    background-color: rgba(0, 0, 255, 0.555) ;
    color: white ;

    &:hover {
      background-color: rgba(0, 0, 255, 0.555) ;
      color: white ;
    }
  }

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

  .logoSettings {
    position: absolute;
    bottom: 25px;
    width: 100%;

    &:hover {
      color: grey;
      cursor: pointer;
    }
  }

  @media (max-width:768px) {
    .navContainer {
      width: 68px;
    }

    .newTaskIcon {
      svg {
        margin-right: 0;
      }

      span {
        display: none;
      }
    }

     .liContainer {
       border-radius: 10px;

      span {
        display: none;
      }
     }

  }
</style>
