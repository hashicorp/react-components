import classNames from 'classnames'
import Image from '@hashicorp/react-image'
import Alert from '@hashicorp/react-alert'
import Button from '@hashicorp/react-button'
import { eliminateOrphans } from '@hashicorp/js-utils'
import useProductMeta from '@hashicorp/platform-product-meta'
import VideoCarousel from './carousel'
import ArrowIcon from './arrow-icon'
import HeroLeadForm from './heroLeadForm'
import fragment from './fragment.graphql'
import s from './style.module.css'

/**
 * A flexible hero component used as the primary content at the top of many HashiCorp pages.
 */
function Hero({ data, centered, gaPrefix, className, videoControlsTop }) {
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
  const isCentered = centered || data.centered

  return (
    <div
      className={classNames(
        s.root,
        s[backgroundTheme],
        themeClass,
        { [s.centered]: isCentered },
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
      <div
        className={classNames(s.container, {
          [s.centered]: isCentered,
        })}
      >
        <div className={s.headline}>
          {smallTextTag && <div className="tag">{smallTextTag}</div>}
          {titleLogo && (
            <Image
              className={classNames(s.headlineLogo, {
                [s.centered]: isCentered,
              })}
              alt={titleLogo.alt}
              {...titleLogo}
            />
          )}
          {alert && (
            <Alert
              url={alert.url}
              tag={alert.tag}
              text={alert.text}
              textColor={backgroundTheme === 'light' ? 'dark' : 'light'}
              className={s.headlineAlert}
            />
          )}
          {title && (
            <h1
              className={classNames(s.headlineTitle, s[backgroundTheme])}
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(title, h1OrphanCount),
              }}
            />
          )}
          {description && (
            <div
              className={classNames(s.headlineDescription, s[backgroundTheme])}
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
            <div
              className={classNames(s.headlineButtons, {
                [s.centered]: isCentered,
              })}
            >
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
                      [s.centered]: isCentered,
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
            <div
              className={classNames(s.headlineHelpText, s[backgroundTheme], {
                [s.centered]: isCentered,
              })}
            >
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
          <VideoCarousel
            videos={videos}
            theme={backgroundTheme}
            videoControlsTop={videoControlsTop}
          />
        ) : null}
      </div>
    </div>
  )
}

Hero.fragmentSpec = { fragment, dependencies: [Alert] }

export default Hero
