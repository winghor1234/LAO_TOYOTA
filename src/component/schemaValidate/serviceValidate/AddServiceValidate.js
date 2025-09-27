import { useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";



// Schema Validation
const serviceSchema = z.object({
  nameService: z.string().min(1, "ກະລຸນາປ້ອນຊື່ບໍລິການ"),
  description: z.string().min(1, "ກະລຸນາປ້ອນລາຍລະອຽດບໍລິການ"),
  image: z.any().optional(),
});


export const useAddServiceForm = ({ onClose, handleFetch }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm({ resolver: zodResolver(serviceSchema), });
    const [loading, setLoading] = useState(false);
    // watch image
    const imageFile = watch("image");

    const submitForm = async (data) => {
        setLoading(true);
        try {
            const dataForm = new FormData();
            dataForm.append("serviceName", data.nameService);
            dataForm.append("description", data.description);
            if (data.image instanceof File) dataForm.append("files", data.image);

            await axiosInstance.post(APIPath.CREATE_SERVICE, dataForm);

            SuccessAlert("ເພີ່ມຂໍ້ມູນສໍາເລັດ");
            handleFetch();
            onClose();

            // Reset form
            setValue("nameService", "");
            setValue("description", "");
            setValue("image", null);
        } catch (error) {
            console.error("create service failed:", error);
            SuccessAlert("ການເພີ່ມຂໍ້ມູນລົ້ມເຫຼວ", 1500, "warning");
        } finally {
            setLoading(false);
        }
    };


    return { register, handleSubmit, submitForm, imageFile, formState: { errors }, loading, setValue };
}