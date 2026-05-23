import { useMemo } from 'react';

const VariantSelector = ({ product, selectedVariant, onChange }) => {
  const variants = product?.variants || [];

  const grouped = useMemo(() => {
    const groups = { color: [], size: [], storage: [] };
    variants.forEach(variant => {
      ['color', 'size', 'storage'].forEach(key => {
        if (variant[key] && !groups[key].includes(variant[key])) groups[key].push(variant[key]);
      });
    });
    return groups;
  }, [variants]);

  if (!variants.length) return null;

  const selectByAttribute = (key, value) => {
    const matched = variants.find(variant => {
      const current = selectedVariant || {};
      return (
        variant[key] === value &&
        (!current.color || key === 'color' || variant.color === current.color) &&
        (!current.size || key === 'size' || variant.size === current.size) &&
        (!current.storage || key === 'storage' || variant.storage === current.storage)
      );
    });

    onChange(matched || variants.find(variant => variant[key] === value));
  };

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-gray-900">Choose variant</h3>
      <p className="mt-1 text-sm text-gray-500">Price and stock will update based on selection.</p>

      {['color', 'size', 'storage'].map(key =>
        grouped[key].length ? (
          <div key={key} className="mt-5">
            <p className="mb-2 text-sm font-semibold capitalize text-gray-700">{key}</p>
            <div className="flex flex-wrap gap-2">
              {grouped[key].map(value => {
                const active = selectedVariant?.[key] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => selectByAttribute(key, value)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-black'
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null
      )}

      {selectedVariant && (
        <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Selected</span>
            <span className="font-semibold">{selectedVariant.label || 'Custom variant'}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Stock</span>
            <span className={selectedVariant.stock > 0 ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}>
              {selectedVariant.stock > 0 ? `${selectedVariant.stock} left` : 'Out of stock'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
