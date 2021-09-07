import { render, screen } from '@testing-library/react'
import CaseStudySlider from './'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<CaseStudySlider />', () => {
  test('renders properly', () => {
    const className = 'g-case-study-slider'
    const { container } = render(
      <CaseStudySlider {...defaultProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(className)
  })

  test('should render the appropriate number of frames and logos', () => {
    render(<CaseStudySlider {...defaultProps} />)
    const numStudies = defaultProps.data.caseStudies.length
    expect(screen.getAllByTestId('slider-frame').length).toEqual(numStudies)
    if (numStudies > 1) {
      expect(screen.getAllByTestId('progress-bar').length).toEqual(numStudies)
    } else {
      expect(screen.getAllByTestId('progress-bar').length).toEqual(false)
    }
  })

  test('should adapt the button to a dark theme', () => {
    render(<CaseStudySlider {...defaultProps} dark={true} />)
    expect(screen.getAllByTestId('button')[0]).toHaveClass('background-dark')
  })

  test('should adapt the button to a light theme', () => {
    render(<CaseStudySlider {...defaultProps} dark={false} />)
    expect(screen.getAllByTestId('button')[0]).toHaveClass('background-light')
  })

  test('should use provided custom button label', () => {
    render(<CaseStudySlider {...defaultProps} />)
    expect(screen.getAllByText('Custom Label')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Read Case Study')[0]).toBeInTheDocument()
  })

  test('should add class `single` to `slider-frame` when there is only 1 frame', () => {
    render(
      <CaseStudySlider
        {...defaultProps}
        data={{
          ...defaultProps.data,
          caseStudies: defaultProps.data.caseStudies.slice(0, 1),
        }}
      />
    )
    expect(screen.getAllByTestId('slider-frame')[0].firstChild).toHaveClass(
      'single'
    )
  })

  test('should add class `double` to `logo-bar-container` when there are only 2 frames', () => {
    render(
      <CaseStudySlider
        {...defaultProps}
        data={{
          ...defaultProps.data,
          caseStudies: defaultProps.data.caseStudies.slice(0, 2),
        }}
      />
    )
    expect(screen.getAllByTestId('logo-bar')[0]).toHaveClass('double')
  })
})

// TODO Add these Enzyme/Sinon-centric tests back

// test('default timing should be 10', () => {
//   expect(render(<CaseStudySlider {...defaultProps} timing={undefined} />).state('timing')).toEqual(10)
// })

// test('should be able to reparse data changes', async () => {
//   const rootElem = render(<CaseStudySlider {...defaultProps} />)
//   expect(rootElem.state('numFrames')).toEqual(data.caseStudies.length)

//   // when data doesn't change, don't do anything
//   rootElem.setProps({ data })
//   expect(rootElem.state('numFrames')).toEqual(data.caseStudies.length)

//   // when data changes, update the state
//   data = { ...defaultProps.data, caseStudies: [data.caseStudies[0]] }
//   rootElem.setProps({ data })
//   expect(rootElem.state('numFrames')).toEqual(data.caseStudies.length)
// })

// test('should be able to reparse a changing timing prop', async () => {
//   let timing = defaultProps.timing
//   const wrapper = render(<CaseStudySlider {...defaultProps} />)
//   expect(wrapper.state('timing')).toEqual(timing)

//   timing++
//   wrapper.setProps({ timing })
//   await sleep(100)
//   expect(wrapper.state('timing')).toEqual(timing)
// })

// test('should advance the active slide, cycling at the end, on calls to tick()', async () => {
//   const wrapper = render(<CaseStudySlider {...defaultProps} />)
//   const frames = defaultProps.data.caseStudies

//   for (let i = 0; i < frames.length - 1; i++) {
//     wrapper.instance().tick()
//     await sleep(100)
//     expect(wrapper.state('active')).toEqual(i + 1)
//   }

//   wrapper.instance().tick()
//   await sleep(100)
//   expect(wrapper.state('active')).toEqual(0)
// })

// test('should reset the active slide state when the new data has less frames', async () => {
//   const wrapper = render(<CaseStudySlider {...defaultProps} />)
//   wrapper.setState({ active: 2 })

//   data = { ...data, caseStudies: [data.caseStudies[0]] }
//   wrapper.setProps({ data })
//   expect(wrapper.state('numFrames')).toEqual(data.caseStudies.length)

//   await sleep(100)
//   expect(wrapper.state('active')).toEqual(0)
// })

//  test('should use different image aspect ratios for singles', () => {
//   expect(
//     render(<CaseStudySlider {...defaultProps} />)
//       .find(Image)
//       .first()
//       .prop('aspectRatio')
//   ).toEqual('16,10,500')
// })

// test('should use different image aspect ratios for singles', () => {
//   expect(
//     render(<CaseStudySlider {...defaultProps} />)
//       .find(Image)
//       .first()
//       .prop('aspectRatio')
//   ).toEqual('16,9,500')
// })

// test('should use custom image alt when provided new image node', () => {
//   expect(
//     renderDeep(<CaseStudySlider {...defaultProps}  />)
//       .find('img')
//       .first()
//       .render()
//       .attr('alt')
//   ).toEqual('Case Study image override')
// })

// testComponent(
//   () => CaseStudySlider,
//   { sets: [], props: defaultProps },
//   ({ render, testTagAndClass, propValue, sinon }) => {
//     testTagAndClass('div', 'g-case-study-slider')

//     it('should clean up before it unmounts', () => {
//       const clock = sinon.useFakeTimers()
//       const stub = sinon.stub(clock, 'clearInterval')
//       const wrapper = render()
//       wrapper.unmount()
//       expect(stub).to.have.been.calledOnce
//     })

//     it('should call the right functions when a logo is clicked', () => {
//       const handleClickStub = sinon.stub(
//         CaseStudySlider.prototype,
//         'handleClick'
//       )

//       const wrapper = render({ handleClick: handleClickStub })

//       wrapper
//         .find('.logo-bar-container')
//         .find('.logo-bar')
//         .first()
//         .simulate('click')
//       expect(handleClickStub).to.have.been.calledOnce
//     })

//     it('should call tick() event %timing% if there is more than one case study', () => {
//       const clock = sinon.useFakeTimers()
//       const tickStub = sinon.stub(CaseStudySlider.prototype, 'tick')
//       render()
//       clock.runToLast()
//       expect(tickStub).to.have.been.calledOnce
//     })

//     it('should reset the timer on resetTimer()', () => {
//       const clock = sinon.useFakeTimers()
//       const clearIntervalStub = sinon.stub(clock, 'clearInterval')
//       const tickStub = sinon.stub(CaseStudySlider.prototype, 'tick')
//       const wrapper = render()
//       wrapper.instance().timer = 1234
//       wrapper.instance().resetTimer()
//       clock.runToLast()
//       expect(clearIntervalStub).to.have.been.calledWith(1234)
//       expect(tickStub).to.have.been.called
//     })

//     it('should throttle calls to throttledResize()', () => {
//       const clock = sinon.useFakeTimers()
//       const setTimeoutSpy = sinon.spy(clock, 'setTimeout')
//       const clearTimeoutStub = sinon.stub(clock, 'clearTimeout')
//       const wrapper = render()

//       // test initial call
//       wrapper.instance().throttledResize()
//       expect(setTimeoutSpy).to.have.been.called
//       expect(clearTimeoutStub).to.not.have.been.called

//       // test debounced calls
//       setTimeoutSpy.resetHistory()
//       wrapper.instance().throttledResize()
//       expect(clearTimeoutStub).to.have.been.called
//       expect(setTimeoutSpy).to.have.been.called

//       // test timer callback
//       expect(wrapper.instance().resizeTimeout).to.be.a('number')
//       clock.runToLast()
//       wrapper.rerender()
//       expect(wrapper.instance().resizeTimeout).to.equal(null)
//       expect(wrapper.state('measure')).to.equal(true)
//     })

//     it('should handle clicks when a different logo is pressed, restting the timer too', async () => {
//       const resetTimerStub = sinon.stub(CaseStudySlider.prototype, 'resetTimer')
//       const wrapper = render()

//       wrapper.setState({ active: 1 })
//       wrapper.instance().handleClick(1)
//       await sleep(100)
//       expect(resetTimerStub).to.not.have.been.called

//       wrapper.instance().handleClick(2)
//       await sleep(100)
//       expect(wrapper.state('active')).to.equal(2)
//       expect(resetTimerStub).to.have.been.calledOnce
//     })

//     it('should call measureFrameSize when measure is true', async () => {
//       const measureFrameSizeStub = sinon.stub(
//         CaseStudySlider.prototype,
//         'measureFrameSize'
//       )
//       const wrapper = render()
//       expect(measureFrameSizeStub).to.have.been.calledOnce
//       measureFrameSizeStub.resetHistory()
//       await sleep(100)

//       wrapper.setState({ measure: false })
//       expect(measureFrameSizeStub).to.not.have.been.calledOnce
//       measureFrameSizeStub.resetHistory()
//       await sleep(100)

//       wrapper.setState({ measure: true })
//       expect(measureFrameSizeStub).to.have.been.calledOnce
//     })
//   }
// )
