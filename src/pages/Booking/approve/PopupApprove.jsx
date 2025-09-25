
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import APIPath from "../../../api/APIPath";
// import axiosInstance from "../../../utils/AxiosInstance";

// const PopupApprove = ({ setShowPopup, bookingId, timeId }) => {
//   const [zone, setZone] = useState([]);
//   const [formData, setFormData] = useState({ zone_id: "" });
//   const [zoneIdInTime, setZoneIdInTime] = useState(null);
//   const navigate = useNavigate();

//   // Fetch zones
//   const fetchZone = async () => {
//     try {
//       const res = await axiosInstance.get(APIPath.SELECT_ALL_ZONE);
//       // console.log("Fetched zone :", res?.data?.data);
//       setZone(res?.data?.data);
//     } catch (error) {
//       console.error("Error fetching zone:", error);
//     }
//   }

//   const fetchTime = async () => {
//     try {
//       const res = await axiosInstance.get(APIPath.SELECT_ONE_TIME(timeId));
//       console.log("Fetched time :", res?.data?.data);
//       setZoneIdInTime(res?.data?.data?.zone?.zone_id);
//     } catch (error) {
//       console.error("Error fetching time:", error);
//     }
//   }
//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!bookingId || !formData.zone_id || !timeId) {
//       return;
//     }


//     if (zoneIdInTime !== formData.zone_id) {
//       alert("Zone is not match with time");
//       return;
//     }


//     try {
//       const data = new URLSearchParams();
//       data.append("bookingId", bookingId); 
//       data.append("zoneId", formData.zone_id); 
//       await Promise.all([
//         axiosInstance.post(APIPath.CREATE_FIX, data),
//         axiosInstance.put(APIPath.UPDATE_BOOKING_STATUS(bookingId), { bookingStatus: "success" }),
//         axiosInstance.put(APIPath.UPDATE_TIME_STATUS(timeId), { timeStatus: "false" }),
//         axiosInstance.put(APIPath.UPDATE_ZONE_STATUS(formData.zone_id), { zoneStatus: "false" }),
//       ]);
//       setShowPopup(false);
//       navigate("/user/booking");

//     } catch (error) {
//       console.error("Error adding zone :", error);
//     }
//   };


//   useEffect(() => {
//     fetchZone();
//     fetchTime();
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto text-center">
//         <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
//           ອະນຸມັດການນັດໝາຍ
//         </h2>

//         <div className="border space-y-4 sm:space-y-5">
//           <select
//             className="w-full py-2 px-3 border border-gray-300 rounded-lg text-lg sm:text-xl outline-none"
//             value={formData.zone_id}
//             onChange={(e) =>
//               setFormData({ ...formData, zone_id: e.target.value })
//             }
//           >
//             <option disabled value="">
//               -- ກະລຸນາເລືອກໂຊນສ້ອມແປງ --
//             </option>
//             {zone.filter((item) => item.zoneStatus !== false).map((item) => (
//               <option key={item.zone_id} value={item.zone_id}>
//                 {item.zoneName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pt-4">
//           <button
//             onClick={() => setShowPopup(false)}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
//           >
//             ຍົກເລີກ
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
//           >
//             ຕົກລົງ
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopupApprove;




import { CalendarDays, Clock3, MapPinned } from 'lucide-react';
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useNavigate } from "react-router-dom";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useEffect, useState } from 'react';

// RejectZone Component
const PopupApprove = ({ setShowPopup, bookingId, timeId, userId, fetchBooking }) => {
  const navigate = useNavigate();
  const [timeData, setTimeData] = useState([]);
  // console.log("userID : ", userId);


  const handleChangeStatus = async () => {
    try {
      const fixData = new URLSearchParams();
      fixData.append("bookingId", bookingId);
      fixData.append("zoneId", timeData?.zone?.zone_id);
      // Point 
      const pointData = new URLSearchParams();
      pointData.append("user_id", userId );
      pointData.append("point", 50);

      console.log("point data userid :", timeData?.booking?.userId );

      await Promise.all([
        axiosInstance.post(APIPath.CREATE_FIX, fixData),
        axiosInstance.put(APIPath.UPDATE_BOOKING_STATUS(bookingId), { bookingStatus: "success" }),
        axiosInstance.put(APIPath.UPDATE_TIME_STATUS(timeId), { timeStatus: "false" }),
        axiosInstance.put(APIPath.UPDATE_POINT, pointData), // add new
      ])
      // setRejectZone(true)
      navigate("/user/bookingSuccess/" + bookingId);
      SuccessAlert("ອະນຸມັດສຳເລັດແລ້ວ");
      fetchBooking();
    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchTime = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ONE_TIME(timeId));
      console.log("time id : ", res?.data?.data);
      setTimeData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchTime();
  }, []);



  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">ອານຸມັດການນັດໝາຍ</h2>

        <div className="space-y-4 sm:space-y-5">
          {/* <button 
            onClick={() => setRejectZone(false)} 
            className="w-full py-3 sm:py-4 border border-gray-300 rounded-lg text-lg sm:text-xl shadow-sm flex justify-between items-center px-4 sm:px-6 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            ເລືອກໂຊນ A
            <span className="text-red-500 rotate-180 text-lg sm:text-xl">❯</span>
          </button> */}
          <div className="w-full py-3 sm:py-4 border border-gray-300 rounded-lg text-lg sm:text-xl shadow-sm flex justify-between items-center px-4 sm:px-6 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className='flex flex-col items-center gap-1'>
              <CalendarDays className='text-lg text-gray-600' />
              <p className="font-medium text-gray-600 text-xs lg:text-sm">ວັນທີ/ເດືອນ/ປີ:</p>
              <p className="text-gray-900 text-md lg:text-xl">{timeData?.date}</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <Clock3 className='text-lg text-gray-600' />
              <p className="font-medium text-gray-600 text-xs lg:text-sm">ເວລາ:</p>
              <p className="text-gray-900 text-md lg:text-xl">{timeData?.time}</p>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <MapPinned className='text-lg text-gray-600' />
              <p className="font-medium text-gray-600 text-xs lg:text-sm">ໂຊນ:</p>
              <p className="text-gray-900 text-md lg:text-xl">{timeData?.zone?.zoneName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pt-4">
          <button
            onClick={() => setShowPopup(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
          >
            ຍົກເລີກ
          </button>
          <button
            onClick={() => handleChangeStatus()}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
          >
            ຕົກລົງ
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopupApprove;