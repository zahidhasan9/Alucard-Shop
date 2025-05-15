import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pages = [
    ...(startPage > 1
      ? [{ key: 1, value: 1 }, ...(startPage > 2 ? [{ key: 'start-ellipsis', value: '...' }] : [])]
      : []),
    ...Array.from({ length: endPage - startPage + 1 }, (_, i) => ({
      key: startPage + i,
      value: startPage + i
    })),
    ...(endPage < totalPages
      ? [
          ...(endPage < totalPages - 1 ? [{ key: 'end-ellipsis', value: '...' }] : []),
          { key: totalPages, value: totalPages }
        ]
      : [])
  ];

  const buttonStyles = (isActive, isDisabled) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
      isDisabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
        : isActive
        ? 'bg-blue-500 text-white'
        : 'bg-slate-100 text-gray-700 hover:bg-blue-500 hover:text-white'
    }`;

  return (
    <div className="flex justify-center items-center mt-6 font-Work_sans">
      <div className="flex items-center gap-2  rounded-md p-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={buttonStyles(false, page === 1)}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pages.map((item) =>
          item.value === '...' ? (
            <span key={item.key} className="px-3 py-1.5 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={item.key}
              onClick={() => onPageChange(item.value)}
              className={buttonStyles(page === item.value, false)}
            >
              {item.value}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={buttonStyles(false, page === totalPages)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

// both code are scaleable
// const Pagination = ({ page, totalPages, onPageChange }) => {
//   const getVisiblePages = () => {
//     const pages = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);

//       if (page > 4) pages.push('...');

//       const start = Math.max(2, page - 1);
//       const end = Math.min(totalPages - 1, page + 1);

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       if (page < totalPages - 3) pages.push('...');

//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const buttonClass = (isActive, isDisabled) =>
//     `px-3 py-1 rounded-md text-sm font-medium transition ${
//       isDisabled
//         ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//         : isActive
//         ? 'bg-blue-600 text-white'
//         : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
//     }`;

//   return (
//     <div className="flex justify-center mt-6 font-sans">
//       <div className="flex items-center gap-2 bg-white shadow-md rounded-md p-2">
//         {/* Prev Button */}
//         <button
//           onClick={() => onPageChange(page - 1)}
//           disabled={page === 1}
//           className={buttonClass(false, page === 1)}
//         >
//           Prev
//         </button>

//         {/* Page Buttons */}
//         {getVisiblePages().map((p, i) =>
//           p === '...' ? (
//             <span key={i} className="px-3 py-1 text-gray-500 select-none">
//               ...
//             </span>
//           ) : (
//             <button
//               key={p}
//               onClick={() => onPageChange(p)}
//               className={buttonClass(page === p, false)}
//             >
//               {p}
//             </button>
//           )
//         )}

//         {/* Next Button */}
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page === totalPages}
//           className={buttonClass(false, page === totalPages)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
