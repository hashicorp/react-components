/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import WistiaPlayer from 'react-player/wistia'
import Player from 'react-player'
import type { InlineVideoProps } from './types'
import s from './style.module.css'

export default function InlineVideo(props: InlineVideoProps) {
  const {
    appearance = 'light',
    gradientPosition = 'left',
    url,
    description,
    solution,
    videoClassName,
  } = props

  const playerProps = {
    controls: true,
    url,
    width: '100%',
    height: '100%',
  }

  const [hasWindow, setHasWindow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
    }
  }, [])

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
        <div className={classNames(s.video, videoClassName)}>
          {hasWindow ? (
            <>
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
                <Player {...playerProps} />
              )}
            </>
          ) : null}
        </div>
      </div>

      {description ? <p className={s.description}>{description}</p> : null}
    </div>
  )
}
