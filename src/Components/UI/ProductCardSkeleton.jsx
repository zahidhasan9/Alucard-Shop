const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="aspect-square bg-gray-200" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-20 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-20 rounded bg-gray-200" />
          <div className="h-9 w-20 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;