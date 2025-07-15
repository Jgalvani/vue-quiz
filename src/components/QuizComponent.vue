<template>
  <div>
    <h1>
      {{ quiz.title }}
    </h1>
    <ProgressBar :value="step" :max="quizLength" />
    <QuestionComponent
      :key="question.question"
      :question="question"
      @answer="addAnswer"
      v-if="state === 'question'"
    />
    <ConclusionComponent
      v-if="state === 'conclusion'"
      :answers="answers"
      :quiz="quiz"
      @reset="onReset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProgressBar from './ProgressComponent.vue'
import QuestionComponent from './QuestionComponent.vue'
import ConclusionComponent from './ConclusionComponent.vue'
import type { Quiz } from '@/models/quiz'

// Without TypeScript
// const props = defineProps({
//   quiz: Object,
// })

const props = defineProps<{
  quiz: Quiz
}>()

const step = ref<number>(0)
const state = ref<'question' | 'conclusion'>('question')
const question = computed(() => props.quiz.questions[step.value])
const answers = ref<string[]>(props.quiz.questions.map(() => ''))
const quizLength = props.quiz.questions.length - 1

const addAnswer = (answer: string) => {
  answers.value[step.value] = answer
  if (step.value === quizLength) state.value = 'conclusion'
  else step.value++
}

const onReset = () => {
  answers.value = props.quiz.questions.map(() => '')
  state.value = 'question'
  step.value = 0
}
</script>
