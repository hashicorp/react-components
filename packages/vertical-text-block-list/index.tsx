import classNames from 'classnames'
import LinkWrap from '@hashicorp/react-link-wrap'
import Image from '@hashicorp/react-image'
import useProductMeta, { Products } from '@hashicorp/platform-product-meta'
import s from './style.module.css'

interface VerticalTextBlockListProps {
  data: TextBlock[]
  product?: Products
  centerText?: boolean
  Link?: React.FC
  className?: string
}

type TextBlock = {
  header: string
  body: string
  linkUrl?: string
  logo?: {
    url: string
    alt: string
  }
}

export default function VerticalTextBlockList({
  data,
  product = 'hashicorp',
  centerText = false,
  Link,
  className,
}: VerticalTextBlockListProps): React.ReactElement {
  const { themeClass } = useProductMeta(product)
  return (
    <div className={classNames(className, themeClass)}>
      <ul
        className={classNames(s.list, { [s.centeredText]: centerText })}
        data-testid="item-list"
      >
        {data.map((item) => (
          <li key={item.body} className={s.listItem}>
            <MaybeLink
              className={s.maybeLink}
              link={item.linkUrl}
              LinkComponent={Link}
            >
              <div className={s.header} data-testid={`header-${item.header}`}>
                {item.logo ? (
                  <Image
                    {...item.logo}
                    alt={item.logo.alt || ''}
                    data-testid="img"
                  />
                ) : (
                  <h6 className="g-type-display-4" data-testid="text">
                    {item.header}
                  </h6>
                )}
              </div>
              <div
                className={s.bodyText}
                dangerouslySetInnerHTML={{
                  __html: item.body,
                }}
                data-testid={`body-text-${item.header}`}
              />
            </MaybeLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

// TODO: use `LinkWrap` interface once its in TS
interface MaybeLinkProps {
  children?: React.ReactNode
  className?: string
  link?: string
  LinkComponent?: React.FC
}

function MaybeLink({
  className,
  link,
  LinkComponent,
  children,
}: MaybeLinkProps): React.ReactElement {
  return link ? (
    <LinkWrap
      Link={LinkComponent}
      href={link}
      className={className}
      data-testid="link"
    >
      {children}
    </LinkWrap>
  ) : (
    <div className={className} data-testid="div">
      {children}
    </div>
  )
}
