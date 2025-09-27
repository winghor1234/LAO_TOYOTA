import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIPath from "../../../api/APIPath";
import axiosInstance from "../../../utils/AxiosInstance";

const fixSchema = z.object({
  kmNext: z.coerce.number().min(1, "ກະລຸນາປ້ອນໄລຍະທາງກ່ອນຕ້ອງຫຼາຍກວ່າ 0"),
  kmLast: z.coerce.number().min(1, "ກະລຸນາປ້ອນໄລຍະທາງລ້າສຸດຕ້ອງຫຼາຍກວ່າ 0"),
  detailFix: z.string().min(1, "ກະລຸນາປ້ອນລາຍລະອຽດການສ້ອມແປງ"),
  carFixPrice: z.coerce.number().min(1, "ກະລຸນາປ້ອນຄ່າແຮງງານ"),
  carPartPrice: z.coerce.number().min(1, "ກະລຸນາປ້ອນຄ່າອະໄຫ່"),
  totalPrice: z.coerce.number().min(1, "ກະລຸນາປ້ອນລາຄາລວມ"),
});

export const useFixForm = ({ bookingId, timeId }) => {
    const [fixes, setFixes] = useState([]);
    const navigate = useNavigate();
    // const [formData, setFormData] = useState({
        //     kmNext: "",
        //     kmLast: "",
        //     detailFix: "",
        //     carFixPrice: "",
        //     carPartPrice: "",
        //     totalPrice: "",
        // });
        
        const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(fixSchema), });
    const fetchFix = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_FIX);
            setFixes(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        }
    };


    const submitForm = async (data) => {
        try {
            // find fixId by bookingId
            const fixToUpdate = fixes.find((fix) => fix.bookingId === bookingId);
            if (!fixToUpdate) {
                return;
            }
            await axiosInstance.put(APIPath.UPDATE_FIX_STATUS(fixToUpdate.fix_id), data);
            await axiosInstance.put(APIPath.UPDATE_TIME_STATUS(timeId), { timeStatus: "true" });
            await axiosInstance.put(APIPath.UPDATE_ZONE_STATUS(fixToUpdate.zoneId), { zoneStatus: "true" });
            navigate(`/user/successDetail/${fixToUpdate.fix_id}`);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchFix();
    }, []);

    return { register, handleSubmit, errors, submitForm };
}

