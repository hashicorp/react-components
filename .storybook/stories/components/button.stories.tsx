import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BgColor from '../../components/bg-color'
import Button from '../../../packages/button'
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
  const backgrounds = ['light', 'dark', 'brand']
  const variants = [
    'primary',
    'secondary',
    'tertiary',
    'tertiary-neutral',
    'ghost',
  ]
  const products = [
    'neutral',
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
            <BgColor
              color={
                background === 'dark'
                  ? 'black'
                  : background === 'brand'
                  ? 'var(--brand)'
                  : 'white'
              }
            />
            <div
              style={
                {
                  // display: 'grid',
                  // gap: '1rem',
                  // gridTemplateColumns: 'repeat(5, max-content)',
                  // position: 'relative',
                  // padding: '1rem',
                  // backgroundColor:
                  //   background === 'brand' &&
                  //   ['neutral', 'hashicorp'].indexOf(product) == -1
                  //     ? `var(--${product})`
                  //     : 'var(--brand)',
                }
              }
            >
              {products.map((product) => {
                return (
                  <div
                    style={{
                      display: 'grid',
                      gap: '1rem',
                      gridTemplateColumns: 'repeat(5, max-content)',
                      position: 'relative',
                      padding: '1rem',
                      backgroundColor:
                        background === 'brand'
                          ? ['neutral', 'hashicorp'].indexOf(product) == -1
                            ? `var(--${product})`
                            : 'var(--brand)'
                          : undefined,
                    }}
                  >
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
                  </div>
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
