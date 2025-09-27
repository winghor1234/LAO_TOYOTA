import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";

const editGiftSchema = z.object({
  name: z.string().min(1, "ກະລຸນາປ້ອນຊື່ລາງວັນ"),
  point: z.coerce.number().min(1, "ກະລຸນາປ້ອນຄະເເນນ"),
  image: z.any().optional(),
});

export const useEditForm = ({ onClose, handleFetch, giftId }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(editGiftSchema),
  });

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // ใช้สำหรับแสดงรูป (string หรือ File)

  // ✅ ดึงข้อมูล gift ตาม id
  useEffect(() => {
    const handleFetchGiftId = async () => {
      if (!giftId) return;
      const res = await axiosInstance.get(APIPath.SELECT_ONE_GIFT(giftId));
      const resData = res?.data?.data;

      setValue("name", resData.name);
      setValue("point", resData.point);
      setPreviewImage(resData.image); // เก็บ url รูปปัจจุบัน
    };
    handleFetchGiftId();
  }, [giftId]);

  // ✅ ส่งข้อมูลแก้ไข
  const submitForm = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("point", data.point);

      // ถ้ามีการเลือกไฟล์ใหม่ → ใช้ไฟล์ใหม่
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      await axiosInstance.put(APIPath.UPDATE_GIFT(giftId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      handleFetch();
      SuccessAlert("ແກ້ໄຂຂໍ້ມູນສຳເລັດ");
      onClose();
    } catch (error) {
      console.error("Update gift failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    loading,
    submitForm,
    previewImage,
    setPreviewImage,
  };
};
