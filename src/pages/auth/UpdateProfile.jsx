import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/Auth";
import { useNavigate, Link } from "react-router-dom";
import { BackButton } from "../../utils/BackButton";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    province: "",
    district: "",
    village: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setFormData({
          username: res.data.data.username || "",
          email: res.data.data.email || "",
          province: res.data.data.province || "",
          district: res.data.data.district || "",
          village: res.data.data.village || ""
        });
      } catch (error) {
        console.error("Cannot fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new URLSearchParams();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("province", formData.province);
    data.append("district", formData.district);
    data.append("village", formData.village);

    try {
      const res = await updateProfile(data);
      console.log("Profile updated:", res.data);
      setMessage("Update success!");
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 


  return (
    <div className="max-w-md mx-auto p-6 shadow-md">
        <BackButton/>
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={formData.province}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
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
