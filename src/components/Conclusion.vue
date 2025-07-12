<template>
  <h1>Conclusion</h1>
  <p>Score: {{ finalScore }}/{{ quiz.questions.length }}</p>
  <p>{{ hasWon ? quiz.success_message : quiz.failure_message }}</p>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
  answers: Array,
  quiz: Object,
})

let initialScore = 0

const finalScore = computed(() =>
  props.quiz.questions.reduce((acc, question, index) => {
    if (index === 1 && acc.correct_answer === props.answers[0]) ++initialScore
    if (question.correct_answer === props.answers[index]) return ++initialScore
    return initialScore
  }),
)

const hasWon = computed(() => finalScore.value >= props.quiz.minimum_score)
</script>

<style></style>
