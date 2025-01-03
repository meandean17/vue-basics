import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostsPage from '../views/PostsPage.vue'
import TasksPage from '../views/TasksPage.vue'
import UserManagementPage from '../views/UserManagementPage.vue'
import ShoppingPage from '../views/ShoppingPage.vue'
import ThemeSettingsPage from '@/views/ThemeSettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsPage,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage,
    },
    {
      path: '/users',
      name: 'users',
      component: UserManagementPage,
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingPage,
    },
    {
      path: '/theme',
      name: 'theme',
      component: ThemeSettingsPage
    }

  ]
})

export default router
