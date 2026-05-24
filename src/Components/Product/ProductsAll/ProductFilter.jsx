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
// import { Filter, Search, X } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getProducts } from '../../../features/productSlice';
// import { getAllCategories } from '../../../features/categorySlice';
// import ProductCard from '../ProductCard';
// import ProductCardSkeleton from '../../UI/ProductCardSkeleton';
// import EmptyState from '../../UI/EmptyState';
// import Pagination from './Pagination';
// import HeaderOfView from './HeaderOfView';

// const ProductFilter = () => {
//   const dispatch = useDispatch();

//   const { products = [], loading, page: reduxPage, total = 0 } = useSelector(
//     (state) => state.product
//   );

//   const { categories = [] } = useSelector((state) => state.category);
//   const search = useSelector((state) => state.search?.query || '');

//   const [page, setPage] = useState(reduxPage || 1);
//   const [limit, setLimit] = useState(12);
//   const [view, setView] = useState('grid');
//   const [filterOpen, setFilterOpen] = useState(false);

//   const [filters, setFilters] = useState({
//     category: '',
//     sort: 'latest',
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
//         sort: filters.sort || undefined,
//         minPrice: filters.minPrice || undefined,
//         maxPrice: filters.maxPrice || undefined,
//       })
//     );
//   }, [dispatch, page, limit, search, filters]);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setPage(1);
//   };

//   const resetFilters = () => {
//     setFilters({
//       category: '',
//       sort: 'latest',
//       minPrice: '',
//       maxPrice: '',
//     });
//     setPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const hasActiveFilter =
//     filters.category ||
//     filters.minPrice ||
//     filters.maxPrice ||
//     filters.sort !== 'latest';

//   return (
//     <section className="bg-gray-100 px-4 py-6 font-Work_sans">
//       <div className="container mx-auto">
//         <HeaderOfView
//           view={view}
//           setView={setView}
//           totalProducts={total || products.length}
//           showing={products.length}
//           sort={filters.sort}
//           setSort={(value) => handleFilterChange('sort', value)}
//           filterOpen={filterOpen}
//           onToggleFilter={() => setFilterOpen((prev) => !prev)}
//         />

//         {search && (
//           <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 shadow-sm">
//             <Search size={18} />
//             Search result for: <span className="text-gray-950">{search}</span>
//           </div>
//         )}

//         {filterOpen && (
//           <div className="fixed inset-0 z-50 lg:hidden">
//             <button
//               type="button"
//               onClick={() => setFilterOpen(false)}
//               className="absolute inset-0 bg-black/45"
//               aria-label="Close filter"
//             />

//             <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-gray-100 p-4 shadow-2xl md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[380px] md:rounded-l-3xl md:rounded-t-none">
//               <div className="mb-4 flex items-center justify-between">
//                 <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
//                   <Filter size={20} />
//                   Product Filters
//                 </h3>

//                 <button
//                   type="button"
//                   onClick={() => setFilterOpen(false)}
//                   className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-700 shadow-sm"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <FilterPanel
//                 categories={categories}
//                 filters={filters}
//                 limit={limit}
//                 setLimit={setLimit}
//                 handleFilterChange={handleFilterChange}
//                 resetFilters={resetFilters}
//                 hasActiveFilter={hasActiveFilter}
//               />

//               <button
//                 type="button"
//                 onClick={() => setFilterOpen(false)}
//                 className="mt-4 w-full rounded-full bg-yellow-400 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
//               >
//                 Show Products
//               </button>
//             </div>
//           </div>
//         )}

//         <div
//           className={
//             filterOpen
//               ? 'grid gap-5 lg:grid-cols-[280px_1fr]'
//               : 'grid gap-5'
//           }
//         >
//           {filterOpen && (
//             <div className="hidden lg:block">
//               <FilterPanel
//                 categories={categories}
//                 filters={filters}
//                 limit={limit}
//                 setLimit={setLimit}
//                 handleFilterChange={handleFilterChange}
//                 resetFilters={resetFilters}
//                 hasActiveFilter={hasActiveFilter}
//               />
//             </div>
//           )}

//           <div>
//             {loading ? (
//               <div
//                 className={
//                   view === 'grid'
//                     ? filterOpen
//                       ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
//                       : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                     : 'space-y-4'
//                 }
//               >
//                 {Array.from({ length: limit > 12 ? 12 : limit }).map(
//                   (_, index) => (
//                     <ProductCardSkeleton key={index} />
//                   )
//                 )}
//               </div>
//             ) : products?.length ? (
//               <>
//                 <div
//                   className={
//                     view === 'grid'
//                       ? filterOpen
//                         ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
//                         : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                       : 'grid gap-4'
//                   }
//                 >
//                   {products.map((product) => (
//                     <ProductCard key={product?._id} product={product} />
//                   ))}
//                 </div>

//                 <div className="mt-8">
//                   <Pagination
//                     currentPage={page}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 </div>
//               </>
//             ) : (
//               <EmptyState
//                 title="No products found"
//                 message="Try changing filters or search keyword."
//                 actionLabel="Reset Filters"
//                 actionTo="/products"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const FilterPanel = ({
//   categories,
//   filters,
//   limit,
//   setLimit,
//   handleFilterChange,
//   resetFilters,
//   hasActiveFilter,
// }) => {
//   return (
//     <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//       <div className="mb-5 flex items-center justify-between">
//         <h2 className="flex items-center gap-2 text-lg font-black text-gray-950">
//           <Filter size={20} />
//           Filters
//         </h2>

//         {hasActiveFilter && (
//           <button
//             type="button"
//             onClick={resetFilters}
//             className="text-sm font-bold text-red-500 hover:text-red-700"
//           >
//             Reset
//           </button>
//         )}
//       </div>

//       <div className="space-y-6">
//         <FilterBlock title="Category">
//           <div className="space-y-2">
//             <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
//               <input
//                 type="radio"
//                 checked={!filters.category}
//                 onChange={() => handleFilterChange('category', '')}
//                 className="accent-yellow-500"
//               />
//               All Categories
//             </label>

//             {categories.map((cat) => (
//               <label
//                 key={cat?._id}
//                 className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
//               >
//                 <input
//                   type="radio"
//                   checked={filters.category === cat?._id}
//                   onChange={() => handleFilterChange('category', cat?._id)}
//                   className="accent-yellow-500"
//                 />
//                 {cat?.name}
//               </label>
//             ))}
//           </div>
//         </FilterBlock>

//         <FilterBlock title="Price Range">
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="number"
//               min="0"
//               value={filters.minPrice}
//               onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//               placeholder="Min"
//               className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-yellow-400"
//             />

//             <input
//               type="number"
//               min="0"
//               value={filters.maxPrice}
//               onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//               placeholder="Max"
//               className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold outline-none focus:border-yellow-400"
//             />
//           </div>
//         </FilterBlock>

//         <FilterBlock title="Items Per Page">
//           <select
//             value={limit}
//             onChange={(e) => setLimit(Number(e.target.value))}
//             className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-bold outline-none focus:border-yellow-400"
//           >
//             <option value={6}>6 Products</option>
//             <option value={12}>12 Products</option>
//             <option value={24}>24 Products</option>
//             <option value={50}>50 Products</option>
//           </select>
//         </FilterBlock>
//       </div>
//     </aside>
//   );
// };

// const FilterBlock = ({ title, children }) => (
//   <div>
//     <h3 className="mb-3 text-sm font-black text-gray-950">{title}</h3>
//     {children}
//   </div>
// );

// export default ProductFilter;