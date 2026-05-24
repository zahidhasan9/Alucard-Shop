const COMPARE_KEY = 'compareProducts';

export const getCompareProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const isCompared = (productId) => {
  return getCompareProducts().some((item) => item._id === productId);
};

export const toggleCompareProduct = (product) => {
  if (!product?._id) return [];

  const oldItems = getCompareProducts();
  const exists = oldItems.some((item) => item._id === product._id);

  const updated = exists
    ? oldItems.filter((item) => item._id !== product._id)
    : [product, ...oldItems].slice(0, 4);

  localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('compare-updated'));

  return updated;
};

export const clearCompareProducts = () => {
  localStorage.removeItem(COMPARE_KEY);
  window.dispatchEvent(new Event('compare-updated'));
};