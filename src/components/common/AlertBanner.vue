<template>
  <v-alert
    v-if="props.isAlertVisible"
    :color="props.color"
    dismissible
    class="fixed-alert"
    role="alert" 
    @dismissed="closeAlert"
  >
    <p>
      <component :is="icon" /> 
      {{ props.text }}
    </p>
  </v-alert>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { Check, CircleAlert, TriangleAlert } from 'lucide-vue-next';

const props = defineProps<{
  isAlertVisible: boolean;
  color: 'error' | 'success' | 'info' | 'warning';
  text: string | null;
}>();

const emit = defineEmits(['update:isAlertVisible']);

const icon = computed(() => {
  switch (props.color) {
    case 'success':
      return Check; 
    case 'error':
      return CircleAlert;
    case 'warning':
      return TriangleAlert; 
    default:
      return null; 
  }
});

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

  p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
