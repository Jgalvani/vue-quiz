<template>
  <label :for="id" :class="classes">
    <input
      type="radio"
      :disabled="disabled"
      :value="value"
      :id="id"
      name="answer"
      v-model="model"
      @change="onChange"
    />
    {{ value }}
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Without TypeScript
// const props = defineProps({
//   id: String,
//   disabled: Boolean,
//   value: String,
//   correct_answer: String,
// })

const props = defineProps<{
  id: string
  disabled: boolean
  value: string
  correct_answer: string
}>()

// Without TypeScript
//const emits = defineEmits(['change'])

const emits = defineEmits<{
  change: [Event]
}>()

const model = defineModel<string>()

const classes = computed(() => {
  return {
    disabled: props.disabled,
    success: props.disabled && props.value === props.correct_answer,
    failure: props.disabled && props.value !== props.correct_answer && model.value === props.value,
  }
})

const onChange = (event: Event) => {
  emits('change', event)
}
</script>

<style>
.success {
  color: green !important;
}
.failure {
  color: red !important;
}
.disabled {
  opacity: 0.5;
}
</style>
