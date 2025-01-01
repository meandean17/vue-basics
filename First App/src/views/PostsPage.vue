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
            <button @click="handleRetry">Try Again</button>
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
import { onMounted } from 'vue'
import { usePostsStore } from '../stores/posts'
import { storeToRefs } from 'pinia'

const postsStore = usePostsStore()

const { posts, loading, error } = storeToRefs(postsStore)

const handleRetry = async () => {
    try {
        await postsStore.loadPosts()
    } catch (e) {
        console.error('Retry failed: ', e)
    }
}

onMounted(async () => {
    try {
        await postsStore.loadPosts()
    } catch (e) {
        console.error('Initial load failed: ', e)
    }
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