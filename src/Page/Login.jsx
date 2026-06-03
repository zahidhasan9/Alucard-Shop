import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Lock, Mail, ShoppingBag } from 'lucide-react';
import { login } from '../features/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: localStorage.getItem('rememberEmail') || '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('rememberEmail', form.email);
    dispatch(login(form));
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-[380px]">
        <Link
          to="/"
          className="mb-6 flex items-center justify-center gap-2 text-2xl font-extrabold text-gray-950"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md bg-yellow-400 text-gray-950 shadow-sm">
            <ShoppingBag size={23} />
          </span>
          Alucard Shop
        </Link>

        <div className="rounded-md border border-gray-300 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h1 className="mb-5 text-3xl font-medium text-gray-900">Sign in</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-800">
                Email
              </label>

              <div className="flex items-center rounded-sm border border-gray-400 bg-white px-3 py-2.5 focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-100">
                <Mail size={18} className="mr-2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-bold text-gray-800">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-700 hover:text-orange-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center rounded-sm border border-gray-400 bg-white px-3 py-2.5 focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-100">
                <Lock size={18} className="mr-2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-yellow-400 py-2.5 text-sm font-semibold text-gray-950 shadow-sm transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </form>

          <p className="mt-4 text-xs leading-5 text-gray-600">
            By continuing, you agree to Alucard Shop’s Conditions of Use and
            Privacy Notice.
          </p>

          <div className="mt-5 rounded-sm border border-gray-200 bg-gray-50 p-3">
            <p className="text-sm font-semibold text-gray-800">Need help?</p>
            <div className="mt-2 flex flex-col gap-1 text-sm">
              <Link
                to="/forgot-password"
                className="text-blue-700 hover:text-orange-600 hover:underline"
              >
                Reset your password
              </Link>
              <Link
                to="/contact"
                className="text-blue-700 hover:text-orange-600 hover:underline"
              >
                Contact customer support
              </Link>
            </div>
          </div>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <p className="whitespace-nowrap text-xs text-gray-500">
            New to Alucard Shop?
          </p>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <Link
          to="/register"
          className="block w-full rounded-full border border-gray-400 bg-white py-2.5 text-center text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50"
        >
          Create your Alucard Shop account
        </Link>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <div className="flex justify-center gap-5 text-xs">
            <Link
              to="/terms"
              className="text-blue-700 hover:text-orange-600 hover:underline"
            >
              Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-blue-700 hover:text-orange-600 hover:underline"
            >
              Privacy
            </Link>
            <Link
              to="/contact"
              className="text-blue-700 hover:text-orange-600 hover:underline"
            >
              Help
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-500">© 2026 Alucard Shop</p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;