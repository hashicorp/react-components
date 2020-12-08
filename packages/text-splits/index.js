import TextSplitWithCode from '@hashicorp/react-text-split-with-code'
import TextSplitWithImage from '@hashicorp/react-text-split-with-image'
import TextSplitWithLogoGrid from '@hashicorp/react-text-split-with-logo-grid'

/**
 * Receives an array of textSplit objects,
 * and automatically renders the appropriate
 * TextSplitWith* component.
 * @param {Object} props - props
 * @param {Object[]} props.textSplits - an item in this array can be any one of: { textSplit, codeBlock }, { textSplit, image }, or { textSplit, logoGrid }
 */
export default function TextSplits({ textSplits }) {
  return textSplits.map((entry, stableIdx) => {
    const { textSplit, codeBlock, image, logoGrid } = entry
    if (image) {
      return (
        <TextSplitWithImage
          key={stableIdx}
          textSplit={textSplit}
          image={image}
        />
      )
    } else if (codeBlock) {
      return (
        <TextSplitWithCode
          key={stableIdx}
          textSplit={textSplit}
          codeBlock={codeBlock}
        />
      )
    } else if (logoGrid) {
      return (
        <TextSplitWithLogoGrid
          key={stableIdx}
          textSplit={textSplit}
          logoGrid={logoGrid}
        />
      )
    } else {
      const err = `Unrecognized textSplit: ${JSON.stringify(entry)}`
      throw new Error(err)
    }
  })
}
