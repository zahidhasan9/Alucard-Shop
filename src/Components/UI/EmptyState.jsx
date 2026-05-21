import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

const EmptyState = ({
  title = 'Nothing found',
  message = 'Try searching with a different keyword or browse our latest products.',
  buttonText = 'Continue Shopping',
  buttonLink = '/products',
}) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
        <SearchX className="text-yellow-700" size={38} />
      </div>

      <h2 className="text-2xl font-black text-gray-950">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-gray-500">{message}</p>

      <Link
        to={buttonLink}
        className="mt-7 rounded-full bg-black px-7 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;