import React, { useContext, createContext, useMemo, useState } from 'react'
import shortid from 'shortid'
import Button from '@hashicorp/react-button'

import thumbsUpIcon from './icons/thumbs-up.svg?include'
import thumbsDownIcon from './icons/thumbs-down.svg?include'

import s from './style.module.css'

const MAX_TRANSITION_DURATION_MS = 200

const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))

const FeedbackFormContext = createContext<FeedbackFormContext>({})

function Question(props: FeedbackQuestion) {
  const { id, text, followupMessage } = props

  const [inputValue, setInputValue] = useState('')
  const feedbackContext = useContext(FeedbackFormContext)

  if (feedbackContext.activeQuestion !== id) return null

  let inputs: React.ReactNode

  switch (props.type) {
    case 'choice': {
      const { answers } = props

      inputs = (
        <div className={s.buttonWrapper}>
          {answers.map((answer) => (
            <Button
              disabled={feedbackContext.isTransitioning}
              aria-label={answer.display}
              key={answer.display}
              title={answer.display}
              size="small"
              onClick={(e: React.MouseEvent) =>
                feedbackContext.submitQuestion(e, { id, ...answer })
              }
              icon={{
                svg: answer.value === 'yes' ? thumbsUpIcon : thumbsDownIcon,
                position: 'left',
              }}
              className={s.choiceButton}
            />
          ))}
        </div>
      )

      break
    }
    case 'text': {
      const { buttonText } = props

      const isButtonDisabled =
        inputValue === '' || feedbackContext.isTransitioning

      inputs = (
        <>
          <textarea
            id={id}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            className={s.textArea}
          />
          <Button
            className={s.submitButton}
            aria-label={buttonText}
            title={buttonText}
            size="small"
            disabled={isButtonDisabled}
            onClick={(e: React.MouseEvent) =>
              feedbackContext.submitQuestion(e, { id, value: inputValue })
            }
          />
        </>
      )

      break
    }
  }

  return (
    <div>
      {followupMessage ? (
        <span className={s.followUp}>{followupMessage}</span>
      ) : null}
      <label htmlFor={id}>{text}</label>
      {inputs}
    </div>
  )
}

export default function FeedbackForm({
  questions,
  finished,
  onQuestionSubmit = () => void 0,
}: FeedbackFormProps): React.ReactElement {
  const [status, setStatus] = useState<'inProgress' | 'finished'>('inProgress')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [responses, setResponses] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(questions[0].id)
  const [sessionId] = useState(() => shortid.generate())

  const contextValue: FeedbackFormContext = useMemo(
    () => ({
      isTransitioning,
      activeQuestion,
      submitQuestion(e, answer) {
        e.preventDefault()

        const newResponses = [
          ...responses,
          { id: answer.id, value: answer.value },
        ]

        setResponses(newResponses)

        setIsTransitioning(true)
        Promise.race([
          onQuestionSubmit(newResponses, sessionId),
          wait(MAX_TRANSITION_DURATION_MS),
        ]).finally(() => {
          setIsTransitioning(false)
          if (answer.nextQuestion) {
            setActiveQuestion(answer.nextQuestion)
          } else {
            setStatus('finished')
          }
        })
      },
    }),
    [activeQuestion, responses]
  )

  return (
    <FeedbackFormContext.Provider value={contextValue}>
      <form id="feedback-panel">
        {status === 'inProgress'
          ? questions.map((question) => (
              <Question key={question.id} {...question} />
            ))
          : null}
        {status === 'finished' ? finished : null}
      </form>
    </FeedbackFormContext.Provider>
  )
}

/**
 * Types
 */

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
    nextQuestion: string
  }[]
}

interface FeedbackQuestionText extends FeedbackQuestionBase {
  type: 'text'
  buttonText: string
}

type FeedbackQuestion = FeedbackQuestionText | FeedbackQuestionChoice

interface FeedbackResponse {
  id: string
  value: string
}

interface FeedbackFormProps {
  questions: FeedbackQuestion[]
  finished: React.ReactNode
  onQuestionSubmit:
    | (() => void)
    | ((responses: FeedbackResponse[], sessionId: string) => Promise<void>)
}

type FeedbackFormContext =
  | {
      isTransitioning: boolean
      activeQuestion: string | undefined
      submitQuestion(
        e: React.MouseEvent,
        answer: FeedbackResponse & { nextQuestion?: string }
      ): void
    }
  | Record<string, never>
