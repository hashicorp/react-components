import Eyebrow from './eyebrow-with-pattern'
import type { HeroProps } from './types'
import Image from 'next/image'
import InlineVideo from '@hashicorp/react-inline-video'
import Intro from '@hashicorp/react-intro'
import s from './style.module.css'

const Hero = ({
  appearance = 'light',
  eyebrow,
  heading,
  description,
  actions,
  url,
  backgroundColor = 'white',
  smallImage,
  largeImage,
  theme,
}: HeroProps) => {
  const rootStyles = {
    '--backgroundColor': backgroundColor,
  } as React.CSSProperties
  return (
    <header className={s.root} style={rootStyles}>
      <div className={s.bgBounding}>
        <div className={s.container}>
          {url ? (
            <div className={s.video}>
              <InlineVideo solution={theme} url={url} />
            </div>
          ) : null}
          <div className={s.content}>
            {eyebrow ? (
              <Eyebrow appearance={appearance} theme={theme} text={eyebrow} />
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
        <div className={s.desktopMedia}>
          {smallImage && (
            <Image
              src={smallImage}
              alt=""
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          )}
        </div>
        <div className={s.smallMedia}>
          {largeImage && (
            <Image
              src={largeImage}
              alt=""
              width={800}
              height={667}
              priority={true}
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Hero
