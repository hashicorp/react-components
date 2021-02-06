import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import TabTrigger from './partials/TabTrigger/index.js'
import SvgChevronRight from './icons/chevron-right_black.svg.js'
import smoothScroll from './helpers/smoothScroll.js'

class TabTriggers extends React.Component {
  constructor(props) {
    super(props)
    this.parentRef = React.createRef()
    this.handleResize = this.handleResize.bind(this)
    this.getScrollOffset = this.getScrollOffset.bind(this)
    this.updateScrollOffset = this.updateScrollOffset.bind(this)
  }

  componentWillUnmount() {
    const scrollWrapper = this.parentRef.current.querySelector('.inner')
    scrollWrapper.removeEventListener('scroll', this.handleResize)
    const windowElem = scrollWrapper.closest('html').parentNode.defaultView
    windowElem.removeEventListener('resize', this.handleResize)
  }

  componentDidMount() {
    this.handleResize()
    const scrollWrapper = this.parentRef.current.querySelector('.inner')
    scrollWrapper.addEventListener('scroll', this.handleResize)
    const windowElem = scrollWrapper.closest('html').parentNode.defaultView
    windowElem.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    const parentElem = this.parentRef.current
    const elems = {
      scrollWrapper: parentElem.querySelector('.inner'),
      sizeReference: parentElem.querySelector('.size-reference'),
      tabTriggers: parentElem.querySelectorAll('.g-tab-trigger'),
      prevArrow: parentElem.querySelector('.arrow.prev'),
      nextArrow: parentElem.querySelector('.arrow.next'),
    }
    //  Determine combined width of contained tabs
    let contentWidth = 0
    elems.tabTriggers.forEach((t) => (contentWidth += t.offsetWidth))
    //  Determine width of available space
    //  using the .g-grid-container.size-reference element
    const availableSpace = elems.sizeReference.offsetWidth
    //  If more content width than available space, set to overflow-friendly styling
    //  (note: overflow-friendly styling may not immediately cause actual overflow / scrolling,
    //  as it increases space for nav links slightly)
    const hasOverflow = contentWidth > availableSpace
    //  Add attribute to parent and scroll container
    parentElem.setAttribute('data-overflow', hasOverflow.toString())
    elems.scrollWrapper.setAttribute('data-overflow', hasOverflow.toString())
    //  Determine if there is area left to scroll,
    //  Set visibility of next / prev arrows based on that
    const scrollWidth = elems.scrollWrapper.scrollWidth
    const outerWidth = parentElem.offsetWidth
    const hidePrev = elems.scrollWrapper.scrollLeft === 0
    elems.prevArrow.setAttribute('data-overflow', hasOverflow.toString())
    elems.prevArrow.setAttribute('data-invisible', hidePrev.toString())
    const hideNext = elems.scrollWrapper.scrollLeft + outerWidth >= scrollWidth
    elems.nextArrow.setAttribute('data-overflow', hasOverflow.toString())
    elems.nextArrow.setAttribute('data-invisible', hideNext.toString())
  }

  updateScrollOffset(activeFilterIdx) {
    const newScrollLeft = this.getScrollOffset(activeFilterIdx)
    const scrollWrapper = this.parentRef.current.querySelector('.inner')
    const windowElem = scrollWrapper.closest('html').parentNode.defaultView
    smoothScroll(windowElem, scrollWrapper, { x: newScrollLeft })
    this.setState({ activeIdx: activeFilterIdx })
  }

  getScrollOffset(targetIdx) {
    if (targetIdx === 0) return -1 // Scroll to start of container
    const scrollWrapper = this.parentRef.current.querySelector('.inner')
    const targetSelector = `.g-tab-trigger[data-tabindex='${targetIdx}']`
    const targetElem = scrollWrapper.querySelector(targetSelector)
    const targetMidpoint = targetElem.offsetLeft + targetElem.offsetWidth / 2
    const newScrollLeft = targetMidpoint - scrollWrapper.offsetWidth / 2
    return newScrollLeft
  }

  render() {
    const { tabs, activeTabIdx, setActiveTab } = this.props

    return (
      <div className="g-tab-triggers" ref={this.parentRef}>
        <div className="g-grid-container">
          <div className="size-reference"></div>
        </div>
        <div className="inner-wrapper">
          <div className="inner">
            <div className="content-container g-grid-container">
              <div className="tooltip-space-overflow">
                {tabs.map((tab, stableIdx) => (
                  <TabTrigger
                    // This array is stable, so we can use index as key
                    // eslint-disable-next-line react/no-array-index-key
                    key={stableIdx}
                    activeTabIdx={activeTabIdx}
                    setActiveTab={(targetIdx, groupId) => {
                      setActiveTab(targetIdx, groupId)
                      this.updateScrollOffset(targetIdx)
                    }}
                    tab={tab}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="arrow prev"
            onClick={() => {
              if (activeTabIdx > 0) {
                setActiveTab(activeTabIdx - 1, tabs[activeTabIdx - 1].group)
                this.updateScrollOffset(activeTabIdx - 1)
              } else {
                this.updateScrollOffset(activeTabIdx)
              }
            }}
          >
            <InlineSvg src={SvgChevronRight} />
          </div>
          <div
            className="arrow next"
            onClick={() => {
              if (activeTabIdx < tabs.length - 1) {
                setActiveTab(activeTabIdx + 1, tabs[activeTabIdx + 1].group)
                this.updateScrollOffset(activeTabIdx + 1)
              } else {
                this.updateScrollOffset(activeTabIdx)
              }
            }}
          >
            <InlineSvg src={SvgChevronRight} />
          </div>
        </div>
        <div className="g-grid-container">
          <div className="bottom-border default"></div>
        </div>
        <div className="bottom-border for-overflow"></div>
      </div>
    )
  }
}

export default TabTriggers
