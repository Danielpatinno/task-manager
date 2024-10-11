<template>
  <h1>Agenda</h1>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="changeMonth(-1)">&#10094;</button>
      <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
      <button @click="changeMonth(1)">&#10095;</button>
    </div>

    <div class="days-grid">
      <div
        v-for="day in daysInMonth"
        :key="day"
        :class="['day', { today: isToday(day) }]"
        @click="openTaskDetails(day)"
      >
        {{ day }}
        <div class="tasksToday">
          <p 
            v-for="task in getTasksForDay(day)" 
            :key="task"
          >
           - {{ task }}
          </p>
        </div>
      </div>
    </div>
  </div>

    <DetailsAgenda :day="selectedDay" :tasks="tasksForSelectedDay" />
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useCommitmentStore } from '../stores/commitmentsStore';
  import { useTaskStore } from '../stores/taskStores';
  import DetailsAgenda from  '../components/Agenda/DetailsAgenda.vue'

  const commitmentStore = useCommitmentStore();
  const taskStore = useTaskStore();

  const commitments = computed(() => commitmentStore.commitments);
  const tasks = computed(() => taskStore.tasks);

  const tasksByDate = computed(() => {
    const allTasks = [...commitments.value, ...tasks.value];
    
    return allTasks.reduce((acc, task) => {
      const date = new Date(task.dateConclusion).toISOString().split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(task.title);
      return acc;
    }, {} as Record<string, string[]>);
  });

  function getTasksForDay(day: number): string[] {
    const dayString = `${currentYear.value}-${(currentMonth.value + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return tasksByDate.value[dayString] || [];
  }

  // Array with month names
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // Current date information
  const today = new Date();
  const currentMonth = ref(today.getMonth());
  const currentYear = ref(today.getFullYear());
  const currentDay = today.getDate();

  // Fetch commitments on mounted
  onMounted(() => {
    commitmentStore.fetchCommitments();
    taskStore.fetchTasks(); // Fetch tasks as well
  });

  // Compute the number of days in the current month
  const daysInMonth = computed(() => {
    return Array.from({ length: new Date(currentYear.value, currentMonth.value + 1, 0).getDate() }, (_, i) => i + 1);
  });

  const showTaskModal = ref(false);
  const selectedDay = ref<number | null>(null);
  const tasksForSelectedDay = ref<string[]>([]);

  // Abrir detalhes das tarefas de um dia específico
  function openTaskDetails(day: number) {
    selectedDay.value = day;
    tasksForSelectedDay.value = getTasksForDay(day);
    showTaskModal.value = true;
  }

  // Check if the given day is today
  const isToday = (day: number) => {
    return day === currentDay && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear();
  };

  // Change month and year
  const changeMonth = (step: number) => {
    currentMonth.value += step;
    if (currentMonth.value > 11) {
      currentMonth.value = 0;
      currentYear.value++;
    } else if (currentMonth.value < 0) {
      currentMonth.value = 11;
      currentYear.value--;
    }
  };
</script>


<style scoped>
.calendar {
  width: 100%;
  height: calc(90vh - 60px);
  text-align: center;
}

h1 {
  margin: 0;
  margin-top: -15px;
  font-size: 32px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 24p;

  button {
    cursor: pointer;
  }
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  flex-grow: 1;
  height: calc(100vh - 55px - 90px);
}

.day {
  padding: 10px;
  overflow-y: auto;
  border: 2px solid rgba(222, 222, 233, 0.158);
  width: 150px;
  font-size: 20px;
  height: 120px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: 2px solid white;
  }
}

.tasksToday p {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}

.today {
  background-color: rgba(255, 255, 255, 0.274);
  color: white;
  font-weight: bold;
}

@media (max-width: 768px) {
  .days-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
