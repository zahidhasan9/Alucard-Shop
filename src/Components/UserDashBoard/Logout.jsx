// import { LogOut } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logoutUser } from '../../features/userSlice';
// import { clearWishlistState } from '../../features/wishlistSlice';
// import { clearCartState } from '../../features/cartSlice';

// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const HandleLogout =async () => {
//    await dispatch(logoutUser());
//     dispatch(clearWishlistState());
//     dispatch(clearCartState());
//     navigate('/');
//   };

//   return (
//     <button
//       onClick={HandleLogout}
//       className="flex items-center gap-2 text-red-600 px-4 py-2 border border-red-200 hover:bg-red-50 rounded-md text-sm font-medium transition duration-200"
//     >
//       <LogOut size={16} />
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;


import { LogOut, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../features/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-600">
        <LogOut size={34} />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-gray-950">
        Logout from your account?
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        You will be signed out from this device. You can login again anytime
        using your email and password.
      </p>

      <div className="mt-5 rounded-xl bg-green-50 p-4 text-left">
        <div className="flex gap-3">
          <ShieldCheck className="text-green-700" size={22} />
          <p className="text-sm text-green-800">
            Your orders, wishlist and account information will remain safe.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() => navigate('/')}
          className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700"
        >
          Yes, Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;