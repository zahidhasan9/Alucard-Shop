import { SlidersHorizontal, X } from 'lucide-react';

const AdvancedProductFilters = ({ filters, onChange, categories = [], brands = [], onReset }) => {
  const update = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <aside className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-black text-gray-950"><SlidersHorizontal size={18} /> Filters</h2>
        <button onClick={onReset} className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-red-600"><X size={16} /> Reset</button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">Search</label>
          <input value={filters.search || ''} onChange={e => update('search', e.target.value)} placeholder="Search products..." className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">Category</label>
          <select value={filters.category || ''} onChange={e => update('category', e.target.value)} className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black">
            <option value="">All categories</option>
            {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">Brand</label>
          <select value={filters.brand || ''} onChange={e => update('brand', e.target.value)} className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black">
            <option value="">All brands</option>
            {brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Min price</label>
            <input type="number" value={filters.minPrice || ''} onChange={e => update('minPrice', e.target.value)} className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Max price</label>
            <input type="number" value={filters.maxPrice || ''} onChange={e => update('maxPrice', e.target.value)} className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">Stock</label>
          <select value={filters.stock || ''} onChange={e => update('stock', e.target.value)} className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black">
            <option value="">All</option>
            <option value="in">In stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">Rating</label>
          <select value={filters.minRating || ''} onChange={e => update('minRating', e.target.value)} className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-black">
            <option value="">All ratings</option>
            <option value="4">4★ and up</option>
            <option value="3">3★ and up</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default AdvancedProductFilters;
