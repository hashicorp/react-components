/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export default function InlineSvg({ src, ...props }) {
  return <div dangerouslySetInnerHTML={{ __html: src }} {...props}></div>
}
