import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// icon
import { Mail, Lock, User } from 'lucide-react';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, token } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      // alert('Passwords do not match!');
      toast.success('Passwords do not match!');
      return;
    }
    dispatch(register(form));
    // alert(`Name: ${form.firstName}\nEmail: ${form.email}\nPassword: ${form.password}`);
  };

  useEffect(() => {
    if (success && token) {
      toast.success(`Welcome ${form.firstName}!`);
      setTimeout(() => navigate('/'), 2000);
    }
  }, [success, navigate, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-white to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-yellow-200 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">Create Your Account 📝</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">First Name</label>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                name="firstName"
                value={form.name}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                name="lastName"
                value={form.name}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Confirm Password</label>
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-500">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Bottom Link */}
        <div className="mt-6 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-700 font-medium hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
