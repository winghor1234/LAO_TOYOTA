import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/AxiosInstance';
import APIPath from '../../../api/APIPath';
// import { getProfile, updateProfile } from '../../../api/Auth';

const ProfileUpdateSchema = z.object({
    username: z.string().min(2, " ຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ"),
    email: z.string().email("ອີເມວບໍ່ຖືກຕ້ອງ"),
    province: z.string().min(4, " ຕ້ອງມີຢ່າງນ້ອຍ 4 ຕົວ"),
    district: z.string().min(2, " ຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ"),
    village: z.string().min(2, " ຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ"),
});

export const ProfileUpdateForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // 🔹 react-hook-form + zod
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: {
            username: "",
            email: "",
            province: "",
            district: "",
            village: "",
        },
    });

    // 🔹 โหลดข้อมูลโปรไฟล์จาก backend มาใส่ใน form
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get(APIPath.GET_PROFILE)
                setValue("username", res.data.data.username || "");
                setValue("email", res.data.data.email || "");
                setValue("province", res.data.data.province || "");
                setValue("district", res.data.data.district || "");
                setValue("village", res.data.data.village || "");
            } catch (error) {
                console.error("Cannot fetch profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // 🔹 submit form
    const submitForm = async (data) => {
        setLoading(true);
        setMessage("");

        const formData = new URLSearchParams();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("province", data.province || "");
        formData.append("district", data.district || "");
        formData.append("village", data.village || "");

        try {
            await axiosInstance.put(APIPath.UPDATE_PROFILE, formData );
            //   console.log("Profile updated:", res.data);
            setMessage("Update success!");
            navigate("/user/dashboard");
        } catch (error) {
            console.error("Update failed:", error);
            setMessage("Update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit, errors, submitForm, loading, message };
}