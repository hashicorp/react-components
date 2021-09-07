import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import Image from '@hashicorp/react-image'
import Arrow from './img/arrow.svg?include'
import s from './style.module.css'
import fragment from './fragment.graphql'
import classNames from 'classnames'

function UseCases({ items, className }) {
  return (
    <div className={classNames(s.root, className)}>
      {items.map((item) => (
        <a
          className={s.useCase}
          href={item.link.url}
          {...(item.link.external && {
            rel: 'noopener',
            target: '_blank',
          })}
          key={item.title}
          data-testid={`anchor-${item.title}`}
        >
          <div className={s.content}>
            {item.image && (
              <div className={s.icon}>
                <Image
                  alt=""
                  data-testid={`image-${item.title}`}
                  {...item.image}
                />
              </div>
            )}
            <div className={s.text}>
              <h3 className={s.title} data-testid={`title-${item.title}`}>
                {item.title}
              </h3>
              <div
                className="g-type-body"
                dangerouslySetInnerHTML={{
                  __html: item.description ? item.description : '',
                }}
                data-testid={`description-${item.title}`}
              />
            </div>
          </div>
          <div className={s.fauxLink} data-testid={`faux-link-${item.title}`}>
            {item.link.title}
            <InlineSvg className={s.fauxLinkArrow} src={Arrow} />
          </div>
        </a>
      ))}
    </div>
  )
}

UseCases.fragmentSpec = { fragment, dependencies: [Image] }

export default UseCases
