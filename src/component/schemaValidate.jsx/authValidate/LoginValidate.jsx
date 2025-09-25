import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SuccessAlert } from '../../../utils/handleAlert/SuccessAlert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import APIPath from '../../../api/APIPath';
import useToyotaStore from '../../../store/ToyotaStore';
import axiosInstance from '../../../utils/AxiosInstance';


 const LoginSchema = z.object({
    phoneNumber: z.string().min(8, " ຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວ"),
    password: z.string().min(6, " ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວ"),
});

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const submitForm = async (data) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(APIPath.LOGIN, data)
            // console.log("login data : ", res?.data?.data);
            const token = res?.data?.data?.token;
            const refreshToken = res?.data?.data?.refreshToken;
            const tokenExpire = Date.now() + 60 * 60 * 1000; // 1 ชั่วโมง = 3600000 ms
            useToyotaStore.getState().setToken(token, refreshToken, tokenExpire); // save token ลง store
            SuccessAlert("ເຂົ້າສູ່ລະບົບສຳເລັດ", 1500, "success");
            navigate("/user/dashboard");
            // reset fields หลัง submit
            setValue("phoneNumber", "");
            setValue("password", "");
        } catch (error) {
            console.error("Login failed:", error);
            SuccessAlert("ມີບາຍຜິດພາດ!!!", 1500, "error");
        } finally {
            setLoading(false);
        }
    };

    return { showPassword, setShowPassword, loading, register, handleSubmit, errors, submitForm };
}

