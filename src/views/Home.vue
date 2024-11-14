<template>
  <main>
    
    <h1>Gerenciador de Tarefas</h1>
    <p>Olá {{ userName }}, vejá suas tarefas</p>

    <section class="tasksContainer">
      <div 
        v-for="(item, index) in taskStore.tasks" 
        :key="index" 
      >
        <TaskCard 
          :title="item.title" 
          :id="item.id"
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
  import { onMounted, ref } from 'vue'
  import TaskCard from '../components/TaskCard/TaskCard.vue'
  import { useTaskStore } from '../stores/taskStores';
  import { useDeleteTask } from '../composables/useDeleteTask';

  const TASK_MANAGER_SESSION_KEY = 'task_manager_session';
  const userName = ref<string | null>(null);

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
    const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);

    if (sessionData) {
      const session = JSON.parse(sessionData);
      userName.value = session.user.name; 
    }
    taskStore.fetchTasks()
  })

</script>

<style scoped>
.tasksContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 10px;
}

@media (max-width: 1024px) {
  .tasksContainer {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 25px;
  }

  .tasksContainer {
    grid-template-columns: 1fr;
  }
}
  
</style>