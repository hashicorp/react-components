import marked from 'marked'
import Image from '@hashicorp/react-image'
import Alert from '@hashicorp/react-alert'
import Button from '@hashicorp/react-button'
import { eliminateOrphans } from '@hashicorp/js-utils'
import VideoCarousel from './carousel'
import ArrowIcon from './arrow-icon'
import HeroLeadForm from './heroLeadForm'
import fragment from './fragment.graphql'

const normalizeThemeBrand = {
  'vagrant-blue': 'hashicorp',
  'terraform-purple': 'terraform',
  'vault-gray': 'vault',
  'consul-pink': 'consul',
  'nomad-green': 'nomad',
}

function Hero({ data, centered, gaPrefix }) {
  const hasVideos = data.videos && data.videos.length > 0
  const backgroundTheme = data.backgroundTheme || 'dark'
  const h1OrphanCount = 9

  return (
    <div
      className={`g-hero ${data.theme || ''} ${backgroundTheme} ${
        centered || data.centered ? 'centered' : ''
      } ${hasVideos ? 'has-videos' : ''}`}
    >
      {data.backgroundImage && (
        <Image className="bg" {...data.backgroundImage} />
      )}
      <div className="g-container">
        <div className="headline">
          {data.smallTextTag && <div className="tag">{data.smallTextTag}</div>}
          {data.titleLogo && <Image className="logo" {...data.titleLogo} />}
          {data.alert && (
            <Alert
              url={data.alert.url}
              tag={data.alert.tag}
              tagColor={data.alert.tagColor}
              text={data.alert.text}
            />
          )}
          {data.title && (
            <h1
              className="g-type-display-1"
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(
                  marked.inlineLexer(data.title, []),
                  h1OrphanCount
                ),
              }}
            />
          )}
          {data.description && (
            <p
              className="g-type-body-large"
              dangerouslySetInnerHTML={{
                __html: eliminateOrphans(
                  marked.inlineLexer(data.description, [])
                ),
              }}
            />
          )}
          {data.formLeadInput && (
            <div className="form-lead">
              <HeroLeadForm
                submitRedirectUrl={data.formLeadInput.destinationUrl}
                buttonText={data.formLeadInput.buttonText}
                theme={{
                  background: backgroundTheme,
                  brand: normalizeThemeBrand[data.theme],
                  variant: 'primary',
                }}
              />
            </div>
          )}
          {!data.formLeadInput && data.buttons && data.buttons.length > 0 && (
            <div className="buttons">
              {data.buttons.map((button, idx) => {
                if (gaPrefix) button.gaPrefix = gaPrefix
                return (
                  <Button
                    key={button.title}
                    {...button}
                    theme={{
                      brand:
                        idx === 0
                          ? normalizeThemeBrand[data.theme] || 'hashicorp'
                          : 'neutral',
                      variant: idx === 0 ? 'primary' : 'secondary',
                      background:
                        idx === 0
                          ? 'light'
                          : normalizeThemeBrand[data.theme]
                          ? backgroundTheme
                          : 'dark',
                    }}
                  />
                )
              })}
            </div>
          )}
          {data.helpText && (
            <div className="help-text g-type-buttons-and-standalone-links">
              <div
                dangerouslySetInnerHTML={{ __html: marked(data.helpText) }}
              />
              <ArrowIcon />
            </div>
          )}
        </div>
        {data.image && (
          <div className="image">
            <Image {...data.image} />
          </div>
        )}
        {!data.image && data.videos && data.videos.length > 0 && (
          <VideoCarousel videos={data.videos} />
        )}
      </div>
    </div>
  )
}

Hero.fragmentSpec = { fragment, dependencies: [Alert] }

export default Hero
