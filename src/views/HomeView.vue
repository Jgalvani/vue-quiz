<template>
  <div class="container">
    <div v-if="state === 'error'">
      <p>Cannot load the quiz.</p>
    </div>
    <div :aria-busy="state === 'loading'">
      <QuizComponent :quiz="quiz" v-if="quiz" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QuizComponent from '../components/QuizComponent.vue'
import type { Quiz } from '@/models/quiz'

const quiz = ref<Quiz>()
const state = ref<'loading' | 'error' | 'iddle'>('loading')

onMounted(() => {
  fetch('/quiz.json')
    .then((r: Response) => {
      if (r.ok) return r.json()
      console.log(r)
      throw new Error('Cannot fetch the quiz.')
    })
    .then((data: Quiz) => {
      quiz.value = data
      state.value = 'iddle'
    })
    .catch(() => {
      state.value = 'error'
    })
})
</script>

<style>
.container {
  position: absolute;
  left: 2rem;
}
</style>
