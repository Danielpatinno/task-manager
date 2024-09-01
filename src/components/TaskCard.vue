<template>
  <div class="task">
    <div class="titleContainer">
      <Circle :class="circleClass" />
      <p class="titleTask">{{ title }}</p>
    </div>

    <draggable
      v-model="localActivitys"
      :options="{ animation: 200 }"
      @end="onEnd"
    >
      <template #item="{ element, index }">
        <div v-if="!isEditing || editingIndex !== index" >
          <p class="subTask">
            {{ element }}
            <Pencil @click="editTask(index)" />
          </p>
        </div>
        <div v-else class="newTaskContainer" >
          <input v-model="localActivitys[index]" />
          <div>
            <button @click="confirmEdit">Confirmar</button>
            <X @click="cancelEdit" />
          </div>
          
        </div>
      </template>
    </draggable>

    <button @click="addNewTask" class="btnNewTask">
      <Plus /> Nova Atividade
    </button>
  </div>
</template>

<script setup>
import { Circle, Plus, Pencil, X } from 'lucide-vue-next';
import { ref, watch, computed } from 'vue';
import Draggable from 'vuedraggable';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  activitys: {
    type: Array,
    default: () => []
  }
});

const circleClass = computed(() => {
  return {
    'circle-baixa': props.priority === 'baixa',
    'circle-media': props.priority === 'media',
    'circle-alta': props.priority === 'alta'
  };
});

const emit = defineEmits(['update:activitys']);

const localActivitys = ref([...props.activitys]);

watch(() => props.activitys, (newValue) => {
  localActivitys.value = [...newValue];
});

const onEnd = (event) => {
  emit('update:activitys', localActivitys.value);
};

const isEditing = ref(false);
const editingIndex = ref(null);

const addNewTask = () => {
  localActivitys.value.push(''); // Adiciona uma nova tarefa vazia
  editingIndex.value = localActivitys.value.length - 1; // Defina o índice para o novo item
  isEditing.value = true; // Ativa o modo de edição
};

const editTask = (index) => {
  editingIndex.value = index;
  isEditing.value = true;
};

const confirmEdit = () => {
  isEditing.value = false;
  editingIndex.value = null;
};

const cancelEdit = () => {
  if (localActivitys.value[editingIndex.value] === '') {
    localActivitys.value.splice(editingIndex.value, 1); // Remove o item se estiver vazio
  }
  isEditing.value = false;
  editingIndex.value = null;
};
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

  .titleContainer {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .circle-baixa {
    background-color: blue;
    border-radius: 50%;
    color: blue;
  }

  .circle-media {
    background-color: orange;
    border-radius: 50%;
    color: orange;
  }

  .circle-alta {
    background-color: red;
    border-radius: 50%;
    color: red;
  }

  .titleTask {
    margin-left: 10px
  }

  .subTask {
    margin: 7px 10px;
    background-color: #22272B;
    padding: 5px;
    display: flex;
    border-radius: 10px;
    border: 1px solid transparent;
    justify-content: space-between;
    align-items: center;

    &:hover {
      border:1px solid white;
      cursor: pointer;
    }

    svg {

      &:hover {
        color: rgb(239, 204, 204);
      }
    }
  }

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
        padding: 8px;
        width: 70px;
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
    }
  }

  .btnNewTask {
    padding: 6px;
    border: none;
    border-radius: 10px;
    text-align: center;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px; 
    left: 50%;
    transform: translateX(-50%); 
    cursor: pointer;
    background-color: transparent;
    gap: 5px;

    &:hover {
      background-color: #282F27;
    }
  }
  
</style>


    <!-- <button class="btnNewTask">
      <Plus />
      <span>Nova atividade</span>
    </button> -->