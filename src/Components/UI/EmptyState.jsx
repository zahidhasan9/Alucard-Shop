import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

const EmptyState = ({
  title = 'Nothing found',
  message = 'Try searching with a different keyword.',
  buttonText = 'Continue Shopping',
  buttonLink = '/products',
}) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
        <SearchX className="text-yellow-600" size={32} />
      </div>

      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{message}</p>

      <Link
        to={buttonLink}
        className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;