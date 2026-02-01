import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardSkeletonProps {
  variant?: "collection" | "arrival";
}

const ProductCardSkeleton = ({ variant = "collection" }: ProductCardSkeletonProps) => {
  if (variant === "arrival") {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
        {/* Image Skeleton */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Skeleton className="w-full h-full" />
          {/* Badge skeleton */}
          <Skeleton className="absolute top-3 sm:top-4 left-3 sm:left-4 h-7 w-20 rounded-full" />
          {/* Wishlist button skeleton */}
          <Skeleton className="absolute top-3 sm:top-4 right-3 sm:right-4 h-9 w-9 rounded-full" />
        </div>

        {/* Info Skeleton */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-1">
              <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
              <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
              <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
    );
  }

  return (
    <div className="cursor-pointer">
      {/* Image Container Skeleton */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-secondary/30 aspect-[4/5]">
        <Skeleton className="w-full h-full" />
        {/* Badge skeleton */}
        <Skeleton className="absolute top-3 sm:top-4 left-3 sm:left-4 h-7 w-24 rounded-full" />
        {/* Wishlist button skeleton */}
        <Skeleton className="absolute top-3 sm:top-4 right-3 sm:right-4 h-9 w-9 rounded-full" />
      </div>

      {/* Product Info Skeleton */}
      <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-36" />
          <div className="flex gap-1">
            <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
            <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
            <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-48" />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
