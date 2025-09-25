import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import BookingSearch from "../../../utils/BookingSearch";

const Approve = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [exportData, setExportData] = useState([]);
  const fetchBooking = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ALL_BOOKING);
      setBooking(res?.data?.data);
      console.log(res?.data?.data);
      setExportData(
        res?.data?.data?.filter((item) => item.bookingStatus === "await").map((item) => ({
          ຊື່ລົດ: item?.car?.model,
          ຊື່ລູກຄ້າ: item?.user?.username,
          ເບີໂທລູກຄ້າ: item?.user?.phoneNumber,
          ປ້າຍທະບຽນ: item?.car?.plateNumber,
          ວັນທີ: item?.time?.date,
          ເວລາ: item?.time?.time,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = (BookingId, timeId) => {
    navigate(`/user/receiverCarDetail/${BookingId}?time=${timeId}`);
  };

  const handleSearch = async ({ searchText }) => {
    try {
      const res = await axiosInstance.get(`${APIPath.SEARCH_BOOKING}?search=${searchText}`);
      setBooking(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="p-4">
      {/* Search */}
      <BookingSearch onSearch={handleSearch} exportData={exportData} setExportData={setExportData} fetchBooking={fetchBooking}/>
      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full mt-4">
        {/* Desktop/Tablet View */}
        <div className="hidden md:block divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
          {booking
            .filter((item) => item.bookingStatus === "await")
            .map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleApprove(item?.booking_id, item?.time?.time_id)
                }
                className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="bg-yellow-500 px-4 py-2 text-black rounded-xl text-xs font-semibold text-center min-w-[60px]">
                    ລໍອະນຸມັດ
                  </span>
                  <span className="font-medium text-xs md:text-sm lg:text-base">
                    {item?.car?.model}
                  </span>
                </div>
                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                  {item?.user?.username}
                </div>
                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                  {item?.user?.phoneNumber}
                </div>
                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                  {item?.car?.plateNumber}
                </div>
                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                  {item?.time?.date}
                </div>
                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                  {item?.time?.time}
                </div>
              </div>
            ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {booking
            .filter((item) => item?.bookingStatus === "await")
            .map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleApprove(item?.booking_id, item?.time?.time_id)
                }
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-yellow-500 px-3 py-1 text-black rounded-xl text-xs font-semibold">
                    ລໍອະນຸມັດ
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {item?.car?.model}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ຜູ້ໃຊ້:</span>
                    <span className="text-gray-900">{item?.user?.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ເບີໂທ:</span>
                    <span className="text-gray-900">{item?.user?.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ປ້າຍ:</span>
                    <span className="text-gray-900">{item?.car?.plateNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ວັນທີ:</span>
                    <span className="text-gray-900">{item?.time?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ເວລາ:</span>
                    <span className="text-gray-900">{item?.time?.time}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Approve;
