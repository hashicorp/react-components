import { render, screen } from '@testing-library/react'
import CodeBlock from './'

it('should render correctly with basic props', () => {
  const { container } = render(<CodeBlock prefix="dollar" code="abc" />)
  expect(container.firstChild).toHaveClass('g-code-block')
  expect(container.firstChild).toHaveClass('dollar')
  expect(screen.getByText('abc')).toBeInTheDocument()
})

// TODO: add these tests back

// it('should not add any class names when there is no prefix', () => {
//   const wrapper = render()
//   expect(wrapper.find('code').prop('className')).to.equal('g-code-block')
// })

// describe.each(['numbered', 'dollar', 'terminal'])('Line Prefix', (prefix) => {
//   it(`should append ${prefix} before the code`, () => {
//     const wrapper = render({ prefix })
//     expect(wrapper.find('ol').prop('className')).to.contain(prefix)
//   })
// })

// it('should break the given code into separate lines', () => {
//   const wrapper = render({
//     code: 'first line\nsecond line\nthird line',
//     prefix: 'dollar',
//   })
//   expect(wrapper.find('ol').find('li').length).to.equal(3)
// })

// it('should render a copy-to-clipboard .g-tooltip button', () => {
//   const wrapper = render({ prefix: '$' })
//   expect(wrapper.find('.g-tooltip').exists()).to.equal(true)
// })

// it('should gracefully catch document.execCommand exceptions when copying to clipboard', () => {
//   const clock = sinon.useFakeTimers()
//   document.execCommand = function () {
//     throw new Error('BYE')
//   }
//   const wrapper = render({ prefix: '$' })
//   const getButton = () => wrapper.find('.g-tooltip').at(0)
//   expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
//   getButton().simulate('click')
//   expect(wrapper.state().tooltip).to.equal('Failed to Copy')
//   clock.runToLast()
//   wrapper.update()
//   expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
// })

// it('should change the clipboard button tooltip when clicked, then revert back', () => {
//   const clock = sinon.useFakeTimers()
//   const wrapper = render({ prefix: '$' })
//   expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
//   wrapper.find('.g-tooltip').at(0).simulate('click')
//   expect(wrapper.state().tooltip).to.equal('Copied!')
//   clock.runToLast()
//   wrapper.update()
//   expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
// })
