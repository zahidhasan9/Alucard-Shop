import { useState } from 'react';
import Breadcrumb from '../Components/Breadcrumb';

const productData = [
  {
    id: 73240,
    title: 'Premium Elegant Polo - Ripple',
    price: 1140.0,
    originalPrice: 1490.0,
    images: [
      'https://fabrilife.com/products/67b730e7d4749-square.jpg?v=20',
      'https://fabrilife.com/products/67b730e7ddca4-square.jpg',
      'https://fabrilife.com/products/67b730e7cf913-square.jpg',
      'https://fabrilife.com/products/67b730e7d77ec-square.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Elevate your wardrobe with the Premium Elegant Polo - Ripple, designed for both comfort and style. Crafted from high-quality Double PK fabric, this polo features a luxurious blend of 80% combed compact organic cotton and 20% polyester. With a soft touch, 210-220 GSM, and a regular fit, it ensures all-day comfort. The shirt collar adds a touch of sophistication, while enzyme and silicon washing provide a smooth, premium feel. Perfect for casual or semi-formal occasions.',
    details: {
      fabric: 'Double PK (80% Cotton, 20% Polyester)',
      yarnCount: '26/1',
      gsm: '210-220',
      fit: 'Regular',
      collar: 'Shirt Collar',
      dye: 'Reactive Dye, Enzyme & Silicon Washed'
    },
    stock: 'In Stock'
  }
];

const reviewsData = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    comment: 'Absolutely love this polo! The fabric feels premium, and the fit is perfect. Worth every penny!',
    date: 'April 10, 2025'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    rating: 4,
    comment: 'Great quality and stylish design. Slightly tight on the shoulders, but overall a fantastic purchase.',
    date: 'April 5, 2025'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 5,
    comment: 'Best polo I’ve owned. The color stays vibrant even after multiple washes. Highly recommend!',
    date: 'March 28, 2025'
  }
];

const ProductView = () => {
  const product = productData[0];
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    alert(`Added ${quantity} ${selectedSize} size ${product.title} to cart!`);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-auto object-contain rounded-lg border border-gray-200 transform transition duration-300 hover:scale-105"
              />
              <div className="flex space-x-2 justify-center">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-contain rounded-lg cursor-pointer border ${
                      selectedImage === img ? 'border-blue-600 shadow-md' : 'border-gray-200'
                    } transform transition duration-200 hover:scale-110`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">{product.title}</h2>
                <div className="mt-3 flex items-center space-x-3">
                  <span className="text-2xl font-semibold text-gray-900">TK {product.price.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">TK {product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                  <span className="text-sm font-medium text-green-600">{product.stock}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
                <div className="mt-3 flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition duration-200 ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-3 w-24 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>

              {/* Add to Cart */}
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              {/* Tabs for Description and Details */}
              <div className="mt-8">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`px-6 py-3 text-sm font-semibold transition duration-200 ${
                      activeTab === 'description'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`px-6 py-3 text-sm font-semibold transition duration-200 ${
                      activeTab === 'details'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Product Details
                  </button>
                </div>
                <div className="mt-6 text-gray-700 leading-relaxed">
                  {activeTab === 'description' ? (
                    <p>{product.description}</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <span className="font-medium">Fabric:</span> {product.details.fabric}
                      </li>
                      <li>
                        <span className="font-medium">Yarn Count:</span> {product.details.yarnCount}
                      </li>
                      <li>
                        <span className="font-medium">GSM:</span> {product.details.gsm}
                      </li>
                      <li>
                        <span className="font-medium">Fit:</span> {product.details.fit}
                      </li>
                      <li>
                        <span className="font-medium">Collar:</span> {product.details.collar}
                      </li>
                      <li>
                        <span className="font-medium">Dye:</span> {product.details.dye}
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {reviewsData.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="mt-3 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductView;
