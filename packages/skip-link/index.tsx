import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import s from './style.module.css'

/**
 * This component allows folks using assistive technology to
 * skip to the main content on the page, past navigation and other alert UI
 *
 * This component can accept an anchor id as a string to create the link to the page's main content.
 * This can be helpful if the main content is buried deep within the
 * page. The <SkipLink /> should be rendered in the beginning of the `body`, to be the first element in tab order.
 *
 * Therefore you should set your target element for <SkipLink />'s portal just beneath the opening <body> tag (place this in `_document.js`).
 *
 *
 */

interface SkipLinkProps {
  anchorId: string // just in string format, without the # id signature
  portalTargetSelector?: string
}

export default function SkipLink({
  anchorId,
  portalTargetSelector,
}: SkipLinkProps) {
  const isClientside = typeof window !== 'undefined'
  if (!anchorId) {
    throw Error(
      'Error: <SkipLink /> missing `anchorId`. Pass the id for the main content of the page.'
    )
  }
  if (!portalTargetSelector) {
    console.warn(
      'Warning: <SkipLink /> missing `portalTargetSelector`. Pass the querySelector for the intended parent element for <SkipLink />.'
    )
  }
  const portalContainer =
    isClientside && document?.querySelector(portalTargetSelector)

  if (!isClientside || !anchorId || !portalContainer) return null

  return createPortal(
    <a href={`#${anchorId}`} className={s.skipLink}>
      Skip to main content
    </a>,
    portalContainer
  )
}
