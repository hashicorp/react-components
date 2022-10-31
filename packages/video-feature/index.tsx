import classNames from 'classnames'
import AuthorByline from '@hashicorp/react-author-byline'
import Intro from '@hashicorp/react-intro'
import InlineVideo from '@hashicorp/react-inline-video'
import type { VideoFeatureProps } from './types'
import s from './style.module.css'

export default function VideoFeature({
  appearance = 'light',
  contentSide = 'left',
  heading,
  description,
  author,
  video,
}: VideoFeatureProps) {
  return (
    <div className={classNames(s.videoFeature, s[appearance], s[contentSide])}>
      <div className={s.content}>
        <Intro
          heading={heading}
          description={description}
          appearance={appearance}
        />
        <AuthorByline {...author} appearance={appearance} />
      </div>

      <div className={s.video}>
        <InlineVideo {...video} />
      </div>
    </div>
  )
}
