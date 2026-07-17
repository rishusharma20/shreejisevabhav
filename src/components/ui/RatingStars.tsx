import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}

export default function RatingStars({
  rating,
  reviewCount,
  size = 14,
  className = "",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-saffron text-saffron"
          />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="text-warm-gray-lighter absolute" />
            <div className="absolute overflow-hidden" style={{ width: size / 2 }}>
              <Star size={size} className="fill-saffron text-saffron" />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-warm-gray-lighter"
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-warm-gray">({reviewCount})</span>
      )}
    </div>
  );
}
