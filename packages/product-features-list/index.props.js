import React from 'react'
import PropTypes from 'prop-types'
import ProductFeaturesList from './dist/index.js'

function ProductFeaturesListProps(props) {
  return <ProductFeaturesList {...props} />
}

ProductFeaturesListProps.propTypes = {
  heading: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      icon: PropTypes.string
    })
  )
}

export default ProductFeaturesListProps
