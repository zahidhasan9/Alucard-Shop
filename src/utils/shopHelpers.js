export const STORAGE_KEYS = {
  coupon: 'alucardCoupon',
  payment: 'alucardPaymentMethod',
  qa: 'alucardProductQA',
  returns: 'alucardReturnRequests',
};

export const COUPONS = [
  {
    code: 'SAVE10',
    type: 'percent',
    value: 10,
    minOrder: 500,
    label: '10% discount',
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    minOrder: 1000,
    label: 'Free shipping',
  },
  {
    code: 'NEWUSER',
    type: 'fixed',
    value: 100,
    minOrder: 700,
    label: '৳100 off',
  },
];

export const getImage = (product) => {
  return product?.thumbnail || product?.images?.[0] || product?.image || '';
};

export const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.categories)) return data.categories;
  if (Array.isArray(data?.brands)) return data.brands;
  return [];
};

export const getStock = (product, selectedVariant = {}) => {
  const variantStock =
    selectedVariant?.stock ??
    selectedVariant?.countInStock ??
    selectedVariant?.quantity;

  const productStock =
    product?.countInStock ?? product?.stockQuantity ?? product?.stock ?? 0;

  const stock = Number(variantStock ?? productStock ?? 0);

  if (Number.isNaN(stock)) return 0;
  return stock;
};

export const isInStock = (product, selectedVariant = {}) => {
  return getStock(product, selectedVariant) > 0;
};

export const calculateDiscount = (oldPrice, price) => {
  if (!oldPrice || !price || Number(oldPrice) <= Number(price)) return 0;
  return Math.round(((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100);
};

export const applyCouponToTotal = ({ subtotal, shipping = 0, couponCode }) => {
  const cleanCode = String(couponCode || '').trim().toUpperCase();
  const coupon = COUPONS.find((item) => item.code === cleanCode);

  if (!coupon) {
    return {
      valid: false,
      message: 'Invalid coupon code',
      discount: 0,
      shipping,
      total: subtotal + shipping,
      coupon: null,
    };
  }

  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      message: `Minimum order ৳${coupon.minOrder} required`,
      discount: 0,
      shipping,
      total: subtotal + shipping,
      coupon,
    };
  }

  let discount = 0;
  let finalShipping = shipping;

  if (coupon.type === 'percent') {
    discount = Math.round((subtotal * coupon.value) / 100);
  }

  if (coupon.type === 'fixed') {
    discount = coupon.value;
  }

  if (coupon.type === 'shipping') {
    finalShipping = 0;
  }

  const total = Math.max(0, subtotal - discount + finalShipping);

  return {
    valid: true,
    message: `${coupon.label} applied`,
    discount,
    shipping: finalShipping,
    total,
    coupon,
  };
};

export const saveQAs = (productId, items) => {
  const oldData = JSON.parse(localStorage.getItem(STORAGE_KEYS.qa) || '{}');
  oldData[productId] = items;
  localStorage.setItem(STORAGE_KEYS.qa, JSON.stringify(oldData));
};

export const getQAs = (productId) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.qa) || '{}');
  return data[productId] || [];
};

export const saveReturnRequest = (request) => {
  const oldData = JSON.parse(localStorage.getItem(STORAGE_KEYS.returns) || '[]');
  const updated = [
    {
      id: `RET-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...request,
    },
    ...oldData,
  ];

  localStorage.setItem(STORAGE_KEYS.returns, JSON.stringify(updated));
  return updated;
};

export const getReturnRequests = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.returns) || '[]');
};