<template>
  <main>
    <h1>Gerenciador de Tarefas</h1>

    <section class="tasksContainer">

      <div v-for="item in items" >
        <TaskCard 
          :title="item.title" 
          :priority="item.priority"
          :activitys="item.activitys" 
        />
      </div>

    </section>

  </main>
</template>

<script setup>
  import { Plus, Circle, Pen } from 'lucide-vue-next';
  import { reactive } from 'vue';
  import { ref } from 'vue'

  import TaskCard from '../components/TaskCard.vue'

  const items = ref([
    {
      title: 'Titulo da tarefa',
      priority: 'baixa',
      activitys: [
        'ATIVIDADE1'
      ]
    },
    {
      title: 'Titulo da tarefa',
      priority: 'baixa',
      activitys: [
        'ATIVIDADE1','ATIVIDADE2'
      ]
    },
    {
      title: 'Titulo da tarefa',
      priority: 'media',
      activitys: [
        'ATIVIDADE1','ATIVIDADE2','ATIVIDADE3'
      ]
    },
    {
      title: 'Titulo da tarefa',
      priority: 'alta',
      activitys: [
        'ATIVIDADE1','ATIVIDADE2','ATIVIDADE3','ATIVIDADE4','ATIVIDADE5'
      ]
    }
  ])
  
</script>

<style scoped>
  main {
    width: 100%;
  }

  h1 {
    margin: 0;
  }

  .sectionContainer {
    width: 100%;
  }

  .tasksContainer {
    display: grid;
    margin-top: 10px;
    gap: 45px;
    grid-template-columns: repeat(3, 1fr);

    div {
      height: 100%;
    }
  }
 

  
</style>