<template>
  <HeaderComponent />
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<style>
main {
  width: fit-content;
  margin: 0 auto;
  padding: 1rem;
}
</style>
