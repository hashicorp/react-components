import React from 'react'
import { expect } from 'chai'
import propsSpec from './props'
import CaseStudySlider from './dist/index'
import StatusBar from './StatusBar'

testComponent(
  () => CaseStudySlider,
  { sets: [], props: propsSpec },
  ({ render, testTagAndClass, propValue, sinon }) => {
    testTagAndClass('div', 'g-case-study-slider')

    it.skip('should render the appropriate number of frames and logos', () => {
      const wrapper = render()

      const numStudies = propValue('data').caseStudies.length

      expect(wrapper.find('.slider-frame').length).to.equal(numStudies)
      if (numStudies > 1) {
        expect(wrapper.find(StatusBar).length).to.equal(numStudies)
      } else {
        expect(wrapper.find(StatusBar).exists()).to.equal(false)
      }
    })

    it('should default timing to 10', () => {
      expect(render({ timing: undefined }).state('timing')).to.equal(10)
    })

    it('should clean up before it unmounts', () => {
      const clock = sinon.useFakeTimers()
      const stub = sinon.stub(clock, 'clearInterval')
      const wrapper = render()
      wrapper.unmount()
      expect(stub).to.have.been.calledOnce
    })

    it('should be able to reparse data changes', async () => {
      let data = { ...propValue('data') }
      const wrapper = render({ data, fooProp: 'bar' }, true)
      expect(wrapper.state('numFrames')).to.equal(data.caseStudies.length)

      // when data doesn't change, don't do anything
      wrapper.setProps({ data })
      expect(wrapper.state('numFrames')).to.equal(data.caseStudies.length)

      // when data changes, update the state
      data = { ...data, caseStudies: [data.caseStudies[0]] }
      wrapper.setProps({ data })
      expect(wrapper.state('numFrames')).to.equal(data.caseStudies.length)
    })

    it('should be able to reparse a changing timing prop', async () => {
      let timing = propValue('timing')
      const wrapper = render()
      expect(wrapper.state('timing')).to.equal(timing)

      timing++
      wrapper.setProps({ timing })
      await sleep(100)
      expect(wrapper.state('timing')).to.equal(timing)
    })

    it('should reset the timer on resetTimer()', () => {
      const clock = sinon.useFakeTimers()
      const clearIntervalStub = sinon.stub(clock, 'clearInterval')
      const tickStub = sinon.stub(CaseStudySlider.prototype, 'tick')
      const wrapper = render()
      wrapper.instance().timer = 1234
      wrapper.instance().resetTimer()
      clock.runToLast()
      expect(clearIntervalStub).to.have.been.calledWith(1234)
      expect(tickStub).to.have.been.called
    })

    it('should throttle calls to throttledResize()', () => {
      const clock = sinon.useFakeTimers()
      const setTimeoutSpy = sinon.spy(clock, 'setTimeout')
      const clearTimeoutStub = sinon.stub(clock, 'clearTimeout')
      const wrapper = render()

      // test initial call
      wrapper.instance().throttledResize()
      expect(setTimeoutSpy).to.have.been.called
      expect(clearTimeoutStub).to.not.have.been.called

      // test debounced calls
      setTimeoutSpy.resetHistory()
      wrapper.instance().throttledResize()
      expect(clearTimeoutStub).to.have.been.called
      expect(setTimeoutSpy).to.have.been.called

      // test timer callback
      expect(wrapper.instance().resizeTimeout).to.be.a('number')
      clock.runToLast()
      wrapper.rerender()
      expect(wrapper.instance().resizeTimeout).to.equal(null)
      expect(wrapper.state('measure')).to.equal(true)
    })

    it('should advance the active slide, cycling at the end, on calls to tick()', async () => {
      const wrapper = render()
      const frames = propValue('data').caseStudies

      for (let i = 0; i < frames.length - 1; i++) {
        wrapper.instance().tick()
        await sleep(100)
        expect(wrapper.state('active')).to.equal(i + 1)
      }

      wrapper.instance().tick()
      await sleep(100)
      expect(wrapper.state('active')).to.equal(0)
    })

    it('should handle clicks when a different logo is pressed, restting the timer too', async () => {
      const resetTimerStub = sinon.stub(CaseStudySlider.prototype, 'resetTimer')
      const wrapper = render()

      wrapper.setState({ active: 1 })
      wrapper.instance().handleClick(1)
      await sleep(100)
      expect(resetTimerStub).to.not.have.been.called

      wrapper.instance().handleClick(2)
      await sleep(100)
      expect(wrapper.state('active')).to.equal(2)
      expect(resetTimerStub).to.have.been.calledOnce
    })

    it.skip('should adapt the button to the theme', () => {
      const darkWrapper = render({ dark: true }, true)
      expect(
        darkWrapper
          .find(Button)
          .first()
          .prop('theme')
      ).to.equal('light-outline')

      const lightWrapper = render({ dark: false }, true)
      expect(
        lightWrapper
          .find(Button)
          .first()
          .prop('theme')
      ).to.equal('dark-outline')
    })
  }
)

