import { z } from "zod";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useEffect, useState } from "react";



export const promoSchema = z.object({
    title: z.string().min(2, { message: "ຊື່ໂປຣໂມຊັ່ນຕ້ອງຢ່າງນ້ອຍ 2 ຕົວ" }),
    detail: z.string().min(5, { message: "ລາຍລະອຽດຕ້ອງຢ່າງນ້ອຍ 5 ຕົວ" }),
    image: z.any().optional()
});


export const useEditPromotionForm = ({ onClose, promotionId, handleFetchPromotion }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({ resolver: zodResolver(promoSchema) });
    const imageFile = watch("image");

    useEffect(() => {
        const fetchDataById = async () => {
            if (!promotionId) return;
            setLoading(true);
            try {
                const res = await axiosInstance.get(APIPath.SELECT_ONE_PROMOTION(promotionId));
                const data = res?.data?.data;
                reset({
                    title: data?.title || "",
                    detail: data?.detail || "",
                    image: data?.image || null
                });
            } catch (error) {
                console.error("Error fetching promotion:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataById();
    }, [promotionId]);

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("detail", data.detail);
        if (data.image && data.image[0] instanceof File) {
            formData.append("image", data.image[0]);
        }

        try {
            await axiosInstance.put(APIPath.UPDATE_PROMOTION(promotionId), formData);
            handleFetchPromotion();
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນສໍາເລັດ");
            onClose();
        } catch (error) {
            console.error("Update promotion failed:", error.response?.data || error.message);
            SuccessAlert("ການແກ້ໄຂຂໍ້ມູນລົ້ມເຫຼວ", 1500, "warning");
        } finally {
            setLoading(false);
        }
    };

    return {register,handleSubmit,setValue,errors,imageFile,loading,onSubmit}
}