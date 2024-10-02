<template>
  <v-dialog v-model="showModal" max-width="600px">
    <v-card class="cardContainer">
      <v-card-title class="title">
        <span class="headline">Detalhes das Tarefas para o Dia {{ selectedDay }}</span>
      </v-card-title>

      <v-card-subtitle class="subtitleContainer">
        <div v-if="tasks && tasks.length > 0">
          <ul>
            <li v-for="(task, index) in tasks" :key="index">
              {{ task }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Nenhuma tarefa para este dia.</p>
        </div>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, watch, defineProps } from 'vue';

  const props = defineProps({
    day: {
      type: Number as () => number | null,
      default: null
    },
    tasks: {
      type: Array as () => string[],
      default: () => []
    }
  });

  const showModal = ref(false);

  const selectedDay = ref(props.day);

  watch(() => props.day, (newDay) => {
    selectedDay.value = newDay;
    if( newDay !== null ) {
      showModal.value = true;
    }
    
  });

  function closeModal() {
    showModal.value = false;
    selectedDay.value = null;
  }
</script>

<style scoped>
  .cardContainer {
    background-color: black;
    color: whitesmoke;
  }


  li {
    margin-left: 15px;
  }
  

</style>