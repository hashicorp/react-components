import s from '@hashicorp/sentinel-embedded/dist/bundle.module.css'
import template from '@hashicorp/sentinel-embedded/src/components/playground-template'
import '@hashicorp/sentinel-embedded'

function SentinelEmbedded({
  exampleId,
  exampleData,
  height,
  policyContent,
  ...otherProps
}) {
  let example = undefined
  if (typeof exampleData != 'undefined') {
    example = exampleData
  } else if (policyContent) {
    example = {
      policy: policyContent,
    }
  }

  if (typeof example != 'undefined') {
    example = JSON.stringify(example)
  }

  return (
    <sentinel-playground
      {...otherProps}
      exampleId={exampleId}
      exampleData={example}
      height={height}
      dangerouslySetInnerHTML={{ __html: template(s, height) }}
    />
  )
}

export default SentinelEmbedded
