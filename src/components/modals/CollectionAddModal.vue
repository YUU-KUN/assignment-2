<template>
    <TransitionRoot :show="isOpen" as="template" enter="duration-300 ease-out" enter-from="opacity-0"
        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <Dialog :open="isOpen" @close="emit('close')" class="relative z-50">
            <div class="fixed inset-0 bg-black/90" aria-hidden="true" />

            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel class="w-full max-w-sm bg-secondary py-9 px-6 rounded-2xl text-white">

                        <!-- Input: Collection Name -->
                        <input v-model="collectionName" type="text"
                            class="w-full bg-secondary border border-gray rounded-2xl py-3 px-4 mb-5"
                            placeholder="Collection name" />

                        <!-- Label Color Picker -->
                        <div class="flex items-center justify-between mb-10">
                            <!-- Favorite -->
                            <div @click="selectedLabel = 'favorite'"
                                :class="{ 'border-white': selectedLabel === 'favorite' }"
                                class="flex items-center justify-start gap-2 p-2 rounded-xl bg-secondary border border-gray cursor-pointer">
                                <PhFlag :size="20" weight="fill" class="text-red-500" />
                            </div>

                            <!-- Colors -->
                            <div v-for="(color, index) in labelColors" :key="index"
                                class="flex items-center justify-start">
                                <div :style="{ backgroundColor: color.hex }"
                                    class="rounded-xl border-2 border-gray text-sm h-9 w-9 cursor-pointer"
                                    :class="{ 'border-white': selectedLabel === color.name }"
                                    @click="selectedLabel = color.name">
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex items-center justify-start mt-4 gap-3">
                            <button @click="submit"
                                class="flex items-center justify-start gap-2 py-4 px-8 bg-tertiary rounded-xl text-sm font-semibold cursor-pointer">
                                <PhPlus :size="20" class="group-hover:scale-125 transition duration-300" />
                                Collection
                            </button>
                            <button @click="emit('close')"
                                class="py-4 px-8 bg-gray rounded-xl text-sm font-semibold cursor-pointer">
                                Cancel
                            </button>
                        </div>

                    </DialogPanel>
                </div>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PhFlag, PhPlus } from '@phosphor-icons/vue'
import { labelColors } from '../../utils/labelColors'
import { useCollectionStore } from '../../stores/collection'

// Define Props & Emit
defineProps({
    isOpen: Boolean
})
const emit = defineEmits(['submit', 'close'])
const collectionStore = useCollectionStore();

// Form state
const collectionName = ref('')
const selectedLabel = ref('favorite')


// Submit handler
const submit = () => {
    if (collectionName.value.trim() === '') {
        alert('Please enter a collection name')
        return
    }

    const payload = {
        id: collectionStore.collections.length + 1,
        name: collectionName.value,
        label: selectedLabel.value,
        hex: selectedLabel.value === 'favorite' ? null : labelColors.find(color => color.name === selectedLabel.value)?.hex || null,
        tasks: [],
    }

    emit('submit', payload)
    resetForm()
    emit('close')
}

// Reset form after close/submit
const resetForm = () => {
    collectionName.value = ''
    selectedLabel.value = 'favorite'
}
</script>