import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../features/userSlice.js';
import Loader from '../../../Components/Loader.jsx';
// import icon
import { Eye, EyeOff } from 'lucide-react';

const ChangePasswordModal = ({ onClose }) => {
  // Modal State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    dispatch(changePassword({ currentPassword, newPassword, confirmPassword }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
            <div className="relative">
              <input
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <div className="relative">
              <input
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                type={showNewPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Show error message */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="text-black border border-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition-all text-sm"
            >
              Cancel
            </button>
            <button
              // onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-md hover:opacity-80 transition-all text-sm"
            >
              {loading ? <Loader /> : 'Change Password'} {/* Show loader while submitting */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
