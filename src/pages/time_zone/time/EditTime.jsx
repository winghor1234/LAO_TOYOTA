import { Gift, Wrench, X } from "lucide-react";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useEffect, useState } from "react";
import Spinner from "../../../utils/Loading";
import { formatDate } from "../../../utils/FormatDate";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";



const EditTime = ({ show, onClose, timeId, fetchTime }) => {
    const [loading, setLoading] = useState(false);
    const [zones, setZones] = useState([]);
    const [formData, setFormData] = useState({
        time: '',
        date: '',
        zoneId: '',
    });

    const handleFetchZone = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_ZONE);
            if (res?.data?.data) {
                setZones(res?.data?.data);
            }
            return [];
        } catch (error) {
            console.error("Error fetching zones:", error);
        }
    }

    const handleFetchTime = async () => {
        if (!timeId) return;
        const res = await axiosInstance.get(APIPath.SELECT_ONE_TIME(timeId))
        const resData = res?.data?.data;
        setFormData({
            time: resData.time,
            date: formatDate(resData.date),
            zoneId: resData.zoneId,
        });
    };

    useEffect(() => {
       if (timeId) {
        handleFetchTime();
        handleFetchZone();
       }
    }, [timeId]);
    // console.log(timeId)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle form submission
        const data = new URLSearchParams();
        data.append('time', formData.time);
        data.append('date', formData.date);
        data.append('zoneId', formData.zoneId);
        try {
            // await updateTime(timeId, data);
            await axiosInstance.put(APIPath.UPDATE_TIME(timeId), data);
            // console.log("Update gift successful:", res.data);
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນເວລາສຳເລັດ");
            fetchTime();
            onClose();
            setFormData({
                time: '',
                date: '',
                zoneId: '',
            });
        } catch (error) {
            console.error("Update time failed:", error.response?.data || error.message);
            // Handle error (e.g., show error alert)

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
                <h2 className="text-lg sm:text-xl font-bold text-center mb-4">ແກ້ໄຂ້ຂໍ້ມູນເວລາ</h2>

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
                        <select name="zoneId" value={formData.zoneId} onChange={handleOnChange} className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors" required id="">
                            <option value="" disabled>ເລືອກໂຊນ</option>
                            {zones.map((zone) => (
                                <option key={zone.zone_id} value={zone.zone_id}>{zone.zoneName}</option>
                            ))}
                            {zones.length === 0 && (
                                <option value="">ບໍ່ມີໂຊນ</option>
                            )}
                        </select>
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

export default EditTime;
