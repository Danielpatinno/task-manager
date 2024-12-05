<template>
  <div class="container" ref="menuContainer">
    <button class="profileContainer" @click="toggleMenu">
      <div class="nameContainer">
        <CircleUserIcon />
        <p>{{ userName }}</p>
      </div>
      <ArrowDown :size="17" class="arrow" />
    </button>

    <ul v-show="isMenuOpen" class="optionsContainer">
      <li>
        <router-link to="/profile" class="btnOptions" @click="closeMenu">
          <span>Dados</span>
          <StickyNote />
        </router-link>
      </li>

      <li>
        <button class="btnOptions" @click="handleLogout">
          <span>Sair</span>
          <LogOut />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { LogOut, StickyNote, ArrowDown, CircleUserIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const TASK_MANAGER_SESSION_KEY = 'task_manager_session';
const userName = ref<string | null>(null);

const router = useRouter();
const isMenuOpen = ref(false);
const menuContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);

  if (sessionData) {
    const session = JSON.parse(sessionData);
    const fullName = session.user.name;
    userName.value = fullName.split(' ')[0]; 
  }
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function handleLogout() {
  closeMenu(); 
  localStorage.clear();
  router.push('/login');
}

function handleOutsideClick(event: MouseEvent) {
  if (menuContainer.value && !menuContainer.value.contains(event.target as Node)) {
    closeMenu();
  }
}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 2px;
  top: 10px;
  gap: 8px;
  width: 120px;
}

.profileContainer {
  border: 2px solid rgb(88, 88, 100);
  display: flex;
  padding: 6px;
  border-radius: 10px;
  position: relative;
  width: 100%;
  justify-content: space-between;
}

.arrow {
  position: absolute;
  right: 4px;
  bottom: -10px;
  background-color: rgba(247, 242, 242, 0.877);
  border-radius: 50%;
  color: black;
}

.nameContainer {
  display: flex;
  gap: 10px;
  font-size: 18px;
  align-items: center;
}

.optionsContainer {
  border: 2px solid rgb(0, 0, 0);
  border-radius: 5px;
  list-style: none;
  overflow: hidden;

  li {
    list-style: none;
  }
}

.btnOptions {
  display: flex;
  right: 20px;
  top: 15px;
  padding: 2px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  width: 100%;
  background-color: rgb(0, 0, 0);

  &:hover {
    background-color: rgba(128, 128, 128, 0.103);
  }
}
</style>
