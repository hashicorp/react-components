//  Given:
//  - window (Window)
//  - elem (target elem to scroll) (HTML Element)
//  - targetPosition {x: number, y: number}
//  - options {speedPxPerSecond: number, minDuration: number}
//  Animate scroll on provided `elem` as follows:
//  1. Determine target distance change, using current and target positions passed
//     Determine target duration of scroll animation, using minDuration and speedPxPerSecond
//  2. Set startTime of animation using current millis.
//  3. Request animation frame for step update
//  4. On step update, calculate elapsed time (t) - currentMillis - startTime
//     Plug t, startPosn, distance, and duration into easeFunction to determine current position.
//     Update scroll position of target element (X and Y)
//     Request another animation frame
//     Repeat step 3 & 4 until animation is complete

function smoothScroll(window, elem, targetPosnInput, optionsIn) {
  const elemIsWindow = elem.toString() === '[object Window]'

  //  Parse options or fall back to defaults
  const options = {
    speedPxPerSecond: (optionsIn && optionsIn.speedPxPerSecond) || 900,
    minDuration: (optionsIn && optionsIn.minDuration) || 200,
    maxDuration: (optionsIn && optionsIn.maxDuration) || 600,
  }
  const { speedPxPerSecond, minDuration, maxDuration } = options
  //  Determine target distance change, using current and target positions passed
  const startPosn = {
    x: elemIsWindow ? elem.scrollX : elem.scrollLeft,
    y: elemIsWindow ? elem.scrollY : elem.scrollTop,
  }
  const targetPosn = {
    x: targetPosnInput.x || startPosn.x,
    y: targetPosnInput.y || startPosn.y,
  }
  const { x, y } = targetPosn
  const deltaX = x - startPosn.x
  const deltaY = y - startPosn.y
  //  Determine target duration of scroll animation, using minDuration and speedPxPerSecond
  const durationCalc =
    (Math.max(Math.abs(deltaX), Math.abs(deltaY)) * 1000) / speedPxPerSecond
  //  Account for minDuration option
  const duration = Math.min(Math.max(durationCalc, minDuration), maxDuration)
  //  Set startTime of animation using current millis.
  const startTime = Date.now()
  //  Define step function
  function smoothScrollStep() {
    const elapsedTime = Date.now() - startTime
    const atEnd = elapsedTime >= duration
    const targetXPosn = atEnd
      ? startPosn.x + deltaX
      : easeInOutQuad(elapsedTime, startPosn.x, deltaX, duration)
    const targetYPosn = atEnd
      ? startPosn.y + deltaY
      : easeInOutQuad(elapsedTime, startPosn.y, deltaY, duration)
    if (elemIsWindow) {
      elem.scroll(targetXPosn, targetYPosn)
    } else {
      elem.scrollLeft = targetXPosn
      elem.scrollTop = targetYPosn
    }
    if (!atEnd) {
      window.requestAnimationFrame(smoothScrollStep)
    }
  }
  //  Request animation frame for initial step
  window.requestAnimationFrame(smoothScrollStep)
}

//  From https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
//  t: current time, b: begInnIng value, c: change In value, d: duration
const easeInOutQuad = function (t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}

export default smoothScroll
