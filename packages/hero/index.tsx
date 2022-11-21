import Intro from '@hashicorp/react-intro'
import InlineVideo from '@hashicorp/react-inline-video'
import type { HeroProps } from './types'
import s from './style.module.css'

const Hero = ({
  appearance = 'light',
  eyebrow,
  heading,
  description,
  actions,
  url,
}: HeroProps) => {
  return (
    <div className={s.root}>
      {url ? (
        <div className={s.videoWrapper}>
          <InlineVideo appearance={appearance} url={url} />{' '}
        </div>
      ) : null}
      <div className={s.introWrapper}>
        <div>
          <EyebrowWithPattern text={eyebrow} />
        </div>
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

const EyebrowWithPattern = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}
export default Hero
