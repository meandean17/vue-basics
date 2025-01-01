<template>
    <div class="user-management">
        <!-- User Form -->
        <form @submit.prevent="handleSubmit" class="user-form">
            <h2>Add New User</h2>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input id="firstName" v-model="formData.firstName" type="text" required />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input id="lastName" v-model="formData.lastName" type="text" required />
            </div>
            <div class="form-group">
                <label>Roles:</label>
                <div v-for="role in availableRoles" :key="role">
                    <input type="checkbox" :id="role" :value="role" v-model="formData.roles" />
                    <label :for="role">{{ role }}</label>
                </div>
            </div>
            <button type="submit">Add User</button>
        </form>

        <!-- User List -->
        <div class="user-list">
            <h2>Users</h2>
            <div v-for="user in users" :key="user.id" class="user-card">
                <h3>{{ user.fullName }}</h3>
                <p>Roles: {{ user.roles.join(', ') }}</p>
                <p>Created: {{ formatDate(user.createdAt) }}</p>
                <button @click="handleDelete(user.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
// Import the UserService from our module
import UserService, { formatUserName } from '../services/userModule.js';

// Import necessary functions from Vue
import { ref, onMounted } from 'vue';

export default {
    name: 'UserManagementPage',

    setup() {
        // Init our userservice
        const userService = new UserService();

        // Reactive refs
        const users = ref([]);
        const formData = ref({
            firstName: '',
            lastName: '',
            roles: []
        });

        // Get avail roles from UserService
        const availableRoles = [...userService.roles];

        // Method to load users (in real app this would be an API call)
        const loadUsers = () => {
            // Convert map vals to array for display
            users.value = Array.from(userService.users.values());
        };

        // Form submissions handler
        const handleSubmit = () => {
            try {
                // Destructuring form data (demonstrating ES6 destructuring)
                const { firstName, lastName, roles } = formData.value;

                // Gen a simple ID (in real app this would come from backend)
                const id = Date.now();

                // Add user using our service
                userService.addUser({
                    id,
                    firstName,
                    lastName,
                    roles: [...roles]
                });

                // Reset form
                formData.value = {
                    firstName: '',
                    lastName: '',
                    roles: []
                };

                // Reload users list
                loadUsers();

            } catch (error) {
                console.error('Error adding user:', error);
                // In real app, we would show a user-friendly error message
            }
        };

        // Delete handler
        const handleDelete = (id) => {
            try {
                userService.users.delete(id);
                loadUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };

        // Date formatter
        const formatDate = (date) => {
            return new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }).format(date);
        };

        // Load init data
        onMounted(() => {
            loadUsers();
        });

        // Return everything needed in template
        return {
            users,
            formData,
            availableRoles,
            handleSubmit,
            handleDelete,
            formatDate
        };
    }
};
</script>
<style scoped>
.user-management {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.user-form {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.user-card {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

.user-card button {
  background-color: #f44336;
}

.user-card button:hover {
  background-color: #da190b;
}
</style>