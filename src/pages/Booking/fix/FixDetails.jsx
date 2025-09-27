import { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { BackButton } from "../../../utils/BackButton";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import PopupFix from "./PopupFix";


const FixDetails = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [fixData, setFixData] = useState([]);
  const [bookingId, setBookingId] = useState('');
  const [timeId, setTimeId] = useState('');

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ONE_BOOKING(id));
      // console.log(" res data:", res?.data?.data);
      setFixData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleSubmit = (bookingId, timeId) => {
    setShowPopup(true);
    setBookingId(bookingId);
    setTimeId(timeId);
    }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative  overflow-y-auto bg-gray-50 p-2 sm:p-4 lg:p-6 ">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          {/* Back Button */}
          <BackButton />

          <hr className="border-gray-300 w-full mb-4 sm:mb-6" />

          {/* Title */}
          <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-medium mb-6 sm:mb-8">
            ລາຍລະອຽດການສ້ອມແປງ
          </h2>

          {/* Desktop/Tablet View */}
          <div className="hidden md:block">

            {/* Top Section */}

            <div className="grid grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-6 text-sm lg:text-base font-medium text-gray-700 " >
                    <div  className="flex flex-col items-center py-4 col-span-2 lg:col-span-1 gap-2" >
                      <span className="text-base lg:text-lg text-gray-500 text-center">ຂໍ້ມູນຜູ້ນັດໝາຍ</span>
                      <div className="bg-gray-100 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full">
                        <FaCar className="text-2xl lg:text-4xl text-gray-700" />
                      </div>
                    </div>
                    <div className="space-y-3 py-4 flex flex-col items-center" >
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ຊື່ລູກຄ້າ</p>
                      <p className="text-gray-900">{fixData?.user?.username}</p>
                    </div>

                    <div className="space-y-3 py-4 flex flex-col items-center">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ເບີໂທລູກຄ້າ</p>
                      <p className="text-gray-900">{fixData?.user?.phoneNumber}</p>
                    </div>

                    <div className="space-y-3 py-4 flex flex-col items-center">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ປ້າຍທະບຽນລົດ</p>
                      <p className="text-gray-900">{fixData?.car?.plateNumber}</p>
                    </div>

                    <div className="space-y-3 py-4 flex flex-col items-center">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ເລກຈັກ</p>
                      <p className="text-gray-900">{fixData?.car?.engineNumber}</p>
                    </div>

                    <div className="space-y-3 py-4 flex flex-col items-center">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ເລກຖັງ</p>
                      <p className="text-gray-900">{fixData?.car?.frameNumber}</p>
                    </div>

                    <div className="space-y-3 py-4 flex flex-col items-center">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ລຸ້ນລົດ</p>
                      <p className="text-gray-900">{fixData?.car?.model}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ວັນທີ</p>
                      <p className="text-gray-900">{fixData?.time?.date}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="font-medium text-gray-500 text-sm lg:text-lg">ເວລາ</p>
                      <p className="text-gray-900">{fixData?.time?.time}</p>
                    </div>
                  </div>
            </div>
            {/* Action Button */}
            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() => handleSubmit(fixData?.booking_id, fixData?.time?.time_id)}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition-colors font-medium text-sm lg:text-base w-full sm:w-auto"
              >
                ສຳເລັດການສ້ອມແປງ
              </button>
            </div>

          {/* Mobile View */}
           <div className="md:hidden space-y-6"> 
            {/* Car Icon and Title */}
             <div className="flex flex-col items-center gap-4">
              <div className="bg-gray-100 w-20 h-20 flex items-center justify-center rounded-full">
                <FaCar className="text-3xl text-gray-700" />
              </div>
              <span className="text-lg text-gray-500">ຂໍ້ມູນຜູ້ນັດໝາຍ</span>
            </div>

            {/* Customer Information Cards */}
             <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">ຂໍ້ມູນລູກຄ້າ</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ຊື່ລູກຄ້າ:</span>
                    <span className="font-medium">{fixData?.user?.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ເບີໂທ:</span>
                    <span className="font-medium">{fixData?.user?.phoneNumber}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">ຂໍ້ມູນລົດ</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ປ້າຍທະບຽນ:</span>
                    <span className="font-medium">{fixData?.car?.plateNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ເລກຈັກ:</span>
                    <span className="font-medium">{fixData?.car?.engineNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ເລກຖັງ:</span>
                    <span className="font-medium">{fixData?.car?.frameNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ລຸ້ນລົດ:</span>
                    <span className="font-medium">{fixData?.car?.model}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">ເວລານັດໝາຍ</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ວັນທີ:</span>
                    <span className="font-medium">{fixData?.time?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ເວລາ:</span>
                    <span className="font-medium">{fixData?.time?.time}</span>
                  </div>
                </div>
              </div>
            </div>  

            {/* Action Button for Mobile */}
             <div className="pt-4">
              <button
                onClick={() => {setShowPopup(true); }}
                className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-full transition-colors font-medium w-full"
              >
                ສຳເລັດການສ້ອມແປງ
              </button>
            </div>
          </div> 
        </div >
      </div >

      {/* Popup */}
      {
        showPopup && (
          <PopupFix setShowPopup={setShowPopup} bookingId={bookingId} timeId={timeId}/>
        )
      }
    </div >
  );
};

export default FixDetails;