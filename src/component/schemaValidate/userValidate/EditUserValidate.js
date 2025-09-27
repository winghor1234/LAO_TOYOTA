import APIPath from "../../../api/APIPath";
import axiosInstance from "../../../utils/AxiosInstance";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";



const schema = z.object({
    username: z.string().min(2, "ຊື່ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
    phoneNumber: z.string().min(8, "ເບີໂທຕ້ອງຢ່າງນ້ອຍ 8 ຕົວ").regex(/^\d+$/, "ເບີໂທຕ້ອງເປັນຕົວເລກ"),
    village: z.string().min(2, "ກະລຸນາປ້ອນບ້ານ ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
    district: z.string().min(2, "ກະລຸນາປ້ອນເມືອງ ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
    province: z.string().min(2, "ກະລຸນາປ້ອນແຂວງ ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
    email: z.string().email("ອີເມວບໍ່ຖືກຕ້ອง").optional().or(z.literal("")),
});

export const useEditUserForm = ({ customerId, handleFetch, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema), });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(APIPath.SELECT_ONE_USER(customerId));
                reset({
                    username: res?.data?.data?.username || "",
                    phoneNumber: res?.data?.data?.phoneNumber?.toString() || "",
                    province: res?.data?.data?.province || "",
                    district: res?.data?.data?.district || "",
                    village: res?.data?.data?.village || "",
                    email: res?.data?.data?.email || "",
                });
            } catch (error) {
                console.log(error);
            }
        };

        if (customerId) fetchUser();
    }, [customerId, reset]);

    const submitForm = async (formData) => {
        try {
            const payload = {
                ...formData,
                phoneNumber: parseInt(formData.phoneNumber, 10),
                email: formData.email === "" ? null : formData.email,
            };

            await axiosInstance.put(APIPath.UPDATE_CUSTOMER(customerId), payload);
            SuccessAlert("ແກ້ໄຂຂໍ້ມູນລູກຄ້າສຳເລັດ");
            handleFetch();
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            SuccessAlert("ມີບາງຢ່າງຜິດພາດ!!!", 1500, "error");
        }
    };

    return { register, handleSubmit, formState: { errors }, submitForm };

}