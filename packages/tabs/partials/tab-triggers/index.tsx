import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import InlineSvg from '@hashicorp/react-inline-svg'
import TabTrigger, { TabTriggerType } from '../tab-trigger'
import SvgChevronRight from '../../icons/chevron-right.svg?include'
import smoothScroll from '../../utils/smooth-scroll.js'
import useWindowSize from '../../hooks/use-window-size'
import useScrollLeft from '../../hooks/use-scroll-left'
import s from './style.module.css'

interface TabTriggersProps {
  tabs: TabTriggerType[]
  className?: string
  activeTabIdx: number
  setActiveTab: (tabIndex: number, tabGroup?: string) => void
  centered: boolean
  fullWidthBorder: boolean
  theme: 'light' | 'dark'
}

function TabTriggers({
  tabs,
  activeTabIdx,
  setActiveTab,
  centered,
  fullWidthBorder,
  className,
  theme = 'light',
}: TabTriggersProps): React.ReactElement {
  const overflowBaseRef = useRef<HTMLDivElement>(null)
  const overflowContentRef = useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()
  const [scrollRef, scrollLeft] = useScrollLeft<HTMLDivElement>()
  const [hiddenArrows, setHiddenArrows] = useState({
    prev: true,
    next: true,
  })
  const [hasOverflow, setHasOverflow] = useState(false)

  /**
   * update hasOverflow when window is resized
   */
  useEffect(() => {
    //  If content width exceeds available space,
    //  set to overflow-friendly styling
    if (overflowContentRef.current && overflowBaseRef.current) {
      const contentWidth = overflowContentRef.current.offsetWidth
      const availableSpace = overflowBaseRef.current.offsetWidth
      setHasOverflow(contentWidth > availableSpace)
    }
  }, [scrollRef, windowSize])

  /**
   * update visibility of next & prev arrows.
   *
   * depends on both scroll position, as
   * fully scrolling to one end should hide
   * the arrow at that end of the container,
   *
   * and depends on window size, as
   * window size changes can affect both
   * overflow and scroll position
   */
  useEffect(() => {
    // Determine which arrows to show
    const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current!
    const maxScrollLeft = scrollWidth - offsetWidth
    const hidePrev = scrollLeft === 0
    const hideNext = scrollLeft >= maxScrollLeft
    setHiddenArrows({ prev: hidePrev, next: hideNext })
  }, [scrollLeft, scrollRef, windowSize])

  /**
   * smooth scroll to the active tab.
   * this is done both when the activeTabIdx updates,
   * and when the next or previous arrow is clicked but
   * does not cause an activeTabIdx update
   */
  const updateScrollOffset = useCallback(
    (targetTabIdx) => {
      const scrollElem = scrollRef.current
      if (scrollElem) {
        // Determine where to scroll to
        let newScrollLeft
        if (targetTabIdx === 0) {
          // If first tab, scroll to start of container
          newScrollLeft = -1
        } else {
          // Otherwise, calculate the midpoint of the active tab trigger
          const targetSelector = `[data-tabindex='${targetTabIdx}']`
          const targetElem = scrollElem.querySelector(
            targetSelector
          ) as HTMLElement | null
          if (targetElem) {
            const targetMidpoint =
              targetElem.offsetLeft + targetElem.offsetWidth / 2
            newScrollLeft = targetMidpoint - scrollElem.offsetWidth / 2
          }
        }
        // Update the scroll position
        const windowElem = (scrollElem.closest('html')!.parentNode! as Document)
          .defaultView
        smoothScroll(windowElem, scrollElem, { x: newScrollLeft })
      }
    },
    [scrollRef]
  )

  /**
   * automatically smoothly scroll to center
   * the active tab in the scroll-able area
   */
  useEffect(() => {
    if (!hasOverflow) return
    updateScrollOffset(activeTabIdx)
  }, [hasOverflow, activeTabIdx, updateScrollOffset, scrollRef])

  return (
    <div
      className={classNames(s.root, className, {
        [s.fullWidthBorder]: fullWidthBorder,
      })}
    >
      <div className="g-grid-container">
        {/* Note: the overflowBaseRef element has zero height, but is still "visible".
            It is used to determine when tabs are overflowing, and updates hasOverflow */}
        <div ref={overflowBaseRef}></div>
      </div>
      <div className={s.borderAdjuster}>
        <NextPrevScrims hasOverflow={hasOverflow} hiddenArrows={hiddenArrows} />
        <div
          className={classNames(s.scrollContainer, {
            [s.centered]: centered,
            [s.hasOverflow]: hasOverflow,
          })}
          ref={scrollRef}
        >
          <div
            className={classNames(s.tabsWidthContainer, {
              [s.centered]: centered,
              [s.hasOverflow]: hasOverflow,
            })}
            ref={overflowContentRef}
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
                theme={theme}
              />
            ))}
          </div>
        </div>
        <NextPrevArrows
          hasOverflow={hasOverflow}
          hiddenArrows={hiddenArrows}
          onPrev={() => {
            const target = activeTabIdx - 1
            if (target >= 0) {
              setActiveTab(target, tabs[target].group)
            } else {
              updateScrollOffset(activeTabIdx)
            }
          }}
          onNext={() => {
            const target = activeTabIdx + 1
            if (target < tabs.length) {
              setActiveTab(target, tabs[target].group)
            } else {
              updateScrollOffset(activeTabIdx)
            }
          }}
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

function NextPrevArrows({ hasOverflow, hiddenArrows, onPrev, onNext }) {
  return (
    <>
      <div
        className={classNames(s.prevArrow, {
          [s.hasOverflow]: hasOverflow,
          [s.hidden]: hiddenArrows.prev,
        })}
        onClick={onPrev}
      >
        <InlineSvg src={SvgChevronRight} />
      </div>
      <div
        className={classNames(s.nextArrow, {
          [s.hasOverflow]: hasOverflow,
          [s.hidden]: hiddenArrows.next,
        })}
        onClick={onNext}
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
