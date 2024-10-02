<template>
    <v-dialog v-model="localDialog">
      <v-card class="containerCard">
        <v-card-title>
          ATENÇÃO
        </v-card-title>
  
        <v-card-text>
          Deseja mesmo excluir este item?
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn color="grey" @click="closeModal">Cancelar</v-btn>
          <v-btn color="red" @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
<script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    showModalDelete: boolean,
    index?: number,
    id?: number,
    deleteFunction: () => void
  }>();
  
  const emit = defineEmits(['close']);
  
  const localDialog = ref(props.showModalDelete);
  
  watch(() => props.showModalDelete, (newVal) => {
    localDialog.value = newVal;
  });
  
  const closeModal = () => {
    emit('close');
  };
  
  const confirmDelete = async () => {
    try {
      await props.deleteFunction();
      closeModal();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };
  
  watch(localDialog, (newVal) => {
    if (!newVal) {
      closeModal();
    }
  });
</script>
  
<style scoped>
  .containerCard {
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 20px;
    width: 450px;
    margin: auto;
    border-radius: 15px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.5);
  }
</style>