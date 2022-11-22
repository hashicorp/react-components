import EyebrowWithPattern from './eyebrow-with-pattern'
import Intro from '@hashicorp/react-intro'
import InlineVideo from '@hashicorp/react-inline-video'
import type { HeroProps } from './types'
import s from './style.module.css'

const Hero = ({
  appearance = 'dark',
  eyebrow,
  heading,
  description,
  actions,
  url,
  smallImage,
  mediumImage,
  desktopImage,
}: HeroProps) => {
  return (
    <div className={s.root}>
      {url ? (
        <div className={s.videoWrapper}>
          <InlineVideo appearance={appearance} url={url} />
        </div>
      ) : null}
      <div className={s.content}>
        {eyebrow ? (
          <EyebrowWithPattern appearance={appearance} text={eyebrow} />
        ) : null}
        <Intro
          appearance={appearance}
          heading={heading}
          headingElement={'h1'}
          description={description}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default Hero
