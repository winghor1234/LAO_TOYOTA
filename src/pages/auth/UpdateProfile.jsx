import { BackButton } from "../../utils/BackButton";
import { ProfileUpdateForm } from "../../component/schemaValidate/authValidate/ProfileValidate";
import { Link } from "react-router-dom";


const UpdateProfile = () => {
  const { register, handleSubmit, formState: { errors }, submitForm, loading, setValue, preview, setPreview } = ProfileUpdateForm();
  return (

    <div className="max-w-md mx-auto p-6 shadow-md bg-white rounded-2xl">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">ແກ້ໄຂໂປຣໄຟຣ</h2>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Username */}
        <div className="flex flex-col">
          <label>ຊື່</label>
          <input
            type="text"
            {...register("username")}
            placeholder="ຊື່..."
            className="w-full px-3 py-2 outline-none border focus:border-red-500 focus:caret-red-500 focus:text-red-500 rounded" />
          <div className="h-6">
            {errors.username && (<p className="text-red-500 text-sm">{errors.username.message}</p>)}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label>ອີເມວ</label>
          <input
            type="email"
            {...register("email")}
            placeholder="ອີເມວ..."
            className="w-full px-3 py-2 outline-none border focus:border-red-500 focus:caret-red-500 focus:text-red-500 rounded"
          />
          <div className="h-6">
            {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
          </div>
        </div>

        {/* Province */}
        <div className="flex flex-col">
          <label>ແຂວງ</label>
          <input
            type="text"
            {...register("province")}
            placeholder="ແຂວງ..."
            className="w-full px-3 py-2 outline-none border focus:border-red-500 focus:caret-red-500 focus:text-red-500 rounded" />
          <div className="h-6">
            {errors.province && (<p className="text-red-500 text-sm">{errors.province.message}</p>)}
          </div>
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label>ເມືອງ</label>
          <input
            type="text"
            {...register("district")}
            placeholder="ເມືອງ..."
            className="w-full px-3 py-2 outline-none border focus:border-red-500 focus:caret-red-500 focus:text-red-500 rounded" />
          <div className="h-6">
            {errors.district && (<p className="text-red-500 text-sm">{errors.district.message}</p>)}
          </div>
        </div>

        {/* Village */}
        <div className="flex flex-col">
          <label>ບ້ານ</label>
          <input
            type="text"
            {...register("village")}
            placeholder="ບ້ານ..."
            className="w-full px-3 py-2 outline-none border focus:border-red-500 focus:caret-red-500 focus:text-red-500 rounded" />
          <div className="h-6">
            {errors.village && (<p className="text-red-500 text-sm">{errors.village.message}</p>)}
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col justify-center items-center ">
          <label>ຮູບໂປຣໄຟຣ</label>
          {preview ? (
            <div className="relative w-32 h-32 mb-2">
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover rounded-full border"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setValue("image", null);
                  setValue("removeImage", true);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                ລົບ
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 mb-2 flex items-center justify-center border rounded-full text-gray-400">
              ບໍ່ມີຮູບ
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white cursor-pointer transition duration-150 ease-in-out rounded ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {loading ? "ກຳລັງອັບເດດໂປຣໄຟຣ..." : "ອັບເດດໂປຣໄຟຣ"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/user/change-password"
          className="text-red-600 hover:text-red-500 font-medium cursor-pointer transition duration-150 ease-in-out"
        >
          ປ່ຽນລະຫັດຜ່ານ
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
