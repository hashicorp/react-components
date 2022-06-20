export type VideoPlayerThemes = 'primary' | 'neutral'
export interface VideoPlayerProps {
  /**
   * The URL for the video.
   * @example https://hashicorp.wistia.com/medias/031h9iogzx
   */
  url: string
  /**
   * Optional theme that modifies the players controls
   * based on the choosen theme. Defaults to `primary`.
   */
  theme?: VideoPlayerThemes
}
