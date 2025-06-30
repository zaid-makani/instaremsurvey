'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarsRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

export function StarsRating({ rating, onRatingChange, className }: StarsRatingProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="transition-colors hover:scale-110 transform duration-200"
        >
          <Star
            className={cn(
              "w-6 h-6 transition-colors",
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}