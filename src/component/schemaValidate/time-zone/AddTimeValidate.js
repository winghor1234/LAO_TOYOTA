import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import APIPath from "../../../api/APIPath";
import axiosInstance from "../../../utils/AxiosInstance";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";

const AddTimeSchema = z.object({
  time: z.string().min(1, "ກະລຸນາໃສ່ເວລາ"),
  date: z.string().min(1, "ກະລຸນາໃສ່ວັນທີ"),
  zoneId: z.string().min(1, "ກະລຸນາເລືອກໂຊນ"),
});

export const useAddTimeForm = ({  onClose, fetchTime, addToExport }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(AddTimeSchema), });
    const [loading, setLoading] = useState(false);
    const [zones, setZones] = useState([]);

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

    const submitForm = async (data) => {
        setLoading(true);
        try {
            await axiosInstance.post(APIPath.CREATE_TIME, data);
            SuccessAlert("ເພີ່ມຂໍ້ມູນລາງວັນສໍາເລັດ");
            fetchTime();
            if (addToExport) {
                addToExport({ ...data, status: "ຫວ່າງ" });
            }
            reset();
            onClose();
        } catch (error) {
            console.error("Error adding time:", error);
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit, formState: { errors }, submitForm, loading, zones };

}