import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Search from '../../../packages/search'
import SearchProvider from '../../../packages/search/provider'
// import hitContentStyles from '../../../packages/search/hit-content-styles.module.css'

export default {
  title: 'Components/Search',
  component: Search,
  decorators: [
    (Story, { args }) => (
      <div style={{ margin: '1rem' }}>
        <SearchProvider>{Story()}</SearchProvider>
      </div>
    ),
  ],
  args: {
    renderHitContent: ({ hit, Highlight }) => (
      <div>
        {/* className={hitContentStyles.root} */}
        <p>{hit.description}</p>
      </div>
    ),
  },
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = (args) => {
  return <Search {...args} />
}

export const Basic = Template.bind({})
