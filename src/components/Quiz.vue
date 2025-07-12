<template>
  <div>
    <h1>
      {{ quiz.title }}
    </h1>
    <ProgressBar :value="step" :max="quizLength" />
    <Question
      :key="question.question"
      :question="question"
      @answer="addAnswer"
      v-if="state === 'question'"
    />
    <Conclusion v-if="state === 'conclusion'" :answers="answers" :quiz="quiz" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import ProgressBar from './Progress.vue'
import Question from './Question.vue'
import Conclusion from './Conclusion.vue'

const props = defineProps({
  quiz: Object,
})

const step = ref(0)
const state = ref('question')
const question = computed(() => props.quiz.questions[step.value])
const answers = ref(props.quiz.questions.map(() => null))
const quizLength = props.quiz.questions.length - 1

const addAnswer = (answer) => {
  answers.value[step.value] = answer
  if (step.value === quizLength) state.value = 'conclusion'
  else step.value++
}
</script>

<style></style>
