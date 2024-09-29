type NonEmptyArray<T> = {
  first: T
  rest: T[]
}

type Question = {
  question: string
  answers: string[]
  correctAnswerIndices: number[]
  multiSelect: boolean
}

type Quiz = {
  description: string
  questions: Question[]
}

type Quiz2 = {
  description: string
  questions: NonEmptyArray<Question>
}

type CorrectAnswer = { type: 'correct'; answer: string }
type IncorrectAnswer = { type: 'incorrect'; answer: string }
type Answer = CorrectAnswer | IncorrectAnswer

type Question2 = {
  question: string
  answers: NonEmptyArray<Answer>
}

type Question3 = {
  question: string
  correctAnswers: NonEmptyArray<CorrectAnswer>
  incorrectAnswers: Array<IncorrectAnswer>
}

type FreeformQuestion = {
  type: 'freeform'
  question: string
}

type MultiselectQuestion = {
  type: 'multiselect'
  question: string
  correctAnswers: NonEmptyArray<CorrectAnswer>
  incorrectAnswers: Array<IncorrectAnswer>
}

type DaQuestion = FreeformQuestion | MultiselectQuestion

type Quiz3 = {
  description: string
  questions: NonEmptyArray<DaQuestion>
}
