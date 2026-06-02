


import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Filter,
  Flame,
  GitCompare,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '../Components/Breadcrumb';
import AdvancedProductFilters from '../Components/Product/Upgrade/AdvancedProductFilters';
import WishlistButton from '../Components/Product/Upgrade/WishlistButton';
import PageSkeleton from '../Components/UI/PageSkeleton';

import {
  getFlashsellProducts,
  getProducts,
} from '../features/productSlice';

import { getAllBrands, getAllCategories } from '../features/API';
import { fetchWishlist } from '../features/wishlistSlice';
import { isCompared, toggleCompareProduct } from '../utils/compareProducts';

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

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const formatPrice = (value) => {
  const price = Number(value || 0);
  return `৳${price.toLocaleString('en-BD')}`;
};

const getImage = (product) => {
  return (
    product?.thumbnail?.url ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    '/placeholder.png'
  );
};

const getProductUrl = (product) => {
  return `/product/${product?.slug || product?._id}`;
};

const getProductId = (product) => {
  return product?._id || product?.id || product?.slug;
};

const getCategoryName = (product) => {
  if (typeof product?.category === 'string') return 'Product';
  return product?.category?.name || 'Product';
};

const getStock = (product) => {
  return Number(product?.countInStock ?? product?.stock ?? 0);
};

const getDiscount = (product) => {
  return Number(product?.discount || product?.discountPercent || 0);
};

