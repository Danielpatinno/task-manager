<template>
  <draggable v-model="localActivitys" :options="{ animation: 200 }" @end="onEnd">
    <template #item="{ element, index }">
      <div>
        <TaskItem
          :activity="element"
          :index="index"
          @remove-activity="removeActivity"
          @edit="editTask(index)"
          @delete="openModalDeleteActivity" 
          v-if="!isEditing || editingIndex !== index"
        />

        <TaskEditForm
          v-if="editingIndex === index"
          v-model="localActivitys[index]" 
          @cancel="cancelEditt"
          :index="index"
          @confirm="editActivity"
        />
      </div>
    </template>
  </draggable>



  <div v-if="isCreateNewTask" class="newActivityContainer">
    <div class="newTaskContainer">
      <input v-model="newActivitys" placeholder="Nova Atividade" /> 
      <div>
        <button @click="addActivity">Adicionar</button>
        <X @click="cancelEdit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, defineEmits, watch } from 'vue';
import { X } from 'lucide-vue-next';
import Draggable from 'vuedraggable';
import TaskItem from './TaskItem.vue';
import TaskEditForm from './TaskEditForm.vue';

// Definir props
const props = defineProps<{ 
  activitys: string[], 
  showModalDeleteActivity:boolean,
  openModalDeleteActivity: (index: number) => void,
  cancelEdit: () => void,
  isCreateNewTask: boolean
}>();

const newActivitys = ref<string>('');

const emit = defineEmits(['edit-activity', 'add-activity', 'deleteActivity','updateActivityOrder','remove-activity']);

const localActivitys = ref([...props.activitys]);
const isEditing = ref(false);
const editingIndex: Ref<number | null> = ref(null);

watch(() => props.activitys, (newVal) => {
  localActivitys.value = [...newVal];
}, { immediate: true });

function editTask(index: number) {
  editingIndex.value = index;
  isEditing.value = true;
}

function cancelEditt() {
  isEditing.value = false;
  editingIndex.value = null;
}

function editActivity({ activityIndex, activity }: { activityIndex: number, activity: string }) {
  emit('edit-activity', { index: activityIndex, newActivity: activity });
  isEditing.value = false;
  editingIndex.value = null;
}

function addActivity() {
  emit('add-activity', { newActivitys: newActivitys.value }); 
  newActivitys.value = ''; 
}

function removeActivity({ activityIndex }: { activityIndex: number }) {
  emit('remove-activity', { activityIndex });
}

function onEnd() {
  emit('updateActivityOrder', localActivitys.value);
}
</script>
  
<style scoped>
  .newTaskContainer {
    margin: 7px 10px;
    background-color: #22272B;
    padding: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid transparent;

    div {
      margin-top: 3px;
      display: flex;
      align-items: center;

      button {
        background-color: transparent;
        border: none;
        margin-top: 4px;
        padding: 4px 8px;
        color: white;
        background-color: rgba(0, 0, 0, 0.766);
        border-radius: 5px;

        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.498);
        }
      }

      svg {
        cursor: pointer;
      }
    }

    input {
      width: 100%;
      box-sizing: border-box; 
      border-radius: 10px;
      padding: 5px;
      background-color:white;
      color: #000;
    }
  }
</style>