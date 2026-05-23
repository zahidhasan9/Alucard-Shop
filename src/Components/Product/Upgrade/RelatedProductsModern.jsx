import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import axios from '../../../Apiutils/axiosInstance';

const getProductsArray = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.product)) return data.product;

  return [];
};

const getImage = (product) => {
  const image =
    product?.thumbnail ||
    product?.image ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    product?.variants?.[0]?.image;

  if (typeof image === 'string') return image;
  if (image?.url) return image.url;

  return 'https://placehold.co/600x600?text=Product';
};

const getPrice = (product) => {
  const variantPrice = product?.variants?.find((item) => Number(item?.price || 0) > 0)?.price;
  return Number(variantPrice || product?.price || 0);
};

const getOldPrice = (product) => {
  const variantOldPrice = product?.variants?.find((item) => Number(item?.oldPrice || 0) > 0)?.oldPrice;
  return Number(variantOldPrice || product?.oldPrice || 0);
};

const formatPrice = (value) => `৳${Number(value || 0).toLocaleString('en-BD')}`;

const RelatedProductCard = ({ item }) => {
  const price = getPrice(item);
  const oldPrice = getOldPrice(item);

  const discount =
    oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : Number(item?.discount || 0);

  return (
    <Link
      to={`/product/${item.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={getImage(item)}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400">
          {item.category?.name || 'Product'}
        </p>

        <h3 className="line-clamp-2 min-h-[44px] text-sm font-black leading-5 text-gray-950 transition group-hover:text-black">
          {item.name}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-700">
            <Star size={13} fill="currentColor" />
            {Number(item.rating || 0).toFixed(1)}
          </div>

          <span className="text-xs text-gray-400">
            {item.numReviews || 0} reviews
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-lg font-black text-gray-950">{formatPrice(price)}</span>

          {oldPrice > price && (
            <span className="text-sm font-semibold text-gray-400 line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const RelatedProductsModern = ({ product, slug }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentSlug = product?.slug || slug;
  const currentId = product?._id;

  const categorySlug = useMemo(() => {
    if (!product?.category) return null;
    if (typeof product.category === 'string') return product.category;
    return product.category.slug || product.category.name || product.category._id || null;
  }, [product?.category]);

  useEffect(() => {
    let ignore = false;

    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);

        let finalProducts = [];

        /*
          1) First try category related products
          Backend route usually: /product/category/:slug
        */
        if (categorySlug) {
          try {
            const categoryResponse = await axios.get(`/product/category/${categorySlug}`);
            finalProducts = getProductsArray(categoryResponse);
          } catch (error) {
            finalProducts = [];
          }
        }

        /*
          2) Fallback: all products
          If category returns empty, show other products instead of blank section.
        */
        if (!finalProducts.length) {
          const allResponse = await axios.get('/product');
          finalProducts = getProductsArray(allResponse);
        }

        /*
          3) Remove current product and prioritize same category if possible
        */
        const filtered = finalProducts
          .filter((item) => {
            const sameId = currentId && item?._id === currentId;
            const sameSlug = currentSlug && item?.slug === currentSlug;
            return !sameId && !sameSlug;
          })
          .sort((a, b) => {
            const aSameCategory =
              a?.category?._id === product?.category?._id ||
              a?.category?.slug === product?.category?.slug ||
              a?.category?.name === product?.category?.name;

            const bSameCategory =
              b?.category?._id === product?.category?._id ||
              b?.category?.slug === product?.category?.slug ||
              b?.category?.name === product?.category?.name;

            return Number(bSameCategory) - Number(aSameCategory);
          })
          .slice(0, 8);

        if (!ignore) {
          setRelatedProducts(filtered);
        }
      } catch (error) {
        if (!ignore) {
          setRelatedProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchRelatedProducts();

    return () => {
      ignore = true;
    };
  }, [categorySlug, currentId, currentSlug, product?.category?._id, product?.category?.slug, product?.category?.name]);

  if (loading) {
    return (
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-950">Related Products</h2>
            <p className="mt-1 text-sm text-gray-500">Products you may also like</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="aspect-square animate-pulse bg-gray-100" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-gray-950">Related Products</h2>
          <p className="mt-1 text-sm text-gray-500">Products you may also like</p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-sm font-black text-gray-900 hover:underline"
        >
          View all
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <RelatedProductCard key={item._id || item.slug} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProductsModern;