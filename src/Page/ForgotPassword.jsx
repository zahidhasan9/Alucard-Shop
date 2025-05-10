import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../features/userSlice';
import Loader from '../Components/Loader';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, forgotPasswordError } = useSelector((state) => state.user);

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">Forgot Password? 🔐</h2>

        <p className="text-center text-gray-700 text-sm mb-4">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          {/* Email Input */}
          <div>
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              {loading ? (
                <Loader />
              ) : (
                forgotPasswordError && <p className="text-red-500 text-sm mb-1">{forgotPasswordError}</p>
              )}
            </div>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>

        {/* Bottom Link */}
        <div className="mt-6 text-sm text-center text-gray-700">
          Remember your password?{' '}
          <a href="/login" className="text-yellow-700 font-medium hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
