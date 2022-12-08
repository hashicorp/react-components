import { domAnimation } from 'framer-motion'
import { layoutFeatures } from 'framer-motion/dist/es/motion/features/layout'
import { HTMLProjectionNode } from 'framer-motion/dist/es/projection/node/HTMLProjectionNode'

export default {
  ...domAnimation,
  ...layoutFeatures,
  projectionNodeConstructor: HTMLProjectionNode,
}
