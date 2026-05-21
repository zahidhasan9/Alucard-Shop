

import { useEffect, useState } from 'react';

import * as API from '../../../features/API';
import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../../UI/ProductCardSkeleton';

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryId =
    product?.category?._id ||
    product?.category?.id ||
    product?.category ||
    '';

  useEffect(() => {
    let isMounted = true;

    const fetchRelatedProducts = async () => {
      if (!categoryId || !product?._id) {
        setRelatedProducts([]);
        return;
      }

      try {
        setLoading(true);

        const res = await API.getProducts({
          limit: 8,
          skip: 0,
          category: categoryId,
        });

        const products = res.data?.products || [];

        const filteredProducts = products
          .filter((item) => item?._id !== product?._id)
          .slice(0, 4);

        if (isMounted) {
          setRelatedProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Related products fetch failed:', error);

        if (isMounted) {
          setRelatedProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRelatedProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryId, product?._id]);

  if (loading) {
    return (
      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
            Related
          </p>

          <h2 className="mt-1 text-2xl font-black text-gray-950">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
          Related
        </p>

        <h2 className="mt-1 text-2xl font-black text-gray-950">
          You May Also Like
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard key={item?._id || item?.slug} product={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;