import { BackButton } from "../../utils/BackButton";
import { ProfileUpdateForm } from "../../component/schemaValidate.jsx/authValidate/ProfileValidate";
import { Link } from "react-router-dom";


const UpdateProfile = () => {
  const { register, handleSubmit, errors, submitForm, loading, message } = ProfileUpdateForm();
  return (
    <div className="max-w-md mx-auto p-6 shadow-md">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Username */}
        <div>
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Province */}
        <input
          type="text"
          {...register("province")}
          placeholder="Province"
          className="w-full px-3 py-2 border rounded"
        />

        {/* District */}
        <input
          type="text"
          {...register("district")}
          placeholder="District"
          className="w-full px-3 py-2 border rounded"
        />

        {/* Village */}
        <input
          type="text"
          {...register("village")}
          placeholder="Village"
          className="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* ลิงก์ไปหน้าเปลี่ยนรหัสผ่าน */}
      <div className="mt-4 text-center">
        <Link
          to="/user/change-password"
          className="text-red-600 hover:text-red-500 font-medium"
        >
          Change Password
        </Link>
      </div>

      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
};

export default UpdateProfile;
