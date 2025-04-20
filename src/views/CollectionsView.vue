<template>
    <div class="flex flex-col items-start justify-start h-full w-full bg-primary pt-7 tablet:px-[20%]">
        <div class="text-white text-24 font-semibold sm:bg-primary mb-7">Collections</div>

        <!-- Card Items -->
        <div class="grid grid-cols-2 tablet:grid-cols-3 desktop::grid-cols-4 gap-5 w-full">
            <!-- Card Item -->
            <RouterLink v-for="(collection, index) in collectionStore.collections" :key="index"
                :to="`/collections/${collection.id}`"
                class="rounded-2xl w-full bg-gray p-5 flex flex-col items-start justify-between text-white hover:bg-secondary-light transition duration-300 cursor-pointer truncate aspect-square">
                <div class="w-full">
                    <div class="flex items-start justify-between w-full">
                        <div v-if="collection.label === 'favorite'"
                            class="flex items-center justify-center p-3.5 rounded-2xl bg-primary border border-white mb-4">
                            <PhFlag :size="20" weight="fill" class="text-red-500" />
                        </div>
                        <div v-else class="bg-primary h-12 w-12 mb-4 rounded-2xl border border-white"
                            :style="{ backgroundColor: collection.label }"></div>
                        <PhCheckCircle v-if="collection.tasksCompletedPercentage === 100" :size="32"
                            class="text-green-500" />
                    </div>
                    <p class="text-20 font-bold mb-2 truncate">{{ collection.name }}</p>
                </div>

                <div class="flex flex-col items-start justify-start w-full">
                    <p class="text-xs font-light mb-2">{{ collection.tasksCompletedCount }} / {{ collection.tasksCount
                        }} Done</p>
                    <div class="bg-secondary h-1 w-full rounded-full">
                        <div class="bg-tertiary h-1 rounded-full"
                            :style="{ width: `${collection.tasksCompletedPercentage ?? 0}%` }">
                        </div>
                    </div>
                </div>
            </RouterLink>
            <div @click="isOpen = true"
                class="rounded-2xl w-full h-full aspect-square border border-gray p-5 flex items-center justify-center text-white hover:bg-secondary-light transition duration-300 group cursor-pointer">
                <PhPlus :size="32" class="group-hover:scale-125 transition duration-300" />
            </div>
        </div>
    </div>

    <!-- Modal -->
    <AddCollectionModal :isOpen="isOpen" @close="isOpen = false" @submit="collectionStore.addCollection" />
</template>

<script setup>
import { ref } from 'vue';
import { useCollectionStore } from '@/stores/collection';
import AddCollectionModal from '../components/modals/CollectionAddModal.vue';


const isOpen = ref(false);
const collectionStore = useCollectionStore();


</script>

<style scoped></style>