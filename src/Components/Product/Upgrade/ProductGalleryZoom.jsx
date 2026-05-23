import { useMemo, useState } from 'react';
import { ZoomIn } from 'lucide-react';

const ProductGalleryZoom = ({ product, selectedVariant }) => {
  const images = useMemo(() => {
    const base = [product?.thumbnail, ...(product?.images || [])].filter(Boolean);
    const variantImage = selectedVariant?.image;
    return [...new Set([variantImage, ...base].filter(Boolean))];
  }, [product, selectedVariant]);

  const [active, setActive] = useState(images[0]);
  const mainImage = active || images[0] || '/placeholder.png';

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm">
        <img
          src={mainImage}
          alt={product?.name}
          className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-125 md:h-[520px]"
        />
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-gray-800 shadow">
          <ZoomIn size={16} /> Hover to zoom
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map(image => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(image)}
              className={`overflow-hidden rounded-2xl border bg-white p-1 transition ${
                mainImage === image ? 'border-black ring-2 ring-black/10' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img src={image} alt="Product thumbnail" className="h-20 w-full rounded-xl object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGalleryZoom;
