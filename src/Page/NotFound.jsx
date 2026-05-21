import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle(
    'Page Not Found | Alucard Shop',
    'The page you are looking for does not exist.'
  );

  return (
    <main className="min-h-[70vh] bg-gray-100 px-4 py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <SearchX size={40} className="text-yellow-700" />
        </div>

        <h1 className="text-6xl font-black text-gray-950">404</h1>

        <h2 className="mt-3 text-2xl font-black text-gray-950">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;