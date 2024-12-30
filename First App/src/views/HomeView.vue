<template>
  <div class="home">
    <h2>Vue.js Learning Exercises</h2>
    <div class="exercise-links">
      <RouterLink to="/posts" class="exercise-card">
        <h3>Posts Exercise</h3>
        <p>Practice with async/await and API calls</p>
      </RouterLink>
      
      <RouterLink to="/tasks" class="exercise-card">
        <h3>Tasks Exercise</h3>
        <p>Practice with Vue directives and reactive state</p>
      </RouterLink>

      <RouterLink to="/users" class="exercise-card">
        <h3>User Management Exercise</h3>
        <p>Practice with forms and reactive state</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.exercise-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.exercise-card {
  text-decoration: none;
  color: inherit;
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  width: 250px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.exercise-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

h3 {
  color: #42b983;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  font-size: 0.9rem;
}
</style>