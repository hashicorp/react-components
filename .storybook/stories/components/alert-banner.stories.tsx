import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AlertBanner from '../../../packages/alert-banner'

export default {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  args: {
    tag: 'New',
    text: 'Alert banner text',
    url: 'https://www.hashicorp.com',
    expirationDate: undefined,
    linkText: 'Check it out',
    hideOnMobile: false,
    name: 'optional-dismissal-cookie-id',
    product: 'vagrant',
  },
} as ComponentMeta<typeof AlertBanner>

const Template: ComponentStory<typeof AlertBanner> = (args) => {
  const expirationDate = args.expirationDate
    ? new Date(parseInt(args.expirationDate)).toString()
    : undefined
  console.log({ expirationDate })
  return <AlertBanner {...args} expirationDate={expirationDate} />
}

export const Basic = Template.bind({})
