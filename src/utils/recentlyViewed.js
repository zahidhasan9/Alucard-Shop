const KEY = 'alucard_recently_viewed';

export const saveRecentlyViewed = product => {
  if (!product?._id) return;
  const compact = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    oldPrice: product.oldPrice,
    thumbnail: product.thumbnail || product.images?.[0],
    rating: product.rating,
  };
  const current = JSON.parse(localStorage.getItem(KEY) || '[]');
  const next = [compact, ...current.filter(item => item._id !== compact._id)].slice(0, 12);
  localStorage.setItem(KEY, JSON.stringify(next));
};

export const getRecentlyViewed = () => JSON.parse(localStorage.getItem(KEY) || '[]');
