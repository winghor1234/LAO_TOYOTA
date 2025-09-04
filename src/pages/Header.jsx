
import { Bell, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProfile } from '../api/Auth';
import { useNavigate } from 'react-router-dom';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      setProfile(res?.data?.data);
    };
    fetchProfile();
  }, []);

  const handleProfileDetail = () => {
    navigate("/user/profile");
  };

  // console.log(profile);
  return (
    <header className="bg-white w-full shadow-sm border-b border-gray-200">
      <div className="max-w-full flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 h-16 sm:h-18 md:h-20">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            className="text-[#E52020] hover:text-[#c41e1e] transition-colors duration-200 p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform duration-200" />
          </button>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 truncate">
            Dashboard
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
            </button>
            {/* Optional notification badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </div>

          {
            profile && (
              <div onClick={handleProfileDetail} className='flex items-center gap-2 cursor-pointer'>
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-13 md:h-13 bg-red-500 rounded-full cursor-pointer hover:ring-2 hover:ring-red-200 transition-all duration-200 flex-shrink-0">
                  {/* You can add user initials or image here */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs sm:text-sm md:text-base"></span>
                  </div>
                </div>
                <div className='cursor-pointer'>
                  {profile.username}
                </div>
              </div>

            )
          }

          {/* Mobile Menu Dots (optional - for additional mobile actions) */}
          <button className="sm:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


