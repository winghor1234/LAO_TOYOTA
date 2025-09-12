import { Gift, Wrench, X } from "lucide-react";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useEffect, useState } from "react";
import Spinner from "../../../utils/Loading";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";




const EditZone = ({ show, onClose, zoneId, fetchZone }) => {
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState([]);
    const [formData, setFormData] = useState({
        timeId: '',
        zoneName: '',
        timeFix: '',
    });

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

    const handleFetchZone = async () => {
        if (!zoneId) return;
        const res = await axiosInstance.get(APIPath.SELECT_ONE_ZONE(zoneId));
        const resData = res?.data?.data;
        setFormData({
            zoneName: resData.zoneName,
            timeFix: resData.timeFix,
            timeId: resData.timeId,
        });
    };

    useEffect(() => {
        handleFetchZone();
    }, []);
    // console.log(zoneId)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle form submission
        const data = new URLSearchParams();
        data.append('zoneName', formData.zoneName);
        data.append('timeFix', formData.timeFix);
        data.append('timeId', formData.timeId);
        try {
            // await updateZone(zoneId, data);
            await axiosInstance.put(APIPath.UPDATE_ZONE(zoneId), data);
            // console.log("Update gift successful:", res.data);
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນໂຊນສຳເລັດ");
            fetchZone();
            onClose();
        } catch (error) {
            console.error("Update zone failed:", error.response?.data || error.message);
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
                <h2 className="text-lg sm:text-xl font-bold text-center mb-4">ແກ້ໄຂ້ຂໍ້ມູນໂຊນ</h2>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Inputs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <input
                            type="text"
                            name="zoneName"
                            value={formData.zoneName}
                            onChange={handleOnChange}
                            required
                            placeholder="ຊື່ໂຊນ"
                            className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
                        />
                        <input
                            type="text"
                            name="timeFix"
                            value={formData.timeFix}
                            onChange={handleOnChange}
                            required
                            placeholder="ເວລາສ້ອມແປງ"
                            className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
                        />
                        <select
                            name="timeId"
                            value={formData.timeId || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, timeId: e.target.value }))
                            }
                            required
                            className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors">
                            <option disabled>ເລືອกເວລາ</option>
                            {time.filter((item) => item.timeStatus !== false).map((item) => (
                                <option key={item.time_id} value={item.time_id}>
                                    {item.time}
                                </option>
                            ))}
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

export default EditZone;
