

// import Breadcrumb from '../Components/Breadcrumb';
// import HeaderOfView from '../Components/Product/ProductsAll/HeaderOfView';
// import ProductFilter from '../Components/Product/ProductsAll/ProductFilter';
// import usePageTitle from '../hooks/usePageTitle';

// const ProductsAll = () => {
//   usePageTitle(
//     'Products | Alucard Shop',
//     'Browse all products from Alucard Shop with filters, sorting and search.'
//   );

//   return (
//     <main className="bg-gray-100">
//       <Breadcrumb />

//       <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
//         <HeaderOfView />
//         <ProductFilter />
//       </div>
//     </main>
//   );
// };

// export default ProductsAll;

// import { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Grid2X2, List, Search } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import Breadcrumb from '../Components/Breadcrumb';
// import AdvancedProductFilters from '../Components/Product/Upgrade/AdvancedProductFilters';
// import WishlistButton from '../Components/Product/Upgrade/WishlistButton';
// import { getProducts } from '../features/productSlice';
// import { getAllCategories, getAllBrands } from '../features/API';
// import { fetchWishlist } from '../features/wishlistSlice';

// const defaultFilters = {
//   search: '',
//   category: '',
//   brand: '',
//   minPrice: '',
//   maxPrice: '',
//   minRating: '',
//   stock: '',
//   sort: 'latest',
//   page: 1,
//   limit: 12,
// };

// const ProductCard = ({ product, view }) => (
//   <div className={`group rounded-3xl border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${view === 'list' ? 'md:flex md:gap-5' : ''}`}>
//     <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-2xl bg-gray-100">
//       <img src={product.thumbnail || product.images?.[0]} alt={product.name} className={`${view === 'list' ? 'md:h-48 md:w-64' : 'h-64 w-full'} object-cover transition duration-500 group-hover:scale-110`} />
//     </Link>
//     <div className="flex flex-1 flex-col p-2">
//       <div className="mt-2 flex items-start justify-between gap-3">
//         <Link to={`/product/${product.slug}`} className="line-clamp-2 font-black text-gray-950 hover:underline">{product.name}</Link>
//         <WishlistButton productId={product._id} className="!px-3 !py-2" />
//       </div>
//       <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
//       <div className="mt-3 flex items-center gap-2">
//         <span className="text-xl font-black">৳{product.price}</span>
//         {product.oldPrice > product.price && <span className="text-sm text-gray-400 line-through">৳{product.oldPrice}</span>}
//         {product.discount > 0 && <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-black text-red-600">-{product.discount}%</span>}
//       </div>
//       <div className="mt-3 flex items-center justify-between text-sm">
//         <span className="font-semibold text-yellow-600">★ {Number(product.rating || 0).toFixed(1)}</span>
//         <span className={product.countInStock > 0 ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
//       </div>
//     </div>
//   </div>
// );

// const ProductsAll = () => {
//   const dispatch = useDispatch();
//   const { products, total, loading } = useSelector(state => state.product);
//   const [filters, setFilters] = useState(defaultFilters);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [view, setView] = useState('grid');

