import classNames from 'classnames'
import LinkWrap from '@hashicorp/react-link-wrap'
import Image from '@hashicorp/react-image'
import useProductMeta, { Products } from '@hashicorp/platform-product-meta'

interface VerticalTextBlockListProps {
  data: TextBlock[]
  product?: Products
  centerText?: boolean
  Link?: React.FC
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
}: VerticalTextBlockListProps) {
  const { themeClass } = useProductMeta(product)
  return (
    <div
      className={classNames('g-vertical-text-block-list', themeClass)}
      data-testid="root"
    >
      <ul
        className={classNames('list', { 'centered-text': centerText })}
        data-testid="item-list"
      >
        {data.map((item) => (
          <li key={item.body}>
            <MaybeLink link={item.linkUrl} LinkComponent={Link}>
              <div className="header" data-testid={`header-${item.header}`}>
                {item.logo ? (
                  <Image {...item.logo} data-testid="img" />
                ) : (
                  <h6 className="g-type-display-4" data-testid="text">
                    {item.header}
                  </h6>
                )}
              </div>
              <div
                className="body-text g-type-body-large"
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
  children: React.ReactNode
  link?: string
  LinkComponent?: React.FC
}

function MaybeLink({ link, LinkComponent, children }: MaybeLinkProps) {
  return link ? (
    <LinkWrap
      Link={LinkComponent}
      href={link}
      className="wrapper"
      data-testid="link"
    >
      {children}
    </LinkWrap>
  ) : (
    <div className="wrapper" data-testid="div">
      {children}
    </div>
  )
}
