<template>
  <div :class="{ 'dark-mode': themeStore.isDarkMode }"></div>
  <header>
    <h1>Vue Learning Path</h1>
    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/posts" class="nav-link">Posts Exercise</RouterLink>
      <RouterLink to="/tasks" class="nav-link">Tasks Exercise</RouterLink>
      <RouterLink to="/users" class="nav-link">User Management Exercise</RouterLink>
      <RouterLink to="/cart" class="nav-link">Shopping Cart Exercise</RouterLink>
      <RouterLink to="/theme" class="nav-link">Theme Store Exercise</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useThemeStore } from '@/stores/themeStore';

const themeStore = useThemeStore();
</script>

<style scoped>
header {
  text-align: center;
  margin: 2rem 0;
  padding-bottom: 1rem;
}

nav {
  margin-top: 1rem;
}

.nav-link {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #eee;
}

.router-link-active {
  color: #42b983;
  font-weight: bold;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #fff;
}

.dark-mode .nav-link {
  color: #fff;
}

.dark-mode .nav-link:hover {
  background-color: #333;
}

.dark-mode .exercise-card {
  background: #2a2a2a;
}

.dark-mode .exercise-card p {
  color: #ccc;
}
</style>
