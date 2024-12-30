<template>
    <div class="task-manager">
        <!-- Form with v-model and @submit -->
         <form @submit.prevent="addTask" class="task-form">
            <input
                v-model="newTask"
                type="text"
                placeholder="Enter a new task"
                :class="{ 'error-input': inputError }"
            >
            <button type="submit" :disabled="!newTask.trim()">Add Task</button>
         </form>

         <!-- Error message using v-if -->
          <p v-if="inputError" class="error-text">
            Please enter a task description
          </p>
          
          <!-- Task Filtering -->
           <div class="filters">
            <button
                v-for="filter in filters"
                :key="filter"
                @click="currentFilter = filter"
                :class="{ active: currentFilter === filter }"
            >
                {{  filter }}
            </button>
           </div>

           <!-- Task list with v-for and dynamic classes -->
            <ul class="task-list">
                <li
                    v-for="task in filteredTasks"
                    :key="task.id"
                    :class="{
                        'task-item': true,
                        'completed': task.completed
                    }"
                >
                    <!-- Checkbox with v-model -->
                     <input
                        type="checkbox"
                        v-model="task.completed"
                    >

                    <!-- Task text with confitional styling -->
                     <span :style="{
                        textDecoration: task.completed ? 'line-through' : 'none'
                     }">
                        {{ task.text }} 
                    </span>

                    <!-- Delete button -->
                     <button @click="deleteTask(task.id)" class="delete-btn">
                        Delete
                     </button>
                </li>
            </ul>

            <!-- Conditional message when no tasks -->
             <p v-if="filteredTasks.length === 0" class="empty-message">
                No {{ currentFilter.toLowerCase()  }} tasks
             </p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Reactive state
const newTask = ref('');
const inputError = ref(false);
const tasks = ref([
    { id: 1, text: 'Learn Vue Basics', completed: true },
    { id: 2, text: 'Practice Directives', completed: false },
    { id: 3, text: 'Master Components', completed: false }
])

// Filter state
const filters = ['All', 'Active', 'Completed']
const currentFilter = ref('All')

// Computed property for filtered tasks
const filteredTasks = computed(() => {
    switch (currentFilter.value) {
        case 'Active':
            return tasks.value.filter(task => !task.completed)
        case 'Completed':
            return tasks.value.filter(task => task.completed)
        default:
            return tasks.value
    }
})

// Methods
const addTask = () => {
    const taskText = newTask.value.trim()

    if (!taskText) {
        inputError.value = true
        return
    }

    tasks.value.push({
        id: Date.now(),
        text: taskText,
        completed: false
    })

    // Reset form
    newTask.value = ''
    inputError.value = false
}

const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId)
}
</script>

<style scoped>
.task-manager {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.task-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.task-form input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.error-input {
    border-color: red !important;
}

.error-text {
    color: red;
    font-size: 0.9em;
    margin-top: -15px;
    margin-bottom: 15px;
}

.filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.filters button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
}

.filters button.active {
    background: #42b983;
    color: white;
    border-color: #42b983;
}

.task-list {
    list-style: none;
    padding: 0;
}

.task-item {
    display:flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
}

.task-item span {
    flex: 1;
}

.delete-btn {
    padding: 4px 8px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.empty-message {
    text-align: center;
    color: #666;
    font-style: italic;    
}

button {
    white-space: nowrap;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>