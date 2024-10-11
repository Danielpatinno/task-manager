<template>
  <div class="footerTask">
    <p v-if="formattedDate">{{ formattedDate }}</p>
    <button class="btnNewTask" @click="onAddNewTask">
      <Plus />
      Adicionar Atividade
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { Plus } from 'lucide-vue-next';

const props = defineProps<{ dateConclusion: string | null }>(); // Permitir null
const emit = defineEmits(['addTask']);

const formattedDate = computed(() => {
  if (!props.dateConclusion) {
    return ''; // Retorna string vazia se dateConclusion for null
  }

  const date = new Date(props.dateConclusion);
  
  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return ''; // Retorna string vazia se a data não for válida
  }

  // Usando métodos de data para pegar a data no fuso horário local
  const day = date.getUTCDate(); // Usa getUTCDate para pegar o dia correto
  const month = date.getUTCMonth() + 1; // Meses são indexados a partir de 0
  const year = date.getUTCFullYear(); 

  return `${day}/${month}/${year}`;
});
function onAddNewTask() {
  emit('addTask');
}
</script>

<style scoped>   
  .footerTask {
    display: flex;
    position: absolute;
    bottom: 10px; 
    width: 100%;
    left: 50%;
    transform: translateX(-50%); 
    justify-content: space-around;
    align-items: center;

    .btnNewTask {
      padding: 0 6px;
      border: none;
      border-radius: 10px;
      display: flex;
      align-items: center;
      bottom: 10px; 
      cursor: pointer;
      background-color: transparent;
      gap: 5px;
      color: white;

      &:hover {
        background-color: #282F27;
      }
    }
  }
</style>