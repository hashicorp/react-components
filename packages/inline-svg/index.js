/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export default function InlineSvg({ src, ...props }) {
  return <div dangerouslySetInnerHTML={{ __html: src }} {...props}></div>
}
