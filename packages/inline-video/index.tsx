import classNames from 'classnames'
import WistiaPlayer from 'react-player/wistia'
import Player from 'react-player'
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

  const playerProps = {
    controls: true,
    url,
    width: '100%',
    height: '100%',
  }
  return (
    <div
      className={classNames(s.inlineVideo, s[appearance], s[gradientSide])}
      data-testid="wpl-inline-video"
    >
      <div className={classNames(s.videoContainer, solution && s[solution])}>
        <div className={s.video}>
          {url.includes('wistia') ? (
            <WistiaPlayer {...playerProps} />
          ) : (
            <Player {...playerProps} />
          )}
        </div>
      </div>

      {description ? <p className={s.description}>{description}</p> : null}
    </div>
  )
}
