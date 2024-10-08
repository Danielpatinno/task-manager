<template>
  <div class="subTask" ref="subTaskRef">
    <div class="subTaskContainer">
      <p>{{ props.activity }}</p>
      <Ellipsis @click="toggleOptions" />      
    </div>

    
    <div v-if="showOptions" class="optionsContainer">
      <button class="btnOptions" @click="emit('edit')">
        <Pencil /> Editar
      </button>
      <button class="btnOptions" @click="openModalDelete">
        <Trash /> Deletar
      </button>
    </div>

    <ConfirmDelete
      :showModalDelete="showModalDeleteActivity"
      :index="props.index"         
      :deleteFunction="() => removeActivity(index)"
      @close="closeModalActivity"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,defineEmits, onBeforeUnmount } from 'vue';
import { Ellipsis, Pencil, Trash } from 'lucide-vue-next';

import ConfirmDelete from '../common/ConfirmDelete.vue'

const emit = defineEmits(['update:showModalDeleteActivity','delete', 'edit', 'remove-activity'])

const props = defineProps<{ 
  activity: string 
  index:number
}>();

const showModalDeleteActivity = ref(false)

function removeActivity(activityIndex:number) {
  emit('remove-activity', {activityIndex})
}

const openModalDelete = () => {
  showModalDeleteActivity.value = true
}

const closeModalActivity = () => {
  showModalDeleteActivity.value = false
};

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
    background-color: #22272B;
  }

  .subTaskContainer {
    display: flex;
    padding: 7px 10px;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid red;
    
    &:hover {
      border: 1px solid white;
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
  