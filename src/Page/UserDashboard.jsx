import { useState } from 'react';
import { LayoutDashboard, Package, Star, MapPin, Settings, LogOut } from 'lucide-react';

import Breadcrumb from '../Components/Breadcrumb';
import AccountSettings from '../Components/UserDashBoard/AccountSettings';
import OrderList from '../Components/UserDashBoard/OrderDashboard';
import ReviewList from '../Components/UserDashBoard/ReviewList';
import AddressSection from '../Components/UserDashBoard/Address';
import Overview from '../Components/UserDashBoard/Overview';
import LogoutButton from '../Components/UserDashBoard/Logout';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Overview', icon: <LayoutDashboard size={16} /> },
    { name: 'Order', icon: <Package size={16} /> },
    { name: 'Reviews', icon: <Star size={16} /> },
    { name: 'Address', icon: <MapPin size={16} /> },
    { name: 'Account Settings', icon: <Settings size={16} /> },
    { name: 'Logout', icon: <LogOut size={16} /> }
  ];

  const components = [
    <Overview />,
    <OrderList />,
    <ReviewList />,
    <AddressSection />,
    <AccountSettings />,
    <LogoutButton />
  ];

  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto my-12 px-4 font-Work_sans">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Tabs Sidebar */}
          <div className="md:w-64 bg-gray-50 border-r border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`group relative w-full flex items-center gap-2 px-6 py-4 text-left text-sm font-medium transition-all duration-300
              ${
                activeTab === index
                  ? 'bg-white text-yellow-600'
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-gray-100'
              }`}
              >
                {tab.icon}
                {tab.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    activeTab === index ? 'scale-x-100' : ''
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 min-h-[500px] bg-white border-t md:border-t-0 border-gray-200 animate-fade-in">
            {components[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
