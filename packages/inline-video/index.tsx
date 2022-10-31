import classNames from 'classnames'
import type { InlineVideoProps } from './types'
import s from './style.module.css'

export default function InlineVideo(props: InlineVideoProps) {
  const {
    appearance = 'light',
    gradientSide = 'left',
    url,
    description,
    solution,
  } = props
  return (
    <div
      className={classNames(s.inlineVideo, s[appearance], s[gradientSide])}
      data-testid="wpl-inline-video"
    >
      <div className={classNames(s.videoContainer, solution && s[solution])}>
        <div className={s.video}>
          {/* TODO Render an actual video here */}
          {url}
        </div>
      </div>

      {description ? <p className={s.description}>{description}</p> : null}
    </div>
  )
}
