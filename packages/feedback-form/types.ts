import React from 'react'

interface FeedbackQuestionBase {
  id: string
  text: React.ReactNode
  followupMessage: React.ReactNode
}

interface FeedbackQuestionChoice extends FeedbackQuestionBase {
  type: 'choice'
  answers: {
    display: string
    value: string
    nextQuestion?: string
  }[]
}

interface FeedbackQuestionText extends FeedbackQuestionBase {
  type: 'text'
  buttonText: string
  nextQuestion?: string
}

export type FeedbackQuestion = FeedbackQuestionText | FeedbackQuestionChoice

export interface FeedbackResponse {
  id: string
  value: string
}

export interface FeedbackFormProps {
  /**
   * The list of questions which are displayed to the user.
   */
  questions: FeedbackQuestion[]
  /**
   * Renders after all questions have been answered
   */
  finished: React.ReactNode
  /**
   * Called each time a question is submitted
   */
  onQuestionSubmit:
    | (() => void)
    | ((responses: FeedbackResponse[], sessionId: string) => Promise<void>)
}

export type FeedbackFormContext =
  | {
      isTransitioning: boolean
      activeQuestion: string | undefined
      submitQuestion(
        e: React.MouseEvent,
        answer: FeedbackResponse & { nextQuestion?: string }
      ): void
    }
  | Record<string, never>

export enum FeedbackFormStatus {
  inProgress,
  finished,
}
