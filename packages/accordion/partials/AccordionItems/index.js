import React, { useState } from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import SvgArrowDown from './icons/arrow-down.svg?include'
import classnames from 'classnames'
import Collapsible from '../Collapsible'
import s from './style.module.css'

function AccordionItem({ heading, children, isCollapsed, toggleCollapsed }) {
  return (
    <div className={s.accordionItem}>
      <button
        className={classnames(s.trigger, { [s.isCollapsed]: isCollapsed })}
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggleCollapsed}
      >
        <span className={s.triggerText}>{heading}</span>
        <span className={s.triggerIcon}>
          <InlineSvg src={SvgArrowDown} />
        </span>
      </button>
      <Collapsible isCollapsed={isCollapsed}>
        <div className={s.content}>{children}</div>
      </Collapsible>
    </div>
  )
}

function AccordionItems({ items, className, withTopBorder = true }) {
  const [expandedIdx, setExpandedIdx] = useState(null)

  return (
    <div
      className={classnames(s.root, className, {
        [s.withTopBorder]: withTopBorder,
      })}
    >
      {items.map((item, stableIdx) => {
        const isCollapsed = stableIdx !== expandedIdx

        const ItemContent =
          typeof item.content === 'string'
            ? () => (
                <div
                  className={s.htmlContent}
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
