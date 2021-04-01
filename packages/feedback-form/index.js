import { useContext, createContext, useMemo, useState } from 'react'
import shortid from 'shortid'
import Button from '@hashicorp/react-button'

import thumbsUpIcon from './icons/thumbs-up.svg?include'
import thumbsDownIcon from './icons/thumbs-down.svg?include'

import s from './style.module.css'

const FeedbackFormContext = createContext()

function Question(props) {
  const { id, type, text, answers, buttonText, followupMessage } = props

  const [inputValue, setInputValue] = useState('')
  const feedbackContext = useContext(FeedbackFormContext)

  if (feedbackContext.activeQuestion !== id) return null

  let inputs

  switch (type) {
    case 'choice': {
      inputs = answers.map((answer) => (
        <Button
          key={answer.display}
          title={answer.display}
          size="small"
          onClick={(e) => feedbackContext.submitQuestion(e, { id, ...answer })}
          icon={{
            svg: answer.value === 'yes' ? thumbsUpIcon : thumbsDownIcon,
            position: 'left',
          }}
          className={s.choiceButton}
        />
      ))

      break
    }
    case 'text': {
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
            title={buttonText}
            size="small"
            disabled={isButtonDisabled}
            onClick={(e) =>
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
      {followupMessage ? followupMessage : null}
      <label htmlFor={id}>{text}</label>
      {inputs}
    </div>
  )
}

export default function FeedbackForm({
  questions,
  finished,
  onQuestionSubmit = () => {},
}) {
  // inProgress | finished
  const [status, setStatus] = useState('inProgress')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [responses, setResponses] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(questions[0].id)
  const [sessionId] = useState(() => shortid.generate())

  const contextValue = useMemo(
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
        onQuestionSubmit(answer, sessionId).finally(() => {
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

// ;<FeedbackForm>
//   <Question type="choice" id="helpful" text="Was this tutorial helpful?">
//     <Answer value="yes" nextQuestion="reasonForVisit">
//       <Button
//         title="Yes"
//         size="small"
//         icon={{ svg: thumbsUpIcon, position: 'left' }}
//       />
//     </Answer>
//     <Answer value="no" nextQuestion="suggestedImprovements">
//       <Button
//         title="No"
//         size="small"
//         icon={{ svg: thumbsDownIcon, position: 'left' }}
//       />
//     </Answer>
//   </Question>
//   <Question
//     type="text"
//     id="reasonForVisit"
//     text={
//       <>
//         <strong>Why did you visit this tutorial?</strong> (optional)
//       </>
//     }
//     buttonText="Complete Feedback"
//   />
//   <Question
//     type="text"
//     id="suggestedImprovements"
//     text={
//       <>
//         <strong>How could this tutorial be more helpful?</strong> (optional)
//       </>
//     }
//     buttonText="Complete Feedback"
//     followupMessage={
//       <>
//         <strong>We&apos;re sorry to hear that.</strong> Your feedback will help
//         us improve.
//       </>
//     }
//   />
// </FeedbackForm>
