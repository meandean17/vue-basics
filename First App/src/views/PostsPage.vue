<!--
    PostList.vue - A component demonstrating async data fetching and Vue template syntax
    This component will:
    1. Load posts when mounted
    2. Handle loading states
    3. Handle errors
    4. Display results in a list
-->
<template>
    <div class="post-list">
        <h2>Posts</h2>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
            Loading posts...
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error">
            {{ error }}
            <button @click="loadPosts">Try Again</button>
        </div>

        <!-- Success State -->
        <div v-else>
            <ul>
                <li v-for="post in posts" :key="post.id" class="post-item">
                    <h3>{{  post.title }}</h3>
                    <p>{{  post.body }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted } from 'vue'

// Reactive state using ref
const posts = ref([])
const loading = ref(false)
const error = ref(null)

// Async function to load posts
const loadPosts = async () => {
    // Reset states
    loading.value = true
    error.value = null

    try {
        // Fetch data from API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')

        // Check if response is ok
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }

        // Parse JSON and update posts ref
        const data = await response.json()
        posts.value = data
    } catch (e) {
        // Handle any errors
        error.value = `Error loading posts: ${e.message}`
    } finally {
        // Always set loading to false when done
        loading.value = false
    }
}

// Load posts when component is mounted
onMounted(() => {
    loadPosts()
})
</script>

<style scoped>
.post-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.loading {
    text-align: center;
    padding: 20px;
}

.error {
    color: red;
    text-align: center;
    padding: 20px;
}

.post-item {
    list-style: none;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.post-item h3 {
    margin-top: 0;
}

button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>