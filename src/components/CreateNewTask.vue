<template>
  <div class="home">
    <div class="modal">
      <h1>Nova Tarefa</h1>
       
      <form>
        <div class="labelContainer">
          <label>Título da Tarefa</label>
          <input type="text">
        </div>

        <div class="labelContainer">
          <label>Data de conclusão</label>
          <input type="date">
        </div>

        <div class="labelContainer">
          <label>Prioridade</label>
          <select name="" id="">
            <option value="">BAIXA</option>
            <option value="">MÉDIA</option>
            <option value="">ALTA</option>
          </select>
        </div>
        
        <fieldset class="ativitysContainer">
          <legend>Atividades</legend>
          <div>
            <input type="text" v-model="newActivity">
            <button type="button" @click="addActivity">
              <Plus />
            </button>
          </div>

          <div 
            v-for='(activity, index) in activitysItems' class="newsActivitysContainer"
          >
            <p :key="index">
              {{ activity }}
              <button type="button" @click="removeActividy(index)">
                <Trash2 />
              </button>
            </p>
          </div>
        </fieldset>

        <button class="btn-add">Salvar</button>
      </form>

      <X class="btn-close" @click="close" />

    </div>
  </div>
</template>
  
<script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import { X, Plus, Trash2 } from 'lucide-vue-next';

  const activitysItems = ref([])
  const newActivity = ref('')

  function addActivity() {
    if(newActivity.value.trim() !== '') {
      activitysItems.value.push(newActivity.value)
      newActivity.value = ''
    }
  }

  function removeActividy(index) {
    activitysItems.value.splice(index, 1)
  }
  
  const props = defineProps({
    title: {
      type: String,
      required: false,
    },
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  
  </script>
  
<style >
  .home {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: relative;
    padding: 0px 30px 30px 30px;
    width: 450px;
    /* max-height: 400px; */
    background: #000000;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 8px;

    h1 {
      text-align: center;
    }

  }

  .labelContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
      font-size: 15px;
      letter-spacing: 1px;
    }

    input {
      padding: 4px;
      border-radius: 10px
    }

    select {
      padding: 4px;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  .ativitysContainer {
    border: none;

    div {
      display: flex;

      input {
        width: 100%;
        border-radius: 10px 0 0 10px;
      }

      button {
        cursor: pointer;
      }
    }

    .newsActivitysContainer {
      margin-top: 5px;

      p {
        display: flex;
        padding: 2px;
        margin: 0;
        border-radius: 10px;
        border: 1px solid ;
        width: 100%;
        justify-content: space-between;

        svg {
          cursor: pointer;
        }
      }
    }

  }
  
  .btn-add {
    position: absolute;
    right: 90px;
    padding: 3px;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.766);
    border: none;
    width: 120px;
    cursor: pointer;
  }

  .btn-close {
    position: absolute;
    top: 17px;
    right: 17px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: transparent;
  }
</style>