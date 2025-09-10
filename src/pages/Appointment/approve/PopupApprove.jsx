
import { useEffect, useState } from "react";
// import { updateTimeStatus } from "../../../api/Time_Zone";
// import { createFix } from "../../../api/Fix";
import { useNavigate } from "react-router-dom";
// import { updateBookingStatus } from "../../../api/Booking";
import axios from "axios";
import APIPath from "../../../api/APIPath";
import axiosInstance from "../../../utils/AxiosInstance";

const PopupApprove = ({ setShowPopup, bookingId, timeId }) => {
  const [zone, setZone] = useState([]);
  const [formData, setFormData] = useState({ zone_id: "" }); // ✅ ต้องเป็น object
  const navigate = useNavigate();


  // Fetch zones
  const fetchZone = async () => {
    try {
      const res = await axios.get(APIPath.SELECT_ALL_ZONE);
      console.log("Fetched zone :", res?.data?.data);
      setZone(res?.data?.data);
    } catch (error) {
      console.error("Error fetching zone:", error);
    }
  }



  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingId || !formData.zone_id || !timeId) {
      return;
    }

    try {
      // ต้องตรงกับ backend: bookingId และ zoneId
      const data = new URLSearchParams();
      data.append("bookingId", bookingId); // ✅ เปลี่ยนจาก booking_id
      data.append("zoneId", formData.zone_id); // ✅ เปลี่ยนจาก zone_id
      await Promise.all([
        // createFix(data),
        // updateBookingStatus(bookingId, { bookingStatus: "success" }),
        // updateTimeStatus(timeId, { timeStatus: "false" })
        axiosInstance.post(APIPath.CREATE_FIX, data),
        axiosInstance.put(APIPath.UPDATE_BOOKING_STATUS(bookingId), { bookingStatus: "success" }),
        axiosInstance.put(APIPath.UPDATE_TIME_STATUS(timeId), { timeStatus: "false" })
      ]);
      setShowPopup(false);
      navigate("/user/appointment");

    } catch (error) {
      console.error("Error adding zone :", error);
    }
  };


  useEffect(() => {
    fetchZone();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          ອະນຸມັດການນັດໝາຍ
        </h2>

        <div className="border space-y-4 sm:space-y-5">
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-lg sm:text-xl outline-none"
            value={formData.zone_id}
            onChange={(e) =>
              setFormData({ ...formData, zone_id: e.target.value })
            }
          >
            <option disabled value="">
              -- ກະລຸນາເລືອກໂຊນສ້ອມແປງ --
            </option>
            {zone.filter((item) => item.zoneStatus !== false).map((item) => (
              <option key={item.zone_id} value={item.zone_id}>
                {item.zone_name || item.zoneName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pt-4">
          <button
            onClick={() => setShowPopup(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
          >
            ຍົກເລີກ
          </button>
          <button
            onClick={handleSubmit}
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
