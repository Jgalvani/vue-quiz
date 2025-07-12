<template>
  <div>Etape {{ value + 1 }}/{{ max + 1 }}</div>
  <progress :value="value" :max="max"></progress>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  value: Number,
  max: Number,
})
</script>

<style></style>
