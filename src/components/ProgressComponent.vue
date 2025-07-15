<template>
  <div>Etape {{ value + 1 }}/{{ max + 1 }}</div>
  <progress :value="value" :max="max" class="size"></progress>
</template>

<script setup lang="ts">
// Without TypeScript
// defineProps({
//   value: Number,
//   max: Number,
// })

withDefaults(
  defineProps<{
    value: number
    max: number
  }>(),
  {
    value: 0,
  },
)
</script>

<style>
.size {
  width: 60%;
}
</style>
