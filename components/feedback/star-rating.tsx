"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  size?: number
}

export function StarRating({ rating, onRatingChange, size = 24 }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}
