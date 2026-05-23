import { useEffect } from 'react';

const ProductSEO = ({ product }) => {
  useEffect(() => {
    if (!product?._id) return;

    document.title = product.metaTitle || `${product.name} | Alucard Shop`;

    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content || '');
    };

    setMeta('description', product.metaDescription || product.shortDescription || product.description?.slice(0, 155));

    let script = document.getElementById('product-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'product-json-ld';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images?.length ? product.images : [product.thumbnail].filter(Boolean),
      description: product.metaDescription || product.description,
      sku: product.sku,
      brand: product.brand?.name ? { '@type': 'Brand', name: product.brand.name } : undefined,
      aggregateRating: product.numReviews
        ? { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.numReviews }
        : undefined,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BDT',
        price: product.price,
        availability: product.countInStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
    });
  }, [product]);

  return null;
};

export default ProductSEO;
