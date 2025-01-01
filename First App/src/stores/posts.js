import { defineStore } from 'pinia'
import { PostsService } from '../services/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),

  actions: {
    async loadPosts() {
      this.loading = true
      this.error = null

      try {
        const response = await PostsService.getPosts()
        this.posts = response.data
      } catch (error) {
        this.error = `Error loading posts: ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
