import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Rafi Ahmed',
    text: 'Product quality and delivery speed were impressive. The website feels easy to use.',
  },
  {
    name: 'Nusrat Jahan',
    text: 'Clean product details, smooth checkout, and nice packaging. Recommended.',
  },
  {
    name: 'Sakib Hasan',
    text: 'Loved the yellow-black brand style. Product cards look premium and clear.',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
            Reviews
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-950">
            Happy Customers
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Real shopping experience becomes better when the interface is clean,
            fast and trustworthy.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-black/5"
            >
              <div className="mb-4 flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-sm leading-6 text-gray-600">“{review.text}”</p>

              <h3 className="mt-5 text-sm font-black text-gray-950">
                {review.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;