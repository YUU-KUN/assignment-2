<template>
    <div class="flex items-center justify-between px-4 py-2 bg-gray rounded-2xl w-full gap-3">
        <div class="flex items-center justify-start gap-3 w-full truncate">
            <input v-if="!task.renaming" @change="taskStore.toggleTask(task)" type="checkbox" :id="task.id.toString()"
                :checked="task.completed" class="w-4 h-4 text-tertiary bg-gray border-gray rounded" />
            <label v-if="!task.renaming" :for="task.id.toString()"
                class="text-sm font-light capitalize cursor-pointer select-none truncate"
                :class="task.completed ? 'line-through' : ''">{{ task.name }}</label>

            <input v-else @keyup.enter="taskStore.renameTask(task.id, taskName)" type="text" v-model="taskName"
                class="w-full border border-secondary-light text-sm font-light outline-none px-2" />
        </div>

        <div v-if="!task.renaming" @click="taskStore.toggleRenameTask(task.id)"
            class="flex items-center justify-center gap-2 aspect-square h-6 w-6 bg-tertiary rounded cursor-pointer">
            <PhPencilSimple :size="14" />
        </div>
        <div v-else @click="taskStore.renameTask(task.id, taskName)"
            class="flex items-center justify-center gap-2 aspect-square h-6 w-6 bg-tertiary rounded cursor-pointer">
            <PhCheckFat :size="14" weight="fill" />
        </div>
        <div @click="taskStore.removeTask(task.id)"
            class="flex items-center justify-center gap-2 aspect-square h-6 w-6 bg-red-500 rounded cursor-pointer">
            <PhTrash :size="14" />
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/task';
import { ref } from 'vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
})
const taskName = ref(props.task.name);
const taskStore = useTaskStore();

</script>

<style lang="scss" scoped></style>