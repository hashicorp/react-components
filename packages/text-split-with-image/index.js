import TextSplit from '@hashicorp/react-text-split'
import Image from '@hashicorp/react-image'
import styles from './styles/text-split-with-image.module.css'

export default function TextSplitWithImage({ className, image, textSplit }) {
  const altWithFallback = image.alt || textSplit.heading || ''
  return (
    <TextSplit className={className} {...textSplit}>
      <div className="g-text-split-with-image">
        <Image {...image} alt={altWithFallback} className={styles.imgElem} />
      </div>
    </TextSplit>
  )
}
