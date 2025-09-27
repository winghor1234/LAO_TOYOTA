import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";


const UserSchema = z.object({
  username: z.string().min(2, { message: "ຊື່ຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }).max(30),
  phoneNumber: z.string().min(8, { message: "ເບີຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວ" }),
  password: z.string().min(6, { message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວ" }).max(20),
  province: z.string().min(2, { message: "ແຂວງຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }),
  district: z.string().min(2, { message: "ເມືອງຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }),
  village: z.string().min(2, { message: "ບ້ານຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }),
});

export const useAddUserForm = ({ handleFetch, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(UserSchema) });
    const [loading, setLoading] = useState(false);
    const submitForm = async (data) => {
        setLoading(true);
        try {
            await axiosInstance.post(APIPath.REGISTER, data)
            SuccessAlert("ເພີ່ມລູກຄ້າສຳເລັດ");
            handleFetch();
            onClose();
            reset();
        } catch (error) {
            console.error("Add User failed:", error);
            SuccessAlert("ມີບາຍຜິດພາດ!!!", 1500, "error");
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit, formState: { errors }, submitForm, loading };
}