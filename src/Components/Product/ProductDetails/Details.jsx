import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';
import { addToCart, fetchCart } from '../../../features/cartSlice';

const reviewsData = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing!', date: 'April 10, 2025' },
  { id: 2, name: 'Sarah Smith', rating: 4, comment: 'Great quality!', date: 'April 5, 2025' },
  { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Highly recommend!', date: 'March 28, 2025' }
];
const size = ['S', 'M', 'L', 'XL', 'XXL'];

const Details = ({ product }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const avgRating = (reviewsData.reduce((a, r) => a + r.rating, 0) / reviewsData.length).toFixed(1);

  // const handleAddToCart = () => {
  //   if (!selectedSize) return alert('Please select a size');
  //   alert(`Added ${quantity} ${selectedSize} size ${product.title} to cart!`);
  // };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product?.images?.[0],
      slug: product?.slug
    };

    dispatch(addToCart(cartItem));
    setTimeout(() => {
      dispatch(fetchCart());
    }, 100);
  };

  return (
    <>
      {/* Image Section */}
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-auto object-contain transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="flex gap-2 justify-center">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`w-20 h-20 object-contain cursor-pointer rounded-lg border ${
                selectedImage === img ? 'border-blue-600' : 'border-gray-200'
              } hover:scale-105`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-gray-800">TK {product.price.toFixed(2)}</span>
          <span className="text-lg line-through text-gray-400">TK {product.price.toFixed(2)}</span>
          <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">{product.discount}% OFF</span>
        </div>
        <div className="text-yellow-500 text-sm">
          ★ {avgRating} ({reviewsData.length} reviews)
        </div>

        {/* Size Selector */}
        <div>
          <h3 className="font-semibold mb-2">Select Size</h3>
          <div className="flex gap-3">
            {size?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {size} {selectedSize === size && <span className="ml-1 text-white">✓</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Quantity & Add to Cart */}
        <div>
          <h3 className="font-semibold mb-2">Quantity</h3>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Add to Cart */}

        {/* <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button> */}

        {!user ? (
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
          >
            Login to Add
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90"
          >
            Add to Cart
          </button>
        )}

        {/* Tabs */}
        <div>
          <div className="flex border-b">
            {['description', 'details'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 font-medium text-sm ${
                  activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                }`}
              >
                {tab === 'description' ? 'Description' : 'Product Details'}
              </button>
            ))}
          </div>
          <div className="mt-4 text-gray-700 text-sm leading-relaxed">
            {activeTab === 'description' ? (
              <p>{product.description}</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(product.details).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {val}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
