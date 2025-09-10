import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
// import { getAllFix, updateFixStatus } from "../../../api/Fix";

// PopupRepair Component
const PopupRepair = ({ setShowPopup , bookingId }) => {
  // console.log("bookingId : ",bookingId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookingId: '',
    zoneId: '',
    kmNext: '',
    kmLast: '',
    detailFix: '',
  });
  const [fixes, setFixes] = useState([]);


  const fetchFix = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ALL_FIX);
      console.log(res?.data?.data);
      setFixes(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async() => {
    try {
      const fixId = fixes.find((fix) => fix.bookingId === bookingId);
      console.log("fixID : ",fixId);
      const BookingId = fixId?.bookingId;
      const ZoneId = fixId?.zoneId;
      const data = new URLSearchParams();
      data.append("bookingId", BookingId);
      data.append("zoneId", ZoneId);
      data.append("kmNext", formData.kmNext);
      data.append("kmLast", formData.kmLast);
      data.append("detailFix", formData.detailFix);

      // await updateFixStatus(fixId.fix_id, data);
      await axiosInstance.put(APIPath.UPDATE_FIX_STATUS(fixId.fix_id), data);
      navigate('/user/repairSuccess');
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
          {/* Distance inputs */}
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

          {/* Repair details */}
          <textarea
            name="detailFix"
            value={formData.detailFix}
            onChange={handleInputChange}
            required
            placeholder="ລາຍລະອຽດການສ້ອມແປງ"
            rows={3}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors resize-none"
          />

          {/* Cost inputs */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="number"
              name="laborCost"
              value={formData.laborCost}
              onChange={handleInputChange}
              required
              placeholder="ຄ່າແຮງງານ"
              className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
            <input
              type="number"
              name="partsCost"
              value={formData.partsCost}
              onChange={handleInputChange}
              required
              placeholder="ຄ່າອະໄຫຼ"
              className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
          </div> */}

          {/* Total price */}
          {/* <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleInputChange}
            required
            placeholder="ລາຄາລວມ"
            className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 rounded-lg text-base sm:text-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
          />*/}
        </div>

        {/* Action buttons */}
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