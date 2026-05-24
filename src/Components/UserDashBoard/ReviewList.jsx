// import { useState, useEffect } from 'react';
// // import Loader from '../Loader';
// import { Link } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserAllReviews } from '../../features/reviewSlice';
// const ReviewList = () => {
//   const { userallreviews } = useSelector((state) => state.review);
//   const dispatch = useDispatch();
//   const reviews = userallreviews;

//   useEffect(() => {
//     dispatch(getUserAllReviews());
//   }, [dispatch]);

//   return (
//     <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">My Reviews</h2>
//       <div className="space-y-4">
//         {reviews?.map((review, index) => (
//           <div key={index} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition">
//             <div className="flex justify-between items-center mb-1">
//               <h3 className="text-base font-medium text-gray-800">{review?.product?.name}</h3>
//               <span className="text-xs text-gray-500">
//                 {new Date(review.createdAt).toLocaleDateString('en-GB', {
//                   year: 'numeric',
//                   month: 'short',
//                   day: 'numeric'
//                 })}
//               </span>
//             </div>
//             {/* <div className="flex items-center mb-2">{renderStars(review.rating)}</div> */}
//             <div className="flex items-center mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-4 h-4 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
//                 </svg>
//               ))}
//             </div>
//             <p className="text-sm text-gray-700 mb-3">price: {review?.product?.price} tk</p>
//             <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
//             <div className="flex space-x-3">
//               <Link to={`/product/${review?.product?.slug}`} className="text-sm text-blue-600 hover:underline">
//                 View Product
//               </Link>
//               {/* <button className="text-sm text-blue-600 hover:underline">Edit</button>
//               <button className="text-sm text-red-600 hover:underline">Delete</button> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewList;


import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Package, Star } from 'lucide-react';

import { getUserAllReviews } from '../../features/reviewSlice';

const ReviewList = () => {
  const dispatch = useDispatch();
  const { userallreviews = [], loading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getUserAllReviews());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading reviews...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-950">Your Reviews</h2>
        <p className="text-sm text-gray-500">
          See all reviews you have submitted.
        </p>
      </div>

      {userallreviews.length ? (
        <div className="space-y-4">
          {userallreviews.map((review) => (
            <div
              key={review?._id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-gray-100 text-gray-500">
                    <Package size={28} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-950">
                      {review?.product?.name || 'Product'}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Reviewed on {formatDate(review?.createdAt)}
                    </p>

                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={17}
                          className={
                            i < Number(review?.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {review?.product?._id && (
                  <Link
                    to={`/product/${review?.product?.slug}`}
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    View Product
                  </Link>
                )}
              </div>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <div className="flex gap-2">
                  <MessageSquare size={18} className="mt-0.5 text-gray-500" />
                  <p className="text-sm leading-6 text-gray-700">
                    {review?.comment || 'No comment'}
                  </p>
                </div>
              </div>

              {review?.product?.price && (
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Price: ৳{review.product.price}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <Star className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-3 text-lg font-bold text-gray-900">
            No reviews yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your product reviews will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;