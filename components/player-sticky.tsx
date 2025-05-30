"use client"

import type React from "react"
import Image from "next/image"

interface PlayerStickyProps {
  cover: string | null
  title: string
  artist: string
  isPlaying: boolean
  onPlayPauseClick: () => void
  onExpandClick: () => void
}

const PlayerSticky: React.FC<PlayerStickyProps> = ({
  cover,
  title,
  artist,
  isPlaying,
  onPlayPauseClick,
  onExpandClick,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white z-50">
      <div className="container mx-auto py-2 px-4 flex items-center justify-between">
        {/* Cover Image */}
        <div className="w-16 h-16 relative rounded overflow-hidden">
          {cover ? (
            <Image src={cover || "/placeholder.svg"} alt="Album Cover" fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-800">
              <div className="h-5 w-5 relative">
                <Image
                  src="/images/logo-radio-carducci-2.png"
                  alt="Radio Carducci Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Song Information */}
        <div className="flex-grow ml-4">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-gray-400">{artist}</p>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onPlayPauseClick}
          className="px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Expand Button */}
        <button
          onClick={onExpandClick}
          className="ml-2 px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Expand
        </button>
      </div>

      {/* Expanded Player (Initially Hidden) */}
      {/* Add a state variable to control visibility if needed */}
      {/* Example: const [isExpanded, setIsExpanded] = useState(false); */}
      {/* Then conditionally render this section based on isExpanded */}
      {/* <div className={`expanded-player ${isExpanded ? 'visible' : 'hidden'}`}> */}
      <div className="hidden">
        <div className="container mx-auto py-4 px-4 flex flex-col items-center">
          {/* Expanded Cover Image */}
          <div className="w-48 h-48 relative rounded overflow-hidden mb-4">
            {cover ? (
              <Image src={cover || "/placeholder.svg"} alt="Album Cover" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-800">
                <div className="h-16 w-16 relative">
                  <Image
                    src="/images/logo-radio-carducci-2.png"
                    alt="Radio Carducci Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Expanded Song Information */}
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-400 mb-2">{artist}</p>

          {/* Expanded Play/Pause Button */}
          <button
            onClick={onPlayPauseClick}
            className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors mb-2"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          {/* Additional Controls (e.g., Volume, Skip) */}
          {/* Add your additional controls here */}
        </div>
      </div>
    </div>
  )
}

export default PlayerSticky
