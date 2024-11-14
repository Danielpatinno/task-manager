<template>
  <div :class="['container', { 'with-navbar': showNavBar }]">
    <button v-if="showNavBar" :class="[{ 'logoutIcon': showNavBar }]" @click="handleLogout">
      <span>Sair</span>
      <LogOut />
    </button>
    <NavBar v-if="showNavBar" />
    <div :class="['mainContainer', { 'with-margin': showNavBar }]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { LogOut } from 'lucide-vue-next';
import NavBar from './components/NavBar/NavBar.vue';

const route = useRoute();
const router = useRouter();

const showNavBar = computed(() => !['/', '/register'].includes(route.path));

function handleLogout() {
  localStorage.clear();
  
  router.push('/');
}
</script>

<style scoped>
.container {
  display: flex;
}

.mainContainer {
  width: 100%;
  padding: 20px;
}

.logoutIcon {
  display: flex;
  position: absolute;
  right: 20px;
  top: 15px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 2px solid rgba(255, 0, 0, 0.527);
  padding: 6px;
  border-radius: 10px;
}

.mainContainer.with-margin {
  margin-left: 200px;
}

@media (max-width:768px) {
  .mainContainer.with-margin {
    margin-left: 60px;
  }
}
</style>
