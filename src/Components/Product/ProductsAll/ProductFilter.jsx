import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Funnel } from 'lucide-react';
// import Pagination2 from './Pagination-two';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/productSlice';
import { getAllCategories } from '../../../features/categorySlice';
import Loader from '../../Loader';

const ProductFilter = () => {
  const { products, loading, page, total } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  //Pagination and search
  const search = useSelector((state) => state.search.query);
  const [limit, setLimit] = useState(12);
  const totalPages = Math.ceil(total / limit);

  // filters
  const { categories } = useSelector((state) => state.category);
  const [filters, setFilters] = useState({
    category: '',
    sort: 'price',
    brand: '',
    minPrice: 0,
    maxPrice: 0,
    minRating: 0
  });
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(
      getProducts({
        category: filters.category,
        sort: filters.sort,
        maxPrice: filters.maxPrice,
        minPrice: filters.minPrice,
        page,
        limit,
        search
      })
    );
  }, [dispatch, page, limit, search, filters]);

  const handlePageChange = (newPage) => {
    dispatch(getProducts({ page: newPage, limit, search }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container font-Work_sans">
          <div className="flex justify-between items-center px-2 mb-7 rounded-md bg-white shadow-xl ">
            <div className="flex items-center space-x-1 px-2.5 py-1.5 shadow-sm bg-slate-100 rounded-md ">
              <Funnel className="size-[15px] " />
              <h1>Filter</h1>
            </div>
            <div className="flex justify-center items-center  gap-3  py-2  text-sm md:text-base ">
              <label className="font-medium text-gray-700">Sort By:</label>
              <select
                name="sort"
                className="border text-sm border-gray-300 rounded-md px-3 py-1.5 bg-slate-100 focus:outline-none"
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
              >
                <option value="price">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
          {/* Filter Section */}
          <div className="flex pb-10">
            <div className="w-64 hidden lg:block ">
              {/* Filter section */}
              <div className="my-2 mr-1 bg-white rounded-md shadow-md  hover:shadow-xl">
                <div className="flex px-6 py-1.5 shadow-sm border-b-[1px] border-gray-400 border-opacity-40">
                  <h1>Product Category</h1>
                </div>

                {categories.map((cat) => (
                  <div key={cat._id} className="px-6 py-0.5">
                    <div className="flex  space-x-1 items-center gap-1">
                      <input
                        type="checkbox"
                        name="category"
                        value={cat._id}
                        onChange={(e) => {
                          setFilters((prev) => ({
                            ...prev,
                            category: prev.category === cat._id ? null : cat._id
                          }));
                        }}
                        checked={filters.category === cat._id}
                      />
                      <h1 className="text-sm  ">{cat.name}</h1>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Range Filter 2 */}
              <div className="bg-white my-2 mr-1 shadow-xl rounded-md">
                <div className="flex px-6 py-1.5 shadow-sm border-b border-gray-300">
                  <h1>Price Range</h1>
                </div>
                <div className="px-6 py-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm">Min Price:</label>
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-24"
                      value={tempFilters.minPrice}
                      onChange={(e) => setTempFilters({ ...tempFilters, minPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm">Max Price:</label>
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-24"
                      value={tempFilters.maxPrice}
                      onChange={(e) => setTempFilters({ ...tempFilters, maxPrice: Number(e.target.value) })}
                      min={tempFilters.minPrice}
                    />
                  </div>
                  <button
                    onClick={() => setFilters(tempFilters)}
                    className="mt-2 w-full text-xs bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>

              {/* filter 3  */}
              <div className="bg-white my-2 mr-1 shadow-xl rounded-md">
                <div className="flex px-6 py-1.5 shadow-sm border-b-[1px] border-gray-400 border-opacity-40">
                  <h1>Product Category</h1>
                </div>
                <div className="px-6 py-2">
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm ">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                </div>
              </div>
            </div>

            {/* product part */}
            <div className="w-full ">
              <div className="w-full py-2  pl-1 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-[1px] ">
                  {products.map((data, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-md p-4 shadow-md hover:shadow-xl transition duration-300"
                    >
                      <div className="w-full flex justify-center">
                        <img className="w-40 h-40 object-cover" src={data.thumbnail} alt={data._id} />
                      </div>
                      <Link to={`/product/${data.slug}`}>
                        <div className="mt-4 text-center">
                          <h1 className="text-base cursor-pointer text-blue-700 font-medium font-Blinker ">
                            {data.name}
                          </h1>
                          <h1 className="text-sm font-bold text-green-600 mt-1">{data.price}</h1>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Pagination */}
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
              {/* <Pagination2 page={page} totalPages={total} onPageChange={handlePageChange} /> */}
              <div className="mb-4 flex items-center gap-2">
                <label className="text-sm font-medium">Items per page:</label>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
