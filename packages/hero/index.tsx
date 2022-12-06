import Actions from 'packages/actions'
import classNames from 'classnames'
import EyebrowWithPattern from './eyebrow-with-pattern'
import type { HeroProps } from './types'
import Image from 'next/image'
import InlineVideo from '@hashicorp/react-inline-video'
import s from './style.module.css'

const Hero = ({
  appearance = 'light',
  eyebrow,
  heading,
  headingSize = '1',
  description,
  descriptionColor,
  ctas,
  url,
  backgroundColor = 'white',
  smallImage,
  mediumImage,
  largeImage,
  solution,
  theme,
}: HeroProps) => {
  const rootStyles = {
    '--backgroundColor': backgroundColor,
  } as React.CSSProperties
  const descriptionStyles = {
    '--color': descriptionColor,
  } as React.CSSProperties
  const headingSizeClassname = `g-type-display-${headingSize}`

  return (
    <header className={s.root} style={rootStyles}>
      <div className={s.bgBounding}>
        <div className={s.container}>
          {url ? (
            <div className={s.video}>
              <InlineVideo solution={solution} url={url} />
            </div>
          ) : null}
          <div className={classNames(s.content, s[appearance])}>
            {eyebrow ? (
              <div className={s.eyebrow}>
                <EyebrowWithPattern
                  appearance={appearance}
                  solution={solution}
                  text={eyebrow}
                />
              </div>
            ) : null}
            <h1 className={classNames([s.heading, headingSizeClassname])}>
              {heading}
            </h1>
            <p className={s.description} style={descriptionStyles}>
              {description}
            </p>
            <Actions appearance={appearance} theme={theme} ctas={ctas} />
          </div>
        </div>
        <div className={s.largeMedia}>
          {largeImage && (
            <Image
              src={largeImage}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition={'left bottom'}
              width={2400}
              height={1350}
              priority={true}
            />
          )}
        </div>
        <div className={s.mediumMedia}>
          {mediumImage && (
            <Image
              src={mediumImage}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition={'left'}
              width={1200}
              height={1200}
              priority={true}
            />
          )}
        </div>
        <div className={s.smallMedia}>
          {smallImage && (
            <Image
              src={smallImage}
              alt=""
              width={760}
              height={380}
              priority={true}
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Hero
