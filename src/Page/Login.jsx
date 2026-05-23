// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../features/userSlice';
// import { useNavigate } from 'react-router-dom';
// // import icon
// import { Mail, Lock } from 'lucide-react';

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.user);
//   const [remember, setRemember] = useState(false);
//   const [form, setForm] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (remember) {
//       localStorage.setItem('rememberEmail', form.email);
//       localStorage.setItem('rememberPassword', form.password);
//     } else {
//       localStorage.removeItem('rememberEmail');
//       localStorage.removeItem('rememberPassword');
//     }

//     dispatch(login(form));
//     // toast.success
//   };

//   useEffect(() => {
//     const rememberedEmail = localStorage.getItem('rememberEmail');
//     const rememberedPassword = localStorage.getItem('rememberPassword');

//     if (rememberedEmail && rememberedPassword) {
//       setForm({
//         email: rememberedEmail,
//         password: rememberedPassword
//       });
//       setRemember(true);
//     }

//     if (isAuthenticated) {
//       setTimeout(() => navigate('/'), 1000);
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-white to-yellow-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-yellow-200 rounded-3xl shadow-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">Welcome Back 👋</h2>

//         <form onSubmit={handleLogin} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
//             <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
//               <Mail className="w-4 h-4 text-gray-500 mr-2" />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full outline-none text-sm bg-transparent"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
//             <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
//               <Lock className="w-4 h-4 text-gray-500 mr-2" />
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full outline-none text-sm bg-transparent"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           {/* Remember Me */}
//           <div className="flex items-center justify-between text-sm text-gray-700">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={remember}
//                 onChange={() => setRemember(!remember)}
//                 className="form-checkbox text-yellow-600"
//               />
//               Remember Me
//             </label>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             Login
//           </button>
//         </form>

//         {/* Bottom Links */}
//         <div className="mt-6 text-sm text-center text-gray-700 space-y-2">
//           <p>
//             Don’t have an account?{' '}
//             <a href="/register" className="text-yellow-700 font-medium hover:underline">
//               Register
//             </a>
//           </p>
//           <p>
//             <a href="/forgot-password" className="text-yellow-700 font-medium hover:underline">
//               Forgot Password?
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

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