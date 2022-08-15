export interface CardProps {
  children: string
  featured?: boolean
  appearance: 'light' | 'dark'
  heading: string
  description?: string
  cta: {
    title?: string
    url: string
  }
}

export interface ThumbnailProps {
  url: string
}

export interface MetaProps {
  date?: string
  category?: string
}

export interface MetaProps {
  heading: string
  description?: string
}
