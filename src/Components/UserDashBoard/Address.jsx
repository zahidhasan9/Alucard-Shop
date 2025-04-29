import { useState } from 'react';

const AddressSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    name: 'Jahid Hasan Rimel',
    phone: '01728827813',
    street: '123 Green Road',
    city: 'Dhaka',
    postalCode: '1207',
    country: 'Bangladesh'
  });

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setShowModal(false);
    // Save logic here
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">My Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Address Info */}
        <div className="md:col-span-2 text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-medium">Name:</span> {address.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {address.phone}
          </p>
          <p>
            <span className="font-medium">Street:</span> {address.street}
          </p>
          <p>
            <span className="font-medium">City:</span> {address.city}
          </p>
          <p>
            <span className="font-medium">Postal Code:</span> {address.postalCode}
          </p>
          <p>
            <span className="font-medium">Country:</span> {address.country}
          </p>
        </div>

        {/* Right: Guide */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <h4 className="text-sm font-semibold mb-2 text-gray-800">Tips</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Use a valid street address</li>
            <li>Ensure correct postal code</li>
            <li>Double-check your contact number</li>
          </ul>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Address
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Address</h3>
            <div className="space-y-3">
              {['name', 'phone', 'street', 'city', 'postalCode', 'country'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    name={field}
                    value={address[field]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    type="text"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setShowModal(false)} className="text-gray-600 text-sm hover:underline">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

            {/* Close icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
