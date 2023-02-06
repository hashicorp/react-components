/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// All props of nextjs/link are passed through directly
// https://github.com/zeit/next.js/blob/canary/packages/next/client/link.tsx#L48
export default function LinkWrap({
  Link,
  href,
  as,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  children,
  ...props
}) {
  if (Link && !isAbsoluteURL(href)) {
    return (
      <Link
        href={href}
        as={as}
        passHref={passHref}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        legacyBehavior
      >
        <a data-testid="a" {...props}>
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <a href={href} data-testid="a-raw" {...props}>
        {children}
      </a>
    )
  }
}

export const isAbsoluteURL = RegExp().test.bind(/^[a-zA-Z][a-zA-Z\d+\-.]*:/)
