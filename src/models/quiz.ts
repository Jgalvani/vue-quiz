import type { Question } from './question'

export type Quiz = {
  title: string
  minimum_score: number
  success_message: string
  failure_message: string
  questions: Question[]
}
