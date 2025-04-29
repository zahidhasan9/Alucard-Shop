const ReviewList = () => {
  const reviews = [
    {
      product: 'Logitech G Pro X Superlight',
      date: '27 Apr 2025',
      rating: 4,
      comment: 'Excellent mouse, lightweight and responsive!'
    },
    {
      product: 'Dell XPS 13 9310',
      date: '20 Apr 2025',
      rating: 5,
      comment: 'Perfect for development. Great display and performance.'
    }
  ];

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 fill-current ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
      </svg>
    ));

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-medium text-gray-800">{review.product}</h3>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center mb-2">{renderStars(review.rating)}</div>
            <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
            <div className="flex space-x-3">
              <button className="text-sm text-blue-600 hover:underline">Edit</button>
              <button className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
