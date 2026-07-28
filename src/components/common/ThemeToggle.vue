<script setup>
import { appState, toggleTheme } from '../../store/appStore'
</script>

<template>
  <button
    class="icon-button theme-toggle"
    type="button"
    :aria-label="`Switch to ${appState.theme === 'dark' ? 'light' : 'dark'} theme`"
    @click="toggleTheme"
  >
    <svg v-if="appState.theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg v-else viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
    </svg>
  </button>
</template>
