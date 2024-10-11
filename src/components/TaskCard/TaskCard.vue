<template>
  <div :class="statusClass" class="task">
    <TaskHeader :index="index" @deleteTask="openModalDelete"/>

    <TaskTitle 
      :title="props.title"
      :index="index"
      :priority="props.priority"
      :id="props.id"
      @update:status="updateTaskStatus"
    />  

    <TaskBody 
      :activitys="localActivitys" 
      :isCreateNewTask="isCreateNewTask"
      :showModalDeleteActivity="showModalDeleteActivity"
      :cancelEdit="cancelEdit"
      @update:showModalDeleteActivity="showModalDeleteActivity = $event"
      :openModalDeleteActivity="openModalDeleteActivity" 
      @add-activity="(event) => addActivity(event.newActivitys)"
      @edit-activity="(event) => editActivity(event.index, event.newActivity)"
      @remove-activity="(event) => removeActivity(event.activityIndex)"
    />

    <TaskFooter 
      :date-conclusion="dateConclusion" 
      @addTask="addNewTask" 
    />
    
    <ConfirmDelete
      :showModalDelete="showModalDelete"
      :index="index"         
      :id="id"               
      :deleteFunction="() => deleteTaskFunction(index, id)"
      @close="closeModal"
    />

    <AlertBanner 
      :isAlertVisible="isAlertVisible"
      color="success"
      text="Tarefa adicionada com sucesso!"
      @update:isAlertVisible="isAlertVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, computed } from 'vue';
  
  import { useTaskManagement } from '../../composables/useTaskManagement';
  import { useUpdateTask } from '../../composables/useUpdateTask';
  import { useTaskStore } from '../../stores/taskStores';

  import TaskTitle from './TaskTitle.vue';
  import TaskHeader from '../TaskCard/TaskHeader.vue'
  import TaskBody from '../TaskCard/TaskBody.vue'
  import TaskFooter from '../TaskCard/TaskFooter.vue'
  import ConfirmDelete from '../common/ConfirmDelete.vue'

  import AlertBanner from '../common/AlertBanner.vue'

  
  const props = defineProps<{
    id: number;
    title: string;
    status: string;
    priority: string;
    dateConclusion: string
    index: number;
    activitys: string[];
    deleteTaskFunction: (index:number, id:number) => Promise<void>
  }>();

  const isAlertVisible = ref()



  const emit = defineEmits<{
    (event: 'update:status', newStatus: string[]): void;
    (event: 'update:activitys', updatedActivitys: string): void;
  }>();

  const {
    isEditing,
    editingIndex,
    localActivitys,
    isCreateNewTask,
    cancelEdit,
    addNewTask
  } = useTaskManagement(props, emit);

  const { mutate } = useUpdateTask();
  const taskStore = useTaskStore();
  const status = ref(props.status);
  const newActivitys = ref<string>('')

  const statusClass = computed(() => {
  if (props.status === 'Pendente') {
    return 'pending';
  } else if (props.status === 'Em andamento') {
    return 'inProgress';
  } else if (props.status === 'Concluído') {
    return 'completed';
  } else {
    return '';
  }
});

  // Computed para obter o status local
  const localStatus = computed({
    get: () => status.value,
    set: (newStatus: string) => {
      status.value = newStatus;
      console.log('Tentando atualizar para:', newStatus);
      
      mutate(
        { id: props.id, status: newStatus },
        { 
          onSuccess: () => {
            console.log('Status atualizado com sucesso');
            taskStore.updateTask(props.id, { status: newStatus });
          },
          onError: (error) => {
            console.error('Falha ao atualizar o status da tarefa:', error);
            status.value = props.status;
          },
        }
      );
    }
  });

  const showModalDelete = ref(false);
  const showModalDeleteActivity = ref(false);

  const openModalDelete = () => {
    showModalDelete.value = true;
  };

  const openModalDeleteActivity = () => {
    showModalDeleteActivity.value = true;
  };

  const closeModal = () => {
    showModalDelete.value = false;
  };

  // Função para alterar o status
  function updateTaskStatus(newStatus: string) {
    localStatus.value = newStatus;
  }

  function addActivity(newActivity: string) {
    mutate(
      { id: props.id, newActivity }, 
      {
        onSuccess: () => {
          isAlertVisible.value = true
          localActivitys.value = [...localActivitys.value, newActivity];
          isCreateNewTask.value = false


          setTimeout(() => {
            isAlertVisible.value = false
          }, 3000)
          newActivitys.value = ''
        },
        onError: (error) => {
          console.error('Falha ao adicionar a atividade:', error);
        },
      }
    );
  }

  function removeActivity(index: number) {
    console.log('indexTest' + index)
    mutate(
      { id: props.id, newActivity: '', activityIndex: index },
      {
        onSuccess: () => {
          console.log('Atividade removida com sucesso');
          const updatedActivitys = [...localActivitys.value];
          updatedActivitys.splice(index, 1);
          localActivitys.value = updatedActivitys;
        },
        onError: (error) => {
          console.error('Falha ao remover a atividade:', error);
        },
      }
    );
  }

  function editActivity(index: number, updatedActivity: string) {
    console.log(`index: ${index}`);
    console.log(`activity: ${updatedActivity}`);

    if (index < 0 || index >= localActivitys.value.length) {
      console.error('Índice de atividade inválido');
      return;
    }

    const oldActivity = localActivitys.value[index];
    const updatedActivitys = [...localActivitys.value];
    updatedActivitys[index] = updatedActivity;
    localActivitys.value = updatedActivitys;

    mutate(
      { id: props.id, newActivity: updatedActivity, activityIndex: index },
      {
        onSuccess: () => {
          isEditing.value = false;
          editingIndex.value = null;
        },
        onError: (error) => {
          console.error('Falha ao editar a atividade:', error);
          localActivitys.value[index] = oldActivity;
        },
      }
    );
  }
</script>

<style scoped>
   .task {
    width: 330px;
    height: auto;
    border-radius: 10px;
    position: relative; 
    padding-bottom: 40px;
    display: flex;
    flex-direction: column; 
  }

  .pending {
    background-color: rgba(0, 0, 0, 0.766); /* Amarelo */
  }

  .inProgress {
    background-color: rgba(0, 153, 255, 0.384); /* Azul */
  }

  .completed {
    background-color: rgba(0, 128, 6, 0.562); /* Verde */
  }

  @media(max-width: 768px) {
    .task {
      width: 295px;
    }
  }
</style>

/* background-color: rgba(0, 0, 0, 0.766); */