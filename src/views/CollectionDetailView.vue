<template>
    <div class="flex flex-col items-start justify-start h-full w-full bg-primary pt-7 tablet:px-[20%] text-white">
        <div class="flex items-center gap-4 text-24 font-semibold sm:bg-primary mb-7 capitalize">
            <RouterLink to="/collections">
                <PhCaretLeft :size="24" class="hover:scale-125 transition duration-100" />
            </RouterLink>
            {{ collection.name }}
        </div>

        <div class="flex items-center justify-start gap-4 mb-7 text-12 w-full">
            <div class="flex items-center justify-start gap-2 py-2 px-3 border border-gray rounded-2xl w-full">
                <div @click="addTask" class="flex items-center justify-center gap-2 h-6 w-6 bg-tertiary rounded">
                    <PhPlus :size="14" />
                </div>
                <input @keyup.enter="addTask" v-model="taskName" type="text" placeholder="Add a task"
                    class="w-full bg-transparent text-sm font-light outline-none" />
            </div>
        </div>

        <div v-if="taskStore.tasksUncompleted.length == 0 && taskStore.tasksCompleted.length == 0"
            class="flex flex-col items-center justify-start w-full gap-4 mb-7">
            <img src="@/assets/images/empty-state.png" alt="" class="w-1/2 desktop:w-1/5 aspect-square" />
            <p class="text-18 font-semibold text-white text-center">
                No tasks available
            </p>
        </div>

        <div v-else class="flex flex-col items-center justify-center w-full">
            <!-- Tasks -->
            <TaskList :title="`Tasks - ${taskStore.tasksUncompletedCount}`" :tasks="taskStore.tasksUncompleted" />
            <!-- Completed -->
            <TaskList title="Completed" :tasks="taskStore.tasksCompleted" />

        </div>
    </div>
</template>

<script setup>
import TaskList from '../components/tasks/TaskList.vue';
import { useCollectionStore } from '@/stores/collection';
import { useTaskStore } from '@/stores/task';
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const taskStore = useTaskStore();
const collectionStore = useCollectionStore();
const route = useRoute();

const taskName = ref('');
const collectionId = ref(route.params.collectionId);
const collection = ref({});

const addTask = () => {
    if (taskName.value === '') return;
    const data = {
        id: taskStore.tasks.length + 1,
        collectionId: parseInt(collectionId.value),
        name: taskName.value,
        completed: false,
    }
    taskStore.addTask(data);
    taskName.value = '';
}


onMounted(() => {
    taskStore.getTasksByCollectionId(collectionId.value);
    collection.value = collectionStore.collections.find(collection => collection.id == collectionId.value);
});

watch(() => route.params.collectionId, (newCollectionId) => {
    taskStore.getTasksByCollectionId(newCollectionId);
    collectionId.value = newCollectionId;
    collection.value = collectionStore.collections.find(collection => collection.id == newCollectionId);
});
</script>

<style scoped></style>