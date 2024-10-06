<template>
  <main>
    <h1>Gerenciador de Tarefas</h1>
    <div>
      
    </div>

    <section class="tasksContainer">
      <div v-for="(item, index) in taskStore.tasks" :key="index">
        <TaskCard 
          :title="item.title" 
          :id="item._id"
          :priority="item.priority"
          :activitys="item.activitys" 
          :status="item.status"
          :dateConclusion="item.dateConclusion"
          :index="index"
          :deleteTaskFunction="deleteTaskFunction"
        />
      </div>

      
    </section>
    
  </main>
  
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import TaskCard from '../components/TaskCard/TaskCard.vue'
  import { useTaskStore } from '../stores/taskStores';
  import { useDeleteTask } from '../composables/useDeleteTask';

    

  const taskStore = useTaskStore()
  const { mutate:deleteTask } = useDeleteTask()

  const deleteTaskFunction = async (index: number, id: number) => {
    deleteTask(id, {
      onSuccess: () => {
        taskStore.removeTask(index);
        taskStore.fetchTasks();
      },
      onError: () => {
        console.error("Erro ao deletar a tarefa:");
      }
    });
  };
  onMounted(() => {
    taskStore.fetchTasks()
  })

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