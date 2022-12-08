import React from 'react'
import Image from '@hashicorp/react-image'
import fragment from './fragment.graphql'
import { FeaturedSliderInner } from '@hashicorp/react-featured-slider'

function CaseStudySlider({ data, dark, className }) {
  const features = data.caseStudies.map((caseStudy) => {
    const heading = caseStudy.headline
    const content = caseStudy.description
    const logoImage = caseStudy.company[dark ? 'whiteLogo' : 'monochromeLogo']
    const logo = {
      url: logoImage.url,
      alt: logoImage.alt,
    }
    const caseStudyLink =
      caseStudy.caseStudyLink?.url ||
      `/resources/${caseStudy.caseStudyResource.slug}`
    const link = {
      text: caseStudy.buttonLabel || 'Read Case Study',
      url: caseStudyLink,
    }
    const caseStudyImage =
      caseStudy.caseStudyImage || caseStudy.caseStudyResource.image
    const image = {
      url: caseStudyImage.url,
      alt: caseStudyImage.alt || '',
    }
    return { heading, content, image, link, logo }
  })
  return (
    <FeaturedSliderInner
      className={className}
      theme={dark === true ? 'dark' : 'light'}
      features={features}
    />
  )
}

CaseStudySlider.fragmentSpec = { fragment, dependencies: [Image] }

export default CaseStudySlider
