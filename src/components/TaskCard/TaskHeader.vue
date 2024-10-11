<template>
  <div ref="subTaskRef">
    <Ellipsis class="svgHeader" @click="toggleOptionsHeader" />
    <div v-if="showOptionsHeader" class="optionsHeader" >
      <button class="btnOptions" @click="openModalDelete">
        <Trash /> Deletar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';
  import { Ellipsis, Trash } from 'lucide-vue-next';

  const props = defineProps<{ index: number }>();
  const emit = defineEmits(['deleteTask']);
  const showOptionsHeader = ref(false);
  const subTaskRef = ref<HTMLElement | null>(null);

  function toggleOptionsHeader() {
    showOptionsHeader.value = !showOptionsHeader.value
  }

  function openModalDelete(){
    emit('deleteTask', props.index)
    showOptionsHeader.value = false
  }

  function handleClickOutside(event: MouseEvent) {
    if (subTaskRef.value && !subTaskRef.value.contains(event.target as Node)) {
      showOptionsHeader.value = false;
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
  .svgHeader {
    position: absolute;
    right: 0;
    top: -8px;
    cursor: pointer;
  }

  .optionsHeader {
    position: absolute;
    right: -105px;
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

  @media (max-width:768px) {
    .optionsHeader {
      right: 0px;
      top: 10px;   
    }
    
  }

</style>