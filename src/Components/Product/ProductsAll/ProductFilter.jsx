// import { useState, useEffect } from 'react';
// import { Link } from 'react-router';
// import { Funnel } from 'lucide-react';
// // import Pagination2 from './Pagination-two';
// import Pagination from './Pagination';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '../../../features/productSlice';
// import { getAllCategories } from '../../../features/categorySlice';
// import Loader from '../../Loader';

// const ProductFilter = () => {
//   const { products, loading, page, total } = useSelector((state) => state.product);
//   const dispatch = useDispatch();

//   //Pagination and search
//   const search = useSelector((state) => state.search.query);
//   const [limit, setLimit] = useState(12);
//   const totalPages = Math.ceil(total / limit);

//   // filters
//   const { categories } = useSelector((state) => state.category);
//   const [filters, setFilters] = useState({
//     category: '',
//     sort: 'price',
//     brand: '',
//     minPrice: 0,
//     maxPrice: 0,
//     minRating: 0
//   });
//   const [tempFilters, setTempFilters] = useState(filters);

//   useEffect(() => {
//     dispatch(getAllCategories());
//     dispatch(
//       getProducts({
//         category: filters.category,
//         sort: filters.sort,
//         maxPrice: filters.maxPrice,
//         minPrice: filters.minPrice,
//         page,
//         limit,
//         search
//       })
//     );
//   }, [dispatch, page, limit, search, filters]);

//   const handlePageChange = (newPage) => {
//     dispatch(getProducts({ page: newPage, limit, search }));
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="container font-Work_sans">
//           <div className="flex justify-between items-center px-2 mb-7 rounded-md bg-white shadow-xl ">
//             <div className="flex items-center space-x-1 px-2.5 py-1.5 shadow-sm bg-slate-100 rounded-md ">
//               <Funnel className="size-[15px] " />
//               <h1>Filter</h1>
//             </div>
//             <div className="flex justify-center items-center  gap-3  py-2  text-sm md:text-base ">
//               <label className="font-medium text-gray-700">Sort By:</label>
//               <select
//                 name="sort"
//                 className="border text-sm border-gray-300 rounded-md px-3 py-1.5 bg-slate-100 focus:outline-none"
//                 value={filters.sort}
//                 onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
//               >
//                 <option value="price">Price (Low to High)</option>
//                 <option value="price_desc">Price (High to Low)</option>
//                 <option value="popularity">Popularity</option>
//               </select>
//             </div>
//           </div>
//           {/* Filter Section */}
//           <div className="flex pb-10">
//             <div className="w-64 hidden lg:block ">
//               {/* Filter section */}
//               <div className="my-2 mr-1 bg-white rounded-md shadow-md  hover:shadow-xl">
//                 <div className="flex px-6 py-1.5 shadow-sm border-b-[1px] border-gray-400 border-opacity-40">
//                   <h1>Product Category</h1>
//                 </div>

//                 {categories.map((cat) => (
//                   <div key={cat._id} className="px-6 py-0.5">
//                     <div className="flex  space-x-1 items-center gap-1">
//                       <input
//                         type="checkbox"
//                         name="category"
//                         value={cat._id}
//                         onChange={(e) => {
//                           setFilters((prev) => ({
//                             ...prev,
//                             category: prev.category === cat._id ? null : cat._id
//                           }));
//                         }}
//                         checked={filters.category === cat._id}
//                       />
//                       <h1 className="text-sm  ">{cat.name}</h1>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Price Range Filter 2 */}
//               <div className="bg-white my-2 mr-1 shadow-xl rounded-md">
//                 <div className="flex px-6 py-1.5 shadow-sm border-b border-gray-300">
//                   <h1>Price Range</h1>
//                 </div>
//                 <div className="px-6 py-2 space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-sm">Min Price:</label>
//                     <input
//                       type="number"
//                       className="border px-2 py-1 rounded w-24"
//                       value={tempFilters.minPrice}
//                       onChange={(e) => setTempFilters({ ...tempFilters, minPrice: Number(e.target.value) })}
//                     />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <label className="text-sm">Max Price:</label>
//                     <input
//                       type="number"
//                       className="border px-2 py-1 rounded w-24"
//                       value={tempFilters.maxPrice}
//                       onChange={(e) => setTempFilters({ ...tempFilters, maxPrice: Number(e.target.value) })}
//                       min={tempFilters.minPrice}
//                     />
//                   </div>
//                   <button
//                     onClick={() => setFilters(tempFilters)}
//                     className="mt-2 w-full text-xs bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition"
//                   >
//                     Apply Filter
//                   </button>
//                 </div>
//               </div>

