import { expect } from 'chai'
import CodeBlock from './dist/index.js'

testComponent(
  () => CodeBlock,
  { sets: [], props: [{ name: 'code', value: 'abc' }] },
  ({ testTagAndClass, render, sinon }) => {
    beforeEach(() => {
      document.execCommand = () => ''
    })

    testTagAndClass('code', 'g-code-block')

    it('should render a <code/> tag with the given code', () => {
      const wrapper = render({ prefix: '$' })
      expect(wrapper.render()[0].name).to.equal('code')
      expect(
        wrapper
          .find('code')
          .find('li')
          .prop('dangerouslySetInnerHTML')
      ).to.contain({ __html: 'abc' })
    })

    it('should add the given prefix (prepended by a space) as a class name', () => {
      const wrapper = render({ prefix: 'dog' })
      expect(wrapper.find('code').prop('className')).to.contain(' dog')
    })

    it('should not add any class names when there is no prefix', () => {
      const wrapper = render()
      expect(wrapper.find('code').prop('className')).to.equal('g-code-block')
    })

    describe.each(['numbered', 'dollar', 'terminal'])('Line Prefix', prefix => {
      it(`should append ${prefix} before the code`, () => {
        const wrapper = render({ prefix })
        expect(wrapper.find('ol').prop('className')).to.contain(prefix)
      })
    })

    it('should break the given code into separate lines', () => {
      const wrapper = render({
        code: 'first line\nsecond line\nthird line',
        prefix: 'dollar'
      })
      expect(wrapper.find('ol').find('li').length).to.equal(3)
    })

    it('should render a copy-to-clipboard .g-tooltip button', () => {
      const wrapper = render({ prefix: '$' })
      expect(wrapper.find('.g-tooltip').exists()).to.equal(true)
    })

    it('should gracefully catch document.execCommand exceptions when copying to clipboard', () => {
      const clock = sinon.useFakeTimers()
      document.execCommand = function() {
        throw new Error('BYE')
      }
      const wrapper = render({ prefix: '$' })
      const getButton = () => wrapper.find('.g-tooltip').at(0)
      expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
      getButton().simulate('click')
      expect(wrapper.state().tooltip).to.equal('Failed to Copy')
      clock.runToLast()
      wrapper.update()
      expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
    })

    it('should change the clipboard button tooltip when clicked, then revert back', () => {
      const clock = sinon.useFakeTimers()
      const wrapper = render({ prefix: '$' })
      expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
      wrapper
        .find('.g-tooltip')
        .at(0)
        .simulate('click')
      expect(wrapper.state().tooltip).to.equal('Copied!')
      clock.runToLast()
      wrapper.update()
      expect(wrapper.state().tooltip).to.equal('Copy to Clipboard')
    })
  }
)
