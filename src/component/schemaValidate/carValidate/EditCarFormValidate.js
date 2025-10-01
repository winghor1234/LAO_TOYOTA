import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";

const editCarSchema = z.object({
    userId: z.string().min(1, "ກະລຸນາເລືອກລູກຄ້າ"),
    model: z.string().min(1, "ກະລຸນາປ້ອນຊື່ລົດ"),
    engineNumber: z.string().min(5, "ກະລຸນາປ້ອນເລກຈັກ"),
    frameNumber: z.string().min(5, "ກະລຸນາປ້ອນເລກຖັງ"),
    plateNumber: z.string().min(4, "ກະລຸນາປ້ອນປ້າຍທະບຽນ"),
    province: z.string().min(2, "ກະລຸນາປ້ອນແຂວງ"),
});

export const useEditCarForm = ({ carId, handleFetchCar, onClose }) => {
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(editCarSchema)
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
    const submitForm = async (data) => {
        try {
            await axiosInstance.put(APIPath.UPDATE_CAR(carId), data);
            handleFetchCar();
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນລົດສຳເລັດ");
            onClose();
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };


    return { register,handleSubmit,submitForm,formState: { errors },users,reset, };
}