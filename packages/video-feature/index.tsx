import classNames from 'classnames'
import AuthorByline from '@hashicorp/react-author-byline'
import Intro from '@hashicorp/react-intro'
import InlineVideo from '@hashicorp/react-inline-video'
import type { VideoFeatureProps } from './types'
import s from './style.module.css'

export default function VideoFeature({
  appearance = 'light',
  contentPosition = 'left',
  heading,
  description,
  author,
  video,
}: VideoFeatureProps) {
  return (
    <div
      className={classNames(s.videoFeature, s[appearance], s[contentPosition])}
    >
      <div className={s.content}>
        <Intro
          heading={heading}
          description={description}
          appearance={appearance}
        />
        {author ? <AuthorByline {...author} appearance={appearance} /> : null}
      </div>

      <div className={s.video}>
        <InlineVideo {...video} gradientPosition={contentPosition} />
      </div>
    </div>
  )
}
