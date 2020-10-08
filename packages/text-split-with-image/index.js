import TextSplit from '@hashicorp/react-text-split'
import Image from '@hashicorp/react-image'

export default function TextSplitWithImage({ image, textSplit }) {
  const altWithFallback = image.alt || textSplit.heading || ''
  return (
    <TextSplit {...textSplit}>
      <Image {...image} alt={altWithFallback} />
    </TextSplit>
  )
}
