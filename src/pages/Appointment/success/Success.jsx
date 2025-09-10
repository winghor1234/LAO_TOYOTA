import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/corrects.png'
import { TopControl } from "../../../utils/TopControl";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
// import { getAllBooking } from "../../../api/Booking";
// import { getAllFix } from "../../../api/Fix";



const vehicleData = [
    {
        brand: 'TOYOTA',
        customer: 'Mr A',
        phone: '020 9679 4376',
        number: 'ກງ 5444',
        date: '02/05/2025',
        time: '13:23'
    },
    {
        brand: 'TOYOTA',
        customer: 'Mr B',
        phone: '020 9679 4377',
        number: 'ກງ 5445',
        date: '03/05/2025',
        time: '14:30'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
];



const Success = () => {
     const navigate = useNavigate();
      const [bookings, setBookings] = useState([]);
      const [fixes, setFixes] = useState([]);
    
    
      const fetchData = async () => {
        try {
          const [bookingRes, fixRes] = await Promise.all([axiosInstance.get(APIPath.SELECT_ALL_BOOKING), axiosInstance.get(APIPath.SELECT_ALL_FIX)]);
          setBookings(bookingRes?.data?.data || []);
          setFixes(fixRes?.data?.data || []);
          // console.log(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    
    
    
    
      const fixDetail = (id) => {
        try {
          navigate(`/user/repairDetail/${id}`);
        } catch (error) {
          console.log(error);
        }
      }
    
      const filteredBookings = bookings.filter((booking) => {
      if (booking.bookingStatus !== "success") return false;
    
      const fix = fixes.find((f) => f.bookingId === booking.booking_id);
      // return true ถ้าไม่มี fix หรือ fixStatus เป็น "padding"
      return !fix || fix.fixStatus !== "padding";
    });
    
      useEffect(() => {
        fetchData();
      }, []);
    return (
        <div>
            {/* Top Controls */}
            <TopControl />
            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
                {/* Desktop/Tablet Table Header (hidden on mobile) */}
                <div className="hidden md:block  w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
                    <div className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-base lg:text-lg">
                        <div className="flex justify-center items-center">ຂໍ້ມູນຜູ້ນັດໝາຍ</div>
                        <div className="flex justify-center items-center">ຊື່ລູກຄ້າ</div>
                        <div className="flex justify-center items-center">ເບີໂທລູກຄ້າ</div>
                        <div className="flex justify-center items-center">ປ້າຍທະບຽນ</div>
                        <div className="flex justify-center items-center">ວັນທີ</div>
                        <div className="flex justify-center items-center">ເວລາ</div>
                    </div>
                </div>

                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
                    {filteredBookings.map((item, index) => (
                        <div key={index} onClick={() => fixDetail(item.booking_id)} className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    {/* <Eye className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" /> */}
                                    <img src={logo} alt="" className="h-full w-full" />
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <Car className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600 " />
                                </div>
                                <span className="font-medium text-xs md:text-sm lg:text-base">{item?.car?.model}</span>
                            </div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.user?.username}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.user?.phoneNumber}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.car?.plateNumber}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.time?.date}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.time?.time}</div>
                        </div>
                    ))}
                </div>

                {/* Mobile Card Layout (visible only on mobile) */}
                <div className="md:hidden divide-y divide-gray-200">
                    {vehicleData.map((item, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Car className="text-gray-600 w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-900">{item.brand}</h3>
                                    <p className="text-gray-600 text-base">{item.customer}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-base">
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ໂທ:</span>
                                    <span className="font-medium text-gray-900">{item.phone}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ປ້າຍ:</span>
                                    <span className="font-medium text-gray-900">{item.number}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ວັນທີ:</span>
                                    <span className="font-medium text-gray-900">{item.date}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ເວລາ:</span>
                                    <span className="font-medium text-gray-900">{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Success
