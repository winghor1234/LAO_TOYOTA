import { Wrench, X } from "lucide-react";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useState, useEffect } from "react";
// import { getServiceById, updateService } from "../../../api/Service";

import Spinner from "../../../utils/Loading";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";


const EditService = ({ show, onClose, serviceId }) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchDataById = async () => {
      if (!serviceId) return;
      try {
        const res = await axiosInstance.get(APIPath.SELECT_ONE_SERVICE(serviceId));
        const data = res?.data?.data;
        setFormData({
          serviceName: data?.serviceName || "",
          description: data?.description || "",
          image: data?.image || null,
        });
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchDataById();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("serviceName", formData.serviceName);
    data.append("description", formData.description);
    if (formData.image instanceof File) data.append("image", formData.image);

    try {
      // await updateService(serviceId, data);
      await axiosInstance.put(APIPath.UPDATE_SERVICE(serviceId), data);
      SuccessAlert("ແກ້ໄຂຂໍ້ມູນສຳເລັດ");
      onClose();
    } catch (error) {
      console.error("Update service failed:", error.response?.data || error.message);

      // console.error("Update service failed:", error);
      SuccessAlert("ການແກ້ໄຂຂໍ້ມູນລົ້ມເຫຼວ", 1500, "warning");
    } finally {
      setLoading(false);
    }
  };
    // console.log("Form Data:", formData);
  // console.log(" serviceId :", serviceId);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-sm transition-all">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
          ແກ້ໄຂການບໍລິການ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              required
              placeholder="ຊື່ສ້ອມແປງ"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="ລາຍລະອຽດ"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
          </div>

          {/* Image preview */}
          <div className="mb-2">
            {formData.image ? (
              <div className="relative shadow-2xl h-56 w-72 mb-2 flex items-center justify-center gap-2">
                <img
                  src={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : formData.image
                  }
                  alt="service"
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: null })}
                  className="bg-red-500 text-white cursor-pointer absolute top-1 right-1 px-2 py-1 rounded-lg text-sm hover:bg-red-600"
                >
                  <X />
                </button>
              </div>
            ) : (
              <div className="h-56 w-72 mb-2 flex items-center justify-center shadow-2xl">
                <h1 className="text-gray-500 font-extrabold text-2xl">
                  ບໍ່ມີຮູບພາບ
                </h1>
              </div>
            )}
          </div>

          {/* File upload */}
          <div className="border border-gray-300 rounded-lg flex items-center gap-2 px-2 py-1">
            <Wrench className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
            <button
              type="button"
              onClick={() => {
                SuccessAlert("ຍົກເລີກການແກ້ໄຂຂໍ້ມູນ");
                onClose();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-sm"
              disabled={loading}
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-sm flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <Spinner size="5" color="white" /> : "ຕົກລົງ"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditService;
