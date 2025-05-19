import React from 'react';
const relatedProducts = [
  { id: 101, title: 'Classic Polo', price: 990, image: 'https://fabrilife.com/products/67b730e7cf913-square.jpg' },
  { id: 102, title: 'Modern Fit Tee', price: 750, image: 'https://fabrilife.com/products/67b730e7d77ec-square.jpg' }
];
const RelatedProducts = () => {
  return (
    <>
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {relatedProducts.map((item) => (
            <div key={item.id} className="bg-white p-4 border rounded-lg shadow hover:shadow-md">
              <img src={item.image} alt={item.title} className="w-full h-40 object-contain mb-2" />
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="text-blue-600 font-bold">TK {item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default RelatedProducts;
