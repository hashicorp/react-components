import classNames from 'classnames'
import AuthorByline from '@hashicorp/react-author-byline'
import Intro from '@hashicorp/react-intro'
import { VideoFeatureProps } from './types'
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
    <div className={classNames(s.videoFeature, s[contentSide])}>
      <div className={s.content}>
        <Intro
          heading={heading}
          description={description}
          appearance={appearance}
        />
        <AuthorByline {...author} appearance={appearance} />
      </div>

      <div className={s.video}>
        {/* ! FPO while <InlineVideo /> is scoped and built */}
        <div
          style={{ background: 'gray', display: 'grid', placeItems: 'center' }}
        >
          <p>{'<InlineVideo />'}</p>
          <p>{video.url}</p>
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  )
}
