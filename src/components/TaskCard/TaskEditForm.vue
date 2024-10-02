<template>
  <div class="newTaskContainer">
    <input v-model="localActivity" @input="updateActivity" />
    <div>
      <button @click="confirmEdit">Confirmar</button>
      <X @click="$emit('cancel')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { X } from 'lucide-vue-next';

// Definindo os props
const props = defineProps<{ 
  modelValue: string 
  index: number 
}>();

// Definindo a função emit para emitir eventos
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

// Usamos `localActivity` para controlar o input localmente
const localActivity = ref(props.modelValue);

// Sincronizamos o valor local quando `modelValue` mudar
watch(() => props.modelValue, (newVal) => {
  localActivity.value = newVal;
});

// Função para emitir o novo valor
function updateActivity() {
  emit('update:modelValue', localActivity.value);
}

// Função para confirmar a edição
function confirmEdit() {
  emit('confirm', {activityIndex: props.index, activity: localActivity.value });
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
  