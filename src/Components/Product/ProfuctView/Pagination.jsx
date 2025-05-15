// Pagination Component
// const Pagination = ({ page, totalPages, onPageChange }) => {
//   return (
//     <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
//       <button
//         onClick={() => onPageChange(page - 1)}
//         disabled={page === 1}
//         className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Prev
//       </button>

//       {Array.from({ length: totalPages }, (_, index) => {
//         const isActive = page === index + 1;
//         return (
//           <button
//             key={index + 1}
//             onClick={() => onPageChange(index + 1)}
//             className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 shadow-sm
//           ${
//             isActive
//               ? 'bg-blue-600 text-white font-semibold shadow-md'
//               : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-600'
//           }`}
//           >
//             {index + 1}
//           </button>
//         );
//       })}

//       <button
//         onClick={() => onPageChange(page + 1)}
//         disabled={page === totalPages}
//         className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

// it is a normal pagination for backup
{
  /* <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
  {Array.from({ length: totalPages }, (_, index) => {
    const isActive = page === index + 1;
    return (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 shadow-sm
          ${
            isActive
              ? 'bg-blue-600 text-white font-semibold shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-600'
          }`}
      >
        {index + 1}
      </button>
    );
  })}
</div>; */
}

const Pagination = ({ page, totalPages, onPageChange }) => {
  const createPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 2 pages
      pages.push(1);
      if (page > 3) pages.push('start-ellipsis');

      // Show current, prev and next
      for (let i = page - 1; i <= page + 1; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (page < totalPages - 2) pages.push('end-ellipsis');

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToRender = createPageNumbers();

  return (
    <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pagesToRender.map((item, idx) => {
        if (item === 'start-ellipsis' || item === 'end-ellipsis') {
          return (
            <span key={item + idx} className="px-3 py-1 text-gray-500 select-none">
              ...
            </span>
          );
        }

        const isActive = page === item;
        return (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 shadow-sm ${
              isActive
                ? 'bg-blue-600 text-white font-semibold shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {item}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
