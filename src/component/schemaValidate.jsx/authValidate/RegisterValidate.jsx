// src/hooks/useRegisterForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "../../../api/Auth";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { z } from "zod";

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

  // สร้าง react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // ฟังก์ชัน submit form
  const submitForm = async (data) => {
    setLoading(true);
    try {
      await userRegister(data);
      SuccessAlert("ລົງທະບຽນສຳເລັດ", 1500, "success");
      navigate("/login");

      // reset fields หลัง submit
      setValue("username", "");
      setValue("phoneNumber", "");
      setValue("password", "");
      setValue("province", "");
      setValue("district", "");
      setValue("village", "");
    } catch (error) {
      console.error("Register failed:", error);
      SuccessAlert("ມີບາຍຜິດພາດ!!!", 1500, "error");
    } finally {
      setLoading(false);
    }
  };

  return { showPassword, setShowPassword, loading, register, handleSubmit, errors, submitForm };
};