//               {/* filter 3  */}
//               <div className="bg-white my-2 mr-1 shadow-xl rounded-md">
//                 <div className="flex px-6 py-1.5 shadow-sm border-b-[1px] border-gray-400 border-opacity-40">
//                   <h1>Product Category</h1>
//                 </div>
//                 <div className="px-6 py-2">
//                   <div className="flex space-x-1 items-center gap-1">
//                     <input type="checkbox" />
//                     <h1 className="text-sm ">In Stock</h1>
//                   </div>
//                   <div className="flex space-x-1 items-center gap-1">
//                     <input type="checkbox" />
//                     <h1 className="text-sm">In Stock</h1>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* product part */}
//             <div className="w-full ">
//               <div className="w-full py-2  pl-1 ">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-[1px] ">
//                   {products.map((data, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-white rounded-md p-4 shadow-md hover:shadow-xl transition duration-300"
//                     >
//                       <div className="w-full flex justify-center">
//                         <img className="w-40 h-40 object-cover" src={data.thumbnail} alt={data._id} />
//                       </div>
//                       <Link to={`/product/${data.slug}`}>
//                         <div className="mt-4 text-center">
//                           <h1 className="text-base cursor-pointer text-blue-700 font-medium font-Blinker ">
//                             {data.name}
//                           </h1>
//                           <h1 className="text-sm font-bold text-green-600 mt-1">{data.price}</h1>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Pagination */}
//               <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
//               {/* <Pagination2 page={page} totalPages={total} onPageChange={handlePageChange} /> */}
//               <div className="mb-4 flex items-center gap-2">
//                 <label className="text-sm font-medium">Items per page:</label>
//                 <select
//                   value={limit}
//                   onChange={(e) => setLimit(Number(e.target.value))}
//                   className="border rounded px-3 py-1 text-sm"
//                 >
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductFilter;

// import { useEffect, useState } from 'react';
// import { Filter, SlidersHorizontal } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getProducts } from '../../../features/productSlice';
// import { getAllCategories } from '../../../features/categorySlice';
// import ProductCard from '../ProductCard';
// import ProductCardSkeleton from '../../UI/ProductCardSkeleton';
// import EmptyState from '../../UI/EmptyState';
// import Pagination from './Pagination';

// const ProductFilter = () => {
//   const dispatch = useDispatch();

//   const { products = [], loading, page: reduxPage, total = 0 } = useSelector(
//     (state) => state.product
//   );

//   const { categories = [] } = useSelector((state) => state.category);
//   const search = useSelector((state) => state.search?.query || '');

//   const [page, setPage] = useState(reduxPage || 1);
//   const [limit, setLimit] = useState(12);
//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   const [filters, setFilters] = useState({
//     category: '',
//     sort: 'price',
//     minPrice: '',
//     maxPrice: '',
//   });

//   const totalPages = Math.max(1, Math.ceil(total / limit));

//   useEffect(() => {
//     dispatch(getAllCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(
//       getProducts({
//         page,
//         limit,
//         search,
//         category: filters.category || undefined,
//         sort: filters.sort,
//         minPrice: filters.minPrice || undefined,
//         maxPrice: filters.maxPrice || undefined,
//       })
//     );
//   }, [dispatch, page, limit, search, filters]);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetFilters = () => {
//     setFilters({
//       category: '',
//       sort: 'price',
//       minPrice: '',
//       maxPrice: '',
//     });
//     setPage(1);
//   };

