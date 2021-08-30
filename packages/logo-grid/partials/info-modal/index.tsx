import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import TooltipArrow from './tooltip-arrow'
import { useRect } from '@reach/rect'
import s from './style.module.css'
import centeringFunction from './centering-function'
import Button from '@hashicorp/react-button'

interface InfoModalProps {
  shown: boolean
  setIsShown: Dispatch<SetStateAction<boolean>>
  triggerRect: DOMRect
  collisionBuffer?: number
  arrowSize?: number
  company: $TSFixMe
}

function InfoModal({
  triggerRect,
  shown,
  setIsShown,
  collisionBuffer = 8,
  arrowSize = 10,
  company,
}: InfoModalProps): React.ReactElement {
  /* Forces update, need to fix, see useEffect
  comment below */
  const [, setDate] = useState(0)
  const setNow = () => setDate(Date.now())

  const tooltipRef = useRef(null)
  const tooltipRect = useRect(tooltipRef, { observe: true })

  const position = centeringFunction(
    triggerRect,
    tooltipRect,
    collisionBuffer,
    arrowSize
  )

  /* Dumb hot-fix for issue with useRect, where
  tooltipRect did not seem to be set as expected.
  I think this works because it forces a re-render
  when shown changes, which is exactly when we need
  to look at the tooltipRef again and re-measure.
  Not actually sure why this works. Need to investigate. */
  useEffect(setNow, [shown])

  return (
    <>
      <DialogOverlay
        className={s.dialogOverlay}
        isOpen={shown}
        onDismiss={() => setIsShown(false)}
        /* We don't want scroll lock, as this is more of a tooltip than a dialog.
        We might want to automatically closing the dialog if it is scrolled
        out of view. We could achieve this by monitoring the "bottom" of the 
        DOMRect of the dialog content. Perhaps something we'll already want
        to monitor to achieve the desired positioning. */
        dangerouslyBypassScrollLock={true}
      >
        <DialogContent
          className={s.dialogContent}
          ref={tooltipRef}
          aria-label="some stuff"
          style={
            {
              '--left': position.left + 'px',
              '--top': position.top + 'px',
            } as React.CSSProperties
          }
        >
          <button className={s.detailsClose} onClick={() => setIsShown(false)}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>&times;</span>
          </button>
          <h5 className={s.detailsHeading}>{company.name}</h5>
          <div>{company.description}</div>
          {company.link && (
            <Button
              className={s.detailsButton}
              title={`${company.name} Website`}
              url={company.link}
              theme={{ variant: 'secondary' }}
              linkType="outbound"
              external={true}
            />
          )}
        </DialogContent>
      </DialogOverlay>
      <TooltipArrow
        shown={shown}
        triggerRect={triggerRect}
        collisionBuffer={8}
        arrowSize={arrowSize}
      />
    </>
  )
}

export default InfoModal
