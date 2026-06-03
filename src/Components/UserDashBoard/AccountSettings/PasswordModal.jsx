import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../features/userSlice.js';
import { Eye, EyeOff } from 'lucide-react';

const PasswordModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = field => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return 'All password fields are required.';
    }

    if (formData.newPassword.length < 6) {
      return 'New password must be at least 6 characters long.';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return 'New password and confirm password do not match.';
    }

    if (formData.currentPassword === formData.newPassword) {
      return 'New password must be different from old password.';
    }

    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLocalError('');

    const validationError = validateForm();

    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      setSaving(true);

      await dispatch(
        changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap();

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      onClose();
    } catch (err) {
      setLocalError(
        typeof err === 'string'
          ? err
          : 'Password change failed. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const passwordInput = (name, label, placeholder) => {
    const isVisible = showPassword[name];

    return (
      <label className="block">
        <span className="mb-1 block text-sm font-bold text-gray-700">
          {label}
        </span>

        <div className="relative">
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            type={isVisible ? 'text' : 'password'}
            disabled={saving}
            autoComplete="new-password"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-11 text-sm font-semibold text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:bg-gray-100"
          />

          <button
            type="button"
            onClick={() => togglePassword(name)}
            disabled={saving}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 disabled:opacity-60"
            aria-label={`Toggle ${label}`}
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-950">
              Change Password
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Use a strong password to keep your account secure.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full bg-gray-100 px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-60"
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
          {passwordInput(
            'currentPassword',
            'Current Password',
            'Enter current password'
          )}

          {passwordInput('newPassword', 'New Password', 'Enter new password')}

          {passwordInput(
            'confirmPassword',
            'Confirm New Password',
            'Confirm new password'
          )}

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
              className="inline-flex min-w-[150px] items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Changing...
                </span>
              ) : (
                'Change Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;