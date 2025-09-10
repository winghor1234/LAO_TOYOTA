import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Gift,
  Calendar,
  Car,
  Settings,
  Clock,
  X,
  LogOutIcon,
  User,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import useToyotaStore from "../store/ToyotaStore";
// import { removeToken } from "../utils/Token";



const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const removeToken = useToyotaStore.getState().removeToken;



  const currentPath = location.pathname;
  const isAppointmentPath = currentPath.startsWith('/user/appointment') || currentPath === '/user/receiverCarDetail' || currentPath === '/user/successDetail';
  const isGiftPath = currentPath.startsWith('/user/gift');
  const isServicePath = currentPath.startsWith('/user/servicing');
  const isDashboardPath = currentPath.startsWith('/user/dashboard');
  const isPromotionPath = currentPath.startsWith('/user/promotion');
  const isVehiclePath = currentPath.startsWith('/user/vehicle');
  const isTimePath = currentPath.startsWith('/user/time-zone');
  const isUserPath = currentPath.startsWith('/user/user');


  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  const SideBarItems = [
    { icon: <Home className='w-5 h-5' />, label: 'Dashboard', path: '/user/dashboard', isActive: isDashboardPath },
    { icon: <Users className='w-5 h-5' />, label: 'ນັດໝາຍ', path: '/user/appointment', isActive: isAppointmentPath },
    { icon: <Clock className='w-5 h-5' />, label: 'ຈັດການໂຊນ/ເວລາ', path: '/user/time-zone', isActive: isTimePath },
    { icon: <Gift className='w-5 h-5' />, label: 'ໂປຣໂມຊັ່ນ', path: '/user/promotion', isActive: isPromotionPath },
    { icon: <Calendar className='w-5 h-5' />, label: 'ລາງວັນ', path: '/user/gift', isActive: isGiftPath },
    { icon: <Car className='w-5 h-5' />, label: 'ຂໍ້ມູນລົດ', path: '/user/vehicle', isActive: isVehiclePath },
    { icon: <User className='w-5 h-5' />, label: 'ຜູ້ດູເເລລະບົບ', path: '/user/user', isActive: isUserPath },
    // { icon: <UserPen className='w-5 h-5' />, label: 'ຜູ້ດູເເລລະບົບ', path: '/user/user', isActive: isUserPath },
    { icon: <Settings className='w-5 h-5' />, label: 'ບໍລິການ', path: '/user/servicing', isActive: isServicePath },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed flex flex-col items-center lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
        w-[243px] bg-[#E52020] text-white h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className=" p-4 lg:p-6 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="toyotaIcon" className='w-[126px] h-[126px] object-cover rounded-full' />
          </div>
          <button
            className="lg:hidden text-white absolute top-0 right-0 cursor-pointer hover:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="w-[215px] h-[470px] px-2 lg:px-4">
          {SideBarItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`w-[193px] h-[40px] flex items-center gap-3 px-3 lg:px-4 py-3 mb-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white hover:text-[#E52020] ${item.isActive ? 'bg-white text-[#E52020]' : 'bg-[#E52020] text-white'}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span className="text-sm lg:text-base">{item.label}</span>
            </Link>
          ))}

          {/* ปุ่มออกจากระบบ */}
          <button
            onClick={handleLogout}
            className="w-[193px] h-[40px] flex items-center gap-3 px-3 lg:px-4 py-3 mb-2 rounded-lg cursor-pointer transition-colors duration-200 bg-[#E52020] text-white hover:bg-white hover:text-[#E52020]"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="text-sm lg:text-base">ອອກຈາກລະບົບ</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
