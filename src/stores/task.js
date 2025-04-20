import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])
  const collectionTasks = ref([]);

  const tasksCount = computed(() => collectionTasks.value.length)
  const tasksCompletedCount = computed(() => collectionTasks.value.filter(task => task.completed).length)
  const tasksUncompletedCount = computed(() => collectionTasks.value.filter(task => !task.completed).length)
  const tasksCompleted = computed(() => collectionTasks.value.filter(task => task.completed))
  const tasksUncompleted = computed(() => collectionTasks.value.filter(task => !task.completed))
  const tasksCompletedPercentage = computed(() => {
    if (tasksCount.value === 0) return 0
    return (tasksCompletedCount.value / tasksCount.value) * 100
  })

  const addTask = (task) => {
    tasks.value.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks.value))

    getTasksByCollectionId(task.collectionId)
  }

  const toggleTask = (task) => {
    const index = tasks.value.findIndex(t => t === task)
    if (index !== -1) {
      tasks.value[index].completed = !tasks.value[index].completed

      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }
  }

  const removeTask = (taskId) => {
    collectionTasks.value = collectionTasks.value.filter(task => task.id !== taskId)
    const index = tasks.value.findIndex(task => task.id === taskId)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  const toggleRenameTask = (taskId) => {
    tasks.value.forEach(task => {
      task.renaming = false
    })

    const index = tasks.value.findIndex(task => task.id === taskId)
    if (index !== -1) {
      tasks.value[index].renaming = !tasks.value[index].renaming
    }
  }

  const renameTask = (taskId, newName) => {
    const index = tasks.value.findIndex(task => task.id === taskId)

    if (index !== -1) {
      tasks.value[index].name = newName
      tasks.value[index].renaming = false
    }

    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    getTasksByCollectionId(tasks.value[index].collectionId)
  }


  const tasksOrdered = computed(() => {
    return tasks.value.sort((a, b) => {
      if (a.completed === b.completed) return 0
      return a.completed ? 1 : -1
    })
  })

  const getTasksByCollectionId = (collectionId) => {
    const filteredTasks = tasks.value.filter(task => task.collectionId == collectionId)
    collectionTasks.value = filteredTasks
  }

  return {
    tasks,
    tasksOrdered,
    tasksCount,
    tasksCompletedCount,
    tasksUncompletedCount,
    tasksCompleted,
    tasksUncompleted,
    tasksCompletedPercentage,
    addTask,
    removeTask,
    toggleTask,
    toggleRenameTask,
    renameTask,
    getTasksByCollectionId,
  }
})
