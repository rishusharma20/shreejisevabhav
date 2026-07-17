export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-card overflow-hidden shadow-card border border-cream-dark">
      {/* Image skeleton */}
      <div className="aspect-[3/4] skeleton-shimmer" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-20 rounded skeleton-shimmer" />
        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        </div>
        {/* Rating */}
        <div className="h-3.5 w-28 rounded skeleton-shimmer" />
        {/* Price */}
        <div className="h-5 w-24 rounded skeleton-shimmer" />
        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <div className="flex-1 h-10 rounded-pill skeleton-shimmer" />
          <div className="w-24 h-10 rounded-pill skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
