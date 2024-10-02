<template>
  <div class="titleContainer">
    <div class="title">
      <Circle :class="circleClass" />
      <p class="titleTask">{{ title }}</p>
    </div>

    <div>
      <div class="statusContainer">
        <p>{{ taskStore.tasks[index].status }}</p>
        <ArrowDown @click="toggleBtnsContainer(index)" />
      </div>

      <div v-if="showBtnsContainer[index]" class="btnsContainer">
        <button @click="changeTaskStatus('Pendente')">Pendente</button>
        <button @click="changeTaskStatus('Em andamento')">Em andamento</button>
        <button @click="changeTaskStatus('Concluído')">Concluído</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import { ArrowDown, Circle } from 'lucide-vue-next';
import { useTaskStore } from '../../stores/taskStores';

const taskStore = useTaskStore()

// Props
const props = defineProps<{
  id: number;
  title: string;
  priority: string;
  index: number;
}>();

const { id, title, priority, index } = props;

// Emit event to the parent
const emit = defineEmits(['update:status']);

// State
const showBtnsContainer = ref<boolean[]>([]);

// Computed
const circleClass = computed(() => {
  return {
    'circle-baixa': priority === 'BAIXA',
    'circle-media': priority === 'MEDIA',
    'circle-alta': priority === 'ALTA'
  };
});

// Methods
function toggleBtnsContainer(index: number) {
  showBtnsContainer.value[index] = !showBtnsContainer.value[index];
}

function changeTaskStatus(newStatus: string) {
  emit('update:status', newStatus); 
  toggleBtnsContainer(index);
}
</script>


<style scoped>
  .titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }

  .title {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .statusContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin-right: 5px;
    background-color: #22272B;
    height: 30px;
    width: 145px;
    padding: 0 4px;

    svg {
      background-color: rgba(95, 95, 95, 0.253);
      cursor: pointer;
      height: 80%;
      padding: 2px;

      &:hover {
        background-color: rgba(95, 95, 95, 0.144);
      }
    }
  }

  .btnsContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 123px;
    
    button {
      border-radius: 10px;
      text-align: left;
      padding: 6px;
      background-color: #22272B;
      color: white;
      cursor: pointer;
    
      &:hover  {
        border: 1px solid white;
      }
    }
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
</style>