import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import axios from "axios";
import APIPath from "../../../api/APIPath";

// Zod schema
 const promoSchema = z.object({
  title: z.string().min(2, { message: "ຊື່ໂປຣໂມຊັ່ນຕ້ອງຢ່າງນ້ອຍ 2 ຕົວ" }),
  detail: z.string().min(5, { message: "ລາຍລະອຽດຕ້ອງຢ່າງນ້ອຍ 5 ຕົວ" }),
  image: z.any().optional()
});

export const useAddPromotionForm = ({onClose, handleFetchPromotion}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(promoSchema)
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;
  const imageFile = watch("image"); // watch image for preview

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("detail", data.detail);
    if (data.image && data.image[0] instanceof File) {
      formData.append("files", data.image[0]);
    }

    try {
      await axios.post(APIPath.CREATE_PROMOTION, formData);
      handleFetchPromotion();
      SuccessAlert("ເພີ່ມຂໍ້ມູນສໍາເລັດ");
      onClose();
      // reset fields
      setValue("title", "");
      setValue("detail", "");
      setValue("image", null);
    } catch (error) {
      console.error("create promotion failed:", error);
      SuccessAlert("ການເພີ່ມຂໍ້ມູນລົ້ມເຫຼວ", 1500, "warning");
    } finally {
      setLoading(false);
    }
  };

  return {register,handleSubmit,setValue,errors,imageFile,loading,onSubmit};
};
