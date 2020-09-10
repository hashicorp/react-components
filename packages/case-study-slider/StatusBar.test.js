import { expect } from 'chai'
import StatusBar from './StatusBar.js'

testComponent(
  () => StatusBar,
  ({ testTagAndClass, render }) => {
    testTagAndClass('div', 'progress-bar')

    it('should add the dark class when needed', () => {
      expect(
        render({ dark: true })
          .find('.progress-bar')
          .prop('className')
      ).to.contain('dark')

      expect(
        render({ dark: false })
          .find('.progress-bar')
          .prop('className')
      ).to.not.contain('dark')
    })

    it('should add the active class when needed', () => {
      const active = render({ active: true, timing: 1 }).find('span')
      expect(active.prop('className')).to.contain('active')
      expect(active.render().attr('style')).to.contain('animation-duration:1s')

      const inactive = render({ active: false, timing: 1 }).find('span')
      expect(inactive.prop('className')).to.not.contain('active')
      expect(inactive.render().attr('style')).to.contain(
        'animation-duration:0s'
      )
    })
  }
)
