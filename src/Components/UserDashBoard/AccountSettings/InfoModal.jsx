// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { updateProfile } from '../../../features/userSlice.js';
// import Loader from '../../../Components/Loader.jsx';

// const InfoModal = ({ onClose }) => {
//   const { user, loading } = useSelector(state => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [phone, setPhone] = useState(user.phone);
//   const [email, setEmail] = useState(user.email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(updateProfile( {firstName, lastName, phone, email })).unwrap();
//       navigate("/dashboard");
//       // Reload the page after successful profile update
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000); 
//       onClose(); // Close only after success
//     } catch (err) {
//       alert("Profile update failed. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
//       <div className="bg-white rounded-xl w-full max-w-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Account Info</h3>
        
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
//             <input
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               placeholder="First Name"
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               placeholder="Last Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
//             <input
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Phone"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               type="email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
//             />
//           </div>

//           <div className="mt-5 flex justify-end gap-3">
//             <button
//               onClick={onClose}
//               type="button"
//               className="text-sm border border-black text-black px-4 py-1.5 rounded-md hover:bg-black hover:text-white transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="text-sm bg-black text-white px-5 py-1.5 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
//             >
//               {loading ? <Loader size={16} /> : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InfoModal;




import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../features/userSlice.js';

const InfoModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'email') return;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLocalError('');

    if (!formData.firstName.trim()) {
      setLocalError('First name is required.');
      return;
    }

    if (!formData.lastName.trim()) {
      setLocalError('Last name is required.');
      return;
    }

    try {
      setSaving(true);

      await dispatch(
        updateProfile({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim(),
        })
      ).unwrap();

      onClose();
    } catch (err) {
      setLocalError(
        typeof err === 'string'
          ? err
          : 'Profile update failed. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-950">
              Edit Account Info
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Update your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full bg-gray-100 px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {localError && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-bold text-gray-700">
              First Name
            </span>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              type="text"
              disabled={saving}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:bg-gray-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-bold text-gray-700">
              Last Name
            </span>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              type="text"
              disabled={saving}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:bg-gray-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-bold text-gray-700">
              Phone Number
            </span>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              type="text"
              disabled={saving}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:bg-gray-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-bold text-gray-700">
              Email Address
            </span>
            <input
              name="email"
              value={formData.email}
              placeholder="Email"
              type="email"
              disabled
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-500 outline-none"
            />
            <p className="mt-1 text-xs font-semibold text-gray-400">
              Email address cannot be changed.
            </p>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-w-[110px] items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoModal;