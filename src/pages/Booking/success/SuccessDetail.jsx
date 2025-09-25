import { FaArrowLeft, FaCar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useNavigate } from "react-router-dom";

const SuccessDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [booking, setBooking] = useState([]);
  const [zone, setZone] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const fixRes = await axiosInstance.get(APIPath.SELECT_ONE_FIX(id));
        const fixData = fixRes?.data?.data;
        // console.log("FIX success detail:", fixData);
        setData(fixData);

        const bookingIdFromFix = fixData?.bookingId;
        const zoneIdFromFix = fixData?.zoneId;

        if (bookingIdFromFix || zoneIdFromFix) {
          const [bookingRes, zoneRes] = await Promise.all([
            bookingIdFromFix ? axiosInstance.get(APIPath.SELECT_ONE_BOOKING(bookingIdFromFix)) : Promise.resolve(null),
            zoneIdFromFix ? axiosInstance.get(APIPath.SELECT_ONE_ZONE(zoneIdFromFix)) : Promise.resolve(null),
          ]);

          if (bookingRes) {
            console.log("Booking data:", bookingRes?.data?.data);
            setBooking(bookingRes?.data?.data);
          }

          if (zoneRes) {
            console.log("Zone data:", zoneRes?.data?.data);
            setZone(zoneRes?.data?.data);
          }
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [id]);



  return (
    <div className="border relative h-[470px] overflow-y-auto bg-gray-50 px-3 py-2 sm:px-2 sm:py-4 lg:px-4 lg:py-6 max-w-7xl mx-auto rounded-2xl shadow-md">
      {/* Back button */}
      <div
        onClick={() => navigate('/user/booking')}
        className="inline-flex items-center justify-center w-auto px-4 py-1 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer transition-colors mb-4">
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <FaArrowLeft className="text-sm sm:text-base" />
          <span className="font-medium text-sm sm:text-lg lg:text-xl">ກັບໄປຫນ້າກ່ອນ</span>
        </button>
      </div>
      <hr className="border-gray-300 border w-full " />

      {/* Title */}
      <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-medium mb-4">
        ລາຍລະອຽດການສ້ອມແປງ
      </h2>

      <div className="p-4 rounded-lg">
        {/* Customer & Car Info in row */}
        <div className="flex flex-wrap gap-6">


          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <FaCar className="text-2xl sm:text-3xl lg:text-4xl text-gray-700" />
            <span className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ຂໍ້ມູນຜູ້ນັດໝາຍ</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ຊື່ລູກຄ້າ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.user?.username}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເບີໂທລູກຄ້າ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.user?.phoneNumber}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ປ້າຍທະບຽນລົດ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.car?.plateNumber}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເລກຈັກ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.car?.frameNumber}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເລກຖັງ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.car?.engineNumber}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ລຸ້ນລົດ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.car?.model}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ວັນທີ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.time?.date}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເວລາ</p>
            <p className="text-gray-800 font-medium text-sm">{booking?.time?.time}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ໂຊນ</p>
            <p className="text-gray-800 font-medium text-sm">{zone?.zoneName}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ໄລຍະທາງກ່ອນ</p>
            <p className="text-gray-800 font-medium text-sm">{data?.kmLast}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ໄລຍະທາງລ້າສຸດ</p>
            <p className="text-gray-800 font-medium text-sm">{data?.kmNext}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
            <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ລາຍລະອຽດການສ້ອມແປງ</p>
            <p className="text-gray-800 font-medium text-sm">{data?.detailFix} </p>
          </div>
        </div>
        <div className=" bg-gray-50 p-4 rounded-lg ">
          <div className=" bg-gray-50 p-3 rounded-lg text-center justify-center flex flex-col min-w-[120px]  ">
            <h1>ຄ່າແຮງງານ: {data?.fixCarPrice} ກີບ</h1>
            <h1>ຄ່າອະໄຫຼ: {data?.carPartPrice} ກີບ </h1>
          </div>
          <div className=" bg-gray-50  rounded-lg text-center justify-center flex  min-w-[120px] ">
            <h1 className="text-green-700 font-medium text-xl">ລາຄາລວມທັງຫມົດ: {data?.totalPrice} ກີບ</h1>
          </div>
        </div>
      </div>

    </div>

  )
}

export default SuccessDetail