

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

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid2X2, List, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../Components/Breadcrumb';
import AdvancedProductFilters from '../Components/Product/Upgrade/AdvancedProductFilters';
import WishlistButton from '../Components/Product/Upgrade/WishlistButton';
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

const ProductCard = ({ product, view }) => (
  <div className={`group rounded-3xl border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${view === 'list' ? 'md:flex md:gap-5' : ''}`}>
    <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-2xl bg-gray-100">
      <img src={product.thumbnail || product.images?.[0]} alt={product.name} className={`${view === 'list' ? 'md:h-48 md:w-64' : 'h-64 w-full'} object-cover transition duration-500 group-hover:scale-110`} />
    </Link>
    <div className="flex flex-1 flex-col p-2">
      <div className="mt-2 flex items-start justify-between gap-3">
        <Link to={`/product/${product.slug}`} className="line-clamp-2 font-black text-gray-950 hover:underline">{product.name}</Link>
        <WishlistButton productId={product._id} className="!px-3 !py-2" />
      </div>
      <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xl font-black">৳{product.price}</span>
        {product.oldPrice > product.price && <span className="text-sm text-gray-400 line-through">৳{product.oldPrice}</span>}
        {product.discount > 0 && <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-black text-red-600">-{product.discount}%</span>}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-yellow-600">★ {Number(product.rating || 0).toFixed(1)}</span>
        <span className={product.countInStock > 0 ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
      </div>
    </div>
  </div>
);

const ProductsAll = () => {
  const dispatch = useDispatch();
  const { products, total, loading } = useSelector(state => state.product);
  const [filters, setFilters] = useState(defaultFilters);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [view, setView] = useState('grid');

  useEffect(() => {
    dispatch(fetchWishlist());
    getAllCategories().then(res => setCategories(res.data.categories || res.data.data || res.data || [])).catch(() => setCategories([]));
    getAllBrands().then(res => setBrands(res.data.brands || res.data.data || res.data || [])).catch(() => setBrands([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts({
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
    }));
  }, [dispatch, filters]);

  const pages = useMemo(() => Math.max(1, Math.ceil((total || 0) / filters.limit)), [total, filters.limit]);

  return (
    <main className="bg-gray-50 py-1">
      <div className="mx-auto max-w-7xl px-4  py-6">
        <div className="mb-5">
      <Breadcrumb />
    </div>
        <div className="mb-6 rounded-3xl bg-black p-6 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-400">Shop smarter</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Find your perfect product</h1>
          <p className="mt-3 max-w-2xl text-white/70">Advanced search, filters, stock status, rating, and price sorting.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
          <AdvancedProductFilters filters={filters} onChange={setFilters} categories={categories} brands={brands} onReset={() => setFilters(defaultFilters)} />

          <section>
            <div className="mb-5 flex flex-col gap-3 rounded-3xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-gray-500 md:w-96">
                <Search size={18} />
                <input value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value, page: 1 })} placeholder="Search products..." className="w-full bg-transparent outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <select value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value, page: 1 })} className="rounded-2xl border px-4 py-3 outline-none">
                  <option value="latest">Latest</option>
                  <option value="price_low">Price low to high</option>
                  <option value="price_high">Price high to low</option>
                  <option value="rating">Top rated</option>
                  <option value="popular">Popular</option>
                  <option value="discount">Best discount</option>
                </select>
                <button onClick={() => setView('grid')} className={`rounded-2xl border p-3 ${view === 'grid' ? 'bg-black text-white' : 'bg-white'}`}><Grid2X2 size={18} /></button>
                <button onClick={() => setView('list')} className={`rounded-2xl border p-3 ${view === 'list' ? 'bg-black text-white' : 'bg-white'}`}><List size={18} /></button>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-white" />)}
              </div>
            ) : products?.length ? (
              <div className={view === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                {products.map(product => <ProductCard key={product._id} product={product} view={view} />)}
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm">No products found.</div>
            )}

            <div className="mt-8 flex items-center justify-center gap-2">
              <button disabled={filters.page <= 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })} className="rounded-2xl border bg-white px-4 py-3 font-bold disabled:opacity-40">Prev</button>
              <span className="rounded-2xl bg-white px-4 py-3 font-bold shadow-sm">{filters.page} / {pages}</span>
              <button disabled={filters.page >= pages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })} className="rounded-2xl border bg-white px-4 py-3 font-bold disabled:opacity-40">Next</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductsAll;
