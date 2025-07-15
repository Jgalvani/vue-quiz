<template>
  <h1>Conclusion</h1>
  <p>Score: {{ score }}/{{ quiz.questions.length }}</p>
  <p class="bold">{{ hasWon ? quiz.success_message : quiz.failure_message }}</p>
  <button class="button" @click="emits('reset')">Reset quiz</button>
</template>

<script setup lang="ts">
import type { Question } from '@/models/question'
import type { Quiz } from '@/models/quiz'
import { computed } from 'vue'

// Without TypeScript
// const props = defineProps({
//   answers: Array,
//   quiz: Object,
// })

const props = defineProps<{
  answers: string[]
  quiz: Quiz
}>()

const score = computed(() => {
  let initialScore = 0

  props.quiz.questions.forEach((q: Question, index: number) => {
    if (q.correct_answer === props.answers[index]) return ++initialScore
  })
  return initialScore
})

const hasWon = computed(() => score.value >= props.quiz.minimum_score)

// Without TypeScript
//const emits = defineEmits(['reset'])

const emits = defineEmits<{
  reset: []
}>()
</script>

<style>
.bold {
  font-weight: bold;
}
</style>
