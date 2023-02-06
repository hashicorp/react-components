/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Button from '@hashicorp/react-button'
import s from './style.module.css'

interface DownloadBlockProps {
  heading: string
  description: string
  pdfLink: {
    title: string
    url: string
  }
}

export default function DownloadBlock({
  heading,
  description,
  pdfLink,
}: DownloadBlockProps) {
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <h2 className={s.heading}>{heading}</h2>
        <p className={s.description}>{description}</p>
        <div>
          <Button title={pdfLink.title} url={pdfLink.url} download />
        </div>
      </div>
    </div>
  )
}
