import classNames from 'classnames'
import useProductMeta, { Products } from '@hashicorp/platform-product-meta'
import fragment from './fragment.graphql'
import s from './style.module.css'

function Alert({
  product,
  url,
  tag,
  text,
  state,
  textColor,
  className,
}: AlertProps): React.ReactElement {
  const { themeClass } = useProductMeta(product)
  return (
    <a
      href={url}
      className={classNames(
        s.alertRoot,
        themeClass,
        state ? s[state] : false,
        textColor ? s[textColor] : false,
        className
      )}
    >
      <span className="g-type-tag-label" data-testid="tag">
        {tag}
      </span>
      <p className="g-type-body-small" data-testid="text">
        {text}
        <ArrowIcon />
      </p>
    </a>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.5"
        y1="4.5"
        x2="13.5"
        y2="4.5"
        stroke="#000"
        strokeLinecap="round"
      />
      <path
        d="M10.3536 0.646447C10.1583 0.451184 9.84171 0.451184 9.64645 0.646447C9.45118 0.841709 9.45118 1.15829 9.64645 1.35355L10.3536 0.646447ZM13.5 4.5L13.8536 4.85355L14.2071 4.5L13.8536 4.14645L13.5 4.5ZM9.64645 7.64645C9.45118 7.84171 9.45118 8.15829 9.64645 8.35355C9.84171 8.54882 10.1583 8.54882 10.3536 8.35355L9.64645 7.64645ZM9.64645 1.35355L13.1464 4.85355L13.8536 4.14645L10.3536 0.646447L9.64645 1.35355ZM13.1464 4.14645L9.64645 7.64645L10.3536 8.35355L13.8536 4.85355L13.1464 4.14645Z"
        fill="#000"
      />
    </svg>
  )
}

Alert.fragmentSpec = { fragment }

export default Alert

interface AlertProps {
  product: Products
  url: string
  tag: string
  text: string
  state?: 'success' | 'warning' | 'error'
  textColor?: 'dark' | 'light'
  className?: string
}
