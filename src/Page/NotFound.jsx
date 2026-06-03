import { Link } from 'react-router-dom';
import { ArrowLeft, Home, SearchX, ShoppingBag } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle(
    'Page Not Found | Alucard Shop',
    'The page you are looking for does not exist.'
  );

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white text-center shadow-sm">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-yellow-600 p-8 text-white">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-yellow-400 text-gray-950">
              <SearchX size={44} />
            </div>

            <h1 className="mt-5 text-6xl font-black">404</h1>
            <h2 className="mt-2 text-2xl font-black">Page Not Found</h2>
            <p className="mt-2 text-sm text-gray-200">
              The page you are looking for does not exist or may have been
              moved.
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <Home size={18} />
                Back to Home
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <ShoppingBag size={18} />
                Shop Products
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;