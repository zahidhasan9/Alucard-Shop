import { useEffect, useMemo, useState } from 'react';
import * as API from '../../../features/API';
import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../../UI/ProductCardSkeleton';

const getProductsFromResponse = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result)) return data.result;

  return [];
};

const uniqueProducts = (products) => {
  const map = new Map();

  products.forEach((product) => {
    const key = product?._id || product?.id || product?.slug;
    if (key && !map.has(key)) map.set(key, product);
  });

  return [...map.values()];
};

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryCandidates = useMemo(() => {
    const category = product?.category;

    return [
      category?._id,
      category?.id,
      category?.slug,
      category?.name,
      typeof category === 'string' ? category : null,
    ].filter(Boolean);
  }, [product?.category]);

  useEffect(() => {
    let isMounted = true;

    const removeCurrentProduct = (items = []) =>
      items.filter((item) => item?._id !== product?._id && item?.slug !== product?.slug);

    const fetchRelatedProducts = async () => {
      if (!product?._id) return;

      try {
        setLoading(true);

        let collectedProducts = [];

        for (const category of categoryCandidates) {
          try {
            const response = await API.getProducts({ limit: 12, skip: 0, category });
            const products = removeCurrentProduct(getProductsFromResponse(response));

            if (products.length) {
              collectedProducts = [...collectedProducts, ...products];
              break;
            }
          } catch (error) {
            // Category param can be id/slug/name depending on backend version.
            // If one format fails, the next candidate or fallback will run.
          }
        }

        if (collectedProducts.length < 4) {
          const response = await API.getProducts({ limit: 12, skip: 0 });
          const fallbackProducts = removeCurrentProduct(getProductsFromResponse(response));
          collectedProducts = [...collectedProducts, ...fallbackProducts];
        }

        if (isMounted) {
          setRelatedProducts(uniqueProducts(collectedProducts).slice(0, 4));
        }
      } catch (error) {
        console.error('Related products fetch failed:', error);
        if (isMounted) setRelatedProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRelatedProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryCandidates, product?._id, product?.slug]);

  if (loading) {
    return (
      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">Related</p>
            <h2 className="mt-1 text-2xl font-black text-gray-900">You May Also Like</h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!relatedProducts.length) return null;

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">Related</p>
          <h2 className="mt-1 text-2xl font-black text-gray-900">You May Also Like</h2>
        </div>
        <p className="text-sm font-semibold text-gray-500">Similar or popular products from the store</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard key={item?._id || item?.slug} product={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
