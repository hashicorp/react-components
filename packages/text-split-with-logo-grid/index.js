import TextSplit from '@hashicorp/react-text-split'
import Image from '@hashicorp/react-image'
import dictionarySvgColor from '@hashicorp/mktg-assets/dist/companies/dictionary-svgr-color.js'
import dictionarySvgWhite from '@hashicorp/mktg-assets/dist/companies/dictionary-svgr-white.js'

export default function TextSplitWithLogoGrid({ images, textSplit }) {
  const logoDict =
    textSplit.theme === 'dark' ? dictionarySvgWhite : dictionarySvgColor
  const parsedImages = images.map((imgProps) => {
    // If we have an image URL for src, jus use the Image component
    if (typeof imgProps !== 'string' && !!imgProps.url) {
      const { hasWhitespace, ...restImgProps } = imgProps
      return {
        hasWhitespace,
        renderImage: () => <Image {...restImgProps} />,
      }
    }
    // Otherwise, try to find an SVGR from our company logo dictionary
    const slug = imgProps
    const SvgrLogo = logoDict[slug]
    if (!SvgrLogo) {
      throw new Error(
        `<TextSplitWithLogoGrid /> could not find logo for slug ${slug}. Please check the slug being passed in, or get in touch with #team-mktg-design to have this logo added.`
      )
    }

    return {
      // Our shared company logos have built-in whitespace
      // We don't assume this for other images passed in
      hasWhitespace: true,
      renderImage: () => <SvgrLogo title={slug} />,
    }
  })
  const imgCount = parsedImages.length
  const isBrokenLayout = imgCount % 3 !== 0 || imgCount > 9
  if (isBrokenLayout) {
    throw new Error(
      `<TextSplitWithLogoGrid /> was passed ${imgCount} images, which would result in a broken layout. There must be exactly 3, 6, or 9 images.`
    )
  }
  return (
    <TextSplit {...textSplit}>
      <div className="g-text-split-with-logo-grid">
        {parsedImages.map((logoImg, stableIdx) => {
          const { hasWhitespace, renderImage } = logoImg
          const whitespaceClass = hasWhitespace ? 'has-whitespace' : ''
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={stableIdx} className="grid-item">
              <div className="image-aspect">
                <div
                  className={`inner background-${textSplit.theme} ${whitespaceClass}`}
                >
                  {renderImage()}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </TextSplit>
  )
}
