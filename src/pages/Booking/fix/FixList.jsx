import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import BookingSearch from "../../../utils/BookingSearch";

const FixList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [fixes, setFixes] = useState([]);
  const [exportData, setExportData] = useState([]);


  const fetchData = async () => {
    try {
      const [bookingRes, fixRes] = await Promise.all([
        axiosInstance.get(APIPath.SELECT_ALL_BOOKING),
        axiosInstance.get(APIPath.SELECT_ALL_FIX),
      ]);
      setBookings(bookingRes?.data?.data || []);
      setFixes(fixRes?.data?.data || []);
      setExportData(
        bookingRes?.data?.data
          ?.filter((booking) =>
            fixRes?.data?.data?.some(
              (f) => f.bookingId === booking.booking_id && f.fixStatus === "padding"
            )
          )
          ?.map((item) => ({
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

  const fixDetail = (id) => {
    navigate(`/user/fixDetail/${id}`);
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) =>
      fixes.some(
        (f) =>
          f.bookingId === booking.booking_id && f.fixStatus === "padding"
      )
    );
  }, [bookings, fixes]);

  const handleSearch = async ({ searchText }) => {
    try {
      const res = await axiosInstance.get(
        `${APIPath.SEARCH_BOOKING}?search=${searchText}`
      );
      setBookings(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <BookingSearch onSearch={handleSearch} exportData={exportData} setExportData={setExportData} fetchBooking={fetchData} />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full mt-4">
        {/* Desktop/Tablet Header */}
        <div className="hidden md:block w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
          <div className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-xs md:text-sm lg:text-base">
            <div className="text-center">ຂໍ້ມູນຜູ້ນັດໝາຍ</div>
            <div className="text-center">ຊື່ລູກຄ້າ</div>
            <div className="text-center">ເບີໂທລູກຄ້າ</div>
            <div className="text-center">ປ້າຍທະບຽນ</div>
            <div className="text-center">ວັນທີ</div>
            <div className="text-center">ເວລາ</div>
          </div>
        </div>

        {/* Desktop/Tablet Body */}
        <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
          {filteredBookings.map((item, index) => (
            <div
              key={index}
              onClick={() => fixDetail(item.booking_id)}
              className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 items-center hover:bg-gray-50 transition-colors cursor-pointer text-xs md:text-sm lg:text-base"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span className="bg-green-500 px-3 py-1 text-black rounded-xl text-xs font-semibold">
                  ອະນຸມັດແລ້ວ
                </span>
                <span>{item?.car?.model}</span>
              </div>
              <div className="text-center">{item?.user?.username}</div>
              <div className="text-center">{item?.user?.phoneNumber}</div>
              <div className="text-center">{item?.car?.plateNumber}</div>
              <div className="text-center">{item?.time?.date}</div>
              <div className="text-center">{item?.time?.time}</div>
            </div>
          ))}
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredBookings.map((item, index) => (
            <div
              key={index}
              onClick={() => fixDetail(item.booking_id)}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-green-500 px-3 py-1 text-black rounded-xl text-xs font-semibold">
                  ອະນຸມັດແລ້ວ
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {item?.car?.model}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">ຊື່ລູກຄ້າ:</span>
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

export default FixList;
