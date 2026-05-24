const PageSkeleton = ({ type = 'grid', count = 8 }) => {
  if (type === 'details') {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="container mx-auto max-w-6xl animate-pulse">
          <div className="mb-5 h-6 w-40 rounded bg-gray-200" />

          <div className="grid gap-6 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
            <div className="h-[360px] rounded-2xl bg-gray-200" />

            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-10 w-36 rounded bg-gray-200" />
              <div className="h-24 rounded bg-gray-200" />
              <div className="h-12 w-full rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-2xl bg-white shadow-sm"
        />
      ))}
    </div>
  );
};

export default PageSkeleton;