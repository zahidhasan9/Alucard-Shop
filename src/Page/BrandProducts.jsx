import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Grid2X2,
  List,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import EmptyState from '../Components/UI/EmptyState';
import WishlistButton from '../Components/WishlistButton';
import { getBrand, getProducts } from '../features/API';
import { addToCart, fetchCart } from '../features/cartSlice';
import { fetchWishlist } from '../features/wishlistSlice';

const PAGE_SIZE = 12;

const normalizeBrand = (payload) => {
  if (payload?.data) return payload.data;
  if (payload?.brand) return payload.brand;
  if (payload?.name || payload?.slug) return payload;
  return null;
};

const normalizeProductList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
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
      (a, b) => Number(b?.sold || b?.numReviews || 0) - Number(a?.sold || a?.numReviews || 0)
    );
  }

  return products.sort(
    (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
  );
};

const ProductSkeleton = ({ view }) => {
  if (view === 'list') {
    return (
      <div className="grid gap-5 rounded-[26px] bg-white p-4 shadow-sm ring-1 ring-black/5 sm:grid-cols-[220px_1fr]">
        <div className="h-56 animate-pulse rounded-[22px] bg-black/5" />
        <div className="space-y-4 py-2">
          <div className="h-4 w-24 animate-pulse rounded-full bg-black/5" />
          <div className="h-6 w-3/4 animate-pulse rounded-full bg-black/5" />
          <div className="h-4 w-full animate-pulse rounded-full bg-black/5" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-black/5" />
          <div className="h-10 w-40 animate-pulse rounded-full bg-black/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[26px] bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="h-56 animate-pulse rounded-[22px] bg-black/5" />
      <div className="mt-4 h-4 w-20 animate-pulse rounded-full bg-black/5" />
      <div className="mt-3 h-5 w-full animate-pulse rounded-full bg-black/5" />
      <div className="mt-3 h-5 w-24 animate-pulse rounded-full bg-black/5" />
    </div>
  );
};

const BrandProductCard = ({ product, view }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user || {});

  const productId = getProductId(product);
  const image = getProductImage(product);
  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);
  const discount = getDiscount(product);
  const rating = getRating(product);
  const reviews = getReviews(product);
  const stock = getStock(product);
  const category = product?.category?.name || product?.category || 'Product';
  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;

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
      <article className="group grid overflow-hidden rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[240px_1fr]">
        <Link
          to={getProductUrl(product)}
          className="relative block overflow-hidden rounded-[24px] bg-[#F8F8FA]"
        >
          <img
            src={image}
            alt={product?.name || 'Product'}
            loading="lazy"
            className="h-64 w-full object-contain p-5 transition duration-500 group-hover:scale-105 sm:h-full"
          />

          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-[#F7C600] px-3 py-1 text-xs font-black text-black">
              Save {discount}%
            </span>
          )}
        </Link>

        <div className="flex flex-col p-2 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/45">
            <span>{category}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="fill-[#F7C600] text-[#F7C600]" />
              {rating.toFixed(1)} ({reviews})
            </span>
          </div>

          <Link to={getProductUrl(product)}>
            <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em] text-black transition hover:text-black/70">
              {product?.name || product?.title || 'Product'}
            </h3>
          </Link>

          <p className="mt-3 line-clamp-2 text-sm font-medium leading-7 text-black/50">
            {product?.shortDescription ||
              product?.description ||
              'Clean design, reliable quality, and ready for everyday use.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-black text-black">
              {formatPrice(price)}
            </span>

            {oldPrice > price && (
              <span className="text-sm font-bold text-black/35 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}

            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                stock > 0
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-500'
              }`}
            >
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={17} />
              {hasVariants ? 'Select Option' : 'Add to Cart'}
            </button>

            <Link
              to={getProductUrl(product)}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-black/85"
            >
              <Eye size={17} />
              View
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-[24px] bg-[#F8F8FA]">
        <Link to={getProductUrl(product)}>
          <img
            src={image}
            alt={product?.name || 'Product'}
            loading="lazy"
            className="h-56 w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#F7C600] px-3 py-1 text-xs font-black text-black">
            Save {discount}%
          </span>
        )}

        <div className="absolute right-3 top-3">
          <WishlistButton productId={productId} />
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between gap-2 text-xs font-bold text-black/45">
          <span className="truncate">{category}</span>
          <span className="inline-flex items-center gap-1">
            <Star size={13} className="fill-[#F7C600] text-[#F7C600]" />
            {rating.toFixed(1)}
          </span>
        </div>

        <Link to={getProductUrl(product)}>
          <h3 className="mt-2 line-clamp-2 min-h-[44px] text-base font-black leading-snug text-black transition hover:text-black/70">
            {product?.name || product?.title || 'Product'}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-black text-black">
            {formatPrice(price)}
          </span>

          {oldPrice > price && (
            <span className="text-xs font-bold text-black/35 line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span
            className={`truncate text-xs font-bold ${
              stock > 0 ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            {stock > 0 ? 'In stock' : 'Out of stock'}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className="rounded-full bg-[#F7C600] px-4 py-2 text-xs font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hasVariants ? 'Options' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
};

const BrandProducts = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { isAuthenticated } = useSelector((state) => state.user || {});

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('latest');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const brandTitle = brand?.name || formatTitleFromSlug(slug);
  const brandLogo = brand?.logo || '';

  const fetchBrandProducts = async () => {
    try {
      setLoading(true);

      const brandResponse = await getBrand(slug);
      const brandData = normalizeBrand(brandResponse.data);

      if (!brandData?._id) {
        setBrand(null);
        setProducts([]);
        setTotal(0);
        setPages(1);
        return;
      }

      setBrand(brandData);

      const productResponse = await getProducts({
        brand: brandData._id,
        limit: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        sort,
      });

      const payload = productResponse.data;
      const productList = normalizeProductList(payload);

      setProducts(productList);
      setTotal(Number(payload?.total || productList.length || 0));
      setPages(Number(payload?.pages || 1));
    } catch (error) {
      console.error('Brand products fetch error:', error);
      setBrand(null);
      setProducts([]);
      setTotal(0);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBrandProducts();
    }
  }, [slug, page, sort]);

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

  const productGridClass =
    view === 'grid'
      ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid gap-5';

  return (
    <main className="min-h-screen bg-[#F5F5F7] px-4 py-8 font-Work_sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5">
          <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#F7C600]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">
                <ShoppingBag size={15} />
                Brand Collection
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] text-black sm:text-5xl">
                {brandTitle}
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-black/55 sm:text-base">
                {brand?.description ||
                  `Browse selected ${brandTitle} products with a simple and clean shopping experience.`}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-sm ring-1 ring-black/10 transition hover:bg-black/5"
                >
                  <ArrowLeft size={17} />
                  Home
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
                >
                  All Products
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center bg-black p-8">
              <div className="flex h-40 w-40 items-center justify-center rounded-[32px] bg-white p-6">
                {brandLogo ? (
                  <img
                    src={brandLogo}
                    alt={brandTitle}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-5xl font-black text-black">
                    {brandTitle?.charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mt-5 flex flex-col gap-4 rounded-[26px] bg-white p-4 shadow-sm ring-1 ring-black/5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-[#F5F5F7] px-4 py-3">
            <Search size={18} className="shrink-0 text-black/45" />

            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={`Search ${brandTitle}...`}
              className="w-full min-w-0 bg-transparent text-sm font-medium text-black outline-none placeholder:text-black/35"
            />

            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText('')}
                className="grid h-7 w-7 place-items-center rounded-full bg-white text-black shadow-sm"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
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
              <Grid2X2 size={18} />
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
              <List size={18} />
            </button>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-5 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F7C600]">
            Products
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-black">
            {brandTitle} Collection
          </h2>

          <p className="mt-2 text-sm font-medium text-black/50">
            Showing {displayProducts.length}
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
                <BrandProductCard
                  key={getProductId(product)}
                  product={product}
                  view={view}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="No products found."
              description="No products are available for this brand right now."
              actionLabel="View all products"
              actionPath="/products"
            />
          )}
        </section>

        {/* Pagination */}
        {!loading && displayProducts.length > 0 && pages > 1 && (
          <section className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            <span className="rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-sm ring-1 ring-black/5">
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

export default BrandProducts;