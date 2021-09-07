import { Component } from 'react'
import LogoBar from './partials/logo-bar'
import Button from '@hashicorp/react-button'
import Image from '@hashicorp/react-image'
import classNames from 'classnames'
import s from './style.module.css'

class FeaturedSliderInner extends Component {
  constructor(props) {
    super(props)
    const timing = this.props.timing ? parseInt(this.props.timing) : 10
    this.state = {
      active: 0,
      timing: timing,
      numFrames: this.props.features.length,
      measure: true,
      containerWidth: 0,
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
    if (this.props.features !== prevProps.features) {
      if (this.props.features.length != prevState.numFrames) {
        this.setState(
          {
            numFrames: this.props.features.length,
            measure: true,
          },
          () => {
            if (this.props.features.length === 1) {
              clearInterval(this.timer)
              window.removeEventListener('resize', this.throttledResize)
            }
          }
        )
      }
      if (prevState.active > this.props.features.length - 1) {
        this.setState({ active: 0 })
      }
    }

    if (this.props.timing && parseInt(this.props.timing) != prevState.timing) {
      this.setState(
        {
          timing: parseInt(this.props.timing),
          active: 0,
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
        measure: false,
      })
    }
  }

  render() {
    // Clear our frames array so we don't keep old refs around
    this.frames = []
    const { className, theme, features } = this.props
    const { measure, active, timing, numFrames, containerWidth } = this.state

    const single = numFrames === 1

    // Create inline styling for slide container
    // If we're measuring, or have a single slide then no inline styles should be applied
    const containerStyle =
      measure || single
        ? {}
        : {
            width: `${containerWidth}px`,
            transform: `translateX(-${(containerWidth / numFrames) * active}px`,
          }

    // Create inline styling to apply to each frame
    // If we're measuring or have a single slide then no inline styles should be applied
    const frameStyle =
      measure || single ? {} : { float: 'left', width: `${100 / numFrames}%` }

    return (
      <div className={className}>
        {!single && (
          <LogoBar
            features={features}
            numFrames={numFrames}
            handleClick={this.handleClick}
            dark={theme === 'dark'}
            active={active}
            timing={timing}
          />
        )}
        <div className={s.featureContainer}>
          <div className={s.sliderContainer} style={containerStyle}>
            {/* React pushes a null ref the first time, so we're filtering those out. */}
            {/* see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs */}
            {features.map((feature) => (
              <div
                style={frameStyle}
                ref={(el) => el && this.frames.push(el)}
                key={feature.heading}
                data-testid="slider-frame"
              >
                <div className={classNames(s.feature, { [s.single]: single })}>
                  <div className={s.featureImage}>
                    <a href={feature.link.url}>
                      <Image
                        url={feature.image.url}
                        alt={feature.image.alt}
                        aspectRatio={single ? [16, 10, 500] : [16, 9, 500]}
                      />
                    </a>
                  </div>
                  <div className={s.featureContent}>
                    {single && (
                      <div className={s.singleLogo}>
                        <Image url={feature.logo.url} alt={feature.logo.alt} />
                      </div>
                    )}
                    <h3
                      className={classNames(s.contentHeading, {
                        [s.dark]: theme === 'dark',
                      })}
                      dangerouslySetInnerHTML={{
                        __html: feature.heading,
                      }}
                    />
                    <p
                      className={classNames(s.contentBody, {
                        [s.dark]: theme === 'dark',
                      })}
                      dangerouslySetInnerHTML={{
                        __html: feature.content,
                      }}
                    />
                    <Button
                      className={s.button}
                      data-testid="button"
                      theme={{
                        variant: 'secondary',
                        background: theme,
                      }}
                      linkType={feature.link.type}
                      title={feature.link.text}
                      url={feature.link.url}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function FeaturedSlider({ theme, heading, className, ...restProps }) {
  return (
    <section className={classNames(s.sectionRoot, className, s[theme])}>
      {heading ? (
        <h2 className={classNames(s.sectionHeading, s[theme])}>{heading}</h2>
      ) : null}
      <FeaturedSliderInner theme={theme} {...restProps} />
    </section>
  )
}

export { FeaturedSliderInner }
export default FeaturedSlider
