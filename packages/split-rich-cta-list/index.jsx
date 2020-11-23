import Link from 'next/link'
import classNames from 'classnames'
import InlineSvg from '@hashicorp/react-inline-svg'
import LinkWrap from '@hashicorp/react-link-wrap'
import RightArrow from './img/arrow-right.svg?include'
import styles from './styles.module.css'

export default function SplitRichCTAList({className, brand, title, items}) {
  return (
    <div className={classNames(styles.splitRichCTAList, className)}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li>
            <LinkWrap
              Link={Link}
              key={item.title}
              href={item.linkUrl}
              className={styles.item}
            >
              <InlineSvg className={styles.icon} src={item.icon} />
              <div className={styles.text}>
                <h5 className={styles[brand]}>{item.title}</h5>
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
