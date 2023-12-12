/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React, { useState } from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import Collapsible from '../Collapsible'
import SvgArrowDown from './icons/arrow-down.svg'
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
          <Image alt="" {...SvgArrowDown} />
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
