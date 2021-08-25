import React, { useCallback, useRef, useState } from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import TabTrigger, { TabTriggerType } from '../tab-trigger/index'
import SvgChevronRight from '../../icons/chevron-right.svg?include'
import smoothScroll from './helpers/smooth-scroll.js'
import classNames from 'classnames'
import s from './style.module.css'
import useWindowSize from '../../hooks/use-window-size'
import useScrollLeft from '../../hooks/use-scroll-left'
import { useEffect } from 'react'

interface TabTriggersProps {
  tabs: TabTriggerType[]
  activeTabIdx: number
  setActiveTab: (tabIndex: number, tabGroup?: string) => void
  centered: boolean
  fullWidthBorder: boolean
}

function TabTriggers({
  tabs,
  activeTabIdx,
  setActiveTab,
  centered,
  fullWidthBorder,
}: TabTriggersProps): React.ReactElement {
  // const tabTriggerParentRef = useRef()
  const sizeReferenceRef = useRef()
  const parentRef = useRef()
  // const scrollRef = useRef()
  const windowSize = useWindowSize()
  const [scrollRef, scrollLeft] = useScrollLeft()
  const [hiddenArrows, setHiddenArrows] = useState({
    prev: true,
    next: true,
  })
  const [hasOverflow, setHasOverflow] = useState(false)

  /**
   * handle resize and other changes
   */
  useEffect(() => {
    // Ensure refs are defined
    const scrollElem = scrollRef.current || null
    const sizeReferenceElem = parentRef.current || null
    if (!scrollElem || !sizeReferenceElem) return null
    //  Determine combined width of contained tabs
    let contentWidth = 0
    const tabTriggers = scrollElem.children
    tabTriggers.forEach((t) => (contentWidth += t.offsetWidth))
    //  Determine width of available space
    //  using the .g-grid-container .size-reference element
    const availableSpace = sizeReferenceElem.offsetWidth
    //  If more content width than available space, set to overflow-friendly styling
    //  (note: overflow-friendly styling may not immediately cause actual overflow / scrolling,
    //  as it increases space for nav links slightly)
    setHasOverflow(contentWidth > availableSpace)
  }, [scrollRef, windowSize])

  /**
   * hide next / prev arrows as needed if
   * fully scrolled to one end or the other
   */
  useEffect(() => {
    // Ensure refs are defined
    const scrollElem = scrollRef.current || null
    const parentElem = parentRef.current || null
    if (!scrollElem || !parentElem) return null
    setHiddenArrows({
      prev: scrollElem.scrollLeft === 0,
      next:
        scrollElem.scrollLeft + parentElem.offsetWidth >=
        scrollElem.scrollWidth,
    })
  }, [scrollLeft, scrollRef])

  /**
   * smooth scroll to the active tab.
   * this is done both when the activeTabIdx updates,
   * and when the next or previous arrow is clicked but
   * does not cause an activeTabIdx update
   */
  const updateScrollOffset = useCallback(
    (targetTabIdx) => {
      // Ensure refs are defined
      const scrollElem = scrollRef.current || null
      if (!scrollElem) return null
      // Determine where to scroll to
      let newScrollLeft
      if (targetTabIdx === 0) {
        // If first tab, scroll to start of container
        newScrollLeft = -1
      } else {
        // Otherwise, calculate the midpoint of the active tab trigger
        const targetSelector = `[data-tabindex='${targetTabIdx}']`
        const targetElem = scrollElem.querySelector(targetSelector)
        const targetMidpoint =
          targetElem.offsetLeft + targetElem.offsetWidth / 2
        newScrollLeft = targetMidpoint - scrollElem.offsetWidth / 2
      }
      // Update the scroll position
      const windowElem = scrollElem.closest('html').parentNode.defaultView
      smoothScroll(windowElem, scrollElem, { x: newScrollLeft })
    },
    [scrollRef]
  )

  /**
   * automatically smoothly scroll to center
   * the active tab in the scroll-able area
   */
  useEffect(() => {
    if (!hasOverflow) return null
    updateScrollOffset(activeTabIdx)
  }, [hasOverflow, activeTabIdx, updateScrollOffset, scrollRef])

  return (
    <div
      className={classNames(s.root, { [s.fullWidthBorder]: fullWidthBorder })}
      ref={parentRef}
    >
      <div className="g-grid-container">
        {/* Note: the sizeReference element has zero height, but is still "visible".
            It is used to determine when tabs are overflowing, and updates hasOverflow */}
        <div ref={sizeReferenceRef}></div>
      </div>
      <div className={s.borderAdjuster}>
        <div className={s.inner}>
          <div className={s.tabsContainer}>
            <NextPrevScrims
              hasOverflow={hasOverflow}
              hiddenArrows={hiddenArrows}
            />
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
        <NextPrevArrows
          tabs={tabs}
          hasOverflow={hasOverflow}
          hiddenArrows={hiddenArrows}
          activeTabIdx={activeTabIdx}
          setActiveTab={setActiveTab}
          updateScrollOffset={updateScrollOffset}
        />
      </div>
      <BottomBorder
        hasOverflow={hasOverflow}
        fullWidthBorder={fullWidthBorder}
      />
    </div>
  )
}

function NextPrevScrims({ hasOverflow, hiddenArrows }) {
  return (
    <div className={s.scrimContainer}>
      <div
        className={classNames(s.prevArrowScrim, {
          [s.hasOverflow]: hasOverflow,
          [s.hidden]: hiddenArrows.prev,
        })}
      />
      <div
        className={classNames(s.nextArrowScrim, {
          [s.hasOverflow]: hasOverflow,
          [s.hidden]: hiddenArrows.next,
        })}
      />
    </div>
  )
}

function NextPrevArrows({
  tabs,
  hasOverflow,
  hiddenArrows,
  activeTabIdx,
  setActiveTab,
  updateScrollOffset,
}) {
  return (
    <>
      <div
        className={classNames(s.prevArrow, {
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
        className={classNames(s.nextArrow, {
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
    </>
  )
}

function BottomBorder({ hasOverflow, fullWidthBorder }) {
  return (
    <>
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
    </>
  )
}

export default TabTriggers
