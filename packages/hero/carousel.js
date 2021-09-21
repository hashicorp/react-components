import { Component } from 'react'
import classnames from 'classnames'
import s from './carousel.module.css'
export default class HeroCarousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: null,
      deactivating: null,
    }
  }

  switchToVideo(index) {
    // if switching to already active item, return out
    if (this.state.active === index) return

    // deactivate currently active item
    this.setState({
      deactivating: this.state.active,
    })

    // after deactivation animation finishes
    setTimeout(() => {
      // reset videos
      const video = this.videos[this.state.active]
      video.currentTime = 0
      video.pause()

      // play next video
      this.initVideo(index)
    }, 750)
  }

  initVideo(index) {
    const video = this.videos[index]
    const bar = this.progressBars[index]

    this.setState({
      active: index,
      deactivating: null,
    })

    // set video playback rate
    video.playbackRate = this.props.videos[index].playbackRate || 1

    // play video
    this.playVideo(video)

    // sync playback bars to video.currentTime
    setInterval(() => {
      if (!isNaN(video.duration)) {
        bar.style.width = `${(video.currentTime / video.duration) * 100}%`
      }
    }, 200)
  }

  playVideo(video) {
    const promise = video.play()

    if (promise !== undefined) {
      promise
        .then(() => {
          // video successfully played, controls won't be necessary
          video.removeAttribute('controls')
        })
        .catch((error) => {
          // video play failed, make sure users have controls
          video.setAttribute('controls', true)
          /* eslint-disable-next-line no-console */
          console.log('video autoplay failed: ', error)
        })
    }
  }

  componentDidMount() {
    require('promise-polyfill').default
    this.initVideo(0)
  }

  render() {
    const { videos, videoControlsTop, theme } = this.props

    this.videoWrappers = []
    this.videos = []
    this.progressBars = []

    const defaultAspectRatio = 0.6359
    const tallestAspectRatio = videos.reduce((acc, { aspectRatio }) => {
      return aspectRatio && aspectRatio > acc ? aspectRatio : acc
    }, defaultAspectRatio)

    return (
      <div
        className={classnames(s.root, {
          [s.videoControlsTop]: videoControlsTop,
        })}
      >
        <div className={s.videos}>
          {videos.map((video, i) => (
            <div
              key={video.name}
              className={classnames(s.videoWrapper, {
                [s.isActive]: this.state.active === i,
                [s.isDeactivating]: this.state.deactivating === i,
              })}
              style={{
                '--video-aspect-ratio': video.aspectRatio || defaultAspectRatio,
                '--tallest-aspect-ratio': tallestAspectRatio,
              }}
              ref={(el) => el !== null && this.videoWrappers.push(el)}
            >
              <div className={s.bar}>
                <span />
                <span />
                <span />
              </div>
              <div className={classnames(s.video, video.name.toLowerCase())}>
                <video
                  muted
                  playsInline
                  ref={(el) => el !== null && this.videos.push(el)}
                  loop={videos.length === 1}
                  onEnded={() => {
                    this.switchToVideo(i < videos.length - 1 ? i + 1 : 0)
                  }}
                >
                  {video.src.map(
                    (src) =>
                      typeof src.url != 'undefined' &&
                      src.url != '' && (
                        <source
                          key={src.url}
                          src={src.url}
                          type={`video/${src.srcType}`}
                        />
                      )
                  )}
                </video>
              </div>
            </div>
          ))}
        </div>
        <div
          className={classnames(s.controls, {
            [s.videoControlsTop]: this.props.videoControlsTop,
          })}
        >
          {videos.map((control, index) => (
            <div
              className={s.control}
              key={control.name || index}
              onClick={() => {
                this.switchToVideo(index)
              }}
            >
              <div className={s.controlHover}>
                {control.name ? control.name : ''}
                <div className={classnames(s.progressBar, s[theme])}>
                  <span
                    ref={(el) => el !== null && this.progressBars.push(el)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
