export interface InlineVideoProps {
  appearance?: 'light' | 'dark'
  url: string
  description?: string
  solution?: 'infrastructure' | 'security' | 'networking' | 'applications'
  gradientPosition?: 'left' | 'right'
}
