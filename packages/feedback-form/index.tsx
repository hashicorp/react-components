import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useRef,
} from 'react'
import shortid from 'shortid'
import Button from '@hashicorp/react-button'

import thumbsUpIcon from './icons/thumbs-up.svg?include'

import {
  FeedbackFormContext as FeedbackFormContextType,
  FeedbackQuestion,
  FeedbackFormProps,
  FeedbackFormStatus,
} from './types'

import s from './style.module.css'

const MAX_TRANSITION_DURATION_MS = 200

const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))

const FeedbackFormContext = createContext<FeedbackFormContextType>({})

const Question: React.FC<FeedbackQuestion> = (props) => {
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
              type={answer.nextQuestion ? 'button' : 'submit'}
              disabled={feedbackContext.isTransitioning}
              aria-label={answer.display}
              key={answer.display}
              title={answer.display}
              size="small"
              onClick={(e: React.MouseEvent) =>
                feedbackContext.submitQuestion(e, { id, ...answer })
              }
              icon={{
                svg: thumbsUpIcon,
                position: 'left',
              }}
              className={`${s.choiceButton} ${
                answer.value === 'no' ? s.negative : ''
              }`}
              data-heap-track={`feedback-form-button-${id}-${answer.value}`}
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
            type={props.nextQuestion ? 'button' : 'submit'}
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
  const [status, setStatus] = useState<FeedbackFormStatus>(
    FeedbackFormStatus.inProgress
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [responses, setResponses] = useState<
    {
      id: string
      value: string
    }[]
  >([])
  const [activeQuestion, setActiveQuestion] = useState(questions[0].id)
  const sessionId = useRef<string | undefined>()

  const getSessionId = () => {
    if (!sessionId.current) sessionId.current = shortid.generate() as string
    return sessionId.current
  }

  const contextValue: FeedbackFormContextType = useMemo(
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

        // Set a transitioning state so we can disable buttons while submission is happening
        setIsTransitioning(true)
        // Set a max transition time by using Promise.race to ensure there isn't a delay in user interaction
        Promise.race([
          onQuestionSubmit(newResponses, getSessionId()),
          wait(MAX_TRANSITION_DURATION_MS),
        ]).finally(() => {
          setIsTransitioning(false)
          if (answer.nextQuestion) {
            setActiveQuestion(answer.nextQuestion)
          } else {
            setStatus(FeedbackFormStatus.finished)
          }
        })
      },
    }),
    [activeQuestion, responses]
  )

  return (
    <FeedbackFormContext.Provider value={contextValue}>
      <form id="feedback-panel">
        {status === FeedbackFormStatus.inProgress
          ? questions.map((question) => (
              <Question key={question.id} {...question} />
            ))
          : null}
        {status === FeedbackFormStatus.finished ? finished : null}
      </form>
    </FeedbackFormContext.Provider>
  )
}