//   const FilterPanel = () => (
//     <aside className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
//       <div className="mb-5 flex items-center justify-between">
//         <h2 className="flex items-center gap-2 text-lg font-black text-gray-950">
//           <Filter size={20} />
//           Filter
//         </h2>

//         <button
//           type="button"
//           onClick={resetFilters}
//           className="text-xs font-black text-yellow-700 hover:text-black"
//         >
//           Reset
//         </button>
//       </div>

//       <div className="space-y-5">
//         <div>
//           <label className="mb-2 block text-sm font-black text-gray-800">
//             Sort By
//           </label>

//           <select
//             value={filters.sort}
//             onChange={(e) => {
//               setFilters((prev) => ({ ...prev, sort: e.target.value }));
//               setPage(1);
//             }}
//             className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold outline-none focus:border-yellow-400"
//           >
//             <option value="price">Price Low to High</option>
//             <option value="-price">Price High to Low</option>
//             <option value="-rating">Top Rated</option>
//             <option value="-createdAt">Newest</option>
//           </select>
//         </div>

//         <div>
//           <label className="mb-3 block text-sm font-black text-gray-800">
//             Category
//           </label>

//           <div className="max-h-64 space-y-2 overflow-auto pr-1">
//             {categories.map((cat) => (
//               <label
//                 key={cat?._id}
//                 className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-yellow-50"
//               >
//                 <input
//                   type="radio"
//                   name="category"
//                   checked={filters.category === cat?._id}
//                   onChange={() => {
//                     setFilters((prev) => ({
//                       ...prev,
//                       category: prev.category === cat?._id ? '' : cat?._id,
//                     }));
//                     setPage(1);
//                   }}
//                   className="accent-yellow-500"
//                 />

//                 {cat?.name}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="mb-3 block text-sm font-black text-gray-800">
//             Price Range
//           </label>

//           <div className="grid grid-cols-2 gap-3">
//             <input
//               type="number"
//               placeholder="Min"
//               value={filters.minPrice}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
//               }
//               className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold outline-none focus:border-yellow-400"
//             />

//             <input
//               type="number"
//               placeholder="Max"
//               value={filters.maxPrice}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
//               }
//               className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold outline-none focus:border-yellow-400"
//             />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );

//   return (
//     <section>
//       <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:hidden">
//         <p className="text-sm font-black text-gray-900">
//           {total || 0} products found
//         </p>

//         <button
//           type="button"
//           onClick={() => setShowMobileFilter((prev) => !prev)}
//           className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-black text-yellow-400"
//         >
//           <SlidersHorizontal size={16} />
//           Filters
//         </button>
//       </div>

//       {showMobileFilter && <div className="mb-5 lg:hidden">{FilterPanel()}</div>}

//       <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
//         <div className="hidden lg:block">{FilterPanel()}</div>

//         <div>
//           <div className="mb-5 hidden items-center justify-between rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:flex">
//             <p className="text-sm font-black text-gray-900">
//               {total || 0} products found
//             </p>

//             <div className="flex items-center gap-3">
//               <span className="text-sm font-semibold text-gray-500">
//                 Items per page:
//               </span>

//               <select
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//                 className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold outline-none focus:border-yellow-400"
//               >
//                 <option value={6}>6</option>
//                 <option value={12}>12</option>
//                 <option value={24}>24</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <ProductCardSkeleton key={index} />
//               ))}
//             </div>
//           ) : products?.length ? (
//             <>
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
//                 {products.map((product) => (
//                   <ProductCard
//                     key={product?._id || product?.slug}
//                     product={product}
//                   />
//                 ))}
//               </div>

//               <div className="mt-8">
//                 <Pagination
//                   page={page}
//                   totalPages={totalPages}
//                   onPageChange={handlePageChange}
//                 />
//               </div>
//             </>
//           ) : (
//             <EmptyState
//               title="No products found"
//               message="Try changing your search keyword, category or price filter."
//               buttonText="Reset Filters"
//               buttonLink="/products"
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductFilter;

