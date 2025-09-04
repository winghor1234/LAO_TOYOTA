import { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import PopupApprove from "./PopupApprove";
import RejectZone from "./RejectZone";
import { BackButton } from "../../../utils/BackButton";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../../api/Booking";

// Main ReceiverCarDetail Component
const ReceiverCarDetail = () => {
  const { id } = useParams();
  const bookingId = id;
  console.log(bookingId);
  // console.log(id);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rejectZone, setRejectZone] = useState(false);


  const fetchBooking = async () => {
    try {
      const res = await getBookingById(id);
      // console.log("  data:", res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="relative min-h-screen  bg-gray-50 p-2 sm:p-4 lg:p-6 ">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-2 sm:p-3 lg:p-4">
          {/* Back Button */}
          <BackButton />
          <hr className="border-gray-300 w-full mb-2 sm:mb-3" />

          {/* Title */}
          <h2 className="text-center text-base sm:text-lg lg:text-xl font-medium mb-4 sm:mb-5">
            ລາຍລະອຽດລົດຜູ້ຮັບ
          </h2>

          {/* Desktop/Tablet View */}
          <div className="hidden md:block">
            {/* Top Section */}
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-2 lg:gap-4 text-xs lg:text-sm font-medium text-gray-700 mb-4">
              {/* Car Icon and Title */}
              <div className="flex flex-col items-center py-2 col-span-2 lg:col-span-1 gap-1">
                <span className="text-sm lg:text-base text-gray-500 text-center">ຂໍ້ມູນຜູ້ນັດໝາຍ</span>
                <div className="bg-gray-100 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full">
                  <FaCar className="text-xl lg:text-2xl text-gray-700" />
                </div>
              </div>

              {/* Customer Info Grid */}
              <div className="space-y-1 py-2">
                <p className="font-medium text-gray-500 text-xs lg:text-sm">ຊື່ລູກຄ້າ</p>
                <p className="text-gray-900">{data?.user?.username}</p>
              </div>

              <div className="space-y-1 py-2">
                <p className="font-medium text-gray-500 text-xs lg:text-sm">ເບີໂທລູກຄ້າ</p>
                <p className="text-gray-900">{data?.user?.phoneNumber}</p>
              </div>

              <div className="space-y-1 py-2">
                <p className="font-medium text-gray-500 text-xs lg:text-sm">ປ້າຍທະບຽນລົດ</p>
                <p className="text-gray-900">{data?.car?.plateNumber}</p>
              </div>

              <div className="space-y-1 py-2">
                <p className="font-medium text-gray-500 text-xs lg:text-sm">ເລກຈັກ</p>
                <p className="text-gray-900">{data?.car?.engineNumber}</p>
              </div>

              <div className="space-y-1 py-2">
                <p className="font-medium text-gray-500 text-xs lg:text-sm">ເລກຖັງ</p>
                <p className="text-gray-900">{data?.car?.frameNumber}</p>
              </div>

              <div className="space-y-1 py-2">
                <p className="font-medium text-gray-500 text-xs lg:text-sm">ລຸ້ນລົດ</p>
                <p className="text-gray-900">{data?.car?.model}</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-6 py-2 text-center font-medium text-gray-700 mb-4 lg:mb-0">
                <div className="space-y-1">
                  <p className="font-medium text-gray-500 text-xs lg:text-sm">ສີລົດ</p>
                  <p className="text-gray-900">{data.color}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-500 text-xs lg:text-sm">ວັນທີ</p>
                  <p className="text-gray-900">{data?.time?.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-500 text-xs lg:text-sm">ເວລາ</p>
                  <p className="text-gray-900">{data?.time?.time}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-2 lg:gap-4">
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors font-medium text-xs lg:text-sm"
                >
                  ອະນຸມັດ
                </button>
                <button
                  onClick={() => setRejectZone(true)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors font-medium text-xs lg:text-sm"
                >
                  ປະຕິເສດ
                </button>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full">
                <FaCar className="text-2xl text-gray-700" />
              </div>
              <span className="text-base text-gray-500">ຂໍ້ມູນຜູ້ນັດໝາຍ</span>
            </div>

            {/* Action Buttons for Mobile */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-full transition-colors font-medium text-sm"
              >
                ອະນຸມັດ
              </button>
              <button
                onClick={() => setRejectZone(true)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition-colors font-medium text-sm"
              >
                ປະຕິເສດ
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Popups */}
      {showPopup && (
        <PopupApprove setShowPopup={setShowPopup} bookingId={bookingId} />
      )}
      {rejectZone && (
        <RejectZone setRejectZone={setRejectZone} />
      )}
    </div>
  );
};

export default ReceiverCarDetail;