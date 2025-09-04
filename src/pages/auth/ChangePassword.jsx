import { useState } from "react";
import { changePassword } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../utils/BackButton";


const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new URLSearchParams();
    data.append("oldPassword", formData.oldPassword);
    data.append("newPassword", formData.newPassword);

    try {
      const res = await changePassword(data);
      console.log("Password changed:", res.data);
      setMessage("Change password success!");
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Change password failed:", error);
      setMessage("Change password failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-md">
        <BackButton/>
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded ${
            loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
};

export default ChangePassword;
