import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { formatDate } from "../../../utils/FormatDate";



const EditTimeSchema = z.object({
    time: z.string().min(1, "ກະລຸນາໃສ່ເວລາ"),
    date: z.string().min(1, "ກະລຸນາໃສ່ວັນທີ"),
    zoneId: z.string().min(1, "ກະລຸນາເລືອກໂຊນ"),
});

export const useEditTimeForm = ({ timeId, fetchTime, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(EditTimeSchema), });
    const [loading, setLoading] = useState(false);
    const [zones, setZones] = useState([]);

    // Fetch zones
    useEffect(() => {
        const fetchZones = async () => {
            try {
                const res = await axiosInstance.get(APIPath.SELECT_ALL_ZONE);
                if (res?.data?.data) setZones(res.data.data);
            } catch (error) {
                console.error("Error fetching zones:", error);
            }
        };
        fetchZones();
    }, []);

    // Fetch time data
    useEffect(() => {
        if (!timeId) return;

        const fetchTime = async () => {
            try {
                const res = await axiosInstance.get(APIPath.SELECT_ONE_TIME(timeId));
                const data = res?.data?.data;
                if (data) {
                    reset({
                        time: data.time,
                        date: formatDate(data.date),
                        zoneId: data.zoneId,
                    });
                }
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };
        fetchTime();
    }, [timeId, reset]);

    const submitForm = async (data) => {
        setLoading(true);
        try {
            await axiosInstance.put(APIPath.UPDATE_TIME(timeId), data);
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນເວລາສຳເລັດ");
            fetchTime();
            onClose();
            reset();
        } catch (error) {
            console.error("Update time failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit, formState: { errors }, submitForm, loading, zones };

}