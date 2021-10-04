import React, { useRef, useState } from 'react'
import BgColor from '../../../../components/bg-color'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PopoverTooltip from '../../../../../packages/logo-grid/partials/popover-tooltip'

function ExampleDecorator(Story, { args }): React.ReactElement {
  const [showDialog, setShowDialog] = useState(false)
  const triggerRef = useRef(null)

  return (
    <div
      style={{
        minHeight: '150vh',
        padding: '5vh 0',
      }}
    >
      <BgColor
        color={args.theme === 'dark' ? 'var(--black)' : 'var(--white)'}
      />
      <div
        ref={triggerRef}
        style={{
          position: 'relative',
          border: `2px solid ${showDialog ? 'green' : 'gray'}`,
        }}
      >
        <pre
          style={{
            margin: 0,
            fontSize: '0.5rem',
            lineHeight: '1.4',
            background: 'var(--gray-6)',
            padding: '1em',
          }}
        >
          <code>{JSON.stringify({ scrollY: window.scrollY }, null, 2)}</code>
        </pre>
        <button onClick={() => setShowDialog(true)}>Show PopoverTooltip</button>
        <Story
          args={{
            shown: showDialog,
            setIsShown: setShowDialog,
            triggerRef: triggerRef,
            ...args,
          }}
        />
      </div>
    </div>
  )
}

export default {
  title: 'Components/LogoGrid/PopoverTooltip',
  component: PopoverTooltip,
  decorators: [ExampleDecorator],
} as ComponentMeta<typeof PopoverTooltip>

const Template: ComponentStory<typeof PopoverTooltip> = (args) => {
  return <PopoverTooltip {...args} />
}

export const LightTheme = Template.bind({})
LightTheme.args = {
  children: (
    <p style={{ margin: 0, color: 'var(--gray-2)' }}>
      Hello world! This is some content in a <strong>light themed</strong>{' '}
      PopoverTooltip. I'm writing a little more here in the hopes that it might
      wrap to multiple lines.
    </p>
  ),
}

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  theme: 'dark',
  children: (
    <p style={{ margin: 0, color: 'var(--white)' }}>
      Hello world! This is some content in a <strong>dark themed</strong>{' '}
      PopoverTooltip. I'm writing a little more here in the hopes that it might
      wrap to multiple lines.
    </p>
  ),
}
