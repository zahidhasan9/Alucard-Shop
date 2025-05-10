import { Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../features/userSlice';
import toast from 'react-hot-toast'; // make sure to import it

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { id, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, resetPasswordError } = useSelector((state) => state.user);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    dispatch(resetPassword({ id, token, data: { password } }));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-white to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-yellow-200 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">Change Password 🔐</h2>

        <p className="text-center text-gray-700 text-sm mb-4">
          Enter your new password and confirm to reset your account password.
        </p>

        <form onSubmit={handleChangePassword} className="space-y-5">
          {/* New Password */}
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-800 mb-1">New Password</label>
              {loading ? (
                <Loader />
              ) : (
                resetPasswordError && <p className="text-red-500 text-sm mb-1">{resetPasswordError}</p>
              )}
            </div>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="New password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Confirm Password</label>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
