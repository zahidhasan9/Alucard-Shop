// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../features/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// // icon
// import { Mail, Lock, User } from 'lucide-react';

// const RegisterPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { success, user, loading, token } = useSelector((state) => state.user);

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       // alert('Passwords do not match!');
//       toast.success('Passwords do not match!');
//       return;
//     }
//     dispatch(register(form));
//     // alert(`Name: ${form.firstName}\nEmail: ${form.email}\nPassword: ${form.password}`);
//   };

//   useEffect(() => {
//     if (success && token) {
//       toast.success(`Welcome ${form.firstName}!`);
//       setTimeout(() => navigate('/'), 2000);
//     } else if (token) {
//       return navigate('/');
//     }
//   }, [success, navigate, token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-white to-yellow-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-yellow-200 rounded-3xl shadow-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">Create Your Account 📝</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">First Name</label>
//             <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
//               <User className="w-4 h-4 text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 name="firstName"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full outline-none text-sm bg-transparent"
//                 placeholder="John Doe"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
//             <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
//               <User className="w-4 h-4 text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full outline-none text-sm bg-transparent"
//                 placeholder="John Doe"
//                 required
//               />
//             </div>
//           </div>

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

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-1">Confirm Password</label>
//             <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
//               <Lock className="w-4 h-4 text-gray-500 mr-2" />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full outline-none text-sm bg-transparent"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             Register
//           </button>
//         </form>

//         {/* Bottom Link */}
//         <div className="mt-6 text-sm text-center text-gray-700">
//           Already have an account?{' '}
//           <a href="/login" className="text-yellow-700 font-medium hover:underline">
//             Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;





import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, ShoppingBag, User } from 'lucide-react';
import { register } from '../features/userSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, token } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (success && token) {
      toast.success(`Welcome ${form.firstName}!`);
      navigate('/');
    } else if (token) {
      navigate('/');
    }
  }, [success, token, navigate, form.firstName]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const { confirmPassword, ...payload } = form;
    dispatch(register(payload));
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-[420px]">
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
          <h1 className="mb-5 text-3xl font-medium text-gray-900">
            Create account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-800">
                  First name
                </label>
                <div className="flex items-center rounded-sm border border-gray-400 bg-white px-3 py-2.5 focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-100">
                  <User size={18} className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-gray-800">
                  Last name
                </label>
                <div className="flex items-center rounded-sm border border-gray-400 bg-white px-3 py-2.5 focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-100">
                  <User size={18} className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
            </div>

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
              <label className="mb-1 block text-sm font-bold text-gray-800">
                Password
              </label>
              <div className="flex items-center rounded-sm border border-gray-400 bg-white px-3 py-2.5 focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-100">
                <Lock size={18} className="mr-2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="At least 6 characters"
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
              <p className="mt-1 text-xs text-gray-500">
                Passwords must be at least 6 characters.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-800">
                Re-enter password
              </label>
              <div className="flex items-center rounded-sm border border-gray-400 bg-white px-3 py-2.5 focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-100">
                <Lock size={18} className="mr-2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter password"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-yellow-400 py-2.5 text-sm font-semibold text-gray-950 shadow-sm transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Create your account'}
            </button>
          </form>

          <p className="mt-4 text-xs leading-5 text-gray-600">
            By creating an account, you agree to Alucard Shop’s Conditions of
            Use and Privacy Notice.
          </p>

          <div className="my-5 border-t border-gray-200" />

          <p className="text-sm text-gray-700">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-700 hover:text-orange-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

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

export default RegisterPage;