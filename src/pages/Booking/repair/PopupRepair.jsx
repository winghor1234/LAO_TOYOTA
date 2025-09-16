import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";

// PopupRepair Component
const PopupRepair = ({ setShowPopup, bookingId, timeId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kmNext: "",
    kmLast: "",
    detailFix: "",
  });
  const [fixes, setFixes] = useState([]);

  // ดึงข้อมูล fix ทั้งหมด
  const fetchFix = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ALL_FIX);
      setFixes(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // อัปเดตค่าใน input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ส่งข้อมูลอัปเดต
  const handleSubmit = async () => {
    try {
      // หา fix เดิมที่ตรงกับ bookingId
      const fixToUpdate = fixes.find((fix) => fix.bookingId === bookingId);
      if (!fixToUpdate) {
        console.log("ไม่พบ fix ที่ตรงกับ bookingId นี้");
        return;
      }

      // เตรียมข้อมูลส่งไป backend
      const data = {
        bookingId,
        zoneId: fixToUpdate.zoneId, // ใช้ zoneId เดิม
        kmNext: formData.kmNext,
        kmLast: formData.kmLast,
        detailFix: formData.detailFix,
      };

      // อัปเดต fix เดิม
      await axiosInstance.put(APIPath.UPDATE_FIX_STATUS(fixToUpdate.fix_id), data);

      // อัปเดตสถานะเวลา
      await axiosInstance.put(APIPath.UPDATE_TIME_STATUS(timeId), { timeStatus: "true" });

      navigate(`/user/repairSuccess/${fixToUpdate.fix_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFix();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white flex flex-col gap-6 p-4 sm:p-6 rounded-2xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">ລາຍລະອຽດການສ້ອມແປງ</h2>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="number"
              name="kmNext"
              value={formData.kmNext}
              onChange={handleInputChange}
              required
              placeholder="ໄລຍະທາງກ່ອນ"
              className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
            <input
              type="number"
              name="kmLast"
              value={formData.kmLast}
              onChange={handleInputChange}
              required
              placeholder="ໄລຍະທາງລ້າສຸດ"
              className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
          </div>

          <textarea
            name="detailFix"
            value={formData.detailFix}
            onChange={handleInputChange}
            required
            placeholder="ລາຍລະອຽດການສ້ອມແປງ"
            rows={3}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors resize-none"
          />
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

export default PopupRepair;
