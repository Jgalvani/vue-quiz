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

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'

const props = defineProps({
  id: String,
  disabled: Boolean,
  value: String,
  correct_answer: String,
})

const emits = defineEmits(['change'])

const model = defineModel()

const classes = computed(() => {
  return {
    disabled: props.disabled,
    right: props.disabled && props.value === props.correct_answer,
    wrong: props.disabled && props.value !== props.correct_answer && model.value === props.value,
  }
})

const onChange = (event) => {
  emits('change', event)
}
</script>

<style>
.right {
  color: green !important;
}
.wrong {
  color: red !important;
}
.disabled {
  opacity: 0.5;
}
</style>
