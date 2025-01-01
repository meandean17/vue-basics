import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDarkMode: false,
        accentColor: '#42b983'
    }),

    getters: {
        currentTheme: (state) => state.isDarkMode ? 'dark' : 'light'
    },

    actions: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode
        },

        setAccentColor(color) {
            this.accentColor = color
        }
    }
})