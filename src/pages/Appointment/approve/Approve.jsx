import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TopControl } from "../../../utils/TopControl";
import { getAllBooking } from "../../../api/Booking";
import { useEffect, useState } from "react";



const Approve = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);

  const fetchBooking = async () => {
    try {
      const res = await getAllBooking();
      console.log(" res data:", res?.data?.data);
      setBooking(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleApprove = async(id) => {
    try {
      navigate(`/user/receiverCarDetail/${id}`);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    fetchBooking();
  }, [])


  return (
    <div >
      {/* Top Control  */}
      <TopControl />

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
        {/* Desktop/Tablet Table Header (hidden on mobile) */}
        <div className="hidden md:block w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
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
        <div className="hidden md:block divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
          {booking.filter(item => item.bookingStatus !== "success").map((item, index) => (
            <div
              
              key={index}
              onClick={() => handleApprove(item.booking_id)}
              className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex flex-col">
                  <span className="bg-yellow-500 px-4 py-2  text-white rounded-xl text-xs font-semibold text-center min-w-[60px]">
                    ລໍອະນຸມັດ
                  </span>
                  {/* <span className="bg-green-600 px-3 py-1 text-white rounded-full text-xs font-semibold text-center min-w-[60px]">
                    ອະນຸມັດ
                  </span> */}
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Car className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600" />
                </div>
                <span className="font-medium text-xs md:text-sm lg:text-base">{item.car.model}</span>
              </div>

              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                {item.user.username}
              </div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                {item.user.phoneNumber}
              </div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                {item.car.plateNumber}
              </div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                {item.time.date}
              </div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                {item.time.time}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Card Layout (visible only on mobile) */}
        <div className="md:hidden divide-y divide-gray-200">
          {booking.map((item, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/receiverCarDetail`)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="text-gray-600 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{item.brand}</h3>
                  <p className="text-gray-600 text-base"></p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-base">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ໂທ:</span>
                  <span className="font-medium text-gray-900"></span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ປ້າຍ:</span>
                  <span className="font-medium text-gray-900"></span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ວັນທີ:</span>
                  <span className="font-medium text-gray-900"></span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ເວລາ:</span>
                  <span className="font-medium text-gray-900"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {booking.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/receiverCarDetail`)}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Status badges and brand info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col gap-2">
                <span className="bg-red-600 px-3 py-1 text-white rounded-full text-xs font-semibold text-center">
                  {item.status1}
                </span>
                <span className="bg-green-500 px-3 py-1 text-white rounded-full text-xs font-semibold text-center">
                  {item.status2}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-medium text-base"></span>
              </div>
            </div>

            {/* Customer details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-600 font-medium">ຊື່ລູກຄ້າ:</div>
                <div className="text-gray-900"></div>
              </div>
              <div>
                <div className="text-gray-600 font-medium">ເບີໂທ:</div>
                <div className="text-gray-900"></div>
              </div>
              <div>
                <div className="text-gray-600 font-medium">ປ້າຍທະບຽນ:</div>
                <div className="text-gray-900"></div>
              </div>
              <div>
                <div className="text-gray-600 font-medium">ວັນທີ & ເວລາ:</div>
                <div className="text-gray-900"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approve;