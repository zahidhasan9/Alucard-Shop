import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
// import icon
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (remember) {
      localStorage.setItem('rememberEmail', form.email);
      localStorage.setItem('rememberPassword', form.password);
    } else {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }

    dispatch(login(form));
    // toast.success
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    const rememberedPassword = localStorage.getItem('rememberPassword');

    if (rememberedEmail && rememberedPassword) {
      setForm({
        email: rememberedEmail,
        password: rememberedPassword
      });
      setRemember(true);
    }

    if (isAuthenticated) {
      setTimeout(() => navigate('/'), 1000);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-white to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-yellow-200 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">Welcome Back 👋</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="form-checkbox text-yellow-600"
              />
              Remember Me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Bottom Links */}
        <div className="mt-6 text-sm text-center text-gray-700 space-y-2">
          <p>
            Don’t have an account?{' '}
            <a href="/register" className="text-yellow-700 font-medium hover:underline">
              Register
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="text-yellow-700 font-medium hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
