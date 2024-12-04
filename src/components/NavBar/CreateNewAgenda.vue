<template>
  <div class="home">

    <AlertBanner 
      :isAlertVisible="isAlertVisible" 
      :text="alertMessage"
      color="error"
      @update:isAlertVisible="isAlertVisible = $event"
    />

    <div class="modal">
      <h1>Nova Agenda</h1>
        
      <form @submit.prevent="onSubmit">
        <div class="labelContainer">
          <label>Descrição</label>
          <input type="text" v-model="title" required>
        </div>

        <div class="labelContainer">
          <label>Data</label>
          <input 
            v-model="dateInput" 
            id="dateConclusion"
            type="date"
            @change="updateDate"
            required
          >
        </div>

        <button type="submit" class="btn-add">Salvar</button>
      </form>

      <X class="btn-close" @click="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { X } from 'lucide-vue-next';
  import { defineEmits, ref } from 'vue';
  import { useAddCommitment } from '../../composables/useAddCommitment';
  import { useCommitmentStore } from '../../stores/commitmentsStore';
  import AlertBanner from '../common/AlertBanner.vue';

  const { mutate } = useAddCommitment();
  const commitmentStore = useCommitmentStore();
 
  const title = ref<string>('');
  const dateConclusion = ref<Date | null>(null);
  const dateInput = ref<string>('');
  const alertMessage = ref<string>('');
  const isAlertVisible = ref(false)

  function updateDate(event: Event) {
    const input = event.target as HTMLInputElement;
    dateConclusion.value = input.value ? new Date(input.value) : null;
  }

  const emit = defineEmits(['close']);

  const TASK_MANAGER_SESSION_KEY = 'task_manager_session';
  const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);
  const userId = sessionData ? JSON.parse(sessionData).user.id : null;

  const onSubmit = () => {
    if (!title.value || !dateConclusion.value) {
      console.error('Title and date are required');
      return;
    }

    const selectedDate = new Date(dateConclusion.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      isAlertVisible.value = true;
      alertMessage.value = 'Data inválida.';
      setTimeout(() => {
        isAlertVisible.value = false
      }, 3000)
      return;
    }

    mutate(
      {
        title: title.value,
        dateConclusion: dateConclusion.value,
        userId: userId,
      },
      {
        onSuccess: (newCommitment) => {
          commitmentStore.addCommitment(newCommitment);
          emit('close');
        },
        onError: (error) => {
          console.error('Erro ao adicionar Agenda:', error);
        },
      }
    );
  };
  const close = () => {
    emit('close');
  };
</script>


<style scoped>
  .home {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #1a1a1a;
    position: absolute;
    color: #ffffff;
    padding: 20px;
    width: 400px;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);

    h1 {
      text-align: center;
    }
  }

  .labelContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
      font-size: 15px;
      letter-spacing: 1px;
      color: #cccccc;
    }

    input {
      padding: 8px;
      border-radius: 10px;
      background-color: #2a2a2a; 
      border: 1px solid #444444; 
      color: #ffffff; 
      outline: none;
    }
  }

  .btn-add {
    display: flex;
    margin: auto;
    justify-content: center;
    background-color: #3a3a3a;
    color: #ffffff;
    border: 1px solid #ffffff;
    padding: 5px;
    margin-top: 10px;
    border-radius: 10px;
    cursor: pointer;
    width: 120px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #505050;
    }
  }

  .btn-close {
    position: absolute;
    top: 17px;
    right: 17px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: transparent;
  }
</style>