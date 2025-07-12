<template>
  <div class="container">
    <div v-if="state === 'error'">
      <p>Cannot load the quiz.</p>
    </div>
    <div :aria-busy="state === 'loading'">
      <Quiz :quiz="quiz" v-if="quiz" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Quiz from './components/Quiz.vue'

const quiz = ref(null)
const state = ref('loading')

onMounted(() => {
  fetch('/quiz.json')
    .then((r) => {
      if (r.ok) return r.json()
      console.log(r)
      throw new Error('Cannot fetch the quiz.')
    })
    .then((data) => {
      quiz.value = data
      state.value = 'iddle'
    })
    .catch((e) => {
      state.value = 'error'
    })
})
</script>

<style>
.container {
  margin-top: 2rem;
}
</style>
