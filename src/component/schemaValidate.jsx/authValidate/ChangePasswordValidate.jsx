import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../utils/AxiosInstance';
import APIPath from '../../../api/APIPath';
// import { changePassword } from '../../../api/Auth';

const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(8, " ຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວ"),
    newPassword: z.string().min(8, " ຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວ"),
});


export const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const submitForm = async (data) => {
        setLoading(true);
        setMessage("");

        const formData = new URLSearchParams();
        formData.append("oldPassword", data.oldPassword);
        formData.append("newPassword", data.newPassword);

        try {
            const res = await axiosInstance.put(APIPath.CHANGE_PASSWORD, formData);
            console.log("Password changed:", res.data);
            setMessage("Change password success!");
            navigate("/user/dashboard");
        } catch (error) {
            console.error("Change password failed:", error);
            setMessage("Change password failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return { register, handleSubmit, errors, submitForm, loading, message };

}