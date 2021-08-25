import React, { useCallback, useRef, useState } from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import TabTrigger from '../tab-trigger/index.js'
import SvgChevronRight from '../../icons/chevron-right.svg?include'
import smoothScroll from './helpers/smooth-scroll.js'
import classNames from 'classnames'
import s from './style.module.css'
import useWindowSize from '../../hooks/use-window-size'
import useScroll from '../../hooks/use-scroll-data'
import { useEffect } from 'react'

function TabTriggers({
  tabs,
  activeTabIdx,
  setActiveTab,
  centered,
  fullWidthBorder,
}) {
  // const tabTriggerParentRef = useRef()
  const sizeReferenceRef = useRef()
  const parentRef = useRef()
  // const scrollRef = useRef()
  const windowSize = useWindowSize()
  const [scrollRef, { scrollLeft }] = useScroll()
  const [hiddenArrows, setHiddenArrows] = useState({
    prev: true,
    next: true,
  })
  const [hasOverflow, setHasOverflow] = useState(false)

  /* handle resize and other changes */
  useEffect(() => {
    //  Determine combined width of contained tabs
    let contentWidth = 0
    const tabTriggers = scrollRef.current.children
    tabTriggers.forEach((t) => (contentWidth += t.offsetWidth))
    //  Determine width of available space
    //  using the .g-grid-container .size-reference element
    const availableSpace = sizeReferenceRef.current.offsetWidth
    //  If more content width than available space, set to overflow-friendly styling
    //  (note: overflow-friendly styling may not immediately cause actual overflow / scrolling,
    //  as it increases space for nav links slightly)
    setHasOverflow(contentWidth > availableSpace)
  }, [scrollRef, windowSize])

  /* hide next / prev arrows as needed if
  fully scrolled to one end or the other */
  useEffect(() => {
    const scrollElem = scrollRef.current
    const parentWidth = parentRef.current.offsetWidth
    setHiddenArrows({
      prev: scrollElem.scrollLeft === 0,
      next: scrollElem.scrollLeft + parentWidth >= scrollElem.scrollWidth,
    })
  }, [scrollLeft, scrollRef])

  /* automatically smoothly scroll to 
  center a tab in the scrollable area as needed */
  useEffect(() => {
    if (!hasOverflow) return null
    updateScrollOffset(activeTabIdx)
  }, [hasOverflow, activeTabIdx, updateScrollOffset, scrollRef])

  /* allow smooth scrolling to the active tab.
  used both when the activeTabIdx updates, and
  when the next or previous arrow is clicked but
  does not cause an activeTabIdx update */
  const updateScrollOffset = useCallback(
    (targetTabIdx) => {
      let newScrollLeft
      // If first tab, scroll to start of container.
      // Otherwise, calculate the midpoint of the
      // active tab trigger
      if (targetTabIdx === 0) {
        newScrollLeft = -1
      } else {
        const targetSelector = `[data-tabindex='${targetTabIdx}']`
        const targetElem = scrollRef.current.querySelector(targetSelector)
        const targetMidpoint =
          targetElem.offsetLeft + targetElem.offsetWidth / 2
        newScrollLeft = targetMidpoint - scrollRef.current.offsetWidth / 2
      }
      console.log({ scrollLeft, newScrollLeft })
      const windowElem = scrollRef.current.closest('html').parentNode
        .defaultView
      smoothScroll(windowElem, scrollRef.current, { x: newScrollLeft })
    },
    [scrollLeft, scrollRef]
  )

  return (
    <div
      className={classNames(s.root, { [s.fullWidthBorder]: fullWidthBorder })}
      ref={parentRef}
    >
      <div className="g-grid-container">
        {/* Note: the sizeReference element has zero height, but is still "visible".
     Its width is used to determine when to use [data-overflow='true']  */}
        <div ref={sizeReferenceRef}></div>
      </div>
      <div className={s.innerWrapper}>
        <div className={s.inner}>
          <div className={s.contentContainer}>
            <div
              className={classNames(s.tooltipSpaceOverflow, {
                [s.centered]: centered,
                [s.hasOverflow]: hasOverflow,
              })}
              ref={scrollRef}
            >
              {tabs.map((tab, stableIdx) => (
                <TabTrigger
                  // This array is stable, so we can use index as key
                  // eslint-disable-next-line react/no-array-index-key
                  key={stableIdx}
                  hasOverflow={hasOverflow}
                  activeTabIdx={activeTabIdx}
                  setActiveTab={(targetIdx, groupId) => {
                    setActiveTab(targetIdx, groupId)
                    updateScrollOffset(targetIdx)
                  }}
                  tab={tab}
                />
              ))}
            </div>
          </div>
        </div>
        {/* TODO: Move arrow scrims within a g-grid-container,
        to ensure they mask the area where tab overflow is happening. */}
        <div
          className={classNames(s.arrow, s.prevArrow, {
            [s.hasOverflow]: hasOverflow,
            [s.hidden]: hiddenArrows.prev,
          })}
          onClick={() => {
            if (activeTabIdx > 0) {
              setActiveTab(activeTabIdx - 1, tabs[activeTabIdx - 1].group)
            } else {
              updateScrollOffset(activeTabIdx)
            }
          }}
        >
          <InlineSvg src={SvgChevronRight} />
        </div>
        <div
          className={classNames(s.arrow, s.nextArrow, {
            [s.hasOverflow]: hasOverflow,
            [s.hidden]: hiddenArrows.next,
          })}
          onClick={() => {
            if (activeTabIdx < tabs.length - 1) {
              setActiveTab(activeTabIdx + 1, tabs[activeTabIdx + 1].group)
            } else {
              updateScrollOffset(activeTabIdx)
            }
          }}
        >
          <InlineSvg src={SvgChevronRight} />
        </div>
      </div>
      <div className="g-grid-container">
        <div
          className={classNames(s.bottomBorder, s.forDefault, {
            [s.hasOverflow]: hasOverflow,
            [s.fullWidthBorder]: fullWidthBorder,
          })}
        ></div>
      </div>
      <div
        className={classNames(s.bottomBorder, s.forOverflow, {
          [s.hasOverflow]: hasOverflow,
          [s.fullWidthBorder]: fullWidthBorder,
        })}
      ></div>
    </div>
  )
}

export default TabTriggers
