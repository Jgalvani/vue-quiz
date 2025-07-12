<template>
  <div class="question">
    <h3>{{ question.question }}</h3>
    <ul>
      <li v-for="(choice, index) in randomChoices" :key="choice">
        <Answer
          :value="choice"
          :correct_answer="question.correct_answer"
          :id="`answer-${index}`"
          :disabled="hasSubmitted"
          v-model="answer"
        />
      </li>
    </ul>
    <button class="button" @click="onAnswer" :disabled="hasSubmitted">Next question</button>
  </div>
</template>

<script setup>
import { shuffleArray } from '@/functions/array'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import Answer from './Answer.vue'

const props = defineProps({
  question: Object,
})

const emits = defineEmits(['answer'])

const answer = ref(null)
const hasAnswer = computed(() => !!answer.value)
const hasSubmitted = ref(false)
const randomChoices = computed(() => shuffleArray(props.question.choices))

let timer

const onAnswer = () => {
  hasSubmitted.value = true
  clearTimeout(timer)
  timer = setTimeout(() => emits('answer', answer.value), 1000)
}

onMounted(() => {
  answer.value = null
  timer = setTimeout(() => emits('answer', answer.value), 5000)
})

onUnmounted(() => clearTimeout(timer))
</script>

<style>
.question {
  position: relative;
  padding-top: 2rem;
}
.button {
  position: absolute;
  right: 0;
}
</style>
