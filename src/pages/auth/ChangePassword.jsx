import { BackButton } from "../../utils/BackButton";
import { ChangePasswordForm } from "../../component/schemaValidate/authValidate/ChangePasswordValidate";
const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, submitForm, loading, } = ChangePasswordForm();


  return (
    <div className="max-w-md mx-auto p-6 shadow-md">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div className="flex flex-col">
          <input
            {...register("oldPassword")}
            type="password"
            placeholder="Old Password"
            className="w-full px-3 py-2 border rounded"
          />
          <div className="h-6">
            {errors.oldPassword && (<p className="text-red-500 text-sm">{errors.oldPassword.message}</p>)}
          </div>
        </div>
        <div className="flex flex-col"> 
          <input
            {...register("newPassword")}
            type="password"
            placeholder="New Password"
            className="w-full px-3 py-2 border rounded"
          />
          <div className="h-6">
            {errors.newPassword && (<p className="text-red-500 text-sm">{errors.newPassword.message}</p>)}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
