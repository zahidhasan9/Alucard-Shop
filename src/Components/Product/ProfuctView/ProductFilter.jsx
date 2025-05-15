import React, { useState, useEffect } from 'react';
import { Funnel } from 'lucide-react';
// import Pagination2 from './Pagination-two';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/productSlice';
import Loader from '../../Loader';

const ProductFilter = () => {
  const { products, loading, page, total } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  //Pagination and search
  const search = useSelector((state) => state.search.query);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(getProducts({ page, limit, search }));
  }, [dispatch, page, limit, search]);

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
                className="border border-gray-300 rounded-md px-3 py-1.5 bg-slate-100 focus:outline-none"
              >
                <option value="price">Price</option>
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
                <div className="px-6 py-2">
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm ">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                  <div className="flex space-x-1 items-center gap-1">
                    <input type="checkbox" />
                    <h1 className="text-sm">In Stock</h1>
                  </div>
                </div>
              </div>
              {/* filter 2  */}
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
                      <div className="mt-4 text-center">
                        <h1 className="text-base cursor-pointer text-blue-700 font-medium font-Blinker ">
                          {data.name}
                        </h1>
                        <h1 className="text-sm font-bold text-green-600 mt-1">{data.price}</h1>
                      </div>
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
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
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
