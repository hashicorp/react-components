import type { VideoButtonProps } from './types'
import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import { IconPlay16 } from '@hashicorp/flight-icons/svg-react/play-16'
import { IconPlay24 } from '@hashicorp/flight-icons/svg-react/play-24'
import s from './style.module.css'

export default function VideoButton({
  onClick,
  theme = 'white',
  size = 'medium',
  radius = 'full',
  children,
  className,
}: VideoButtonProps) {
  return (
    <button
      className={classNames(className, s.videoButton)}
      onClick={onClick}
      data-testid="video-button"
    >
      <span className={classNames(s.icon, s[theme], s[size], s[radius])}>
        <VisuallyHidden>{children}</VisuallyHidden>
        {size === 'medium' ? (
          <svg
            width="11"
            height="14"
            viewBox="0 0 11 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 6.134a1 1 0 0 1 0 1.732l-9 5.196a1 1 0 0 1-1.5-.866V1.804A1 1 0 0 1 1.5.938l9 5.196Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 9.134a1 1 0 0 1 0 1.732l-15 8.66A1 1 0 0 1 0 18.66V1.34A1 1 0 0 1 1.5.474l15 8.66Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </button>
  )
}
