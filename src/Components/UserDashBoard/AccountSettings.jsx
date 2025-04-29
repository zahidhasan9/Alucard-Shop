const AccountSettings = () => {
  return (
    <div className="space-y-8">
      {/* Personal Info Card */}
      <div className="border border-gray-200 rounded-2xl shadow-lg p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="John"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Doe"
            />
          </div>
          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="example@email.com"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white text-base px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="border border-gray-200 rounded-2xl shadow-lg p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white text-base px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
