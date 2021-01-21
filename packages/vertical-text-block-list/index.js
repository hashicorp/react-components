import LinkWrap from '@hashicorp/react-link-wrap'
import Image from '@hashicorp/react-image'

export default function VerticalTextBlockList({ data, centerText, Link }) {
  return (
    <div className="g-vertical-text-block-list" data-testid="root">
      <ul
        className={`list${centerText ? ' centered-text' : ''}`}
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

function MaybeLink({ link, LinkComponent, children }) {
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
