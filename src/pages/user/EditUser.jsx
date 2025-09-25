import APIPath from '../../api/APIPath';
import axiosInstance from '../../utils/AxiosInstance';
import { SuccessAlert } from '../../utils/handleAlert/SuccessAlert';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaArrowLeft } from 'react-icons/fa';

// 🟢 Zod Schema
const schema = z.object({
  username: z.string().min(2, "ຊື່ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
  phoneNumber: z.string().min(8, "ເບີໂທຕ້ອງຢ່າງນ້ອຍ 8 ຕົວ").regex(/^\d+$/, "ເບີໂທຕ້ອງເປັນຕົວເລກ"),
  village: z.string().min(2, "ກະລຸນາປ້ອນບ້ານ ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
  district: z.string().min(2, "ກະລຸນາປ້ອນເມືອງ ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
  province: z.string().min(2, "ກະລຸນາປ້ອນແຂວງ ຕ້ອງຢ່າງນ້ອຍ 2 ຕົວອັກສອນ"),
  email: z.string().email("ອີເມວບໍ່ຖືກຕ້ອง").optional().or(z.literal("")),
});

const EditUser = ({ show, onClose, customerId, handleFetch }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(APIPath.SELECT_ONE_USER(customerId));
        reset({
          username: res?.data?.data?.username || "",
          phoneNumber: res?.data?.data?.phoneNumber?.toString() || "",
          province: res?.data?.data?.province || "",
          district: res?.data?.data?.district || "",
          village: res?.data?.data?.village || "",
          email: res?.data?.data?.email || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (customerId) fetchUser();
  }, [customerId, reset]);

  // 🟢 Submit Form
  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        phoneNumber: parseInt(formData.phoneNumber, 10),
        email: formData.email === "" ? null : formData.email, 
      };

        await axiosInstance.put(APIPath.UPDATE_CUSTOMER(customerId), payload);
      // console.log("User updated successfully:", res);
      handleFetch();
      SuccessAlert("ແກ້ໄຂຂໍ້ມູນລູກຄ້າສຳເລັດ");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      SuccessAlert("ມີບາງຢ່າງຜິດພາດ!!!", 1500, "error");
    }
  };

  return (
    <>
      {/* Dark overlay */}
      <div
        className={`fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity 
          ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        z-50 w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 transition-all text-base 
        ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div
            onClick={onClose}
            className="inline-flex items-center justify-center w-auto px-4 py-1 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer transition-colors mb-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-black">
              <FaArrowLeft className="text-sm sm:text-base" />
              <span className="font-medium text-sm sm:text-lg lg:text-xl">ກັບໄປຫນ້າກ່ອນ</span>
            </button>
          </div>
        </div>
        <hr className="border-gray-300 border-1 w-full my-3" />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full p-3">
          <div className="flex flex-col">
            <label className="text-base font-medium mb-1">ຊື່ຜູ້ໃຊ້</label>
            <input {...register("username")} className="w-full h-[40px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500" placeholder="ຊື່ຜູ້ໃຊ້..." />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium mb-1">ເບີໂທ</label>
            <input {...register("phoneNumber")} className="w-full h-[40px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500" placeholder="ເບີໂທ..." />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium mb-1">ບ້ານ</label>
            <input {...register("village")} className="w-full h-[40px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500" placeholder="ບ້ານ..." />
            {errors.village && <p className="text-red-500 text-sm">{errors.village.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium mb-1">ເມືອງ</label>
            <input {...register("district")} className="w-full h-[40px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500" placeholder="ເມືອງ..." />
            {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-base font-medium mb-1">ແຂວງ</label>
            <input {...register("province")} className="w-full h-[40px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500" placeholder="ແຂວງ..." />
            {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium mb-1">ອີເມວ</label>
            <input {...register("email")} className="w-full h-[40px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500" placeholder="ອີເມວ..." />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3 sm:col-span-2">
            <button type="button" onClick={() => { SuccessAlert("ຍົກເລີກການແກ້ໄຂຂໍ້ມູນລູກຄ້າ"); onClose(); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10">ຍົກເລີກ</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10">ຕົກລົງ</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
