import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../../../packages/button'
import BgColor from '../../components/bg-color'
import { Theme as ButtonTheme } from '../../../packages/button/types'

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    title: 'Button Test',
    url: 'https://www.hashicorp.com',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />
}

export const Basic = Template.bind({})

/* Product Colors */
export const Themes: ComponentStory<typeof Button> = (args) => {
  const backgrounds = ['light', 'dark']
  const variants = [
    'primary',
    'secondary',
    'tertiary',
    'tertiary-neutral',
    'ghost',
  ]
  const products = [
    'hashicorp',
    'packer',
    'vagrant',
    'terraform',
    'consul',
    'boundary',
    'vault',
    'nomad',
    'waypoint',
  ]
  return (
    <>
      {backgrounds.map((background) => {
        return (
          <div style={{ position: 'relative' }}>
            <BgColor color={background === 'light' ? 'white' : 'black'} />
            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(5, max-content)',
                position: 'relative',
                padding: '1rem',
              }}
            >
              {products.map((product) => {
                return (
                  <>
                    {variants.map((variant) => {
                      return (
                        <Button
                          {...args}
                          theme={
                            {
                              brand: product,
                              background,
                              variant,
                            } as ButtonTheme
                          }
                        />
                      )
                    })}
                  </>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
Themes.args = { linkType: 'outbound' }
Themes.argTypes = {}