const ProductCard = ({ product, view }) => {
  const productId = getProductId(product);
  const image = getImage(product);
  const stock = getStock(product);
  const discount = getDiscount(product);

  const [compared, setCompared] = useState(isCompared(productId));

  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || product?.regularPrice || 0);
  const rating = Number(product?.rating || product?.avgRating || 0);

  useEffect(() => {
    setCompared(isCompared(productId));
  }, [productId]);

  const handleCompare = () => {
    toggleCompareProduct(product);
    setCompared(isCompared(productId));
  };

  if (view === 'list') {
    return (
      <article className="group flex flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white p-3 shadow-sm transition-colors duration-200 hover:border-black/15 hover:shadow-md md:flex-row md:p-4">
        <Link
          to={getProductUrl(product)}
          className="flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#f5f5f7] md:h-48 md:w-48"
        >
          <img
            src={image}
            alt={product?.name || 'Product'}
            className="h-full w-full object-contain p-5"
            loading="lazy"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-3 md:px-6">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[11px] font-bold text-black/60">
                {getCategoryName(product)}
              </span>

              {discount > 0 && (
                <span className="rounded-full bg-[#F7C600] px-3 py-1 text-[11px] font-black text-black">
                  Save {discount}%
                </span>
              )}

              {product?.isFlashSell && (
                <span className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[11px] font-black text-[#F7C600]">
                  <Flame size={12} />
                  Flash
                </span>
              )}
            </div>

            <Link to={getProductUrl(product)}>
              <h3 className="line-clamp-2 text-xl font-semibold tracking-[-0.03em] text-black transition-colors hover:text-black/70 md:text-2xl">
                {product?.name}
              </h3>
            </Link>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">
              {product?.description || 'Premium product from Alucard shop.'}
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex flex-wrap items-end gap-2">
                <span className="text-2xl font-bold tracking-[-0.04em] text-black">
                  {formatPrice(price)}
                </span>

                {oldPrice > price && (
                  <span className="pb-1 text-sm font-semibold text-black/30 line-through">
                    {formatPrice(oldPrice)}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold text-yellow-600">
                  ★ {rating.toFixed(1)}
                </span>

                <span
                  className={
                    stock > 0
                      ? 'font-semibold text-emerald-600'
                      : 'font-semibold text-red-500'
                  }
                >
                  {stock > 0 ? 'In stock' : 'Out of stock'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={getProductUrl(product)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F7C600] px-5 py-2.5 text-sm font-black text-black transition-colors hover:bg-yellow-300"
              >
                Details
                <ArrowRight size={15} />
              </Link>

              <button
                type="button"
                onClick={handleCompare}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition-colors ${
                  compared
                    ? 'bg-black text-[#F7C600]'
                    : 'bg-[#F7C600] text-black hover:bg-yellow-300'
                }`}
              >
                <GitCompare size={16} />
                {compared ? 'Compared' : 'Compare'}
              </button>

              <WishlistButton productId={productId} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group min-w-0 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:border-black/15 hover:shadow-md">
      <div className="relative bg-[#f5f5f7]">
        <Link
          to={getProductUrl(product)}
          className="flex aspect-square items-center justify-center overflow-hidden"
        >
          <img
            src={image}
            alt={product?.name || 'Product'}
            className="h-full w-full object-contain p-6 transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="rounded-full bg-[#F7C600] px-3 py-1 text-[11px] font-black text-black shadow-sm">
              Save {discount}%
            </span>
          )}

          {product?.isFlashSell && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[11px] font-black text-[#F7C600] shadow-sm">
              <Flame size={12} />
              Flash
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3">
          <WishlistButton
            productId={productId}
            className="!h-10 !w-10 !px-0 !py-0 text-[0px]"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">
            {getCategoryName(product)}
          </p>

          <span className="shrink-0 text-xs font-bold text-yellow-600">
            ★ {rating.toFixed(1)}
          </span>
        </div>

        <Link to={getProductUrl(product)}>
          <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-semibold leading-snug tracking-[-0.015em] text-black transition-colors hover:text-black/70">
            {product?.name}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-xl font-bold tracking-[-0.035em] text-black">
            {formatPrice(price)}
          </span>

          {oldPrice > price && (
            <span className="pb-0.5 text-xs font-semibold text-black/30 line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-sm">
          <span
            className={
              stock > 0
                ? 'truncate font-semibold text-emerald-600'
                : 'truncate font-semibold text-red-500'
            }
          >
            {stock > 0 ? 'In stock' : 'Out of stock'}
          </span>

          {stock > 0 && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
              Ready
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <Link
            to={getProductUrl(product)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F7C600] px-4 py-2.5 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Details
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            onClick={handleCompare}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
              compared
                ? 'bg-black text-[#F7C600]'
                : 'bg-[#F7C600] text-black hover:bg-yellow-300'
            }`}
            aria-label={compared ? 'Remove from compare' : 'Add to compare'}
            title={compared ? 'Compared' : 'Compare'}
          >
            <GitCompare size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

const ProductsAll = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const isFlashSalePage = searchParams.get('collection') === 'flash-sale';

  const {
    products = [],
    flashPro = [],
    total = 0,
    loading,
    listLoading,
    flashLoading,
  } = useSelector((state) => state.product || {});

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
    if (isFlashSalePage) {
      dispatch(getFlashsellProducts());
      return;
    }

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
  }, [dispatch, filters, isFlashSalePage]);

  const pages = useMemo(
    () => Math.max(1, Math.ceil((total || 0) / filters.limit)),
    [total, filters.limit]
  );

  const displayProducts = useMemo(() => {
    if (!isFlashSalePage) return normalizeList(products);

    let items = normalizeList(flashPro);
    const search = filters.search.trim().toLowerCase();

    if (search) {
      items = items.filter((product) =>
        product?.name?.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      items = items.filter((product) => {
        const categoryId =
          product?.category?._id || product?.category?.id || product?.category;

        return String(categoryId) === String(filters.category);
      });
    }

    if (filters.brand) {
      items = items.filter((product) => {
        const brandId =
          product?.brand?._id || product?.brand?.id || product?.brand;

        return String(brandId) === String(filters.brand);
      });
    }

    if (filters.minPrice) {
      items = items.filter(
        (product) => Number(product?.price || 0) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      items = items.filter(
        (product) => Number(product?.price || 0) <= Number(filters.maxPrice)
      );
    }

    if (filters.minRating) {
      items = items.filter(
        (product) =>
          Number(product?.rating || product?.avgRating || 0) >=
          Number(filters.minRating)
      );
    }

    if (filters.stock === 'in') {
      items = items.filter((product) => getStock(product) > 0);
    }

    if (filters.stock === 'out') {
      items = items.filter((product) => getStock(product) <= 0);
    }

    if (filters.sort === 'price-low') {
      items.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
    }

    if (filters.sort === 'price-high') {
      items.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
    }

    if (filters.sort === 'rating') {
      items.sort(
        (a, b) =>
          Number(b?.rating || b?.avgRating || 0) -
          Number(a?.rating || a?.avgRating || 0)
      );
    }

    if (filters.sort === 'discount') {
      items.sort((a, b) => getDiscount(b) - getDiscount(a));
    }

    if (filters.sort === 'popular') {
      items.sort(
        (a, b) =>
          Number(b?.sold || b?.numReviews || 0) -
          Number(a?.sold || a?.numReviews || 0)
      );
    }

    return items;
  }, [isFlashSalePage, products, flashPro, filters]);

  const isPageLoading = Boolean(
    isFlashSalePage
      ? (flashLoading ?? loading) && !displayProducts.length
      : (loading || listLoading) && !displayProducts.length
  );

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleFilterChange = (nextFilters) => {
    if (typeof nextFilters === 'function') {
      setFilters((prev) => {
        const updated = nextFilters(prev);

        return {
          ...updated,
          page: updated.page || 1,
        };
      });

      return;
    }

    setFilters({
      ...nextFilters,
      page: nextFilters.page || 1,
    });
  };

  const pageTitle = isFlashSalePage
    ? 'Flash Sale Products'
    : 'Shop all products';

  const pageSubtitle = isFlashSalePage
    ? 'Limited-time offers, selected from active flash sale items.'
    : 'Browse gadgets with clean filters, quick compare, and smooth shopping.';

  const layoutClass = filterOpen
    ? 'grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]'
    : 'grid gap-6';

  const productGridClass =
    view === 'grid'
      ? filterOpen
        ? 'grid gap-5 sm:grid-cols-2 2xl:grid-cols-3'
        : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid gap-5';

  return (
    <main className="min-h-screen bg-[#f5f5f7] pb-20 text-black">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <Breadcrumb />
        </div>
      </section>

      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center md:py-16">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-black shadow-sm ring-1 ring-black/10">
            {isFlashSalePage ? (
              <>
                <Flame size={15} className="text-[#F7C600]" />
                Flash Deals
              </>
            ) : (
              <>
                <SlidersHorizontal size={15} />
                Alucard Store
              </>
            )}
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.07em] text-black md:text-7xl">
            {pageTitle}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/55 md:text-lg">
            {pageSubtitle}
          </p>

          {isFlashSalePage && (
            <div className="mt-7 flex justify-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
              >
                View all products
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 rounded-[28px] border border-black/10 bg-white p-3 shadow-sm md:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-h-[50px] min-w-0 flex-1 items-center gap-3 rounded-full bg-[#f5f5f7] px-4 ring-1 ring-black/10">
              <Search size={18} className="shrink-0 text-black/35" />

              <input
                value={filters.search}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    search: event.target.value,
                    page: 1,
                  })
                }
                placeholder={
                  isFlashSalePage
                    ? 'Search flash sale products...'
                    : 'Search products...'
                }
                className="w-full min-w-0 bg-transparent text-sm font-semibold text-black outline-none placeholder:text-black/35"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!isFlashSalePage && (
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-4 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
                >
                  <GitCompare size={17} />
                  Compare
                </Link>
              )}

              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-black transition-colors ${
                  filterOpen
                    ? 'bg-black text-[#F7C600]'
                    : 'bg-[#F7C600] text-black hover:bg-yellow-300'
                }`}
              >
                {filterOpen ? <X size={17} /> : <Filter size={17} />}
                {filterOpen ? 'Close filter' : 'Filter'}
              </button>

              <select
                value={filters.sort}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    sort: event.target.value,
                    page: 1,
                  })
                }
                className="rounded-full bg-[#F7C600] px-4 py-3 text-sm font-black text-black outline-none"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="rating">Top rated</option>
                <option value="popular">Popular</option>
                <option value="discount">Best discount</option>
              </select>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className={`rounded-full p-3 transition-colors ${
                    view === 'grid'
                      ? 'bg-black text-[#F7C600]'
                      : 'bg-[#F7C600] text-black hover:bg-yellow-300'
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
                      : 'bg-[#F7C600] text-black hover:bg-yellow-300'
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isFlashSalePage && (
          <div className="mb-6 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-black/45">
                  <Flame size={14} className="text-[#F7C600]" />
                  Limited time collection
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black">
                  Showing flash sale only
                </h2>

                <p className="mt-1 text-sm text-black/50">
                  This page is filtered from active flash sale products.
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
              >
                View all products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {filterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="absolute inset-0 bg-black/45"
              aria-label="Close filter"
            />

            <div className="absolute bottom-0 left-0 right-0 max-h-[86vh] overflow-y-auto rounded-t-[30px] bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-black">
                  Product filters
                </h3>

                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#F7C600] text-black"
                  aria-label="Close filter"
                >
                  <X size={18} />
                </button>
              </div>

              <AdvancedProductFilters
                filters={filters}
                onChange={handleFilterChange}
                categories={categories}
                brands={brands}
                onReset={resetFilters}
              />

              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="mt-4 w-full rounded-full bg-[#F7C600] py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
              >
                Show products
              </button>
            </div>
          </div>
        )}

        <div className={layoutClass}>
          {filterOpen && (
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-28 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
                <AdvancedProductFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  categories={categories}
                  brands={brands}
                  onReset={resetFilters}
                />
              </div>
            </aside>
          )}

          <div className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-black/50">
                Showing{' '}
                <span className="font-black text-black">
                  {displayProducts.length}
                </span>{' '}
                {isFlashSalePage ? 'flash sale items' : 'products'}
              </p>

              {!isFlashSalePage && (
                <select
                  value={filters.limit}
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      limit: Number(event.target.value),
                      page: 1,
                    })
                  }
                  className="w-fit rounded-full bg-[#F7C600] px-4 py-2.5 text-sm font-black text-black outline-none"
                >
                  <option value={8}>8 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={16}>16 per page</option>
                  <option value={24}>24 per page</option>
                </select>
              )}
            </div>

            {isPageLoading ? (
              <PageSkeleton type={view} count={filters.limit} />
            ) : displayProducts?.length ? (
              <div className={productGridClass}>
                {displayProducts.map((product) => (
                  <ProductCard
                    key={getProductId(product)}
                    product={product}
                    view={view}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-black/10 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#F7C600] text-black">
                  {isFlashSalePage ? (
                    <Flame size={28} />
                  ) : (
                    <Search size={28} />
                  )}
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-black">
                  No products found.
                </h3>

                <p className="mt-2 text-sm text-black/45">
                  {isFlashSalePage
                    ? 'No flash sale products are available right now.'
                    : 'Try changing your search or filter options.'}
                </p>

                {!isFlashSalePage && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            )}

            {!isFlashSalePage && displayProducts?.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={filters.page <= 1}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      page: filters.page - 1,
                    })
                  }
                  className="rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                <span className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-sm ring-1 ring-black/10">
                  {filters.page} / {pages}
                </span>

                <button
                  type="button"
                  disabled={filters.page >= pages}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      page: filters.page + 1,
                    })
                  }
                  className="rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsAll;