import Image from 'next/image'
import Button from '@hashicorp/react-button'
import InlineVideo from '@hashicorp/react-inline-video'
import Eyebrow from './eyebrow-with-pattern'
import s from './style.module.css'

export interface HeroProps {
  title: string
  description: string
  // TODO: determine if ctas are required
  ctas?: Array<{
    title: string
    url: string
  }>
  image: {
    src: string
  }
  solutionSpace: 'infrastructure' | 'security' | 'networking' | 'applications'
  videoUrl?: string
}

const Hero = ({
  title,
  description,
  ctas,
  image,
  solutionSpace,
  videoUrl,
}: HeroProps) => {
  return (
    <header className={s.root}>
      <div className={s.bgBounding}>
        <div className={s.container}>
          {videoUrl ? (
            <div className={s.video}>
              <InlineVideo solution={solutionSpace} url={videoUrl} />
            </div>
          ) : null}
          <div className={s.content}>
            <Eyebrow
              appearance="dark"
              theme={solutionSpace || 'infrastructure'}
              text="Solution"
            />
            <h1 className={s.title}>{title}</h1>
            <p className={s.description}>{description}</p>
            {ctas && (
              <div className={s.ctas}>
                {ctas.map(({ url, title }, idx) => {
                  const isPrimary = idx === 0
                  return (
                    <Button
                      title={title}
                      url={parseUrl(url).href}
                      key={title}
                      size="small"
                      linkType={!isPrimary ? 'inbound' : undefined}
                      theme={{
                        variant: isPrimary ? 'primary' : 'tertiary-neutral',
                        background: 'dark',
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <div className={s.desktopMedia}>
          {image && (
            <Image
              src={require(`./img/${solutionSpace || 'infrastructure'}.svg`)}
              alt=""
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          )}
        </div>
        <div className={s.smallMedia}>
          {image && (
            <Image
              src={require(`./img/${
                solutionSpace || 'infrastructure'
              }-small.svg`)}
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
