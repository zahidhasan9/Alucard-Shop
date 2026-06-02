import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Flame,
  Grid2X2,
  List,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '../Components/Breadcrumb';
import EmptyState from '../Components/UI/EmptyState';
import WishlistButton from '../Components/WishlistButton';

import { getCategory, getProductsByCategory } from '../features/API';
import { addToCart, fetchCart } from '../features/cartSlice';
import { fetchWishlist } from '../features/wishlistSlice';

const QuickViewModal = lazy(() => import('../Components/Product/QuickViewModal'));

const PAGE_SIZE = 12;

const CATEGORY_THEME = {
  colors: {
    pageBg: '#F5F5F7',
    panel: '#FFFFFF',
    imageBg: '#F8F8FA',
    black: '#111111',
    softBlack: '#1D1D1F',
    muted: '#6E6E73',
    yellow: '#F7C600',
    border: 'rgba(0,0,0,0.08)',
    shadow: '0 18px 48px rgba(0,0,0,0.055)',
    hoverShadow: '0 24px 60px rgba(0,0,0,0.085)',
  },
};

const normalizeProductList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const normalizeCategory = (payload) => {
  if (payload?.data) return payload.data;
  if (payload?.category) return payload.category;
  if (payload?.name || payload?.slug) return payload;
  return null;
};

