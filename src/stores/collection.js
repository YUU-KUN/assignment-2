import { defineStore } from "pinia";
import { computed } from "vue";
import { useTaskStore } from "./task";
export const useCollectionStore = defineStore('collection', () => {
    const taskStore = useTaskStore()
    const collectionsCount = computed(() => collections.value.length)
    const collectionsCompleted = computed(() => collections.value.filter(collection => taskStore.tasks.some(task => task.collectionId === collection.id && task.completed)))
    const collectionsUncompleted = computed(() => collections.value.filter(collection => taskStore.tasks.some(task => task.collectionId === collection.id && !task.completed)))
    const collectionsCompletedCount = computed(() => collectionsCompleted.value.length)
    const collectionsUncompletedCount = computed(() => collectionsUncompleted.value.length)

    const collections = computed(() => {
        const raw = JSON.parse(localStorage.getItem('collections')) || [];
        return raw.map(collection => {
            const tasks = taskStore.tasks.filter(task => task.collectionId === collection.id);
            const completedTasks = tasks.filter(task => task.completed);

            return {
                ...collection,
                tasks,
                tasksCompleted: completedTasks,
                tasksUncompleted: tasks.filter(task => !task.completed),
                tasksCompletedPercentage: tasks.length
                    ? (completedTasks.length / tasks.length) * 100
                    : 0,
                tasksCount: tasks.length,
                tasksCompletedCount: completedTasks.length,
            };
        });
    });

    const addCollection = (collection) => {
        const updatedCollection = {
            ...collection,
            tasks: (collection.tasks || []).map(task => ({
                ...task,
                completed: !!task.completed,
            })),
        };

        updatedCollection.tasksCount = updatedCollection.tasks.length;
        updatedCollection.tasksCompletedCount = updatedCollection.tasks.filter(task => task.completed).length;

        collections.value.push(updatedCollection);
        localStorage.setItem('collections', JSON.stringify(collections.value));
    };

    const removeCollection = (collection) => {
        collections.value = collections.value.filter(c => c !== collection)
        localStorage.setItem('collections', JSON.stringify(collections.value))
    }

    const addCollectionTask = (collectionId, taskData) => {
        const collection = collections.value.find(collection => collection.id === collectionId)
        collection.tasks.push(taskData)
        localStorage.setItem('collections', JSON.stringify(collections.value))
    }

    return {
        collections,
        collectionsCount,
        collectionsCompleted,
        collectionsCompletedCount,
        collectionsUncompleted,
        collectionsUncompletedCount,
        addCollection,
        removeCollection,
        addCollectionTask,
    }
})