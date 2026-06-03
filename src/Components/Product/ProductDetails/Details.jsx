import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Heart,
  Maximize2,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, fetchCart } from '../../../features/cartSlice';
import { calculateDiscount, getImage } from '../../../utils/shopHelpers';
import ProductQA from './ProductQA';

const WISHLIST_KEY = 'wishlistProducts';

const formatPrice = value => {
  const number = Number(value || 0);
  return `৳${number.toLocaleString('en-BD')}`;
};

const labelize = (value = '') =>
  String(value)
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, char => char.toUpperCase());

const safeWishlist = () => {
  try {
    const data = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const getVariantKey = (variant, index) =>
  String(variant?._id || variant?.sku || `variant-${index}`);

const getVariantAttributes = variant => {
  if (!Array.isArray(variant?.attributes)) return [];

  return variant.attributes.filter(
    item => item?.key && item?.value !== undefined && item?.value !== null
  );
};

const getVariantLabel = (variant, index) => {
  if (variant?.label) return variant.label;

  const attributesText = getVariantAttributes(variant)
    .map(item => `${labelize(item.key)}: ${item.value}`)
    .join(' / ');

  if (attributesText) return attributesText;
  if (variant?.sku) return variant.sku;

  return `Variant ${index + 1}`;
};

const normalizeDetails = details => {
  if (Array.isArray(details)) {
    return details.filter(
      item => item?.key && item?.value !== undefined && item?.value !== null
    );
  }

  if (details && typeof details === 'object') {
    return Object.entries(details).map(([key, value]) => ({ key, value }));
  }

  return [];
};

const Details = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(state => state.user);

  const variants = useMemo(() => {
    if (!Array.isArray(product?.variants)) return [];
    return product.variants.filter(Boolean);
  }, [product?.variants]);

  const images = useMemo(() => {
    const variantImages = variants.map(item => item?.image).filter(Boolean);

    const list = [
      product?.thumbnail,
      ...(Array.isArray(product?.images) ? product.images : []),
      product?.image,
      ...variantImages,
      getImage(product),
    ].filter(Boolean);

    return [...new Set(list)];
  }, [product, variants]);

  const [selectedImage, setSelectedImage] = useState(images?.[0] || '');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantKey, setSelectedVariantKey] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [wishlist, setWishlist] = useState(safeWishlist);

  useEffect(() => {
    if (!variants.length) {
      setSelectedVariantKey('');
      return;
    }

    const firstAvailableIndex = variants.findIndex(
      variant => Number(variant?.stock || 0) > 0
    );

    const defaultIndex = firstAvailableIndex >= 0 ? firstAvailableIndex : 0;
    setSelectedVariantKey(getVariantKey(variants[defaultIndex], defaultIndex));
  }, [product?._id, variants]);

  const selectedVariantIndex = useMemo(
    () =>
      variants.findIndex(
        (variant, index) => getVariantKey(variant, index) === selectedVariantKey
      ),
    [variants, selectedVariantKey]
  );

  const selectedVariant =
    selectedVariantIndex >= 0 ? variants[selectedVariantIndex] : null;

  const selectedVariantLabel = selectedVariant
    ? getVariantLabel(selectedVariant, selectedVariantIndex)
    : '';

  const activePrice = Number(selectedVariant?.price ?? product?.price ?? 0);

  const activeOldPrice = Number(
    selectedVariant?.oldPrice ?? product?.oldPrice ?? 0
  );

  const activeStock = Number(
    selectedVariant ? selectedVariant?.stock || 0 : product?.countInStock || 0
  );

  const available = activeStock > 0;

  const discount = calculateDiscount(activeOldPrice, activePrice);

  const isLoggedIn = Boolean(user || isAuthenticated);

  const isWishlisted = wishlist.some(item => item?._id === product?._id);

  useEffect(() => {
    const nextImage =
      selectedVariant?.image || images?.[0] || getImage(product) || '';

    setSelectedImage(nextImage);
    setQuantity(1);
  }, [product?._id, selectedVariantKey, selectedVariant?.image, images, product]);

  useEffect(() => {
    if (!available) {
      setQuantity(1);
      return;
    }

    setQuantity(prev => Math.min(Math.max(1, prev), activeStock));
  }, [activeStock, available]);

  const specs = useMemo(() => {
    const productDetails = normalizeDetails(product?.details);

    const variantDetails = selectedVariant
      ? [
          selectedVariant?.sku
            ? { key: 'Variant SKU', value: selectedVariant.sku }
            : null,
          selectedVariantLabel
            ? { key: 'Selected Variant', value: selectedVariantLabel }
            : null,
          ...getVariantAttributes(selectedVariant),
        ].filter(Boolean)
      : [];

    return [...variantDetails, ...productDetails];
  }, [product?.details, selectedVariant, selectedVariantLabel]);

  const toggleWishlist = () => {
    if (!product?._id) return;

    const updated = isWishlisted
      ? wishlist.filter(item => item?._id !== product._id)
      : [product, ...wishlist];

    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleVariantChange = (variant, index) => {
    setSelectedVariantKey(getVariantKey(variant, index));
    setQuantity(1);

    if (variant?.image) {
      setSelectedImage(variant.image);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!available || !product?._id) return;

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: activePrice,
      quantity,
      image: selectedVariant?.image || selectedImage || getImage(product),
      slug: product?.slug,
      variantId: selectedVariant?._id,
      variantLabel: selectedVariantLabel,
    };

    dispatch(addToCart(cartItem));

    setTimeout(() => {
      dispatch(fetchCart());
    }, 250);
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-xl bg-gray-100">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product?.name || 'Product image'}
                className="product-image h-[420px] w-full object-contain p-4"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center text-sm font-bold text-gray-500">
                No image available
              </div>
            )}

            {selectedImage && (
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black text-yellow-400 shadow-lg transition hover:bg-yellow-400 hover:text-black"
              >
                <Maximize2 size={20} />
              </button>
            )}
          </div>

          {images?.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6">
              {images.map((img, index) => (
                <button
                  type="button"
                  key={`${img}-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square overflow-hidden rounded-2xl border bg-white p-1 transition ${
                    selectedImage === img
                      ? 'border-yellow-500 ring-2 ring-yellow-300'
                      : 'border-gray-200 hover:border-yellow-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product?.name || 'Product'} ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-xs font-black ${
                available
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {available ? `In Stock (${activeStock} left)` : 'Out of Stock'}
            </span>

            {discount > 0 && (
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-black text-yellow-700">
                Save {discount}%
              </span>
            )}

            {product?.brand?.name && (
              <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-black text-gray-700">
                {product.brand.name}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-2xl font-black leading-tight text-gray-950 md:text-3xl">
            {product?.name}
          </h1>

          {product?.shortDescription && (
            <p className="mt-3 text-sm font-semibold leading-6 text-gray-500">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index < Math.round(Number(product?.rating || 0))
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>

            <span className="text-sm font-bold text-gray-500">
              {product?.rating || 0} ({product?.numReviews || 0} reviews)
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-black text-gray-950">
              {formatPrice(activePrice)}
            </p>

            {activeOldPrice > activePrice && (
              <p className="pb-1 text-lg font-bold text-gray-400 line-through">
                {formatPrice(activeOldPrice)}
              </p>
            )}
          </div>

          {variants.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-black uppercase tracking-wide text-gray-950">
                  Choose Variant
                </h3>

                {selectedVariantLabel && (
                  <span className="text-xs font-bold text-gray-500">
                    Selected: {selectedVariantLabel}
                  </span>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {variants.map((variant, index) => {
                  const optionKey = getVariantKey(variant, index);
                  const active = selectedVariantKey === optionKey;
                  const label = getVariantLabel(variant, index);
                  const variantPrice = Number(
                    variant?.price ?? product?.price ?? 0
                  );
                  const variantStock = Number(variant?.stock || 0);

                  return (
                    <button
                      type="button"
                      key={optionKey}
                      onClick={() => handleVariantChange(variant, index)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? 'border-black bg-black text-yellow-400 shadow-md'
                          : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-yellow-400 hover:bg-yellow-50'
                      } ${variantStock <= 0 ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black">{label}</p>

                          {variant?.sku && (
                            <p
                              className={`mt-1 text-xs font-bold ${
                                active ? 'text-yellow-200' : 'text-gray-400'
                              }`}
                            >
                              SKU: {variant.sku}
                            </p>
                          )}
                        </div>

                        {active && <CheckCircle size={20} />}
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-black">
                          {formatPrice(variantPrice)}
                        </span>

                        <span
                          className={`text-xs font-black ${
                            variantStock > 0
                              ? active
                                ? 'text-green-200'
                                : 'text-green-600'
                              : active
                                ? 'text-red-200'
                                : 'text-red-500'
                          }`}
                        >
                          {variantStock > 0
                            ? `${variantStock} left`
                            : 'Out of stock'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex w-full items-center justify-between rounded-2xl bg-gray-100 p-2 sm:w-40">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={!available || quantity <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={18} />
              </button>

              <span className="font-black text-gray-950">{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(prev => Math.min(activeStock, prev + 1))
                }
                disabled={!available || quantity >= activeStock}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!available}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              <ShoppingBag size={20} />
              {available
                ? isLoggedIn
                  ? `Add to Cart · ${formatPrice(activePrice * quantity)}`
                  : 'Login to Add'
                : 'Out of Stock'}
            </button>

            <button
              type="button"
              onClick={toggleWishlist}
              className={`flex h-14 w-full items-center justify-center rounded-2xl border text-sm font-black transition sm:w-16 ${
                isWishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-red-500'
              }`}
            >
              <Heart size={22} className={isWishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <div className="flex gap-6 border-b border-gray-100">
          {[
            { id: 'description', label: 'Description' },
            { id: 'details', label: 'Specifications' },
            { id: 'qa', label: 'Product Q&A' },
          ].map(tab => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-black transition ${
                activeTab === tab.id
                  ? 'border-b-4 border-yellow-400 text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-5">
          {activeTab === 'description' && (
            <p className="whitespace-pre-line text-sm font-semibold leading-7 text-gray-600">
              {product?.description || 'No description available.'}
            </p>
          )}

          {activeTab === 'details' &&
            (specs?.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {specs.map((item, index) => (
                  <div
                    key={`${item.key}-${index}`}
                    className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 p-4"
                  >
                    <span className="text-xs font-black uppercase tracking-wide text-gray-500">
                      {labelize(item.key)}
                    </span>

                    <span className="text-right text-sm font-bold text-gray-950">
                      {String(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-yellow-50 p-5 text-sm font-bold text-gray-700">
                Specifications will be updated soon.
              </div>
            ))}

          {activeTab === 'qa' && <ProductQA productId={product?._id} />}
        </div>
      </div>

      {zoomOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage}
            alt={product?.name || 'Product zoom'}
            className="max-h-[90vh] max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
};

export default Details;