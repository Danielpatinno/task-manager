<template>
  <div class="task">
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
      :openModalDeleteActivity="openModalDeleteActivity" 
      @add-activity="(event) => addActivity(event.newActivitys)"
      @edit-activity="(event) => editActivity(event.index, event.newActivity)"
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

    <ConfirmDelete
      :showModalDelete="showModalDeleteActivity"
      :index="index"         
      :deleteFunction="() => removeActivity(index)"
      @close="closeModalActivity"
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

  const emit = defineEmits<{
    (event: 'update:status', newStatus: string[]): void;
    (event: 'update:activitys', updatedActivitys: string): void;
  }>();

  const {
    isEditing,
    editingIndex,
    localActivitys,
    isCreateNewTask,
    addNewTask
  } = useTaskManagement(props, emit);

  const { mutate } = useUpdateTask();
  const taskStore = useTaskStore();
  const status = ref(props.status);
  const newActivitys = ref<string>('')

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

  const closeModalActivity = () => {
    showModalDeleteActivity.value = false;
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
          console.log('Atividade adicionada com sucesso');
          localActivitys.value = [...localActivitys.value, newActivity];
          isCreateNewTask.value = false
          newActivitys.value = ''
        },
        onError: (error) => {
          console.error('Falha ao adicionar a atividade:', error);
        },
      }
    );
  }

  function removeActivity(index: number) {
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
    background-color: rgba(0, 0, 0, 0.766);
    display: flex;
    flex-direction: column; 
  }
</style>