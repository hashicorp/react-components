import Link from 'next/link'
import classNames from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import LinkWrap from '@hashicorp/react-link-wrap'
import RightArrow from './img/arrow-right.svg?include'
import styles from './styles.module.css'

export default function SplitRichCTAList({
  className,
  product,
  heading,
  items,
}) {
  const { themeClass } = useProductMeta(product)
  return (
    <div className={classNames(styles.splitRichCTAList, className, themeClass)}>
      <h3>{heading}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <LinkWrap Link={Link} href={item.linkUrl} className={styles.item}>
              <InlineSvg className={styles.icon} src={item.icon} />
              <div className={styles.text}>
                <h5>{item.title}</h5>
                <p className={styles.bodySmall}>{item.description}</p>
              </div>
              <InlineSvg className={styles.arrow} src={RightArrow} />
            </LinkWrap>
          </li>
        ))}
      </ul>
    </div>
  )
}
