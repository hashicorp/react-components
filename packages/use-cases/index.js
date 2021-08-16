import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import Image from '@hashicorp/react-image'
import Arrow from './img/arrow.svg?include'
import fragment from './fragment.graphql'

function UseCases({ items }) {
  return (
    <div className="g-use-cases" data-testid="root">
      {items.map((item) => (
        <a
          className="use-case"
          href={item.link.url}
          {...(item.link.external && {
            rel: 'noopener',
            target: '_blank',
          })}
          key={item.title}
          data-testid={`anchor-${item.title}`}
        >
          <div className="content">
            {item.image && (
              <div className="icon">
                <Image
                  alt=""
                  data-testid={`image-${item.title}`}
                  {...item.image}
                />
              </div>
            )}
            <div className="text">
              <h3
                className="title g-type-display-4"
                data-testid={`title-${item.title}`}
              >
                {item.title}
              </h3>
              <div
                className="description g-type-body"
                dangerouslySetInnerHTML={{
                  __html: item.description ? item.description : '',
                }}
                data-testid={`description-${item.title}`}
              />
            </div>
          </div>
          <div
            className="faux-link g-type-buttons-and-standalone-links"
            data-testid={`faux-link-${item.title}`}
          >
            {item.link.title}
            <InlineSvg className="arrow" src={Arrow} />
          </div>
        </a>
      ))}
    </div>
  )
}

UseCases.fragmentSpec = { fragment, dependencies: [Image] }

export default UseCases
