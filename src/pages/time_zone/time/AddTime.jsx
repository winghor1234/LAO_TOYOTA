
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useState } from "react";
import Spinner from "../../../utils/Loading";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";

const AddTime = ({ show, onClose , fetchTime }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    time: "",
    date: "",
  });



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new URLSearchParams();
      data.append("time", formData.time);
      data.append("date", formData.date);
      await axiosInstance.post(APIPath.CREATE_TIME, data);
      SuccessAlert("ເພີ່ມຂໍ້ມູນລາງວັນສຳເລັດ")
      fetchTime();
      onClose();
      setFormData({
        time: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding time :", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-sm transition-all">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-4">ເພີ່ມຂໍ້ມູນລາງວັນ</h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleOnChange}
              required
              placeholder="ເວລາ"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleOnChange}
              required
              placeholder="ວັນທີ/ເດືອນ/ປີ"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
            <button
              type="button"
              onClick={() => {
                SuccessAlert("ຍົກເລີກການເພີ່ມຂໍ້ມູນ");
                onClose();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-sm"
              disabled={loading}
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-sm flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <Spinner size="5" color="white" /> : "ຕົກລົງ"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTime;
