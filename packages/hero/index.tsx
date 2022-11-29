import React from 'react'
import EyebrowWithPattern from './eyebrow-with-pattern'
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
  mediumImage,
  largeImage,
  theme,
}: HeroProps) => {
  const rootStyles = {
    '--backgroundColor': backgroundColor,
  } as React.CSSProperties

  return (
    <div className={s.root} style={rootStyles}>
      <div className={s.inner}>
        <div className={s.content}>
          {url ? (
            <div className={s.videoWrapper}>
              <InlineVideo appearance={appearance} url={url} />
            </div>
          ) : null}
          <div className={s.introWrapper}>
            {eyebrow ? (
              <div className={s.eyebrowWrapper}>
                <EyebrowWithPattern
                  appearance={appearance}
                  theme={theme}
                  text={eyebrow}
                />
              </div>
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
        {smallImage ? (
          <div className={s.smallImage}>
            <Image
              src={smallImage}
              alt=""
              layout="responsive"
              width="616"
              height="308"
              priority={true}
            />
          </div>
        ) : null}
        {mediumImage ? (
          <div className={s.mediumImage}>
            <Image
              src={mediumImage}
              alt=""
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        ) : null}
        {largeImage ? (
          <div className={s.largeImage}>
            <Image
              src={largeImage}
              alt=""
              layout="responsive"
              width="1120"
              height="560"
              priority={true}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Hero
