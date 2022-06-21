import ReactPlayer from 'react-player'
import type { VideoPlayerProps, VideoPlayerThemes } from './types'
import s from './style.module.css'

const themes: Record<VideoPlayerThemes, string> = {
  primary: '#0C56E9',
  neutral: '#151619',
}

export default function VideoPlayer({
  url,
  theme = 'primary',
}: VideoPlayerProps) {
  return (
    <div className={s.root}>
      <ReactPlayer
        url={url}
        playsinline={true}
        controls={true}
        config={{
          wistia: {
            options: {
              playerColor: themes[theme],
              controlsVisibleOnLoad: false,
            },
          },
        }}
        width="100%"
        height="100%"
      />
    </div>
  )
}
