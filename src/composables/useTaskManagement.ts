import { ref, watch, Ref } from 'vue';

interface TaskManagementProps {
  title: string;
  status: string;
  priority: string;
  index: number;
  activitys: string[];
  id: number;
}

type EmitFunction = (event: 'update:status', newStatus: string[]) => void;

export function useTaskManagement(props: TaskManagementProps, emit: EmitFunction) {
  const showOptions: Ref<boolean[]> = ref([]);
  const showOptionsHeader: Ref<boolean[]> = ref([])
  const isEditing: Ref<boolean> = ref(false);
  const isCreateNewTask: Ref<boolean> = ref(false);
  const editingIndex: Ref<number | null> = ref(null);
  const localActivitys: Ref<string[]> = ref([...props.activitys]);

  watch(() => props.activitys, (newValue) => {
    localActivitys.value = [...newValue];
  });

  const toggleOptions = (index: number) => {
    showOptions.value[index] = !showOptions.value[index];
  };

  const toggleOptionsHeader = (index:number) => {
    showOptionsHeader.value[index] = !showOptionsHeader.value[index];
  }

  const addNewTask = () => {
    isCreateNewTask.value = true
  };

  const editTask = (index: number) => {
    editingIndex.value = index;
    isEditing.value = true;
    showOptions.value[index] = false;
  };

  const confirmEdit = () => {
    isEditing.value = false;
    editingIndex.value = null;
  };

  const cancelEdit = () => {
    if (localActivitys.value[editingIndex.value as number] === '') {
      localActivitys.value.splice(editingIndex.value as number, 1);
    }
    isEditing.value = false;
    isCreateNewTask.value = false
    editingIndex.value = null;
  };

  const onEnd = () => {
    emit('update:status', localActivitys.value);
  };

  return {
    showOptions,
    showOptionsHeader,
    isEditing,
    editingIndex,
    isCreateNewTask,
    localActivitys,
    toggleOptions,
    toggleOptionsHeader,
    addNewTask,
    editTask,
    confirmEdit,
    cancelEdit,
    onEnd,
  };
}
