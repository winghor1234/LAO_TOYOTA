import { FaArrowLeft, FaCar } from "react-icons/fa";
import { BackButton } from "../../../utils/BackButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";

const SuccessDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);


  const fetchSuccessFixing = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ONE_BOOKING(id));
      console.log("success detail : ", res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSuccessFixing();
  }, []);

  return (
    <div className="border relative h-[470px] overflow-y-auto bg-gray-50 px-3 py-2 sm:px-2 sm:py-4 lg:px-4 lg:py-6 max-w-7xl mx-auto rounded-2xl shadow-md">
      {/* Back button */}
      <BackButton />
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
                <p className="text-gray-800 font-medium text-sm">{data?.user?.username}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເບີໂທລູກຄ້າ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.user?.phoneNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ປ້າຍທະບຽນລົດ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.car?.plateNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເລກຈັກ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.car?.frameNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເລກຖັງ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.car?.engineNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ລຸ້ນລົດ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.car?.model}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ວັນທີ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.time?.date}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ເວລາ</p>
                <p className="text-gray-800 font-medium text-sm">{data?.time?.time}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ໂຊນ</p>
                <p className="text-gray-800 font-medium text-sm">A</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ໄລຍະທາງກ່ອນ</p>
                <p className="text-gray-800 font-medium text-sm">450km</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center flex-1 min-w-[120px]">
                <p className="font-medium text-gray-500 text-xs sm:text-sm mb-1">ໄລຍະທາງລ້າສຸດ</p>
                <p className="text-gray-800 font-medium text-sm">5700km</p>
              </div>
            </div>
      </div>

    </div>

  )
}

export default SuccessDetail