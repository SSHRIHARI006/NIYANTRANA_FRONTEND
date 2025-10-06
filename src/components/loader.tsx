import Lottie from 'lottie-react'
import trainAnimation from '../assets/MetroRail.json'

type LoaderProps = {
  fullscreen?: boolean
  message?: string
}

export default function Loader({ fullscreen = false, message = "Loading" }: LoaderProps) {
  return (
    <div
      className={[
        fullscreen ? "h-full flex items-center justify-center" : "flex items-center justify-center",
        "w-full overflow-hidden",
      ].join(" ")}
      style={{ backgroundColor: '#EDEEF0' }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-200 h-100">
        <Lottie 
          animationData={trainAnimation} 
          loop={true}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}