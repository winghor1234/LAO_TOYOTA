import { Bell, Menu } from 'lucide-react';
import { useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../assets/Profile.jpeg';
import axiosInstance from '../utils/AxiosInstance';
import APIPath from '../api/APIPath';


const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [profile, setProfile] = useState(null);
  const [booking, setBooking] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); 


  const navigate = useNavigate();

const fetchData = async () => {
  try {
    // ดึง profile, booking, users พร้อมกัน
    const [profileRes, bookingRes] = await Promise.all([
      axiosInstance.get(APIPath.GET_PROFILE),
      axiosInstance.get(APIPath.SELECT_ALL_BOOKING),
    ]);

    // Profile
    setProfile(profileRes?.data?.data);

    // Booking
    setBooking(bookingRes?.data?.data);

  } catch (error) {
    console.log(error);
  }
};

// const notifiedUsers = useRef(new Set());

useEffect(() => {
  fetchData(); // fetch ครั้งแรก

  const interval = setInterval(fetchData, 5000); // fetch ทุก 5 วินาที
  return () => clearInterval(interval);
}, []);



  const handleProfileDetail = () => {
    navigate("/user/profile");
  };

  const unreadCount = booking.filter((item) => item.bookingStatus === "await").length;

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
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
              {unreadCount  > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                { unreadCount === 0 ? (
                  <p className="p-4 text-gray-500 text-sm">ບໍ່ມີແຈ້ງເຕືອນໃໝ່</p>
                ) : (
                  <>
                    {booking
                      .filter((item) => item.bookingStatus === "await")
                      .map((note) => (
                        <div
                          key={note.booking_id}
                          className="p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate(`/user/receiverCarDetail/${note.booking_id}`);
                            setShowNotifications(false);
                          }}
                        >
                          ຈອງໂດຍ : {note?.user?.username} - ລົດ: {note?.car?.model}
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}


          </div>

          {/* Profile */}
          {profile && (
            <div onClick={handleProfileDetail} className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-13 md:h-13 bg-red-500 rounded-full cursor-pointer hover:ring-2 hover:ring-red-200 transition-all duration-200 flex-shrink-0">
                <img src={Profile} className="w-full h-full rounded-full object-cover" alt="" />
              </div>
              <div>{profile.username}</div>
            </div>
          )}

          {/* Mobile Menu Dots */}
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
