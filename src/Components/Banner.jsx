

// import { memo } from 'react';
// import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
// import { Link } from 'react-router-dom';

// import Bn1 from '../assets/images/Banner/bn1.webp';
// import Bn2 from '../assets/images/Banner/bn2.webp';
// import Bn3 from '../assets/images/Banner/bn3.webp';

// const BANNERS = [
//   {
//     img: Bn1,
//     icon: Sparkles,
//     label: 'Limited Offer',
//     title: 'Save up to 10%',
//     desc: 'Premium accessories for your daily tech setup.',
//     link: '/products',
//   },
//   {
//     img: Bn2,
//     icon: Zap,
//     label: 'New Arrival',
//     title: 'Fresh Tech Deals',
//     desc: 'Modern gadgets with a clean shopping experience.',
//     link: '/products',
//   },
//   {
//     img: Bn3,
//     icon: ShieldCheck,
//     label: 'Best Choice',
//     title: 'Smart Shopping',
//     desc: 'Trusted products with quality support.',
//     link: '/products',
//   },
// ];

// const Banner = () => {
//   return (
//     <section className="bg-[#f5f5f7] font-Work_sans">
//       <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F7C600]">
//               Featured Deals
//             </p>

//             <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black sm:text-3xl">
//               Premium picks for you.
//             </h2>

//             <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-black/55">
//               Explore selected gadgets and accessories with a clean, modern
//               shopping experience.
//             </p>
//           </div>

//           <Link
//             to="/products"
//             className="hidden items-center gap-2 rounded-full bg-[#F7C600] px-5 py-2.5 text-sm font-black text-black transition-colors hover:bg-yellow-300 sm:inline-flex"
//           >
//             View All
//             <ArrowUpRight size={15} />
//           </Link>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           {BANNERS.map((banner, index) => {
//             const Icon = banner.icon;

//             return (
//               <Link
//                 key={banner.title}
//                 to={banner.link}
//                 className="group relative flex min-h-[210px] overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:border-black/15 hover:shadow-md"
//                 aria-label={`Shop ${banner.title}`}
//               >
//                 {/* Image */}
//                 <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden">
//                   <img
//                     src={banner.img}
//                     alt={banner.title}
//                     loading={index === 0 ? 'eager' : 'lazy'}
//                     decoding="async"
//                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
//                   />
//                 </div>

//                 {/* Soft overlay for readability */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

//                 {/* Content */}
//                 <div className="relative z-10 flex w-[72%] flex-col justify-between p-5">
//                   <div>
//                     <div className="mb-4 flex items-center gap-2">
//                       <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#F7C600] text-black">
//                         <Icon size={17} strokeWidth={1.9} />
//                       </span>

//                       <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black/55">
//                         {banner.label}
//                       </span>
//                     </div>

//                     <h3 className="max-w-[230px] text-2xl font-semibold leading-tight tracking-[-0.045em] text-black">
//                       {banner.title}
//                     </h3>

//                     <p className="mt-2 max-w-[230px] text-sm font-medium leading-6 text-black/55">
//                       {banner.desc}
//                     </p>
//                   </div>

//                   <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2.5 text-sm font-black text-black transition-colors group-hover:bg-yellow-300">
//                     Shop Now
//                     <ArrowUpRight size={15} />
//                   </span>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Mobile Button */}
//         <div className="mt-6 text-center sm:hidden">
//           <Link
//             to="/products"
//             className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
//           >
//             View All Deals
//             <ArrowUpRight size={15} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default memo(Banner);


























import { memo, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getActiveBanners } from '../features/API';

const normalizeBanners = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.banners)) return payload.banners;
  return [];
};

const BannerSkeleton = () => {
  return (
    <section className="bg-[#f5f5f7] font-Work_sans">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        <div className="mb-6">
          <div className="h-3 w-36 animate-pulse rounded-full bg-black/10" />
          <div className="mt-3 h-8 w-72 animate-pulse rounded-full bg-black/10" />
          <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded-full bg-black/10" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[210px] animate-pulse rounded-[26px] bg-white shadow-sm ring-1 ring-black/5"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const EmptyImage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black/5 text-black/35">
      <ImageOff size={34} />
    </div>
  );
};

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getActiveBanners(6)
      .then((res) => {
        if (!mounted) return;

        const bannerList = normalizeBanners(res.data);

        console.log('Public banners:', bannerList);

        setBanners(bannerList);
      })
      .catch((error) => {
        console.error('Banner fetch error:', error);
        if (mounted) setBanners([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (loading) return <BannerSkeleton />;

  if (!banners.length) return null;

  const activeBanner = banners[activeIndex];

  const sideBanners = banners
    .filter((_, index) => index !== activeIndex)
    .slice(0, 2);

  return (
    <section className="bg-[#f5f5f7] font-Work_sans">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#F7C600]">
              <Sparkles size={15} />
              Featured Deals
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-black sm:text-3xl">
              Premium picks for you.
            </h2>

            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-black/55">
              Explore active offers and selected shopping campaigns.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 rounded-full bg-[#F7C600] px-5 py-2.5 text-sm font-black text-black transition-colors hover:bg-yellow-300 sm:inline-flex"
          >
            View All
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Link
            to={activeBanner.link || '/products'}
            className="group relative min-h-[330px] overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/10 transition hover:shadow-md"
          >
            {activeBanner.image ? (
              <img
                src={activeBanner.image}
                alt={activeBanner.title}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <EmptyImage />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/45 to-black/5" />

            <div className="relative z-10 flex min-h-[330px] max-w-xl flex-col justify-between p-6 text-white sm:p-8 lg:p-10">
              <div>
                <span className="inline-flex rounded-full bg-[#F7C600] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">
                  {activeBanner.label || 'Featured'}
                </span>

                <h3 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                  {activeBanner.title}
                </h3>

                {activeBanner.subtitle && (
                  <p className="mt-4 max-w-md text-sm font-medium leading-7 text-white/75 sm:text-base">
                    {activeBanner.subtitle}
                  </p>
                )}
              </div>

              <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#F7C600] px-5 py-3 text-sm font-black text-black transition group-hover:bg-yellow-300">
                {activeBanner.buttonText || 'Shop Now'}
                <ArrowUpRight size={16} />
              </span>
            </div>

            {banners.length > 1 && (
              <div className="absolute bottom-5 right-5 z-20 flex gap-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    prevBanner();
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Previous banner"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    nextBanner();
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#F7C600] text-black shadow-sm transition hover:bg-yellow-300"
                  aria-label="Next banner"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </Link>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {sideBanners.map((banner) => (
              <Link
                key={banner._id}
                to={banner.link || '/products'}
                className="group relative min-h-[157px] overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/10 transition hover:shadow-md"
              >
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <EmptyImage />
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />

                <div className="relative z-10 flex min-h-[157px] max-w-[75%] flex-col justify-between p-5">
                  <div>
                    <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-black/55">
                      {banner.label || 'Offer'}
                    </span>

                    <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] text-black">
                      {banner.title}
                    </h3>
                  </div>

                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2 text-xs font-black text-black transition group-hover:bg-yellow-300">
                    {banner.buttonText || 'Shop Now'}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {banners.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {banners.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-[#F7C600]'
                    : 'w-2.5 bg-black/15 hover:bg-black/30'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            View All Deals
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(Banner);