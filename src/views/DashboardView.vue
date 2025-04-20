<template>
    <div class="flex flex-col items-start justify-start h-full bg-primary py-7 tablet:px-[20%]">
        <div class="text-white text-24 font-semibold sm:bg-primary mb-7">Dashboard</div>
        <p class="text-3xl mb-7 leading-tight font-bold text-white ">{{ greeting() }}, <br class="tablet:hidden"> John
            Doe!
        </p>

        <!-- mb-7 -->
        <div class="flex items-center justify-start gap-4 mb-3 text-12">
            <button v-if="collectionStore.collectionsUncompletedCount > 0" @click="openModal"
                class="py-2 px-3 text-white bg-gray rounded-2xl cursor-pointer">
                <p class="flex items-center justify-start gap-2 text-sm !mb-0 font-light">
                    <PhPlus :size="14" />
                    Task
                </p>
            </button>
        </div>

        <div class="flex flex-col items-center justify-start w-full gap-3">
            <div v-if="collectionStore.collectionsUncompletedCount == 0"
                class="flex flex-col items-center justify-start w-full gap-4 mb-7">
                <img src="@/assets/images/empty-state.png" alt="" class="w-1/2 desktop:w-1/5 aspect-square" />
                <p class="text-18 font-semibold text-white text-center">
                    No tasks available
                </p>
                <button @click="openModal"
                    class="rounded-2xl border border-gray py-4 px-8 bg-tertiary text-sm font-semibold text-white cursor-pointer">
                    <p class="text-18 font-semibold text-white text-center">
                        Add a new task
                    </p>
                </button>
            </div>

            <!-- Card Item -->
            <div v-for="(collection, index) in collectionStore.collectionsUncompleted" :key="index" class="w-full">
                <div v-if="collection.tasksUncompleted.length" class="rounded-2xl w-full">
                    <!-- Card Header -->
                    <div
                        class="flex justify-between items-center text-2xl w-full bg-secondary-light rounded-t-2xl p-4 text-white">
                        <div class="flex items-center justify-start gap-2 text-18 font-semibold">
                            <PhFlag v-if="collection.label === 'favorite'" :size="20" weight="fill"
                                class="text-red-500" />

                            <div v-else class="w-4 h-4 rounded-full border border-gray aspect-square"
                                :style="{ backgroundColor: collection.hex }"></div>
                            {{ collection.name }}
                        </div>
                        <!-- <PhCaretUp :size="20" /> -->
                    </div>

                    <!-- Card Body -->
                    <div class="w-full p-4 rounded-b-2xl bg-secondary">
                        <!-- Tasks -->
                        <div v-for="(task, index) in collection.tasks" :key="index">
                            <div v-if="!task.completed"
                                class="flex items-center justify-start w-full gap-2 mb-4 text-white">
                                <input @change="taskStore.toggleTask(task)" type="checkbox" :id="task.id.toString()"
                                    :checked="task.completed"
                                    class="w-4 h-4 text-tertiary bg-gray border-gray rounded" />
                                <label :for="task.id.toString()"
                                    class="text-sm font-light capitalize cursor-pointer select-none truncate"
                                    :class="task.completed ? 'line-through' : ''">{{ task.name }}</label>
                            </div>
                        </div>

                        <hr>
                        <RouterLink :to="`/collections/${collection.id}`"
                            class="flex items-center justify-center gap-2 pt-4 px-4 text-white text-sm">
                            Go to Collection
                            <PhArrowRight :size="20" />
                        </RouterLink>
                    </div>

                </div>
            </div>

        </div>
    </div>


    <!-- Modal -->
    <TransitionRoot :show="isOpen" as="template" enter="duration-300 ease-out" enter-from="opacity-0"
        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <Dialog :open="isOpen" @close="closeModal" class="relative z-50">
            <div class="fixed inset-0 bg-black/50" aria-hidden="true" />

            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel class="w-full max-w-sm bg-secondary py-9 px-6 rounded-2xl text-white">
                        <input type="text" class="w-full bg-secondary border border-gray rounded-2xl py-3 px-4 mb-5"
                            v-model="taskName" placeholder="Task Title" />
                        <div
                            class="flex items-center justify-start gap-2 mb-10 w-full overflow-scroll scrollbar-thin scrollbar-thumb-secondary-light scrollbar-track-transparent">
                            <div @click="selectCollection(collection.label)"
                                v-for="(collection, index) in collectionStore.collections" :key="index"
                                class="flex items-center justify-start cursor-pointer">
                                <div class="flex items-center justify-start gap-2 p-2 rounded-xl bg-secondary border border-gray text-sm capitalize text-nowrap"
                                    :class="{
                                        'border-white': selectedLabel === collection.label,
                                    }">
                                    <PhFlag v-if="collection.label === 'favorite'" :size="20" weight="fill"
                                        class="text-red-500" />

                                    <div v-else class="w-4 h-4 rounded-full border border-gray aspect-square"
                                        :style="{ backgroundColor: collection.hex }"></div>
                                    {{ collection.name }}
                                </div>
                            </div>

                        </div>
                        <!-- <div v-for="(collection, index) in collectionStore.collections" :key="index"
                            class="flex items-center justify-start gap-2 mb-10">
                            <div
                                class="flex items-center justify-start gap-2 p-2 rounded-xl bg-secondary border border-gray">
                                <PhFlag :size="20" weight="fill" class="text-red-500" />
                            </div>
                            <div
                                class="flex items-center justify-start gap-2 p-2 rounded-xl bg-secondary border border-gray text-sm capitalize">
                                <div class="w-4 h-4  bg-tertiary rounded-full"></div>
                                {{ collection.name }}
                            </div>
                            Pake buat tasks
                            <input type="checkbox" class="w-4 h-4 bg-tertiary rounded mt-0.5" />
                            <div class="flex flex-col items-start justify-start">
                                <span class="text-sm  font-light text-gray-600">Set as completed</span>
                                <span class="text-xs font-light text-gray-400">Today 12:00</span>
                            </div>

                        </div> -->
                        <!-- <textarea class="w-full bg-gray-200 rounded-2xl py-2 px-4 mt-4" rows="4"
                            placeholder="Task Description"></textarea> -->

                        <div class="flex items-center justify-start mt-4 gap-3">
                            <button @click="addTask" class="py-4 px-8 rounded-xl text-sm font-semibold"
                                :class="taskName === '' ? 'bg-gray cursor-not-allowed' : 'bg-tertiary cursor-pointer'"
                                :disabled="!taskName">Add
                                Task</button>
                            <button @click="closeModal"
                                class="py-4 px-8 bg-gray rounded-xl text-sm font-semibold cursor-pointer">Cancel</button>
                        </div>
                    </DialogPanel>
                </div>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
} from '@headlessui/vue'
import { useCollectionStore } from '@/stores/collection';
import { useTaskStore } from '@/stores/task';


const collectionStore = useCollectionStore();
const taskStore = useTaskStore();
const isOpen = ref(false)
const selectedLabel = ref('favorite')
const selectedCollection = ref('')
const taskName = ref('')

const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Good morning';
    } else if (hour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const selectCollection = (label) => {
    selectedLabel.value = label
    selectedCollection.value = collectionStore.collections.find(collection => collection.label === label).id;
}

const addTask = () => {
    if (taskName.value === '') return;
    const collectionId = collectionStore.collections.find(collection => collection.label === selectedLabel.value).id;
    const taskData = {
        id: taskStore.tasks.length + 1,
        collectionId: parseInt(collectionId),
        name: taskName.value,
        completed: false,
    }

    taskStore.addTask(taskData);
    closeModal()
    taskName.value = '';
}

onMounted(() => {
    if (localStorage.getItem('collections') === null) {
        collectionStore.addCollection({
            id: 1,
            name: 'Favorite',
            label: 'favorite',
            hex: null,
            tasks: [],
        })
    }
})
</script>

<style scoped></style>