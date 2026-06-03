import { Link } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';

const EmptyState = ({
  icon: Icon = PackageSearch,
  title = 'Nothing found',
  message = 'There is no data to show right now.',
  actionLabel,
  actionTo,
  buttonText,
  buttonLink,
}) => {
  const label = actionLabel || buttonText;
  const to = actionTo || buttonLink;

  return (
    <main className="min-h-[60vh] bg-gray-100 px-4 py-12 font-Work_sans">
      <div className="container mx-auto">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-yellow-100 text-yellow-700">
            <Icon size={42} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-950">{title}</h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">{message}</p>

          {label && to && (
            <Link
              to={to}
              className="mt-6 inline-flex rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-black text-gray-950 transition hover:bg-yellow-500"
            >
              {label}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default EmptyState;