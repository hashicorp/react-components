import classNames from 'classnames'
import Image from '@hashicorp/react-image'
import Alert from '@hashicorp/react-alert'
import Button from '@hashicorp/react-button'
import { eliminateOrphans } from '@hashicorp/js-utils'
import useProductMeta from '@hashicorp/platform-product-meta'
import VideoCarousel from './carousel'
import ArrowIcon from './arrow-icon'
import HeroLeadForm from './heroLeadForm'
import s from './style.module.css'
import fragment from './fragment.graphql'

/**
 * A flexible hero component used as the primary content at the top of many HashiCorp pages.
 */
function Hero({ data, centered, gaPrefix, className }) {
  const {
    alert,
    backgroundImage,
    backgroundTheme = 'dark',
    buttons,
    description,
    formLeadInput,
    helpText,
    image,
    product,
    smallTextTag,
    title,
    titleLogo,
    videos,
  } = data
  const hasVideos = videos && videos.length > 0
  const { themeClass } = useProductMeta(product)
  const h1OrphanCount = 9

  return (
    <div
      className={classNames(
        s.root,
        themeClass,
        backgroundTheme,
        { centered: centered || data.centered },
        /* Note: has-videos is only used in Percy on www-next. Should likely be removed */
        { 'has-videos': hasVideos },
        className
      )}
    >
      {backgroundImage && (
        <Image
          className={s.background}
          alt={backgroundImage.alt}
          {...backgroundImage}
        />
      )}
      <div className={s.container}>
        <div className={s.headline}>
          {smallTextTag && <div className="tag">{smallTextTag}</div>}
          {titleLogo && (
            <Image
              className={s.headlineLogo}
              alt={titleLogo.alt}
              {...titleLogo}
            />
          )}
          {alert && (
            <Alert
              url={alert.url}
              tag={alert.tag}
              text={alert.text}
              textColor="light"
              className={s.headlineAlert}
            />
          )}
          {title && (
            <h1
              className={s.headlineTitle}
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(title, h1OrphanCount),
              }}
            />
          )}
          {description && (
            <div
              className={s.headlineDescription}
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(description.trim()),
              }}
            />
          )}
          {formLeadInput ? (
            <div className={s.headlineFormLead}>
              <HeroLeadForm
                submitRedirectUrl={formLeadInput.destinationUrl}
                buttonText={formLeadInput.buttonText}
                theme={{
                  background: backgroundTheme,
                  brand: product,
                  variant: 'primary',
                }}
              />
            </div>
          ) : buttons && buttons.length ? (
            <div className={s.headlineButtons}>
              {buttons.map((button, idx) => {
                if (gaPrefix) button.gaPrefix = gaPrefix
                const hasZeroPadding =
                  button.theme?.variant === 'tertiary' ||
                  button.theme?.variant === 'tertiary-neutral' ||
                  button.theme?.variant === 'ghost'
                return (
                  <Button
                    key={button.title}
                    className={classNames(s.headlineButton, {
                      [s.hasZeroPadding]: hasZeroPadding,
                    })}
                    {...button}
                    theme={{
                      brand: idx === 0 ? product : 'neutral',
                      variant: idx === 0 ? 'primary' : 'secondary',
                      background:
                        idx === 0
                          ? 'light'
                          : product
                          ? backgroundTheme
                          : 'dark',
                      ...button.theme,
                    }}
                  />
                )
              })}
            </div>
          ) : null}
          {helpText && (
            <div className={s.headlineHelpText}>
              <div dangerouslySetInnerHTML={{ __html: helpText.trim() }} />
              <ArrowIcon />
            </div>
          )}
        </div>
        {image ? (
          <div className={s.image}>
            <Image {...image} />
          </div>
        ) : hasVideos ? (
          <VideoCarousel videos={videos} />
        ) : null}
      </div>
    </div>
  )
}

Hero.fragmentSpec = { fragment, dependencies: [Alert] }

export default Hero
