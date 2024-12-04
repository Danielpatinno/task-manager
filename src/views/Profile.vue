<template>
  <main class="container">
    <h1>Dados Pessoais</h1>
    <div class="personal-info">
      <p class="infoContainer"><strong>Nome:</strong> {{ name }}</p>
      <p class="infoContainer"><strong>Email:</strong> {{ email }}</p>
      <div class="actions">
        <button class="btn" @click="openEditNameModal">Mudar Nome</button>
        <button class="btn" @click="openChangePasswordModal">Definir Nova Senha</button>
      </div>
    </div>
  
    <div v-if="showEditNameModal" class="modal">
      <div class="modal-content">
        <h2>Mudar Nome</h2>
        <input v-model="newName" placeholder="Novo nome" />
        <div class="modal-actions">
          <button class="btn" @click="updateName">Salvar</button>
          <button class="btn cancel" @click="closeEditNameModal">Cancelar</button>
        </div>
      </div>
    </div>
  
    <div v-if="showChangePasswordModal" class="modal">
      <div class="modal-content">
        <h2>Definir Nova Senha</h2>
        <input type="password" v-model="newPassword" placeholder="Nova senha" />
        <div class="modal-actions">
          <button class="btn" @click="changePassword">Salvar</button>
          <button class="btn cancel" @click="closeChangePasswordModal">Cancelar</button>
        </div>
      </div>
    </div>

    <AlertBanner 
      :isAlertVisible="isAlertVisible"
      text="Alterado com sucesso"
      color="success"
      @update:isAlertVisible="isAlertVisible = $event"
    />
  </main>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useUpdateUser } from "../composables/useUpdateUser";
  import AlertBanner from "../components/common/AlertBanner.vue";
  
  const { mutate } = useUpdateUser();
  
  const TASK_MANAGER_SESSION_KEY = "task_manager_session";
  const isAlertVisible = ref()
  
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);
  const userId = ref<number | null>(null);
  
  const showEditNameModal = ref(false);
  const showChangePasswordModal = ref(false);
  
  const newName = ref("");
  const newPassword = ref("");
  
  const openEditNameModal = () => (showEditNameModal.value = true);
  const closeEditNameModal = () => (showEditNameModal.value = false);
  
  const openChangePasswordModal = () => (showChangePasswordModal.value = true);
  const closeChangePasswordModal = () => (showChangePasswordModal.value = false);
  
  onMounted(() => {
    const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);
  
    if (sessionData) {
      const session = JSON.parse(sessionData);

      name.value = session.user.name;
      email.value = session.user.email;
      userId.value = session.user.id;
    }
  });
  
  const updateLocalStorage = (updatedData: { name?: string; password?: string }) => {
    const sessionData = localStorage.getItem(TASK_MANAGER_SESSION_KEY);
  
    if (sessionData) {
      const session = JSON.parse(sessionData);
  
      session.user = {
        ...session.user,
        ...updatedData,
      };
  
      localStorage.setItem(TASK_MANAGER_SESSION_KEY, JSON.stringify(session));
  
      if (updatedData.name) name.value = updatedData.name;
    }
  };
  
  const updateName = () => {
    if (newName.value.trim()) {
      if (userId.value !== null) {
        mutate(
          { id: userId.value, name: newName.value },
          {
            onSuccess: () => {
              updateLocalStorage({ name: newName.value }); 
              isAlertVisible.value = true;
              closeEditNameModal(); 
              setTimeout(() => {
                isAlertVisible.value = false
              }, 3000)
              newName.value = "";            
            },
            onError: (error) => {
              console.error(error);
            },
          }
        );
      } else {
        alert("ID de usuário inválido!");
      }
    } else {
      alert("O nome não pode estar vazio!");
    }
  };
  
  const changePassword = () => {
    if (newPassword.value.trim()) {
      if (userId.value !== null) {
        mutate(
          { id: userId.value, password: newPassword.value },
          {
            onSuccess: () => {
              updateLocalStorage({ password: newPassword.value }); 
              isAlertVisible.value = true;
              closeChangePasswordModal(); 
              setTimeout(() => {
                isAlertVisible.value = false
              }, 3000)

              newPassword.value = ""; 
            },
            onError: (error) => {
              alert("Erro ao alterar a senha!");
              console.error(error);
            },
          }
        );
      } else {
        alert("ID de usuário inválido!");
      }
    } else {
      alert("A senha não pode estar vazia!");
    }
  };
</script>
  
  
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    border-radius: 8px;
    box-sizing: border-box;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 30px;
    text-align: center;
  }

  .personal-info {
    font-size: 18px;
    text-align: center;
    width: 100%;
  }

  .infoContainer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 10px;
    border-bottom: 1px solid #ddd;
    flex-wrap: wrap;
  }

  .infoContainer strong {
    flex: 1;
    text-align: left;
  }

  .infoContainer span {
    flex: 2;
    text-align: right;
  }

  .actions {
    display: flex;
    margin-top: 20px;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 10px 15px;
    border-radius: 8px;
    width: 205px;
    border: none;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .btn.cancel {
    background-color: #dc3545;
  }

  .btn.cancel:hover {
    background-color: #b02a37;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    padding: 2rem;
    background: rgba(0, 0, 0, 0.959);
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    input {
      width: 100%;
      padding: 5px;
      color: white;
    }
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .container {
      height: auto;
      padding: 1rem 0.5rem;
      margin-top: 20px
    }

    h1 {
      font-size: 20px;
      margin-bottom: 15px;
    }

    .infoContainer {
      flex-direction: column;
      text-align: left;
    }

    .infoContainer strong, 
    .infoContainer span {
      text-align: left;
    }

    .actions {
      gap: 5px;
    }

    .btn {
      width: 100%;
      padding: 10px;
    }

    .modal-content {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 18px;
    }

    .btn {
      font-size: 14px;
    }
  }
</style>
