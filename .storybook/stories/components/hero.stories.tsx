import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Hero from '../../../packages/hero'

export default {
  title: 'Components/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = (args) => {
  return <Hero {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  data: {
    title: 'Testing',
    description: 'Etiam porta sem malesuada magna mollis euismod.',
    product: 'consul',
    backgroundImage: {
      url:
        'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
      format: 'svg',
      alt: 'terraform background',
    },
    buttons: [
      { title: 'Download', url: '#' },
      {
        title: 'Get Started',
        url: '#',
        theme: { variant: 'tertiary' },
        linkType: 'inbound',
      },
    ],
    videos: [
      {
        name: 'UI',
        playbackRate: 2,
        src: [
          {
            srcType: 'mp4',
            url: 'https://www.datocms-assets.com/2885/1621637919-consul-ui.mp4',
          },
        ],
      },
      {
        name: 'CLI',
        playbackRate: 2,
        src: [
          {
            srcType: 'mp4',
            url:
              'https://www.datocms-assets.com/2885/1621637930-consul-cli.mp4',
          },
        ],
      },
    ],
  },
}
