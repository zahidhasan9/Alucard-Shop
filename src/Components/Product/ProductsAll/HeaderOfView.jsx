

// const HeaderOfView = () => {
//   return (
//     <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//       <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//         Collection
//       </p>

//       <h1 className="mt-2 text-3xl font-black text-gray-950">
//         All Products
//       </h1>

//       <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
//         Explore quality products with smart filtering, clear pricing and smooth
//         shopping experience.
//       </p>
//     </section>
//   );
// };

// export default HeaderOfView;


import { Grid2X2, List, SlidersHorizontal, X } from 'lucide-react';

const HeaderOfView = ({
  view,
  setView,
  totalProducts = 0,
  showing = 0,
  sort = 'latest',
  setSort,
  filterOpen,
  onToggleFilter,
}) => {
  return (
    <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-700">
            Products
          </p>
          <h2 className="mt-1 text-xl font-black text-gray-950">
            Explore Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {showing || totalProducts} of {totalProducts} products
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleFilter}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
              filterOpen
                ? 'bg-gray-950 text-yellow-400'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {filterOpen ? <X size={17} /> : <SlidersHorizontal size={17} />}
            {filterOpen ? 'Close Filter' : 'Filter'}
          </button>

          {setSort && (
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-yellow-500"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Popular</option>
              <option value="rating">Top Rated</option>
            </select>
          )}

          <div className="flex overflow-hidden rounded-full border border-gray-300 bg-white">
            <button
              type="button"
              onClick={() => setView?.('grid')}
              className={`grid h-10 w-11 place-items-center ${
                view === 'grid'
                  ? 'bg-gray-950 text-yellow-400'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              type="button"
              onClick={() => setView?.('list')}
              className={`grid h-10 w-11 place-items-center ${
                view === 'list'
                  ? 'bg-gray-950 text-yellow-400'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOfView;