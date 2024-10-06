<template>
  <v-alert
    v-if="props.isAlertVisible"
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
import { defineProps, defineEmits } from 'vue';
import { Check } from 'lucide-vue-next';

const props = defineProps<{
  isAlertVisible: boolean;
  color: string;
  text: string;
}>();

const emit = defineEmits(['update:isAlertVisible']);

function closeAlert() {
  emit('update:isAlertVisible', false); 
}
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
  