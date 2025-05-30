"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface LikeButtonProps {
  targetId: string
}

export function LikeButton({ targetId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <button
      onClick={toggleLike}
      aria-label={isLiked ? "Unlike" : "Like"}
      className="text-gray-500 hover:text-red-500 transition-colors"
    >
      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
    </button>
  )
}
