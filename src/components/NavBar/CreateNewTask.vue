<template>
  <div class="home">
    <div class="modal">
      <h1>Nova Tarefa</h1>

      <form @submit.prevent="onSubmit">
        <div class="labelContainer">
          <label>Título da Tarefa</label>
          <input v-model="title" type="text" required>
        </div>

        <div class="labelContainer">
          <label>Data de conclusão</label>
          <input 
            v-model="dateInput" 
            id="dateConclusion"
            type="date"
            @change="updateDate"
          >
        </div>

        <div class="labelContainer">
          <label>Prioridade</label>
          <select v-model="priority" name="priority">
            <option value="BAIXA">BAIXA</option>
            <option value="MEDIA">MÉDIA</option>
            <option value="ALTA">ALTA</option>
          </select>
        </div>

        <fieldset class="ativitysContainer">
          <legend>Atividades</legend>
          <div>
            <input type="text" v-model="newActivity">
            <button type="button" @click="addActivity">
              <Plus />
            </button>
          </div>

          <div 
            v-for='(activity, index) in activitys' class="newsActivitysContainer"
          >
            <p :key="index">
              {{ activity }}
              <button type="button" @click="removeActivity(index)">
                <Trash2 />
              </button>
            </p>
          </div>
        </fieldset>

        <button type="submit" class="btn-add">Salvar</button>
      </form>

      <X class="btn-close" @click="close" />
    </div>

    <AlertBanner 
      :isAlertVisible="isAlertVisible"
      :text="errorMessage"
      color="error"
      @update:isAlertVisible="error = $event"
    />

  </div>
</template>
  
<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue';
import { X, Plus, Trash2 } from 'lucide-vue-next';
import { useAddTask } from '../../composables/useAddTask';
import { useTaskStore } from '../../stores/taskStores';
import { useError } from '../../composables/useError';
import  AlertBanner from '../common/AlertBanner.vue'

const { mutate } = useAddTask();
const { error, handleErrorEdit, clearError } = useError();

const isAlertVisible = ref(false);

const errorMessage = computed(() => {
  return Array.isArray(error.value) && error.value.length > 0 ? error.value[0] : '';
});

const title = ref<string>('');
const priority = ref<string>('BAIXA');
const dateConclusion = ref<Date | null>(null);
const activitys = ref<Array<string>>([]);
const newActivity = ref<string>('');

const dateInput = ref<string>('');

function updateDate(event: Event) {
  const input = event.target as HTMLInputElement;
  dateConclusion.value = input.value ? new Date(input.value) : null;
}

function addActivity() {
  if (newActivity.value.trim() !== '') {
    activitys.value.push(newActivity.value); 
    newActivity.value = ''; 
  }
}

function removeActivity(index: number) {
  activitys.value.splice(index, 1);
}

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const taskStore = useTaskStore();
const TASK_MANAGER_SESSION_KEY = 'task_manager_session';
const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);
const userId = sessionData ? JSON.parse(sessionData).user.id : null;

const onSubmit = () => {
  mutate(
    {
      title: title.value,
      priority: priority.value,
      status: 'Pendente',
      dateConclusion: dateConclusion.value,
      activitys: activitys.value,
      userId:userId
    },
    {
      onSuccess: (newTask) => {
        taskStore.addTask(newTask);
        isAlertVisible.value = true
        emit('close');
      },
      onError: (error) => {
        handleErrorEdit(error)
        isAlertVisible.value = true

        setTimeout(() => {
          clearError()
          isAlertVisible.value = false
        }, 3000)
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
    color: #ffffff;
    padding: 20px;
    width: 400px;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    position: absolute;

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
      color: #cccccc; /* Texto mais claro para contraste */
    }

    input {
      padding: 8px;
      border-radius: 10px;
      background-color: #2a2a2a; /* Fundo escuro */
      border: 1px solid #444444; /* Borda com leve contraste */
      color: #ffffff; /* Texto branco para contraste */
      outline: none;
    }

    select {
      padding: 8px;
      border-radius: 10px;
      cursor: pointer;
      background-color: #2a2a2a;
      border: 1px solid #444444;
      color: #ffffff;
    }
  }


  .ativitysContainer {
    border: none;

    div {
      display: flex;

      input {
        width: 100%;
        border-radius: 10px 0 0 10px;
        background-color: #2a2a2a;
        border: 1px solid #444444;
        color: #ffffff;
        outline: none;
      }

      button {
        cursor: pointer;
        border: 2px solid #ffffff; 
        border-radius: 0 10px 10px 0;
        background-color: #333333; 
        color: #ffffff;
    
        svg {
          margin-top: 5px;
        }
      }
    }

    .newsActivitysContainer {
      margin: 15px 0;

      p {
        display: flex;
        padding: 2px;
        margin: 0;
        border-radius: 10px;
        border: 1px solid #444444;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        background-color: #333333;
        color: #ffffff;

        svg {
          cursor: pointer;
        }
      }
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