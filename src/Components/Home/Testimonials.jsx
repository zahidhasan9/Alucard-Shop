// import { Star } from 'lucide-react';

// const reviews = [
//   {
//     name: 'Rafi Ahmed',
//     text: 'Product quality and delivery speed were impressive. The website feels easy to use.',
//   },
//   {
//     name: 'Nusrat Jahan',
//     text: 'Clean product details, smooth checkout, and nice packaging. Recommended.',
//   },
//   {
//     name: 'Sakib Hasan',
//     text: 'Loved the yellow-black brand style. Product cards look premium and clear.',
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="bg-white py-14">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="mx-auto mb-8 max-w-2xl text-center">
//           <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//             Reviews
//           </p>

//           <h2 className="mt-2 text-3xl font-black text-gray-950">
//             Happy Customers
//           </h2>

//           <p className="mt-3 text-sm leading-6 text-gray-500">
//             Real shopping experience becomes better when the interface is clean,
//             fast and trustworthy.
//           </p>
//         </div>

//         <div className="grid gap-5 md:grid-cols-3">
//           {reviews.map((review) => (
//             <div
//               key={review.name}
//               className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-black/5"
//             >
//               <div className="mb-4 flex text-yellow-500">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <Star key={index} size={18} fill="currentColor" />
//                 ))}
//               </div>

//               <p className="text-sm leading-6 text-gray-600">“{review.text}”</p>

//               <h3 className="mt-5 text-sm font-black text-gray-950">
//                 {review.name}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquareText, ShieldCheck, Star } from 'lucide-react';

import { getFeaturedReviews } from '../../features/API';

const TESTIMONIAL_THEME = {
  colors: {
    sectionBg: '#F7F7F5',
    cardBg: 'rgba(255,255,255,0.86)',
    cardBorder: 'rgba(10,10,10,0.07)',

    black: '#0A0A0A',
    yellow: '#F7C600',
    yellowSoft: 'rgba(247,198,0,0.12)',

    text: '#0A0A0A',
    mutedText: 'rgba(10,10,10,0.56)',

    white: '#FFFFFF',
    shadow: '0 18px 55px rgba(0,0,0,0.06)',
    hoverShadow: '0 24px 70px rgba(0,0,0,0.12)',
  },
};

const fallbackReviews = [
  {
    _id: 'fallback-1',
    rating: 5,
    comment:
      'Product quality and delivery speed were impressive. The website feels easy to use.',
    user: { firstName: 'Rafi', lastName: 'Ahmed' },
    isVerifiedPurchase: true,
  },
  {
    _id: 'fallback-2',
    rating: 5,
    comment:
      'Clean product details, smooth checkout, and nice packaging. Recommended.',
    user: { firstName: 'Nusrat', lastName: 'Jahan' },
    isVerifiedPurchase: true,
  },
  {
    _id: 'fallback-3',
    rating: 5,
    comment:
      'Loved the yellow-black brand style. Product cards look premium and clear.',
    user: { firstName: 'Sakib', lastName: 'Hasan' },
    isVerifiedPurchase: true,
  },
];

const getUserName = review => {
  const fullName = `${review?.user?.firstName || ''} ${
    review?.user?.lastName || ''
  }`.trim();

  return fullName || review?.name || 'Verified Customer';
};

const getProductName = review => {
  return review?.product?.name || 'Alucard Product';
};

const Testimonials = () => {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);

        const res = await getFeaturedReviews(6);
        const backendReviews = res?.data?.reviews || [];

        if (backendReviews.length) {
          setReviews(backendReviews);
        }
      } catch (error) {
        console.log(
          'Featured reviews fetch failed:',
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: TESTIMONIAL_THEME.colors.sectionBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: TESTIMONIAL_THEME.colors.yellow }}
          >
            Reviews
          </p>

          <h2
            className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
            style={{ color: TESTIMONIAL_THEME.colors.text }}
          >
            Loved by smart shoppers.
          </h2>

          <p
            className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 sm:text-base"
            style={{ color: TESTIMONIAL_THEME.colors.mutedText }}
          >
            Real customer feedback from approved product reviews, selected from
            the store experience.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[230px] animate-pulse rounded-[30px] border p-6"
                style={{
                  backgroundColor: TESTIMONIAL_THEME.colors.cardBg,
                  borderColor: TESTIMONIAL_THEME.colors.cardBorder,
                  boxShadow: TESTIMONIAL_THEME.colors.shadow,
                }}
              >
                <div className="mb-5 h-5 w-32 rounded-full bg-black/10" />
                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-black/10" />
                  <div className="h-3 w-5/6 rounded-full bg-black/10" />
                  <div className="h-3 w-3/5 rounded-full bg-black/10" />
                </div>
                <div className="mt-8 h-10 w-32 rounded-full bg-black/10" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.slice(0, 6).map(review => (
                <article
                  key={review._id}
                  className="group relative overflow-hidden rounded-[30px] border p-6 transition duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: TESTIMONIAL_THEME.colors.cardBg,
                    borderColor: TESTIMONIAL_THEME.colors.cardBorder,
                    boxShadow: TESTIMONIAL_THEME.colors.shadow,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow =
                      TESTIMONIAL_THEME.colors.hoverShadow;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow =
                      TESTIMONIAL_THEME.colors.shadow;
                  }}
                >
                  <div
                    className="absolute inset-x-6 top-0 h-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #F7C600, transparent)',
                    }}
                  />

                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-[#F7C600]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={17}
                          fill={
                            index < Number(review.rating || 5)
                              ? 'currentColor'
                              : 'none'
                          }
                          className={
                            index < Number(review.rating || 5)
                              ? 'text-[#F7C600]'
                              : 'text-black/15'
                          }
                        />
                      ))}
                    </div>

                    {review.isVerifiedPurchase && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{
                          backgroundColor:
                            TESTIMONIAL_THEME.colors.yellowSoft,
                          color: TESTIMONIAL_THEME.colors.black,
                        }}
                      >
                        <ShieldCheck size={12} />
                        Verified
                      </span>
                    )}
                  </div>

                  <MessageSquareText
                    size={24}
                    className="mb-4 text-black/18"
                    strokeWidth={1.6}
                  />

                  <p
                    className="text-sm font-medium leading-6"
                    style={{ color: TESTIMONIAL_THEME.colors.mutedText }}
                  >
                    “{review.comment || review.text}”
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <div>
                      <h3
                        className="text-sm font-semibold"
                        style={{ color: TESTIMONIAL_THEME.colors.text }}
                      >
                        {getUserName(review)}
                      </h3>

                      <p
                        className="mt-1 line-clamp-1 text-xs font-medium"
                        style={{ color: TESTIMONIAL_THEME.colors.mutedText }}
                      >
                        {getProductName(review)}
                      </p>
                    </div>

                    {review?.product?.slug && (
                      <Link
                        to={`/product/${review.product.slug}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:-translate-y-0.5"
                        style={{
                          backgroundColor: TESTIMONIAL_THEME.colors.black,
                          color: TESTIMONIAL_THEME.colors.yellow,
                        }}
                        title="View product"
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: TESTIMONIAL_THEME.colors.black,
                  color: TESTIMONIAL_THEME.colors.yellow,
                }}
              >
                Explore Products
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;