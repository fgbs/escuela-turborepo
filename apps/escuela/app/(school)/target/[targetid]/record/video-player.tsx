import Player from "@/components/video-player"

export const VideoPlayer = ({ media }) => {
  const videoJsOptions = {
    techOrder: ['html5', 'youtube'],
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [media]
  }

  return (
    <Player {...videoJsOptions} />
  )
}
