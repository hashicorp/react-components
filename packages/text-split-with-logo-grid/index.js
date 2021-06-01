import TextSplit from '@hashicorp/react-text-split'
import Image from '@hashicorp/react-image'
import styles from './styles/text-split-with-logo-grid.module.css'

function parseLogoGridItems(items) {
  return items.map((item) => {
    const { linkUrl, url, ...restItemProps } = item
    const GridItem = () => <Image url={url} {...restItemProps} />
    return {
      linkUrl,
      GridItem,
    }
  })
}

function LogoGrid({ items, theme }) {
  const parsedItems = parseLogoGridItems(items)
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
        const { linkUrl, GridItem } = logoGridItem
        const ItemWrapper = linkUrl ? 'a' : 'div'
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={stableIdx} className={styles.gridItem}>
            <div className={styles.itemAspect}>
              <ItemWrapper
                href={linkUrl || undefined}
                className={styles.itemAspectInner}
                data-theme={theme}
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
