import { Gift, Wrench, X } from "lucide-react";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import { useState } from "react";
import { createGift } from "../../../api/GIft";
import Spinner from "../../../utils/Loading";

const AddGift = ({ show, onClose }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    point: "",
    image: null,
  });



  const handleOnChange = (e) => {
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
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("point", formData.point);
      if (formData.image instanceof File) {
        data.append("files", formData.image);
      }

      await createGift(data);
      SuccessAlert("ເພີ່ມຂໍ້ມູນລາງວັນສຳເລັດ")
      onClose();
    } catch (error) {
      console.error("Error adding gift:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-sm transition-all">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-4">ເພີ່ມຂໍ້ມູນລາງວັນ</h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              required
              placeholder="ຊື່ລັງວັນ"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
            <input
              type="number"
              name="point"
              value={formData.point}
              onChange={handleOnChange}
              required
              placeholder="ຄະແນນ"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-sm sm:text-base outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
            />
          </div>

          {/* Image preview */}
          <div className="mb-2">
            {formData.image ? (
              <div className="relative shadow-2xl h-56 w-72 mb-2 flex items-center justify-center gap-2">
                <img
                  src={
                    formData.image
                      ? formData.image instanceof File
                        ? URL.createObjectURL(formData.image)
                        : formData.image
                      : ""
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
              accept="image/*"
              required
              onChange={handleOnChange}
              className="w-full py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
            <button
              type="button"
              onClick={() => {
                SuccessAlert("ຍົກເລີກການເພີ່ມຂໍ້ມູນ");
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

export default AddGift;
