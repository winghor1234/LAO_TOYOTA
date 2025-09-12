import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useEffect, useState } from "react";
import Spinner from "../../../utils/Loading";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useForm } from "react-hook-form";

const EditZone = ({ show, onClose, zoneId, fetchZone }) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 📌 ดึงข้อมูล time ทั้งหมด
  const handleFetchTime = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ALL_TIME);
      setTime(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchTime();
  }, []);

  // 📌 ดึงข้อมูล zone มาใส่ใน form
  const handleFetchZone = async () => {
    if (!zoneId) return;
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ONE_ZONE(zoneId));
      const resData = res?.data?.data;
      reset({
        zoneName: resData.zoneName,
        timeFix: resData.timeFix,
        timeId: resData.timeId,
      });
    } catch (error) {
      console.error("Fetch zone failed:", error);
    }
  };

  useEffect(() => {
    handleFetchZone();
  }, [zoneId]);

  // 📌 submit form
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.put(APIPath.UPDATE_ZONE(zoneId), data);
      SuccessAlert("ແກ້ໄຂຂໍ້ມູນໂຊນສຳເລັດ");
      fetchZone();
      onClose();
    } catch (error) {
      console.error("Update zone failed:", error.response?.data || error.message);
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
        <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
          ແກ້ໄຂຂໍ້ມູນໂຊນ
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="w-full">
              <input
                type="text"
                {...register("zoneName", { required: "ກະລຸນາປ້ອນຊື່ໂຊນ" })}
                placeholder="ຊື່ໂຊນ"
                className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
              />
              {errors.zoneName && (
                <span className="text-red-500 text-sm">{errors.zoneName.message}</span>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                {...register("timeFix", { required: "ກະລຸນາປ້ອນເວລາສ້ອມແປງ" })}
                placeholder="ເວລາສ້ອມແປງ"
                className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
              />
              {errors.timeFix && (
                <span className="text-red-500 text-sm">{errors.timeFix.message}</span>
              )}
            </div>

            <div className="w-full">
              <select
                defaultValue=""
                {...register("timeId", { required: "ກະລຸນາເລືອກເວລາ" })}
                className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
              >
                <option value="" disabled>
                  ເລືອກເວລາ
                </option>
                {time
                  .filter((item) => item.timeStatus !== false)
                  .map((item) => (
                    <option key={item.time_id} value={item.time_id}>
                      {item.time}
                    </option>
                  ))}
              </select>
              {errors.timeId && (
                <span className="text-red-500 text-sm">{errors.timeId.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
            <button
              type="button"
              onClick={() => {
                SuccessAlert("ຍົກເລີກການແກ້ໄຂ");
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

export default EditZone;
