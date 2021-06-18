import { useSkipLinkContext } from './context'
import s from './style.module.css'

/**
 * This component allows folks using assistive technology to
 * skip to the main content on the page, past navigation and other alert UI
 *
 * This component can accept an anchor id as a string or can pull the
 * id from context. This can be helpful if the main content is buried deep within the
 * page because the <SkipLink /> should be rendered in the beginning of the `body`,
 * it's best to be the first thing folks can tab to.
 *
 */

interface SkipLinkProps {
  anchorId?: string // just in string format, without the # id signature
}

export default function SkipLink({ anchorId }: SkipLinkProps) {
  const context = useSkipLinkContext()
  const mainAnchorTarget = context?.mainTargetId || anchorId

  return (
    <>
      {mainAnchorTarget ? (
        <a href={`#${mainAnchorTarget}`} className={s.skipLink}>
          Skip to main content
        </a>
      ) : null}
    </>
  )
}
