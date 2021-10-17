import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ConsentManager from '../../../packages/consent-manager'

export default {
  title: 'Components/ConsentManager',
  component: ConsentManager,
} as ComponentMeta<typeof ConsentManager>

const Template: ComponentStory<typeof ConsentManager> = (args) => {
  return <ConsentManager {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  version: 1,
  segmentWriteKey: 'iyi06c432UL7SB1r3fQReec4bNwFyzkW',
  utilServerRoot: 'https://hashicorp-web-util-staging.herokuapp.com',
  privacyPolicyLink: 'https://www.hashicorp.com/privacy',
  cookiePolicyLink: 'https://www.hashicorp.com/cookies',
  segmentServices: [
    {
      name: 'Example Name',
      category: 'Example Category',
      description:
        'A short description of what the service is and how your company uses the data.',
    },
  ],
  additionalServices: [
    {
      name: 'Name of the service',
      category: 'Example Category',
      description:
        'A short description of what the service is and how your company uses the data.',
      body:
        '/* a chunk of javascript to add to the page if permission is granted - this is optional */',
      url: 'http://www.an-optional-url-for-a-script-to-add-to-the-page.com',
    },
    {
      name: 'Name of the service 2',
      category: 'Example Category',
      description: 'A script with additional elements to be injected',
      body: '',
      url: 'https://source-url-of-script.com',
      async: true,
      addToBody: true,
      dataAttrs: [
        {
          name: 'test',
          value: 'foobar',
        },
      ],
    },
  ],
  categories: [
    {
      name: 'Example Category',
      description: 'A short description of the category',
    },
  ],
  forceShow: true,
}
