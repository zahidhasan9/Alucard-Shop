import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Star, CornerDownRight } from 'lucide-react';
import Loader from '../../../Components/Loader';
import { createReview, getProductReviews } from '../../../features/reviewSlice';

const getAdminReplyMessage = review => {
  if (!review) return '';

  if (typeof review.adminReply === 'string') {
    return review.adminReply;
  }

  return (
    review.adminReply?.message ||
    review.adminResponse ||
    review.adminReplyText ||
    review.reply ||
    ''
  );
};

const formatReplyDate = date => {
  if (!date) return '';

  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
};

const Reviews = ({ productID, productId }) => {
  const dispatch = useDispatch();
  const actualProductId = productID || productId;

  const { reviews = [], loading } = useSelector(state => state.review);

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
          {reviews.map(review => {
            const adminReplyMessage = getAdminReplyMessage(review);
            const adminReplyDate = formatReplyDate(review.adminReply?.repliedAt);

            return (
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
                      {[1, 2, 3, 4, 5].map(star => (
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
                  <span>{review.comment}</span>
                </p>

                {adminReplyMessage && (
                  <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <CornerDownRight size={17} className="text-yellow-700" />

                      <span className="text-sm font-black text-gray-950">
                        Admin Reply
                      </span>

                      {adminReplyDate && (
                        <span className="text-xs font-semibold text-gray-500">
                          • {adminReplyDate}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-medium leading-6 text-gray-700">
                      {adminReplyMessage}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
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
          {[1, 2, 3, 4, 5].map(star => (
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
          onChange={e => setUserComment(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        />

        <button
          type="button"
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