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

function Hero({ data, centered, gaPrefix }) {
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
        'g-hero',
        themeClass,
        backgroundTheme,
        { centered: centered || data.centered },
        { 'has-videos': hasVideos }
      )}
    >
      {backgroundImage && <Image className="bg" {...backgroundImage} />}
      <div className="g-grid-container">
        <div className="headline">
          {smallTextTag && <div className="tag">{smallTextTag}</div>}
          {titleLogo && <Image className="logo" {...titleLogo} />}
          {alert && (
            <Alert
              url={alert.url}
              tag={alert.tag}
              tagColor={alert.tagColor}
              text={alert.text}
            />
          )}
          {title && (
            <h1
              className="g-type-display-1"
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(title, h1OrphanCount),
              }}
            />
          )}
          {description && (
            <div
              className="description g-type-body-large"
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(description.trim()),
              }}
            />
          )}
          {formLeadInput && (
            <div className="form-lead">
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
          )}
          {!formLeadInput && buttons && buttons.length > 0 && (
            <div className="buttons">
              {buttons.map((button, idx) => {
                if (gaPrefix) button.gaPrefix = gaPrefix
                return (
                  <Button
                    key={button.title}
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
          )}
          {helpText && (
            <div className="help-text g-type-buttons-and-standalone-links">
              <div dangerouslySetInnerHTML={{ __html: helpText.trim() }} />
              <ArrowIcon />
            </div>
          )}
        </div>
        {image && (
          <div className="image">
            <Image {...image} />
          </div>
        )}
        {!image && hasVideos && <VideoCarousel videos={videos} />}
      </div>
    </div>
  )
}

Hero.fragmentSpec = { fragment, dependencies: [Alert] }

export default Hero
