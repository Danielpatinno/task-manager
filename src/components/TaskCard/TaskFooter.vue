<template>
  <div class="footerTask">
    <p>{{ formattedDate }}</p>
    <button class="btnNewTask" @click="onAddNewTask">
      <Plus />
      Adicionar Atividade
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps, defineEmits } from 'vue';
  import { Plus } from 'lucide-vue-next';

  const props = defineProps<{dateConclusion: string}>();
  const emit = defineEmits(['addTask']);

  const formattedDate = computed(() => {
    const date = new Date(props.dateConclusion);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  });

  function onAddNewTask() {
    emit('addTask')
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