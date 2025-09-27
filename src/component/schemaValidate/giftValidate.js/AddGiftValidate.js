import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";

const addGiftSchema = z.object({
    name: z.string().min(1, "ກະລຸນາປ້ອນຊື່ລາງວັນ"),
    point: z.string().min(1, "ກະລຸນາປ້ອນຄະເເນນ"),
    image: z.any().optional(),
});

export const useAddGiftForm = ({ onClose, handleFetch, giftId }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({ resolver: zodResolver(addGiftSchema), });
    const [loading, setLoading] = useState(false);
    const imageFile = watch("image");


      useEffect(() => {
    const handleFetchGiftId = async () => {
      if (!giftId) return;
      const res = await axiosInstance.get(APIPath.SELECT_ONE_GIFT(giftId));
      const resData = res?.data?.data;
      setValue("name", resData.name);
      setValue("point", resData.point);
      setValue("image", resData.image);
    };
    handleFetchGiftId();
  }, [giftId]);

    const submitForm = async (data) => {
        setLoading(true);
        try {
            const dataForm = new FormData();
            dataForm.append("name", data.name);
            dataForm.append("point", data.point);
            if (data.image && data.image[0] instanceof File) {
                dataForm.append("image", data.image[0]);
            }
            await axiosInstance.post(APIPath.CREATE_GIFT, dataForm);
            handleFetch();
            onClose();
            setValue("name", "");
            setValue("point", "");
            setValue("image", null);
            SuccessAlert("ເພີ່ມຂໍ້ມູນລາງວັນສຳເລັດ")
        } catch (error) {
            console.error("Error adding gift:", error);
        } finally {
            setLoading(false);
        }
    };
    return { register, handleSubmit, formState: { errors }, setValue, loading, submitForm, imageFile, };
};

