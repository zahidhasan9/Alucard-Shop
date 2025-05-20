import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, createReview } from '../../../features/reviewSlice';
const reviewsData = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing!', date: 'April 10, 2025' },
  { id: 2, name: 'Sarah Smith', rating: 4, comment: 'Great quality!', date: 'April 5, 2025' },
  { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Highly recommend!', date: 'March 28, 2025' }
];

const Reviews = ({ productID }) => {
  // const { product, loading, error } = useSelector((state) => state.product);
  // const { product, loading, error } = useSelector((state) => state.product);
  const { reviews, loading } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  // console.log('id', reviews);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleReviewSubmit = async () => {
    if (!userRating || !userComment) return alert('Fill out both fields.');
    alert(`Thanks for rating ${userRating}★`);
    try {
      await dispatch(
        createReview({
          product: productID,
          rating: userRating,
          comment: userComment
        })
      ).unwrap();
      dispatch(getProductReviews(productID));
      // form reset
      setUserRating(0);
      setUserComment('');
    } catch (error) {
      console.error('Review submission failed:', error);
      alert('Failed to submit review. Try again.');
    }
  };

  useEffect(() => {
    dispatch(getProductReviews(productID));
  }, [dispatch]);

  if (loading) return <Loader />;
  if (!reviews) return <p className="text-center text-gray-500">Product not found</p>;

  return (
    <>
      <section className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <div className="text-sm font-semibold">{review.user?.firstName}</div>
              <div className="text-yellow-400 text-sm">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Submit Review */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Add your rating</h3>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setUserRating(star)}
                className={`cursor-pointer text-xl ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            rows="3"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-3 border rounded-lg text-sm mb-2"
          ></textarea>
          <button onClick={handleReviewSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </div>
      </section>
    </>
  );
};

export default Reviews;
