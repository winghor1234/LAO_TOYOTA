// import { useParams } from 'react-router-dom';
import { BackButton } from '../../utils/BackButton';
import { SuccessAlert } from '../../utils/handleAlert/SuccessAlert';
import { getUserById, updateUser } from '../../api/User';
import { useEffect, useState } from 'react';


const EditUser = ({ show, onClose, userId }) => {
  // const { id } = useParams();
  const [userData, setUserData] = useState({
    username: '',
    village: '',
    district: '',
    province: '',
    email: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        setUserData(res?.data?.data);
        console.log(res);

      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const OnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append("username", userData.username);
    data.append("village", userData.village);
    data.append("district", userData.district);
    data.append("province", userData.province);
    data.append("email", userData.email);

    console.log("User data to be updated:", data);

    try {
      const res = await updateUser(userId, data);
      console.log("User updated successfully:", res);
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
        className={`fixed inset-0  backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose} // click outside to close
      />

      {/* Small Popup */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 transition-all text-base ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
          }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <BackButton />
          <button className="bg-yellow-400 hover:bg-yellow-600 transition-colors w-full sm:w-auto px-4 py-2 text-white rounded-lg font-medium text-base">
            Import
          </button>
        </div>
        <hr className="border-gray-300 border-1 w-full my-3" />

        {/* Main Content */}
        <div className="flex flex-col md:items-center lg:flex-col justify-center lg:justify-around gap-6 lg:gap-3">


          <div className="grid grid-cols-1 sm:grid-cols-2 md:place-items-start lg:grid-cols-2 gap-3 lg:gap-3 max-w-full w-full p-3 shadow-4xl">
            {/* User ID */}
            {/* <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ລະຫັດຜູ້ໃຊ້</label>
              <input
                value={userData.customer_number || ''}
                name="customer_number"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ລະຫັດຜູ້ໃຊ້..."
              />
            </div> */}

            {/* User Name */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ຊື່ຜູ້ໃຊ້</label>
              <input
                value={userData.username || ''}
                name="username"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ຊື່ຜູ້ໃຊ້..."
              />
            </div>


            {/* Village */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ບ້ານ</label>
              <input
                value={userData.village || ''}
                name="village"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ບ້ານ..."
              />
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ເມືອງ</label>
              <input
                value={userData.district || ''}
                name="district"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ເມືອງ"
              />
            </div>

            {/* Province */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <label className="text-base font-medium mb-1">ແຂວງ</label>
              <input
                value={userData.province || ''}
                name="province"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ແຂວງ..."
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ອີເມວ</label>
              <input
                value={userData.email || ''}
                name="email"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="email"
                placeholder="ອີເມວ..."
              />
            </div>

            {/* phone Number */}
            {/* <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ເບີໂທ</label>
              <input
                value={userData.phoneNumber || ''}
                name="phoneNumber"
                onChange={OnChange}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="number"
                placeholder="ເບີໂທ..."
              />
            </div> */}
          </div>


          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
            <button
              onClick={() => { SuccessAlert("ຍົກເລີກການແກ້ໄຂຂໍ້ມູນລູກຄ້າສຳເລັດ");  }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-base"
            >
              ຍົກເລີກ
            </button>
            <button
              type='submit'
              onClick={() => { handleSubmit(); onClose(); }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-base"
            >
              ຕົກລົງ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
