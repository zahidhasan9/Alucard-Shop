// import { useState, useEffect } from 'react';
// import Loader from '../../../Components/Loader';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductReviews, createReview } from '../../../features/reviewSlice';
// const reviewsData = [
//   { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing!', date: 'April 10, 2025' },
//   { id: 2, name: 'Sarah Smith', rating: 4, comment: 'Great quality!', date: 'April 5, 2025' },
//   { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Highly recommend!', date: 'March 28, 2025' }
// ];

// const Reviews = ({ productID }) => {
//   // const { product, loading, error } = useSelector((state) => state.product);
//   // const { product, loading, error } = useSelector((state) => state.product);
//   const { reviews, loading } = useSelector((state) => state.review);
//   const dispatch = useDispatch();
//   // console.log('id', reviews);

//   const [userRating, setUserRating] = useState(0);
//   const [userComment, setUserComment] = useState('');

//   const handleReviewSubmit = async () => {
//     if (!userRating || !userComment) return alert('Fill out both fields.');
//     alert(`Thanks for rating ${userRating}★`);
//     try {
//       await dispatch(
//         createReview({
//           product: productID,
//           rating: userRating,
//           comment: userComment
//         })
//       ).unwrap();
//       dispatch(getProductReviews(productID));
//       // form reset
//       setUserRating(0);
//       setUserComment('');
//     } catch (error) {
//       console.error('Review submission failed:', error);
//       // alert('Failed to submit review. Try again.');
//     }
//   };

//   useEffect(() => {
//     dispatch(getProductReviews(productID));
//   }, [dispatch]);

//   if (loading) return <Loader />;
//   if (!reviews) return <p className="text-center text-gray-500">Product not found</p>;

//   return (
//     <>
//       <section className="mt-10 bg-white rounded-xl shadow p-6">
//         <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
//         <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//           {reviews.map((review, idx) => (
//             <div key={idx} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//               <div className="text-sm font-semibold">{review.user?.firstName}</div>
//               <div className="text-yellow-400 text-sm">
//                 {'★'.repeat(review.rating)}
//                 {'☆'.repeat(5 - review.rating)}
//               </div>
//               <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
//             </div>
//           ))}
//         </div>

//         {/* Submit Review */}
//         <div className="mt-6 border-t pt-4">
//           <h3 className="font-semibold mb-2">Add your rating</h3>
//           <div className="flex gap-1 mb-2">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 onClick={() => setUserRating(star)}
//                 className={`cursor-pointer text-xl ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//           <textarea
//             rows="3"
//             value={userComment}
//             onChange={(e) => setUserComment(e.target.value)}
//             placeholder="Write your review..."
//             className="w-full p-3 border rounded-lg text-sm mb-2"
//           ></textarea>
//           <button onClick={handleReviewSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             Submit Review
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Reviews;

import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../Loader';
import { createReview, getProductReviews } from '../../../features/reviewSlice';

const Reviews = ({ productID }) => {
  const { reviews = [], loading } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    if (productID) {
      dispatch(getProductReviews(productID));
    }
  }, [dispatch, productID]);

  const average = useMemo(() => {
    if (!reviews?.length) return 0;

    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleReviewSubmit = async () => {
    if (!userRating || !userComment.trim()) return;

    try {
      await dispatch(
        createReview({
          product: productID,
          rating: userRating,
          comment: userComment.trim(),
        })
      ).unwrap();

      dispatch(getProductReviews(productID));
      setUserRating(0);
      setUserComment('');
    } catch (error) {
      console.error('Review submission failed:', error);
    }
  };

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
            Feedback
          </p>

          <h2 className="mt-1 text-2xl font-black text-gray-950">
            Customer Reviews
          </h2>
        </div>

        <div className="rounded-3xl bg-yellow-50 px-6 py-4 text-center">
          <p className="text-3xl font-black text-gray-950">{average}</p>
          <div className="mt-1 flex justify-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                fill={index < Math.round(average) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="mt-1 text-xs font-bold text-gray-500">
            {reviews?.length || 0} reviews
          </p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : reviews?.length ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={review?._id || index}
              className="rounded-2xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black text-gray-950">
                  {review?.user?.firstName || review?.user?.name || 'Customer'}
                </h3>

                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      size={15}
                      fill={star < Number(review.rating || 0) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {review?.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 p-5 text-sm font-semibold text-gray-500">
          No reviews yet. Be the first to review this product.
        </div>
      )}

      <div className="mt-8 rounded-3xl bg-gray-50 p-5">
        <h3 className="text-lg font-black text-gray-950">Write a Review</h3>

        <div className="mt-4 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setUserRating(star)}
              className={`text-2xl ${
                star <= userRating ? 'text-yellow-500' : 'text-gray-300'
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
          className="mt-4 min-h-28 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium outline-none focus:border-yellow-400"
        />

        <button
          type="button"
          onClick={handleReviewSubmit}
          className="mt-4 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
        >
          Submit Review
        </button>
      </div>
    </section>
  );
};

export default Reviews;