const formatTitleFromSlug = (slug = '') => {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatPrice = (value) => {
  const price = Number(value || 0);
  return `৳${price.toLocaleString('en-BD')}`;
};

const getProductImage = (product) => {
  return (
    product?.thumbnail?.url ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    product?.image?.url ||
    product?.image ||
    '/placeholder.png'
  );
};

const getProductUrl = (product) => {
  return `/product/${product?.slug || product?._id || product?.id}`;
};

const getProductId = (product) => {
  return product?._id || product?.id || product?.slug;
};

const getStock = (product) => {
  return Number(product?.countInStock ?? product?.stock ?? 0);
};

const getRating = (product) => {
  return Number(product?.rating || product?.ratings || product?.avgRating || 0);
};

const getReviews = (product) => {
  return Number(product?.numReviews || product?.reviews?.length || 0);
};

const getDiscount = (product) => {
  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);

  if (Number(product?.discount || 0) > 0) {
    return Number(product.discount);
  }

  if (oldPrice > price && oldPrice > 0) {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return 0;
};

const sortProducts = (items, sort) => {
  const products = [...items];

  if (sort === 'price-low') {
    return products.sort(
      (a, b) => Number(a?.price || 0) - Number(b?.price || 0)
    );
  }

  if (sort === 'price-high') {
    return products.sort(
      (a, b) => Number(b?.price || 0) - Number(a?.price || 0)
    );
  }

  if (sort === 'rating') {
    return products.sort((a, b) => getRating(b) - getRating(a));
  }

  if (sort === 'discount') {
    return products.sort((a, b) => getDiscount(b) - getDiscount(a));
  }

  if (sort === 'popular') {
    return products.sort(
      (a, b) =>
        Number(b?.sold || b?.numReviews || 0) -
        Number(a?.sold || a?.numReviews || 0)
    );
  }

  return products.sort(
    (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
  );
};

const ProductSkeleton = ({ view }) => {
  if (view === 'list') {
    return (
      <div className="grid gap-5 rounded-[30px] border border-black/5 bg-white p-4 shadow-[0_18px_48px_rgba(0,0,0,0.055)] sm:grid-cols-[240px_minmax(0,1fr)]">
        <div className="h-56 animate-pulse rounded-[24px] bg-black/5" />

        <div className="flex flex-col justify-center py-2">
          <div className="h-3 w-20 animate-pulse rounded-full bg-black/10" />
          <div className="mt-4 h-6 w-3/4 animate-pulse rounded-full bg-black/10" />
          <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-black/10" />
          <div className="mt-2 h-3 w-2/3 animate-pulse rounded-full bg-black/10" />
          <div className="mt-6 h-10 w-36 animate-pulse rounded-full bg-black/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-black/5 bg-white p-4 shadow-[0_18px_48px_rgba(0,0,0,0.055)]">
      <div className="h-60 animate-pulse rounded-[24px] bg-black/5" />
      <div className="mt-5 h-3 w-20 animate-pulse rounded-full bg-black/10" />
      <div className="mt-4 h-5 w-3/4 animate-pulse rounded-full bg-black/10" />
      <div className="mt-3 h-3 w-1/2 animate-pulse rounded-full bg-black/10" />
      <div className="mt-6 h-10 w-full animate-pulse rounded-full bg-black/10" />
    </div>
  );
};

const CategoryProductCard = ({ product, view }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user || {});
  const [quickView, setQuickView] = useState(false);

  const productId = getProductId(product);
  const image = getProductImage(product);
  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);
  const discount = getDiscount(product);
  const rating = getRating(product);
  const reviews = getReviews(product);
  const stock = getStock(product);
  const brand = product?.brand?.name || product?.brand || 'Alucard';
  const hasVariants =
    Array.isArray(product?.variants) && product.variants.length > 0;

  const handleAddToCart = () => {
    if (!user && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!productId) return;

    if (hasVariants) {
      navigate(getProductUrl(product));
      return;
    }

    dispatch(
      addToCart({
        productId,
        quantity: 1,
      })
    );

    setTimeout(() => {
      dispatch(fetchCart());
    }, 250);
  };

  if (view === 'list') {
    return (
      <>
        <article className="group grid overflow-hidden rounded-[30px] border border-black/5 bg-white p-4 shadow-[0_18px_48px_rgba(0,0,0,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.085)] sm:grid-cols-[260px_minmax(0,1fr)]">
          <div className="relative">
            <Link
              to={getProductUrl(product)}
              className="relative flex h-60 items-center justify-center overflow-hidden rounded-[24px] bg-[#F8F8FA]"
            >
              {discount > 0 && (
                <span className="absolute left-3 top-3 rounded-full bg-[#F7C600] px-3 py-1 text-[11px] font-semibold text-black">
                  Save {discount}%
                </span>
              )}

              {(product?.isFlashSell || product?.flash_sell) && (
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-[#F7C600]">
                  <Flame size={12} />
                  Flash
                </span>
              )}

              <img
                src={image}
                alt={product?.name || 'Product'}
                className="h-full max-h-56 w-full object-contain p-6 transition duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="absolute right-3 top-3 flex flex-col gap-2">
              <WishlistButton
                productId={productId}
                className="h-9 w-9 border border-black/10 bg-white/95 p-0 text-black shadow-sm hover:border-red-200 hover:text-red-600"
                iconClassName="h-4 w-4"
              />

              <button
                type="button"
                onClick={() => setQuickView(true)}
                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/95 text-black shadow-sm transition hover:bg-[#F7C600]"
                aria-label="Quick view"
                title="Quick view"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center px-1 py-4 sm:px-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
                {brand}
              </p>

              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-[11px] font-medium text-black/70">
                <Star size={12} className="fill-current" />
                {rating.toFixed(1)} ({reviews})
              </span>
            </div>

            <Link to={getProductUrl(product)}>
              <h3 className="mt-3 line-clamp-2 text-2xl font-semibold tracking-[-0.045em] text-[#1D1D1F] transition hover:text-black/65">
                {product?.name || product?.title || 'Product'}
              </h3>
            </Link>

            <p className="mt-3 line-clamp-2 max-w-2xl text-sm font-normal leading-6 text-black/55">
              {product?.shortDescription ||
                product?.description ||
                'Clean design, reliable quality, and ready for everyday use.'}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[#1D1D1F]">
                {formatPrice(price)}
              </p>

              {oldPrice > price && (
                <p className="text-sm font-medium text-black/35 line-through">
                  {formatPrice(oldPrice)}
                </p>
              )}

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  stock > 0
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-red-50 text-red-500'
                }`}
              >
                {stock > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={stock <= 0}
                className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart size={16} />
                {hasVariants ? 'Select Option' : 'Add to Cart'}
              </button>

              <Link
                to={getProductUrl(product)}
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-[#F7C600] transition hover:bg-black/85"
              >
                View
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </article>

        {quickView && (
          <Suspense fallback={null}>
            <QuickViewModal
              product={product}
              onClose={() => setQuickView(false)}
            />
          </Suspense>
        )}
      </>
    );
  }

  return (
    <>
      <article className="group overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-[0_18px_48px_rgba(0,0,0,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.085)]">
        <div className="relative overflow-hidden bg-[#F8F8FA]">
          <Link
            to={getProductUrl(product)}
            className="flex h-60 items-center justify-center"
          >
            {discount > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-[#F7C600] px-3 py-1 text-[11px] font-semibold text-black">
                Save {discount}%
              </span>
            )}

            {(product?.isFlashSell || product?.flash_sell) && (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-[#F7C600]">
                <Flame size={12} />
                Flash
              </span>
            )}

            <img
              src={image}
              alt={product?.name || 'Product'}
              className="h-full max-h-56 w-full object-contain p-6 transition duration-500 group-hover:scale-105"
            />
          </Link>

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <WishlistButton
              productId={productId}
              className="h-9 w-9 border border-black/10 bg-white/95 p-0 text-black shadow-sm hover:border-red-200 hover:text-red-600"
              iconClassName="h-4 w-4"
            />

            <button
              type="button"
              onClick={() => setQuickView(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/95 text-black shadow-sm transition hover:bg-[#F7C600]"
              aria-label="Quick view"
              title="Quick view"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
              {brand}
            </p>

            <p className="shrink-0 text-xs font-medium text-black/65">
              ★ {rating.toFixed(1)}
            </p>
          </div>

          <Link to={getProductUrl(product)}>
            <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 tracking-[-0.02em] text-[#1D1D1F] transition hover:text-black/65">
              {product?.name || product?.title || 'Product'}
            </h3>
          </Link>

          <div className="mt-3 flex flex-wrap items-end gap-2">
            <p className="text-xl font-semibold tracking-[-0.035em] text-[#1D1D1F]">
              {formatPrice(price)}
            </p>

            {oldPrice > price && (
              <p className="pb-0.5 text-sm font-medium text-black/35 line-through">
                {formatPrice(oldPrice)}
              </p>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <span
              className={
                stock > 0
                  ? 'truncate text-xs font-medium text-emerald-600'
                  : 'truncate text-xs font-medium text-red-500'
              }
            >
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </span>

            {stock > 0 && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600">
                Ready
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-[1fr_42px] gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F7C600] px-4 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={16} />
              {hasVariants ? 'Options' : 'Add to Cart'}
            </button>

            <Link
              to={getProductUrl(product)}
              className="grid h-[42px] w-[42px] place-items-center rounded-full bg-black text-[#F7C600] transition hover:bg-black/85"
              aria-label="View product"
              title="View product"
            >
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </article>

      {quickView && (
        <Suspense fallback={null}>
          <QuickViewModal product={product} onClose={() => setQuickView(false)} />
        </Suspense>
      )}
    </>
  );
};

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { isAuthenticated } = useSelector((state) => state.user || {});

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('latest');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoryTitle = category?.name || formatTitleFromSlug(slug);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);

      const [productResponse, categoryResponse] = await Promise.allSettled([
        getProductsByCategory(slug, {
          page,
          limit: PAGE_SIZE,
        }),
        getCategory(slug),
      ]);

      if (productResponse.status === 'fulfilled') {
        const payload = productResponse.value.data;
        const productList = normalizeProductList(payload);

        setProducts(productList);
        setTotal(Number(payload?.total || productList.length || 0));
        setPages(Number(payload?.totalPages || payload?.pages || 1));
      } else {
        setProducts([]);
        setTotal(0);
        setPages(1);
      }

      if (categoryResponse.status === 'fulfilled') {
        setCategory(normalizeCategory(categoryResponse.value.data));
      } else {
        setCategory(null);
      }
    } catch (error) {
      console.error('Category products fetch error:', error);
      setProducts([]);
      setCategory(null);
      setTotal(0);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug, page]);

  useEffect(() => {
    setPage(1);
    setSearchText('');
    setSort('latest');
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const displayProducts = useMemo(() => {
    const searchValue = searchText.trim().toLowerCase();

    let items = products;

    if (searchValue) {
      items = items.filter((product) =>
        product?.name?.toLowerCase().includes(searchValue)
      );
    }

    return sortProducts(items, sort);
  }, [products, searchText, sort]);

  const clearSearch = () => {
    setSearchText('');
  };

  const productGridClass =
    view === 'grid'
      ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid gap-5';

  return (
    <main
      className="min-h-screen font-Work_sans"
      style={{ backgroundColor: CATEGORY_THEME.colors.pageBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <Breadcrumb />

        {/* Clean Hero */}
        <section className="relative mt-5 overflow-hidden rounded-[36px] border border-black/5 bg-white px-5 py-12 text-center shadow-[0_18px_48px_rgba(0,0,0,0.055)] sm:px-8 lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#F7C600]/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
              <Sparkles size={13} />
              Category
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.075em] text-[#1D1D1F] sm:text-5xl lg:text-6xl">
              {categoryTitle}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-normal leading-7 text-[#6E6E73] sm:text-base">
              {category?.description ||
                `Browse selected products from ${categoryTitle} with a clean and simple shopping experience.`}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F7] px-5 py-3 text-sm font-semibold text-[#1D1D1F] transition hover:bg-black/10"
              >
                <ArrowLeft size={16} />
                Home
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
              >
                All Products
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Slim Toolbar */}
        <section className="sticky top-3 z-30 mt-6 rounded-[26px] border border-black/5 bg-white/85 p-3 shadow-[0_14px_38px_rgba(0,0,0,0.055)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-[#F5F5F7] px-4 py-3">
              <Search size={17} className="shrink-0 text-black/40" />

              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder={`Search ${categoryTitle}...`}
                className="w-full min-w-0 bg-transparent text-sm font-medium text-black outline-none placeholder:text-black/35"
              />

              {searchText && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/5 text-black/55 transition hover:bg-black/10"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full bg-[#F7C600] px-4 py-3 text-sm font-semibold text-black outline-none transition hover:bg-yellow-300"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="rating">Top rated</option>
                <option value="popular">Popular</option>
                <option value="discount">Best discount</option>
              </select>

              <button
                type="button"
                onClick={() => setView('grid')}
                className={`rounded-full p-3 transition-colors ${
                  view === 'grid'
                    ? 'bg-black text-[#F7C600]'
                    : 'bg-[#F5F5F7] text-black hover:bg-black/10'
                }`}
                aria-label="Grid view"
              >
                <Grid2X2 size={17} />
              </button>

              <button
                type="button"
                onClick={() => setView('list')}
                className={`rounded-full p-3 transition-colors ${
                  view === 'list'
                    ? 'bg-black text-[#F7C600]'
                    : 'bg-[#F5F5F7] text-black hover:bg-black/10'
                }`}
                aria-label="List view"
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40">
              Products
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[#1D1D1F]">
              {categoryTitle} Collection
            </h2>
          </div>

          <p className="text-sm font-medium text-[#6E6E73]">
            Showing{' '}
            <span className="font-semibold text-[#1D1D1F]">
              {displayProducts.length}
            </span>
            {total ? ` of ${total}` : ''} products
          </p>
        </section>

        {/* Products */}
        <section className="mt-5">
          {loading ? (
            <div className={productGridClass}>
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <ProductSkeleton key={index} view={view} />
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className={productGridClass}>
              {displayProducts.map((product) => (
                <CategoryProductCard
                  key={product?._id || product?.slug}
                  product={product}
                  view={view}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[30px] border border-black/5 bg-white px-5 py-14 text-center shadow-[0_18px_48px_rgba(0,0,0,0.055)]">
              <EmptyState
                icon={ShoppingBag}
                title="No products found"
                message={
                  searchText
                    ? `No matching products found for "${searchText}" in ${categoryTitle}.`
                    : `No products are available in ${categoryTitle} category right now.`
                }
                actionLabel="View All Products"
                actionTo="/products"
              />
            </div>
          )}
        </section>

        {/* Pagination */}
        {!loading && displayProducts.length > 0 && pages > 1 && (
          <section className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            <span className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-[#F7C600]">
              {page} / {pages}
            </span>

            <button
              type="button"
              disabled={page >= pages}
              onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
              className="rounded-full bg-[#F7C600] px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default CategoryProducts;