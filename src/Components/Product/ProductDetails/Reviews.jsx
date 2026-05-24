

// import { useEffect, useMemo, useState } from 'react';
// import { Star } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import Loader from '../../Loader';
// import { createReview, getProductReviews } from '../../../features/reviewSlice';

// const Reviews = ({ productID }) => {
//   const { reviews = [], loading } = useSelector((state) => state.review);
//   const dispatch = useDispatch();

//   const [userRating, setUserRating] = useState(0);
//   const [userComment, setUserComment] = useState('');

//   useEffect(() => {
//     if (productID) {
//       dispatch(getProductReviews(productID));
//     }
//   }, [dispatch, productID]);

//   const average = useMemo(() => {
//     if (!reviews?.length) return 0;

//     const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
//     return (total / reviews.length).toFixed(1);
//   }, [reviews]);

//   const handleReviewSubmit = async () => {
//     if (!userRating || !userComment.trim()) return;

//     try {
//       await dispatch(
//         createReview({
//           product: productID,
//           rating: userRating,
//           comment: userComment.trim(),
//         })
//       ).unwrap();

//       dispatch(getProductReviews(productID));
//       setUserRating(0);
//       setUserComment('');
//     } catch (error) {
//       console.error('Review submission failed:', error);
//     }
//   };

//   return (
//     <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//       <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//             Feedback
//           </p>

//           <h2 className="mt-1 text-2xl font-black text-gray-950">
//             Customer Reviews
//           </h2>
//         </div>

//         <div className="rounded-3xl bg-yellow-50 px-6 py-4 text-center">
//           <p className="text-3xl font-black text-gray-950">{average}</p>
//           <div className="mt-1 flex justify-center text-yellow-500">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <Star
//                 key={index}
//                 size={16}
//                 fill={index < Math.round(average) ? 'currentColor' : 'none'}
//               />
//             ))}
//           </div>
//           <p className="mt-1 text-xs font-bold text-gray-500">
//             {reviews?.length || 0} reviews
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : reviews?.length ? (
//         <div className="space-y-4">
//           {reviews.map((review, index) => (
//             <div
//               key={review?._id || index}
//               className="rounded-2xl border border-gray-100 p-4"
//             >
//               <div className="flex items-center justify-between gap-3">
//                 <h3 className="font-black text-gray-950">
//                   {review?.user?.firstName || review?.user?.name || 'Customer'}
//                 </h3>

//                 <div className="flex text-yellow-500">
//                   {Array.from({ length: 5 }).map((_, star) => (
//                     <Star
//                       key={star}
//                       size={15}
//                       fill={star < Number(review.rating || 0) ? 'currentColor' : 'none'}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 {review?.comment}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-2xl bg-gray-50 p-5 text-sm font-semibold text-gray-500">
//           No reviews yet. Be the first to review this product.
//         </div>
//       )}

//       <div className="mt-8 rounded-3xl bg-gray-50 p-5">
//         <h3 className="text-lg font-black text-gray-950">Write a Review</h3>

//         <div className="mt-4 flex gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               onClick={() => setUserRating(star)}
//               className={`text-2xl ${
//                 star <= userRating ? 'text-yellow-500' : 'text-gray-300'
//               }`}
//             >
//               ★
//             </button>
//           ))}
//         </div>

//         <textarea
//           value={userComment}
//           onChange={(e) => setUserComment(e.target.value)}
//           placeholder="Write your review..."
//           className="mt-4 min-h-28 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium outline-none focus:border-yellow-400"
//         />

//         <button
//           type="button"
//           onClick={handleReviewSubmit}
//           className="mt-4 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
//         >
//           Submit Review
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Reviews;



import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Star } from 'lucide-react';

import Loader from '../../../Components/Loader';
import { createReview, getProductReviews } from '../../../features/reviewSlice';

const Reviews = ({ productID, productId }) => {
  const dispatch = useDispatch();
  const actualProductId = productID || productId;

  const { reviews = [], loading } = useSelector((state) => state.review);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    if (actualProductId) {
      dispatch(getProductReviews(actualProductId));
    }
  }, [dispatch, actualProductId]);

  const handleReviewSubmit = async () => {
    if (!actualProductId) return;
    if (!userRating || !userComment.trim()) {
      alert('Please select rating and write a review.');
      return;
    }

    try {
      await dispatch(
        createReview({
          product: actualProductId,
          rating: userRating,
          comment: userComment.trim(),
        })
      ).unwrap();

      dispatch(getProductReviews(actualProductId));
      setUserRating(0);
      setUserComment('');
    } catch (error) {
      console.error('Review submission failed:', error);
    }
  };

  if (!actualProductId) {
    return (
      <div className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
        Product review unavailable.
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-950">
            Customer Reviews
          </h2>
          <p className="text-sm text-gray-500">
            {reviews.length} review{reviews.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {reviews.length ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-950">
                    {review.user?.firstName || 'Customer'}
                  </h3>

                  <div className="mt-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= Number(review.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-3 flex gap-2 text-sm leading-6 text-gray-700">
                <MessageSquare size={17} className="mt-0.5 text-gray-400" />
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <Star className="mx-auto text-gray-400" size={38} />
          <h3 className="mt-2 font-bold text-gray-900">No reviews yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Be the first to review this product.
          </p>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h3 className="font-black text-gray-950">Add your rating</h3>

        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setUserRating(star)}
              className={`text-2xl ${
                star <= userRating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        />

        <button
          onClick={handleReviewSubmit}
          className="mt-3 rounded-full bg-yellow-400 px-5 py-2 text-sm font-black text-gray-950 hover:bg-yellow-500"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;