import React, { useState } from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import SvgArrowDown from './icons/arrow-down.svg?include'

import Collapsible from '../Collapsible'

function AccordionItem({ heading, children, isCollapsed, toggleCollapsed }) {
  return (
    <div className="g-accordion-item">
      <button
        className="trigger g-type-body-strong"
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggleCollapsed}
      >
        <span className="text">{heading}</span>
        <span className={`icon ${!isCollapsed ? 'expanded' : ''}`}>
          <InlineSvg src={SvgArrowDown} />
        </span>
      </button>
      <Collapsible isCollapsed={isCollapsed}>
        <div className="content">{children}</div>
      </Collapsible>
    </div>
  )
}

function AccordionItems({ items }) {
  const [expandedIdx, setExpandedIdx] = useState(null)

  return (
    <div className="g-accordion-items">
      {items.map((item, stableIdx) => {
        const isCollapsed = stableIdx !== expandedIdx

        const ItemContent =
          typeof item.content === 'string'
            ? () => (
                <div
                  className="html-content"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )
            : item.content

        return (
          <AccordionItem
            // eslint-disable-next-line react/no-array-index-key
            key={stableIdx}
            heading={item.heading}
            isCollapsed={isCollapsed}
            toggleCollapsed={() =>
              setExpandedIdx(isCollapsed ? stableIdx : null)
            }
          >
            <ItemContent />
          </AccordionItem>
        )
      })}
    </div>
  )
}

export default AccordionItems
export { AccordionItem }
