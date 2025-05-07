import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../features/userSlice.js';
import Loader from '../../../Components/Loader.jsx';

const InfoModal = ({ onClose }) => {
  const { user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile( {firstName, lastName, phone, email })).unwrap();
      navigate("/dashboard");
      // Reload the page after successful profile update
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
      onClose(); // Close only after success
    } catch (err) {
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Account Info</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="text-sm border border-black text-black px-4 py-1.5 rounded-md hover:bg-black hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-black text-white px-5 py-1.5 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader size={16} /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoModal;
