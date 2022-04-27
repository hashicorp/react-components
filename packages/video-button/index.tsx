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
        {size === 'medium' ? <IconPlay16 /> : <IconPlay24 />}
      </span>
    </button>
  )
}
