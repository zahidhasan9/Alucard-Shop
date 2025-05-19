import { useState, useEffect } from 'react';

const reviewsData = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing!', date: 'April 10, 2025' },
  { id: 2, name: 'Sarah Smith', rating: 4, comment: 'Great quality!', date: 'April 5, 2025' },
  { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Highly recommend!', date: 'March 28, 2025' }
];

const Reviews = () => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleReviewSubmit = () => {
    if (!userRating || !userComment) return alert('Fill out both fields.');
    alert(`Thanks for rating ${userRating}★`);
    setUserRating(0);
    setUserComment('');
  };

  return (
    <>
      <section className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {reviewsData.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <div className="text-sm font-semibold">{review.name}</div>
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
