// import { Link } from 'react-router-dom';
// import { SearchX } from 'lucide-react';

// const EmptyState = ({
//   title = 'Nothing found',
//   message = 'Try searching with a different keyword or browse our latest products.',
//   buttonText = 'Continue Shopping',
//   buttonLink = '/products',
// }) => {
//   return (
//     <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
//       <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
//         <SearchX className="text-yellow-700" size={38} />
//       </div>

//       <h2 className="text-2xl font-black text-gray-950">{title}</h2>

//       <p className="mt-3 text-sm leading-6 text-gray-500">{message}</p>

//       <Link
//         to={buttonLink}
//         className="mt-7 rounded-full bg-black px-7 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
//       >
//         {buttonText}
//       </Link>
//     </div>
//   );
// };

// export default EmptyState;


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