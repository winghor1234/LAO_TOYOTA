import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/AxiosInstance';
import APIPath from '../../../api/APIPath';




const ForgotPasswordSchema = z.object({
    phoneNumber: z.string().min(8, " ຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວ"),
    newPassword: z.string().min(6, " ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວ"),
});

export const ForgotPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const submitForm = async (data) => {
        setLoading(true);
        try {
            await axiosInstance.put(APIPath.FORGOT, data)
            // console.log("Password reset successful:", res.data);
            setValue("phoneNumber", "");
            setValue("newPassword", "");
            navigate('/login');
        } catch (error) {
            console.error("Password reset failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return { showPassword, setShowPassword, loading, register, handleSubmit, errors, submitForm };

}