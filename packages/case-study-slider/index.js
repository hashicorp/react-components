import React, { Component } from 'react'
import Logo from './Logo'
import StatusBar from './StatusBar'
import marked from 'marked'
import Button from '@hashicorp/react-button'
import Image from '@hashicorp/react-image'
import fragment from './fragment.graphql'

class CaseStudySlider extends Component {
  constructor(props) {
    super(props)
    this.data = this.props.data
    const timing = this.props.timing ? parseInt(this.props.timing) : 10
    this.state = {
      active: 0,
      timing: timing,
      numFrames: this.data.caseStudies.length,
      measure: true,
      containerWidth: 0
    }

    this.frames = []

    this.handleClick = this.handleClick.bind(this)
    this.throttledResize = this.throttledResize.bind(this)
    this.measureFrameSize = this.measureFrameSize.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.resizeTimeout = null
  }

  componentDidMount() {
    if (this.state.numFrames > 1) {
      this.timer = setInterval(() => this.tick(), this.state.timing * 1000)
      this.measureFrameSize()
    }
    window.addEventListener('resize', this.throttledResize, false)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.throttledResize)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.data = this.props.data
      if (this.data.caseStudies.length != prevState.numFrames) {
        this.setState(
          {
            numFrames: this.data.caseStudies.length,
            measure: true
          },
          () => {
            if (this.data.caseStudies.length === 1) {
              clearInterval(this.timer)
              window.removeEventListener('resize', this.throttledResize)
            }
          }
        )
      }
      if (prevState.active > this.data.caseStudies.length - 1) {
        this.setState({ active: 0 })
      }
    }

    if (this.props.timing && parseInt(this.props.timing) != prevState.timing) {
      this.setState(
        {
          timing: parseInt(this.props.timing),
          active: 0
        },
        this.resetTimer
      )
    }
    // If we're measuring on this update get the width
    if (!prevState.measure && this.state.measure && this.state.numFrames > 1) {
      this.measureFrameSize()
    }
  }

  resetTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(() => this.tick(), this.state.timing * 1000)
  }

  throttledResize() {
    this.resizeTimeout && clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = null
      this.setState({ measure: true })
    }, 250)
  }

  tick() {
    const nextSlide =
      this.state.active === this.state.numFrames - 1 ? 0 : this.state.active + 1
    this.setState({ active: nextSlide })
  }

  handleClick(i) {
    if (i === this.state.active) return
    this.setState({ active: i }, this.resetTimer)
  }

  measureFrameSize() {
    // All frames are the same size, so we measure the first one
    if (this.frames[0]) {
      const { width } = this.frames[0].getBoundingClientRect()
      this.setState({
        frameSize: width,
        containerWidth: width * this.state.numFrames,
        measure: false
      })
    }
  }

  render() {
    // Clear our frames array so we don't keep old refs around
    this.frames = []
    const { caseStudies, brand } = this.data

    const { measure, active, timing, numFrames, containerWidth } = this.state
    const { dark } = this.props

    const single = numFrames === 1

    // Create inline styling for slide container
    // If we're measuring, or have a single slide then no inline styles should be applied
    const containerStyle =
      measure || single
        ? {}
        : {
            width: `${containerWidth}px`,
            transform: `translateX(-${(containerWidth / numFrames) * active}px`
          }

    // Create inline styling to apply to each frame
    // If we're measuring or have a single slide then no inline styles should be applied
    const frameStyle =
      measure || single ? {} : { float: 'left', width: `${100 / numFrames}%` }

    return (
      <div className="g-case-study-slider">
        {!single && (
          <div
            className={`logo-bar-container${numFrames === 2 ? ' double' : ''}`}
          >
            {caseStudies.map(({ company }, i) => (
              <div
                className="logo-bar"
                onClick={() => this.handleClick(i)}
                key={company.monochromeLogo.url}
              >
                <div className="logo-container">
                  <Logo dark={dark} image={company} />
                </div>
                <StatusBar
                  dark={dark}
                  active={active === i}
                  timing={timing}
                  brand={brand}
                />
              </div>
            ))}
          </div>
        )}
        <div className="case-study-container">
          <div className="slider-container" style={containerStyle}>
            {/* React pushes a null ref the first time, so we're filtering those out. */}
            {/* see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs */}
            {caseStudies.map(caseStudy => {
              const caseStudyLink =
                caseStudy.caseStudyLink ||
                `/resources/${caseStudy.caseStudyResource.slug}`
              return (
                <div
                  className={`slider-frame${single ? ' single' : ''}`}
                  style={frameStyle}
                  ref={el => el && this.frames.push(el)}
                  key={caseStudy.headline}
                >
                  <div className="case-study">
                    <div className="feature-image">
                      <a href={caseStudyLink}>
                        <Image
                          {...(caseStudy.caseStudyImage ||
                            caseStudy.caseStudyResource.image)}
                          aspectRatio={single ? [16, 10, 500] : [16, 9, 500]}
                        />
                      </a>
                    </div>
                    <div className="feature-content g-type-body">
                      {single && (
                        <div className="single-logo">
                          <Logo dark={dark} image={caseStudy.company} />
                        </div>
                      )}
                      <h3
                        className="g-type-display-4"
                        dangerouslySetInnerHTML={{
                          __html: marked.inlineLexer(caseStudy.headline, [])
                        }}
                      />
                      <p
                        className="g-type-body"
                        dangerouslySetInnerHTML={{
                          __html: marked.inlineLexer(caseStudy.description, [])
                        }}
                      />
                      <Button
                        theme={dark ? 'light-outline' : 'dark-outline'}
                        title={caseStudy.buttonLabel || 'Read Case Study'}
                        url={caseStudyLink}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

CaseStudySlider.fragmentSpec = { fragment, dependencies: [Image] }

export default CaseStudySlider
