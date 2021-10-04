//  Import styles needed to render Storybook components correctly
import '../pages/global.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    sort: 'requiredFirst',
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      type: 'dynamic',
      excludeDecorators: true,
    },
  },
  layout: 'fullscreen',
}
