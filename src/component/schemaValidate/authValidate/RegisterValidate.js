// src/hooks/useRegisterForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { z } from "zod";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";

// Zod schema สำหรับ register
export const registerSchema = z.object({
  username: z.string().min(2, { message: "ຊື່ຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }).max(30),
  phoneNumber: z.string().min(8, { message: "ເບີຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວ" }),
  password: z.string().min(6, { message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວ" }).max(20),
  province: z.string().min(2, { message: "ແຂວງຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }),
  district: z.string().min(2, { message: "ເມືອງຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }),
  village: z.string().min(2, { message: "ບ້ານຕ້ອງມີຢ່າງນ້ອຍ 2 ຕົວ" }),
});

export const useRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver: zodResolver(registerSchema),});

  const submitForm = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post(APIPath.REGISTER, data)
      SuccessAlert("ລົງທະບຽນສຳເລັດ", 1500, "success");
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Register failed:", error);
      SuccessAlert("ມີບາຍຜິດພາດ!!!", 1500, "error");
    } finally {
      setLoading(false);
    }
  };

  return { showPassword, setShowPassword, loading, register, handleSubmit, formState: { errors }, submitForm };
};
