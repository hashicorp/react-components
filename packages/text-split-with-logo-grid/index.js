import TextSplit from '@hashicorp/react-text-split'
import Image from '@hashicorp/react-image'
import dictionarySvgrColor from '@hashicorp/mktg-assets/dist/companies/dictionary-svgr-color.js'
import dictionarySvgrWhite from '@hashicorp/mktg-assets/dist/companies/dictionary-svgr-white.js'
import styles from './styles/text-split-with-logo-grid.module.css'

function parseLogoGridItems(items, theme) {
  const logoDict = theme === 'dark' ? dictionarySvgrWhite : dictionarySvgrColor
  return items.map((rawItem) => {
    const itemProps = typeof rawItem === 'string' ? { slug: rawItem } : rawItem
    const { slug, linkUrl, hasWhitespace, ...restItemProps } = itemProps
    const isDictLogo = Boolean(slug)
    const SvgrLogo = isDictLogo && logoDict[slug]
    if (isDictLogo && !SvgrLogo) {
      let error = `<TextSplitWithLogoGrid /> could not find logo for slug ${slug}. `
      error += `Please check the slug being passed in, or get in touch `
      error += `with #team-mktg-design to have this logo added.`
      throw new Error(error)
    }
    const GridItem = isDictLogo
      ? () => <SvgrLogo title={slug} />
      : () => <Image {...restItemProps} />
    return {
      hasWhitespace: isDictLogo ? true : hasWhitespace,
      linkUrl,
      GridItem,
    }
  })
}

function LogoGrid({ items, theme }) {
  const parsedItems = parseLogoGridItems(items, theme)
  const imgCount = parsedItems.length
  const isBrokenLayout = imgCount % 3 !== 0 || imgCount > 9
  if (isBrokenLayout) {
    let err = `<TextSplitWithLogoGrid /> was passed ${imgCount} items, `
    err += `which would result in a broken layout. `
    err += `There must be exactly 3, 6, or 9 items.`
    throw new Error(err)
  }
  return (
    <div className={styles.textSplitWithLogoGrid}>
      {parsedItems.map((logoGridItem, stableIdx) => {
        const { hasWhitespace, linkUrl, GridItem } = logoGridItem
        const ItemWrapper = linkUrl ? 'a' : 'div'
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={stableIdx} className={styles.gridItem}>
            <div className={styles.itemAspect}>
              <ItemWrapper
                href={linkUrl || undefined}
                className={styles.itemAspectInner}
                data-theme={theme}
                data-has-whitespace={hasWhitespace}
              >
                <GridItem />
              </ItemWrapper>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function TextSplitWithLogoGrid({ logoGrid, textSplit }) {
  return (
    <TextSplit {...textSplit}>
      <LogoGrid items={logoGrid} theme={textSplit.theme} />
    </TextSplit>
  )
}
