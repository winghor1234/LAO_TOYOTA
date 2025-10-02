import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIPath from "../../../api/APIPath";
import axiosInstance from "../../../utils/AxiosInstance";
import { useTranslation } from "react-i18next";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";

const fixSchema = (t) => z.object({
  kmNext: z.coerce.number().min(1, t("min_length_1")),
  kmLast: z.coerce.number().min(1, t("min_length_1")),
  detailFix: z.string().min(2, t("min_length_2")),
  carFixPrice: z.coerce.number().min(1, t("min_length_1")),
  carPartPrice: z.coerce.number().min(1, t("min_length_1")),
  totalPrice: z.coerce.number().min(1, t("min_length_1")),
});

export const useFixForm = ({ bookingId, timeId }) => {
    const { t } = useTranslation("auth");
    const [fixes, setFixes] = useState([]);
    const navigate = useNavigate();
        
        const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(fixSchema(t)), });
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

