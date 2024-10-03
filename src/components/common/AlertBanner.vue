<template>
  <v-alert
    v-if="isAlertVisible"
    :color="props.color"
    dismissible
    class="fixed-alert"
    @dismissed="closeAlert"
  > 
    <p>
      <Check />
      {{ props.text }}
    </p>
  </v-alert>
</template>
  
<script setup lang="ts">
  import { defineProps, ref, watch } from 'vue';
  import { Check } from 'lucide-vue-next'
  
  const props = defineProps<{ 
    isAlertVisible: boolean;
    color: string;
    icon: string;
    text: string;
  }>();
  
  const isVisible = ref(props.isAlertVisible);
  
  function closeAlert() {
    isVisible.value = false;
  }
  
  watch(() => props.isAlertVisible, (newVal) => {
    if (newVal) {
      isVisible.value = true;
      setTimeout(() => {
        closeAlert();
      }, 3000); 
    }
  }, { immediate: true });
  
</script>
  
<style scoped>
  .fixed-alert {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: auto;

    p {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
</style>
  