import { default as reactHotToast } from 'react-hot-toast'
import type { NotificationProps } from 'packages/notification/types'
import type {
  NotificationWithLanguageProps,
  NotificationWithProductProps,
  NotificationWithResourceProps,
  NotificationWithThumbnailProps,
} from 'packages/notification/types'
import Notification from 'packages/notification'
import {
  NotificationWithLanguage,
  NotificationWithProduct,
  NotificationWithResource,
  NotificationWithThumbnail,
} from 'packages/notification'

type ToastProps = Exclude<NotificationProps, 'onDimiss'>

const toast = ({ description, cta }: ToastProps) => {
  return reactHotToast((t) => {
    return (
      <Notification
        description={description}
        cta={cta}
        onDismiss={() => reactHotToast.remove(t.id)}
      />
    )
  })
}

/**
 * Toast with language
 * @description renders a toast notification with an associated countries flag
 */

type ToastWithLanguageProps = Exclude<
  NotificationWithLanguageProps,
  'onDismiss'
>

const toastWithLanguage = ({
  language,
  description,
  cta,
}: ToastWithLanguageProps) => {
  return reactHotToast((t) => {
    return (
      <NotificationWithLanguage
        language={language}
        description={description}
        cta={cta}
        onDismiss={() => reactHotToast.remove(t.id)}
      />
    )
  })
}

/**
 * Toast with product
 * @description renders a toast notification with a product icon and name
 */

type ToastWithProductProps = Exclude<NotificationWithProductProps, 'onDismiss'>

const toastWithProduct = ({
  product,
  description,
  cta,
}: ToastWithProductProps) => {
  return reactHotToast((t) => {
    return (
      <NotificationWithProduct
        product={product}
        description={description}
        cta={cta}
        onDismiss={() => reactHotToast.remove(t.id)}
      />
    )
  })
}

/**
 * Toast with resource
 * @description renders a toast notification with a predefined resource type
 */

type ToastWithResourceProps = Exclude<
  NotificationWithResourceProps,
  'onDismiss'
>

const toastWithResource = ({
  type,
  description,
  cta,
}: ToastWithResourceProps) => {
  return reactHotToast((t) => {
    return (
      <NotificationWithResource
        type={type}
        description={description}
        cta={cta}
        onDismiss={() => reactHotToast.remove(t.id)}
      />
    )
  })
}

/**
 * Toast with thumbnail
 * @description renders a toast notification with a 4/3 ratio thumbnail
 */

type ToastWithThumbnailProps = Exclude<
  NotificationWithThumbnailProps,
  'onDismiss'
>

const toastWithThumbnail = ({
  thumbnail,
  description,
  cta,
}: ToastWithThumbnailProps) => {
  return reactHotToast((t) => {
    return (
      <NotificationWithThumbnail
        thumbnail={thumbnail}
        description={description}
        cta={cta}
        onDismiss={() => reactHotToast.remove(t.id)}
      />
    )
  })
}

export {
  toast,
  toastWithLanguage,
  toastWithProduct,
  toastWithResource,
  toastWithThumbnail,
}
