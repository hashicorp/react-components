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
      <div className={classNames(s.gradient, solution && s[solution])} />

      <div className={s.videoPlayer}>{url}</div>

      <p className={s.description}>{description}</p>
    </div>
  )
}
