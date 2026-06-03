import { memo, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Flame } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { getFlashsellProducts } from '../features/productSlice';
import ProductCard from './Product/ProductCard';
import ProductCardSkeleton from './UI/ProductCardSkeleton';
import EmptyState from './UI/EmptyState';

const getCountdown = () => {
  const now = new Date();
  const end = new Date();

  end.setHours(23, 59, 59, 999);

  const diff = Math.max(0, end - now);

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownBox = memo(({ label, value }) => {
  return (
    <div className="min-w-[58px] rounded-2xl bg-white px-3 py-2 text-center shadow-sm ring-1 ring-black/10">
      <p className="text-lg font-black leading-none text-black">
        {String(value).padStart(2, '0')}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
        {label}
      </p>
    </div>
  );
});

const FlashCountdown = memo(() => {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <CountdownBox label="Hour" value={countdown.hours} />
      <CountdownBox label="Min" value={countdown.minutes} />
      <CountdownBox label="Sec" value={countdown.seconds} />
    </div>
  );
});

const FlashSell = () => {
  const dispatch = useDispatch();

  const { flashPro = [], flashLoading, loading } = useSelector(
    (state) => state.product || {}
  );

  useEffect(() => {
    if (!flashPro?.length) {
      dispatch(getFlashsellProducts());
    }
  }, [dispatch, flashPro?.length]);

  const visibleProducts = useMemo(() => {
    return Array.isArray(flashPro) ? flashPro.slice(0, 8) : [];
  }, [flashPro]);

  const isLoading = Boolean(flashLoading || (loading && !flashPro?.length));

  return (
    <section className="bg-[#f5f5f7] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-black">
                <Flame size={14} />
                Limited Time
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-black md:text-5xl">
                Flash Sale
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 md:text-base">
                Grab premium deals before the day ends.
              </p>
            </div>

            <div className="flex flex-col gap-2 md:items-end">
              <div className="flex items-center gap-2 text-sm font-bold text-black/55">
                <Clock3 size={17} />
                Deal ends in
              </div>

              <FlashCountdown />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-black">
                  Today’s Picks
                </h3>

                <p className="text-sm text-black/45">
                  Best deals selected for you.
                </p>
              </div>

              <Link
                to="/products?collection=flash-sale"
                className="hidden items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300 sm:inline-flex"
              >
                Browse All
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : visibleProducts.length ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product?._id || product?.slug} product={product} />
                  ))}
                </div>

                <div className="mt-6 flex justify-center sm:hidden">
                  <Link
                    to="/products?collection=flash-sale"
                    className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
                  >
                    View All Deals
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </>
            ) : (
              <EmptyState
                title="No flash sale products"
                message="There are no flash sale products available right now."
                actionLabel="Browse products"
                actionTo="/products"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSell;