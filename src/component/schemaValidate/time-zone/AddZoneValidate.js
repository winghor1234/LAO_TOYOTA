import { useState } from "react";
import APIPath from "../../../api/APIPath";
import axiosInstance from "../../../utils/AxiosInstance";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const EditZoneSchema = z.object({
    zoneName: z.string().min(1, "ກະລຸນາໃສ່ຊື່ໂຊນ"),
    timeFix: z.string().min(1, "ກະລຸນາໃສ່ເວລາສ້ອມແປງ"),
});

export const useAddZoneForm = ({ onClose, fetchZone }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm( { resolver: zodResolver(EditZoneSchema), } );
    const [loading, setLoading] = useState(false);

    // 📌 submit form
    const submitForm = async (data) => {
        setLoading(true);
        try {
            await axiosInstance.post(APIPath.CREATE_ZONE, data);
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນໂຊນສຳເລັດ");
            fetchZone();
            reset();
            onClose();
        } catch (error) {
            console.error("Create zone failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit, formState: { errors }, submitForm, loading };

}