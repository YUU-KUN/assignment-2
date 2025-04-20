<template>
    <div class="flex flex-col w-full items-start justify-start gap-4 mb-9">
        <p class="font-semibold">{{ title }}</p>
        <TaskItem v-for="(task) in tasks" :key="task.id" :task="task"></TaskItem>
    </div>

</template>

<script setup>
import TaskItem from './TaskItem.vue';


defineProps({
    tasks: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

</script>

<style lang="scss" scoped></style>