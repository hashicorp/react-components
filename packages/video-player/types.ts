export type VideoPlayerThemes = 'primary' | 'neutral'

export interface VideoPlayerProps {
  /**
   * The URL for the video.
   * @example https://hashicorp.wistia.com/medias/031h9iogzx
   */
  url: string
  /**
   * Autoplay the video when mounted. Used when rendering video within
   * a modal. will not work on iOS and other mobile devices due to
   * restrictions on bandwidth on cellular networks. You can find more
   * information on these restrictions in the Player API Documentation.
   * @link https://wistia.com/support/developers/player-api#play
   */
  autoplay?: boolean
  /**
   * Optional theme that modifies the players controls
   * based on the choosen theme. Defaults to `primary`.
   */
  theme?: VideoPlayerThemes
}
