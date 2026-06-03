import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Mail, Phone, ShieldCheck, User, LockKeyhole } from 'lucide-react';

import PasswordModal from './AccountSettings/PasswordModal';
import InfoModal from './AccountSettings/InfoModal';

const AccountSettings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-950">Login & Security</h2>
        <p className="text-sm text-gray-500">
          Manage your personal information and password.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <SettingRow
          icon={<User size={22} />}
          title="Name"
          value={`${user?.firstName || ''} ${user?.lastName || ''}`}
          action="Edit"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <SettingRow
          icon={<Mail size={22} />}
          title="Email"
          value={user?.email || 'Not added'}
          action="Edit"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <SettingRow
          icon={<Phone size={22} />}
          title="Phone"
          value={user?.phone || 'Not added'}
          action="Edit"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <SettingRow
          icon={<LockKeyhole size={22} />}
          title="Password"
          value="••••••••••"
          action="Change"
          onClick={() => setIsPasswordModalOpen(true)}
        />
      </div>

      <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex gap-3">
          <ShieldCheck className="text-green-700" size={24} />
          <div>
            <h3 className="font-bold text-green-900">Security tip</h3>
            <p className="mt-1 text-sm text-green-800">
              Use a strong password and do not share your account information.
            </p>
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}

      {isInfoModalOpen && (
        <InfoModal onClose={() => setIsInfoModalOpen(false)} />
      )}
    </div>
  );
};

const SettingRow = ({ icon, title, value, action, onClick }) => (
  <div className="flex flex-col gap-3 border-b border-gray-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-yellow-100 text-yellow-700">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="font-bold text-gray-900">{value}</h3>
      </div>
    </div>

    <button
      onClick={onClick}
      className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
    >
      {action}
    </button>
  </div>
);

export default AccountSettings;