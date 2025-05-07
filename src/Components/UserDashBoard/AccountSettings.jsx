import { useState,useEffect} from 'react';
import { useSelector } from 'react-redux'; 
// import molals
import PasswordModal from "./AccountSettings/PasswordModal";
import InfoModal from "./AccountSettings/InfoModal";

const AccountSettings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { user,} = useSelector(state => state.user);

  
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Account Info Section */}
      <div className="border border-gray-200 rounded-2xl shadow-md p-5 sm:p-6 bg-white">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>
        <div className="space-y-3">
          <div className=" text-sm text-gray-700 border-b pb-3 relative group">
            <div className="space-y-1">
              <p><span className="font-medium">First Name:</span> {user.firstName}</p>
              <p><span className="font-medium">Last Name:</span> {user.lastName}</p>
              <p><span className="font-medium">Phone:</span> {user.phone} </p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="bg-black text-white text-sm px-4 py-1.5 rounded-md hover:opacity-90 transition-all duration-300"
          >
            Update Info
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="border mt-8 border-gray-200 rounded-2xl shadow-lg p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Password</h2>
        <p className="text-gray-700 mb-4">••••••••••</p>
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-black text-white text-sm px-4 py-1.5 rounded-md hover:opacity-80 transition-all"
        >
          Change Password
        </button>
      </div>

      {/* Conditional Render */}
      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen} />
      )}

      {/* Info Modal */}
      {isInfoModalOpen && (
        <InfoModal onClose={() => setIsInfoModalOpen(false)} />
      )}
    </div>
  );
};

export default AccountSettings;
