<template>
  <div class="question">
    <h3>{{ question.question }}</h3>
    <ul>
      <li v-for="(choice, index) in randomChoices" :key="choice">
        <AnswerComponent
          :value="choice"
          :correct_answer="question.correct_answer"
          :id="`answer-${index}`"
          :disabled="hasSubmitted"
          v-model="answer"
        />
      </li>
    </ul>
    <button class="button" @click="onAnswer" :disabled="hasSubmitted || !hasAnswer">
      Next question
    </button>
  </div>
</template>

<script setup lang="ts">
import { shuffleArray } from '@/functions/array'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import AnswerComponent from './AnswerComponent.vue'
import type { Question } from '@/models/question'

// Without TypeScript
// const props = defineProps({
//   question: Object,
// })

const props = withDefaults(
  defineProps<{
    question: Question
  }>(),
  {
    question: () => ({
      question: 'How many eyes do most spiders have ?',
      choices: ['2', '4', '6', '8'],
      correct_answer: '8',
    }),
  },
)

// Without TypeScript
//const emits = defineEmits(['answer'])

const emits = defineEmits<{
  answer: [string]
}>()

const answer = ref<string>('')
const hasAnswer = computed(() => !!answer.value)
const hasSubmitted = ref<boolean>(false)
const randomChoices = computed(() => shuffleArray(props.question.choices))

let timer: number

const onAnswer = () => {
  hasSubmitted.value = true
  clearTimeout(timer)
  timer = setTimeout(() => emits('answer', answer.value), 1000)
}

onMounted(() => {
  answer.value = ''
  timer = setTimeout(() => emits('answer', answer.value), 5000)
})

onUnmounted(() => clearTimeout(timer))
</script>

<style>
.question {
  position: relative;
  padding-top: 2rem;
}
.right {
  position: absolute;
  right: 0;
}
</style>
