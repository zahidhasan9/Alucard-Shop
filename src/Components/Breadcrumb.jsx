import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-black">
      <nav className="container py-4 px-6 text-sm font-medium" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
              Home
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={to} className="inline-flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-yellow-500" />
                {isLast ? (
                  <span className="text-yellow-300 capitalize">{value.replace(/-/g, ' ')}</span>
                ) : (
                  <Link
                    to={to}
                    className="text-yellow-400 hover:text-yellow-300 capitalize transition-colors duration-200"
                  >
                    {value.replace(/-/g, ' ')}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
