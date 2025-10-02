import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../utils/AxiosInstance';
import APIPath from '../../../api/APIPath';
import { SuccessAlert } from '../../../utils/handleAlert/SuccessAlert';

const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(6, " ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວ"),
    newPassword: z.string().min(6, " ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວ"),
});


export const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ChangePasswordSchema),
    });

    const submitForm = async (data) => {
        setLoading(true);
        try {
            await axiosInstance.put(APIPath.CHANGE_PASSWORD, data);
            SuccessAlert("ປ່ຽນລະຫັດຜ່ານສຳເລັດ", 1500, "success");
            navigate("/user/dashboard");
        } catch (error) {
            SuccessAlert("ມີບາຍຜິດພາດ!!!", 1500, "error");
            console.error("Change password failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return { register, handleSubmit, formState:{ errors}, submitForm, loading };

}