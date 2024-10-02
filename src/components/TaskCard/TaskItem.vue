<template>
  <div class="subTask" ref="subTaskRef">
    {{ props.activity }}
    <Ellipsis @click="toggleOptions" />
    
    <div v-if="showOptions" class="optionsContainer">
      <button class="btnOptions" @click="$emit('edit')">
        <Pencil /> Editar
      </button>
      <button class="btnOptions" @click="$emit('delete')">
        <Trash /> Deletar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Ellipsis, Pencil, Trash } from 'lucide-vue-next';

const props = defineProps<{ activity: string }>();
const showOptions = ref(false);
const subTaskRef = ref<HTMLElement | null>(null);

function toggleOptions() {
  showOptions.value = !showOptions.value;
}

function handleClickOutside(event: MouseEvent) {
  if (subTaskRef.value && !subTaskRef.value.contains(event.target as Node)) {
    showOptions.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

  
<style scoped>
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
  }

  .optionsContainer {
    display: inline-block;
    position: absolute;
    right: -90px;
    width: 100px;

    button {
      background-color: white;
      color: #000;
    }
  }

  .btnOptions {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    cursor: pointer;
    border: none;
    margin-bottom: 4px;
    border-radius: 5px;
    padding: 3px;
  }
</style>
  