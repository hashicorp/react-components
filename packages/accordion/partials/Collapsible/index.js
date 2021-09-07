import React, { useRef, useEffect } from 'react'
import s from './style.module.css'

/*
  Collapsible content block, receives children and a `isCollapsed` prop,
  smoothly animates from collapsed (height 0) to expanded (height auto)
  when its incoming `isCollapsed` prop is changed
*/

function Collapsible({ isCollapsed, children }) {
  const parentElem = useRef(null)

  useEffect(() => {
    cleanupTransition(parentElem.current)
  }, [parentElem.current])

  useEffect(() => {
    adjustHeight(isCollapsed, parentElem)
  }, [isCollapsed])

  return (
    <div className={s.root} ref={parentElem}>
      <div className={s.inner} data-is-collapsed={isCollapsed}>
        {children}
      </div>
    </div>
  )
}

function adjustHeight(isCollapsed, parentElemRef) {
  const elem = parentElemRef.current
  if (!elem || !(elem instanceof Element)) return
  const innerElem = elem.firstChild
  const computedStyle = getComputedStyle(elem)
  if (isCollapsed) {
    //  Transition from auto to 0
    innerElem.style.opacity = 0
    elem.style.height = computedStyle.height // set to px height, not auto
    elem.offsetHeight // force repaint
    elem.style.height = '0px' // trigger the current px height >> 0px transition
  } else {
    //  Transition from 0 to auto
    innerElem.style.opacity = 1
    innerElem.style.display = 'block'
    const currentHeight = computedStyle.height // save current height
    elem.style.height = 'auto' // briefly set auto height to calc end height
    const endHeight = computedStyle.height // save end height
    if (endHeight !== currentHeight) {
      //  Only run the height animation if it'll actually transition,
      //  if the values are the same, then `transitionEnd` won't be called,
      //  and the height will become set to a fixed `endHeight` rather than auto
      elem.style.height = currentHeight // reset height before animating
      elem.offsetHeight // force repaint
      elem.style.height = endHeight // trigger the current px >> end px transition
    }
  }
  //  Handle transition end sets height back to auto as appropriate
  elem.addEventListener('transitionend', handleTransitionEnd, false)
}

function handleTransitionEnd(event) {
  if (event.propertyName !== 'height') return
  const elem = event.target
  cleanupTransition(elem)
  elem.removeEventListener('transitionend', handleTransitionEnd, false)
}

function cleanupTransition(elem) {
  if (!elem || !(elem instanceof Element)) return
  const computedStyle = getComputedStyle(elem)
  const innerElem = elem.firstChild
  const innerElemStyle = getComputedStyle(innerElem)
  const isCollapsed = computedStyle.height === '0px'
  if (isCollapsed) {
    innerElem.style.display = 'none'
    //  Transition delay modifications allow expected difference in collapse and expanding animation sequence
    const heightDrtn = parseFloat(computedStyle['transition-duration'])
    const opacityDrtn = parseFloat(innerElemStyle['transition-duration'])
    if (heightDrtn && opacityDrtn) {
      innerElem.style.transitionDelay = `${heightDrtn - opacityDrtn}s`
    }
  } else {
    elem.style.height = 'auto'
    innerElem.style.transitionDelay = '0s'
  }
}

export default Collapsible
