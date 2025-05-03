import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <button
      onClick={HandleLogout}
      className="flex items-center gap-2 text-red-600 px-4 py-2 border border-red-200 hover:bg-red-50 rounded-md text-sm font-medium transition duration-200"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
};

export default LogoutButton;