//   useEffect(() => {
//     dispatch(fetchWishlist());
//     getAllCategories().then(res => setCategories(res.data.categories || res.data.data || res.data || [])).catch(() => setCategories([]));
//     getAllBrands().then(res => setBrands(res.data.brands || res.data.data || res.data || [])).catch(() => setBrands([]));
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getProducts({
//       page: filters.page,
//       limit: filters.limit,
//       search: filters.search,
//       category: filters.category || undefined,
//       brand: filters.brand || undefined,
//       minPrice: filters.minPrice || undefined,
//       maxPrice: filters.maxPrice || undefined,
//       minRating: filters.minRating || undefined,
//       stock: filters.stock || undefined,
//       sort: filters.sort,
//     }));
//   }, [dispatch, filters]);

//   const pages = useMemo(() => Math.max(1, Math.ceil((total || 0) / filters.limit)), [total, filters.limit]);

//   return (
//     <main className="bg-gray-50 py-1">
//       <div className="mx-auto max-w-7xl px-4  py-6">
//         <div className="mb-5">
//       <Breadcrumb />
//     </div>
//         <div className="mb-6 rounded-3xl bg-black p-6 text-white md:p-8">
//           <p className="text-sm font-bold uppercase tracking-wide text-yellow-400">Shop smarter</p>
//           <h1 className="mt-2 text-3xl font-black md:text-5xl">Find your perfect product</h1>
//           <p className="mt-3 max-w-2xl text-white/70">Advanced search, filters, stock status, rating, and price sorting.</p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
//           <AdvancedProductFilters filters={filters} onChange={setFilters} categories={categories} brands={brands} onReset={() => setFilters(defaultFilters)} />

//           <section>
//             <div className="mb-5 flex flex-col gap-3 rounded-3xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
//               <div className="flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-gray-500 md:w-96">
//                 <Search size={18} />
//                 <input value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value, page: 1 })} placeholder="Search products..." className="w-full bg-transparent outline-none" />
//               </div>
//               <div className="flex items-center gap-2">
//                 <select value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value, page: 1 })} className="rounded-2xl border px-4 py-3 outline-none">
//                   <option value="latest">Latest</option>
//                   <option value="price_low">Price low to high</option>
//                   <option value="price_high">Price high to low</option>
//                   <option value="rating">Top rated</option>
//                   <option value="popular">Popular</option>
//                   <option value="discount">Best discount</option>
//                 </select>
//                 <button onClick={() => setView('grid')} className={`rounded-2xl border p-3 ${view === 'grid' ? 'bg-black text-white' : 'bg-white'}`}><Grid2X2 size={18} /></button>
//                 <button onClick={() => setView('list')} className={`rounded-2xl border p-3 ${view === 'list' ? 'bg-black text-white' : 'bg-white'}`}><List size={18} /></button>
//               </div>
//             </div>

//             {loading ? (
//               <div className="grid gap-4 md:grid-cols-3">
//                 {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-white" />)}
//               </div>
//             ) : products?.length ? (
//               <div className={view === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
//                 {products.map(product => <ProductCard key={product._id} product={product} view={view} />)}
//               </div>
//             ) : (
//               <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">No products found.</div>
//             )}

//             <div className="mt-8 flex items-center justify-center gap-2">
//               <button disabled={filters.page <= 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })} className="rounded-2xl border bg-white px-4 py-3 font-bold disabled:opacity-40">Prev</button>
//               <span className="rounded-2xl bg-white px-4 py-3 font-bold shadow-sm">{filters.page} / {pages}</span>
//               <button disabled={filters.page >= pages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })} className="rounded-2xl border bg-white px-4 py-3 font-bold disabled:opacity-40">Next</button>
//             </div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ProductsAll;

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid2X2, List, Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '../Components/Breadcrumb';
import AdvancedProductFilters from '../Components/Product/Upgrade/AdvancedProductFilters';
import WishlistButton from '../Components/Product/Upgrade/WishlistButton';
import PageSkeleton from '../Components/UI/PageSkeleton';
import { getProducts } from '../features/productSlice';
import { getAllCategories, getAllBrands } from '../features/API';
import { fetchWishlist } from '../features/wishlistSlice';

const defaultFilters = {
  search: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  stock: '',
  sort: 'latest',
  page: 1,
  limit: 12,
};

const ProductCard = ({ product, view }) => {
  const image =
    product?.thumbnail?.url ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    '/placeholder.png';

  const stock = Number(product?.countInStock ?? product?.stock ?? 0);

  return (
    <div
      className={`group rounded-2xl border bg-white p-3 shadow-sm transition hover:border-yellow-400 hover:shadow-md ${
        view === 'list' ? 'md:flex md:gap-5' : ''
      }`}
    >
      <Link
        to={`/product/${product?.slug || product?._id}`}
        className={`flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 p-3 ${
          view === 'list' ? 'md:h-44 md:w-56' : 'h-56 w-full'
        }`}
      >
        <img
          src={image}
          alt={product?.name || 'Product'}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-2">
        <div className="mt-2 flex items-start justify-between gap-3">
          <Link
            to={`/product/${product?.slug || product?._id}`}
            className="line-clamp-2 font-black text-gray-950 hover:text-yellow-700"
          >
            {product?.name}
          </Link>

          <WishlistButton productId={product?._id} className="!px-3 !py-2" />
        </div>

        <p className="mt-1 text-sm text-gray-500">
          {product?.category?.name || 'Product'}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xl font-black">
            ৳{Number(product?.price || 0).toLocaleString('en-BD')}
          </span>

          {Number(product?.oldPrice || 0) > Number(product?.price || 0) && (
            <span className="text-sm text-gray-400 line-through">
              ৳{Number(product?.oldPrice || 0).toLocaleString('en-BD')}
            </span>
          )}

          {Number(product?.discount || 0) > 0 && (
            <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-black text-red-600">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-yellow-600">
            ★ {Number(product?.rating || 0).toFixed(1)}
          </span>

          <span
            className={
              stock > 0
                ? 'font-semibold text-green-600'
                : 'font-semibold text-red-600'
            }
          >
            {stock > 0 ? 'In stock' : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductsAll = () => {
  const dispatch = useDispatch();
  const { products = [], total = 0, loading } = useSelector(
    (state) => state.product
  );

  const [filters, setFilters] = useState(defaultFilters);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWishlist());

    getAllCategories()
      .then((res) =>
        setCategories(res.data.categories || res.data.data || res.data || [])
      )
      .catch(() => setCategories([]));

    getAllBrands()
      .then((res) =>
        setBrands(res.data.brands || res.data.data || res.data || [])
      )
      .catch(() => setBrands([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getProducts({
        page: filters.page,
        limit: filters.limit,
        search: filters.search,
        category: filters.category || undefined,
        brand: filters.brand || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        minRating: filters.minRating || undefined,
        stock: filters.stock || undefined,
        sort: filters.sort,
      })
    );
  }, [dispatch, filters]);

  const pages = useMemo(
    () => Math.max(1, Math.ceil((total || 0) / filters.limit)),
    [total, filters.limit]
  );

  const updateFilters = (next) => {
    setFilters(next);
  };

  return (
    <main className="bg-gray-50 py-1 font-Work_sans">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5">
          <Breadcrumb />
        </div>

        <div className="mb-6 rounded-2xl bg-black p-6 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-400">
            Shop smarter
          </p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">
            Find your perfect product
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Advanced search, filters, stock status, rating, and price sorting.
          </p>
        </div>

        <section>
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-gray-500 md:w-96">
              <Search size={18} />
              <input
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value, page: 1 })
                }
                placeholder="Search products..."
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
                  filterOpen
                    ? 'bg-black text-yellow-400'
                    : 'border bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                {filterOpen ? <X size={18} /> : <Filter size={18} />}
                {filterOpen ? 'Close Filter' : 'Filter'}
              </button>

              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value, page: 1 })
                }
                className="rounded-xl border px-4 py-3 outline-none"
              >
                <option value="latest">Latest</option>
                <option value="price_low">Price low to high</option>
                <option value="price_high">Price high to low</option>
                <option value="rating">Top rated</option>
                <option value="popular">Popular</option>
                <option value="discount">Best discount</option>
              </select>

              <button
                type="button"
                onClick={() => setView('grid')}
                className={`rounded-xl border p-3 ${
                  view === 'grid' ? 'bg-black text-yellow-400' : 'bg-white'
                }`}
              >
                <Grid2X2 size={18} />
              </button>

              <button
                type="button"
                onClick={() => setView('list')}
                className={`rounded-xl border p-3 ${
                  view === 'list' ? 'bg-black text-yellow-400' : 'bg-white'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {filterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="absolute inset-0 bg-black/45"
                aria-label="Close filter"
              />

              <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-gray-50 p-4 shadow-2xl md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[380px] md:rounded-l-3xl md:rounded-t-none">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-950">
                    Product Filters
                  </h3>

                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
                  >
                    <X size={20} />
                  </button>
                </div>

                <AdvancedProductFilters
                  filters={filters}
                  onChange={updateFilters}
                  categories={categories}
                  brands={brands}
                  onReset={() => setFilters(defaultFilters)}
                />

                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="mt-4 w-full rounded-full bg-yellow-400 py-3 text-sm font-black text-gray-950"
                >
                  Show Products
                </button>
              </div>
            </div>
          )}

          <div
            className={
              filterOpen
                ? 'grid gap-6 lg:grid-cols-[310px_1fr]'
                : 'grid gap-6'
            }
          >
            {filterOpen && (
              <div className="hidden lg:block">
                <AdvancedProductFilters
                  filters={filters}
                  onChange={updateFilters}
                  categories={categories}
                  brands={brands}
                  onReset={() => setFilters(defaultFilters)}
                />
              </div>
            )}

            <div>
              {loading ? (
                <PageSkeleton
                  type={view === 'list' ? 'list' : 'grid'}
                  count={8}
                />
              ) : products?.length ? (
                <div
                  className={
                    view === 'grid'
                      ? filterOpen
                        ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                        : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'space-y-4'
                  }
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      view={view}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow-sm">
                  No products found.
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  disabled={filters.page <= 1}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                  className="rounded-xl border bg-white px-4 py-3 font-bold disabled:opacity-40"
                >
                  Prev
                </button>

                <span className="rounded-xl bg-white px-4 py-3 font-bold shadow-sm">
                  {filters.page} / {pages}
                </span>

                <button
                  disabled={filters.page >= pages}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                  className="rounded-xl border bg-white px-4 py-3 font-bold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductsAll;