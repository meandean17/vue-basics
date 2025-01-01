<template>
<div class="theme-settings">
    <h2>Theme Settings</h2>
    <div class="settings-card">
        <div class="setting-item">
            <h3>Dark Mode</h3>
            <label class="toggle">
                <input type="checkbox" :checked="themeStore.isDarkMode"
                @change="themeStore.toggleTheme" />
                <span class="slider"></span>
            </label>
            <p>Current theme: {{ themeStore.currentTheme }}</p>
        </div>
        <div class="setting-item">
            <h3>Accent Color</h3>
            <input type="color" :value="themeStore.accentColor"
            @input="(e) => themeStore.setAccentColor(e.target.value)">
        </div>
    </div>
</div>
</template>

<script setup>
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()
</script>
<style scoped>
.theme-settings {
  padding: 2rem;
}

.settings-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  margin: 2rem auto;
}

.setting-item {
  margin-bottom: 2rem;
}

.setting-item:last-child {
  margin-bottom: 0;
}

/* Toggle switch styling */
.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #42b983;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>