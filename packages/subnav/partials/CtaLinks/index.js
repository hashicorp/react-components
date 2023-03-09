/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Button from '@hashicorp/react-button'
import svgGithub from './icons/github.svg.js'
import GithubStarsLink from './github-stars-link/index.js'
import classNames from 'classnames'
import s from './style.module.css'

function CtaLinks({ links, product, isInDropdown, hideGithubStars, theme }) {
  return (
    <div className={classNames(s.root, { [s.isInDropdown]: isInDropdown })}>
      {links.map((link, stableIdx) => {
        const textKey = link.text.toLowerCase()
        const isDownload = textKey === 'download'
        const isGithub = textKey === 'github'
        if (isGithub && !isInDropdown)
          return (
            <GithubStarsLink
              // eslint-disable-next-line react/no-array-index-key
              key={stableIdx}
              url={link.url}
              hideGithubStars={hideGithubStars}
            />
          )
        const isLastButton = stableIdx === links.length - 1
        const iconDownload = {
          isAnimated: true,
          position: 'left',
        }
        const iconGithub = {
          svg: svgGithub,
          position: 'left',
        }
        return (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={stableIdx}
            size="small"
            title={link.text}
            url={link.url}
            icon={isDownload ? iconDownload : isGithub ? iconGithub : undefined}
            onClick={link.onClick}
            theme={{
              brand: product,
              variant: isLastButton ? 'primary' : 'secondary',
              background: theme,
              ...link.theme /* allow theme overrides via the ctaLinks array */,
            }}
            linkType={isDownload ? 'download' : undefined}
          />
        )
      })}
    </div>
  )
}

export default CtaLinks
