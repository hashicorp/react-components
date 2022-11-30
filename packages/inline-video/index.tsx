import classNames from 'classnames'
import WistiaPlayer from 'react-player/wistia'
import type { InlineVideoProps } from './types'
import s from './style.module.css'
import dynamic from 'next/dynamic'

export default function InlineVideo(props: InlineVideoProps) {
  const {
    appearance = 'light',
    gradientPosition = 'left',
    url,
    description,
    solution,
  } = props

  const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })
  const playerProps = {
    controls: true,
    url,
    width: '100%',
    height: '100%',
  }

  return (
    <div
      className={classNames(
        s.inlineVideo,
        s[appearance],
        gradientPosition && s[gradientPosition]
      )}
      data-testid="wpl-inline-video"
    >
      <div className={classNames(s.videoContainer, solution && s[solution])}>
        <div className={s.video}>
          {url.includes('wistia') ? (
            <WistiaPlayer
              {...playerProps}
              config={{
                options: {
                  controlsVisibleOnLoad: false,
                },
              }}
            />
          ) : (
            <ReactPlayer {...playerProps} />
          )}
        </div>
      </div>

      {description ? <p className={s.description}>{description}</p> : null}
    </div>
  )
}
