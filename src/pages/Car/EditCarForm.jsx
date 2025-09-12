import { Car } from "lucide-react";
import { SuccessAlert } from "../../utils/handleAlert/SuccessAlert";
import { useEffect, useState } from "react";
import APIPath from "../../api/APIPath";
import axiosInstance from "../../utils/AxiosInstance";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    userId: z.string().min(1, "ກະລຸນາເລືອກລູກຄ້າ"),
    model: z.string().min(1, "ກະລຸນາປ້ອນຊື່ລົດ"),
    engineNumber: z.string().min(5, "ກະລຸນາປ້ອນເລກຈັກ"),
    frameNumber: z.string().min(5, "ກະລຸນາປ້ອນເລກຖັງ"),
    plateNumber: z.string().min(4, "ກະລຸນາປ້ອນປ້າຍທະບຽນ"),
    province: z.string().min(2, "ກະລຸນາປ້ອນແຂວງ"),
});

const EditCarFormPopup = ({ show, onClose, carId, handleFetchCar }) => {
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            userId: "",
            model: "",
            engineNumber: "",
            frameNumber: "",
            plateNumber: "",
            province: "",
        },
    });


    useEffect(() => {
        if (!carId) return;

        Promise.all([
            axiosInstance.get(APIPath.SELECT_ONE_CAR(carId)),
            axiosInstance.get(APIPath.SELECT_ALL_USER),
        ])
            .then(([carResponse, usersResponse]) => {
                // ตั้งค่า users state สำหรับ select dropdown
                setUsers(usersResponse?.data?.data || []);

                // ตั้งค่า default values ของ form ให้ตรงกับข้อมูลรถ
                const carData = carResponse?.data?.data;
                if (carData) {
                    reset({
                        userId: carData.user_id || "",
                        model: carData.model || "",
                        engineNumber: carData.engineNumber || "",
                        frameNumber: carData.frameNumber || "",
                        plateNumber: carData.plateNumber || "",
                        province: carData.province || "",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching car details:", error);
            });
    }, [carId, reset]);





    // submit form
    const onSubmit = async (data) => {
        try {
            await axiosInstance.put(APIPath.UPDATE_CAR(carId), data);
            handleFetchCar();
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນລົດສຳເລັດ");
            onClose();
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    return (
        <>
            {/* Blur background */}
            <div
                className={`fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Popup */}
            <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-50 rounded-2xl shadow-lg w-full max-w-3xl p-4 sm:p-6 text-sm transition-all ${show ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div
                        onClick={onClose}
                        className="inline-flex items-center justify-center w-auto px-4 py-1 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer transition-colors mb-4"
                    >
                        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
                            <FaArrowLeft className="text-sm sm:text-base" />
                            <span className="font-medium text-sm sm:text-lg lg:text-xl">
                                ກັບໄປຫນ້າກ່ອນ
                            </span>
                        </button>
                    </div>
                    <button className="bg-yellow-400 hover:bg-yellow-600 transition-colors px-4 py-2 text-white rounded-lg text-sm sm:text-base">
                        Import
                    </button>
                </div>
                <hr className="border-gray-300 border-1 w-full my-3" />

                {/* Main Content */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col md:items-center lg:flex-row justify-center lg:justify-around gap-6 lg:gap-4"
                >
                    {/* Left side - Car Image */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="w-full max-w-[250px] h-[150px] sm:h-[180px] lg:h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
                            <Car className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] text-gray-600" />
                        </div>
                        <div className="flex flex-col gap-2 my-3 w-full max-w-[250px]">
                            <button
                                type="button"
                                onClick={() => {
                                    SuccessAlert("ຍົກເລີກການເເກ້ໄຂຂໍ້ມູນລົດ");
                                    onClose();
                                }}
                                className="w-full py-2 border cursor-pointer border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                            >
                                ຍົກເລີກການເເກ້ໄຂ
                            </button>
                            <button
                                type="submit"
                                className="w-full py-2 border cursor-pointer border-red-500 rounded-lg text-sm bg-red-500 text-white hover:bg-[#E32121] transition-colors"
                            >
                                ບັນທຶກການເເກ້ໄຂ
                            </button>
                        </div>
                    </div>

                    {/* Right side - Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[400px] w-full">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">ລະຫັດລູກຄ້າ</label>
                            <select {...register("userId")} className="w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="">ເລືອກລູກຄ້າ</option>
                                {users.map((user) => (
                                    <option key={user.user_id} value={user.user_id}>
                                        {user.customer_number}
                                    </option>
                                ))}
                            </select>
                            {errors.userId && (
                                <span className="text-red-500 text-xs mt-1">{errors.userId.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">ຊື່ລົດ</label>
                            <input
                                {...register("model", { required: true })}
                                className="w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="ລຸ້ນລົດ..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">ເລກຈັກ</label>
                            <input
                                {...register("engineNumber", { required: true })}
                                className="w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="ເລກຈັກ..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">ເລກຖັງ</label>
                            <input
                                {...register("frameNumber", { required: true })}
                                className="w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="ເລກຖັງ..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">ປ້າຍທະບຽນ</label>
                            <input
                                {...register("plateNumber", { required: true })}
                                className="w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="ກມ 8xxxx..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">ແຂວງ</label>
                            <input
                                {...register("province", { required: true })}
                                className="w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="ນະຄອນຫຼວງ"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCarFormPopup;
