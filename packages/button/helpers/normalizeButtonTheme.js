function normalizeButtonTheme(theme) {
  //  Handle legacy string themes, passed directly or from Dato
  const isLegacyStringTheme = typeof theme === 'string'
  const isSlugStringTheme = Object.prototype.hasOwnProperty.call(theme, 'slug')
  if (isLegacyStringTheme || isSlugStringTheme) {
    const stringTheme = isSlugStringTheme ? theme.slug : theme
    const mappedTheme = Object.prototype.hasOwnProperty.call(
      legacyThemeDict,
      stringTheme
    )
    if (mappedTheme) return legacyThemeDict[stringTheme]
  }
  //  Return a valid theme object, with fallbacks
  return {
    variant: theme.variant || 'primary',
    brand: theme.brand || 'hashicorp',
    background: theme.background || 'light',
  }
}

const legacyThemeDict = {
  'light-fill': { variant: 'primary', brand: 'neutral', background: 'dark' },
  'dark-fill': { variant: 'primary', brand: 'neutral', background: 'light' },
  'light-outline': {
    variant: 'secondary',
    brand: 'neutral',
    background: 'dark',
  },
  'dark-outline': {
    variant: 'secondary',
    brand: 'neutral',
    background: 'light',
  },
  'purple-fill': {
    variant: 'primary',
    brand: 'terraform',
    background: 'light',
  },
  'purple-outline': {
    variant: 'secondary',
    brand: 'terraform',
    background: 'dark',
  },
  'pink-fill': { variant: 'primary', brand: 'consul', background: 'light' },
  'pink-outline': {
    variant: 'secondary',
    brand: 'consul',
    background: 'dark',
  },
}

export default normalizeButtonTheme