// Tests that should only work for the default set of props
testComponent(
  () => CaseStudySlider,
  { sets: ['default'], props: propsSpec },
  ({ render }) => {
    it.skip('should use provided custom button label', () => {
      const wrapper = render()
      expect(
        wrapper
          .find(Button)
          .first()
          .prop('title')
      ).to.equal('Custom Label')

      expect(
        wrapper
          .find(Button)
          .at(1)
          .prop('title')
      ).to.equal('Read Case Study')
    })
  }
)

// Tests that should only work for 2+ case studies
testComponent(
  () => CaseStudySlider,
  {
    sets: ['default', '2 case studies - Nomad', '2 case studies - Consul'],
    props: propsSpec
  },
  ({ render, propValue, sinon }) => {
    it('should call the right functions when a logo is clicked', () => {
      const handleClickStub = sinon.stub(
        CaseStudySlider.prototype,
        'handleClick'
      )

      const wrapper = render({ handleClick: handleClickStub })

      wrapper
        .find('.logo-bar-container')
        .find('.logo-bar')
        .first()
        .simulate('click')
      expect(handleClickStub).to.have.been.calledOnce
    })

    it('should call tick() event %timing% if there is more than one case study', () => {
      const clock = sinon.useFakeTimers()
      const tickStub = sinon.stub(CaseStudySlider.prototype, 'tick')
      render()
      clock.runToLast()
      expect(tickStub).to.have.been.calledOnce
    })

    it('should reset the active slide state when the new data has less frames', async () => {
      let data = { ...propValue('data') }
      const wrapper = render({ data }, true)
      wrapper.setState({ active: 2 })

      data = { ...data, caseStudies: [data.caseStudies[0]] }
      wrapper.setProps({ data })
      expect(wrapper.state('numFrames')).to.equal(data.caseStudies.length)

      await sleep(100)
      expect(wrapper.state('active')).to.equal(0)
    })

    it('should call measureFrameSize when measure is true', async () => {
      const measureFrameSizeStub = sinon.stub(
        CaseStudySlider.prototype,
        'measureFrameSize'
      )
      const wrapper = render()
      expect(measureFrameSizeStub).to.have.been.calledOnce
      measureFrameSizeStub.resetHistory()
      await sleep(100)

      wrapper.setState({ measure: false })
      expect(measureFrameSizeStub).to.not.have.been.calledOnce
      measureFrameSizeStub.resetHistory()
      await sleep(100)

      wrapper.setState({ measure: true })
      expect(measureFrameSizeStub).to.have.been.calledOnce
    })
  }
)

testComponent(
  () => CaseStudySlider,
  { sets: ['1 case study'], props: propsSpec },
  ({ render }) => {
    it('should add class `single` to `slider-frame` when there is only 1 frame', () => {
      // const frames = propValue('data').caseStudies
      const wrapper = render()
      expect(wrapper.find('.slider-frame').prop('className')).to.contain(
        'single'
      )
    })

    it.skip('should use different image aspect ratios for singles', () => {
      expect(
        render()
          .find(Image)
          .first()
          .prop('aspectRatio')
      ).to.equal('16,10,500')
    })
  }
)

testComponent(
  () => CaseStudySlider,
  {
    sets: ['2 case studies - Nomad', '2 case studies - Consul'],
    props: propsSpec
  },
  ({ render }) => {
    it('should add class `double` to `logo-bar-container` when there are only 2 frames', () => {
      expect(
        render()
          .find('.logo-bar-container')
          .prop('className')
      ).to.contain('double')
    })

    it.skip('should use different image aspect ratios for singles', () => {
      expect(
        render()
          .find(Image)
          .first()
          .prop('aspectRatio')
      ).to.equal('16,9,500')
    })
  }
)

testComponent(
  () => CaseStudySlider,
  { sets: ['Author provides image'], props: propsSpec },
  ({ renderDeep }) => {
    it('should use custom image alt when provided new image node', () => {
      expect(
        renderDeep()
          .find('img')
          .first()
          .render()
          .attr('alt')
      ).to.equal('Case Study image override')
    })
  }
)
