import { BackButton } from '../../utils/BackButton';
import { Car } from 'lucide-react';
import { SuccessAlert } from '../../utils/handleAlert/SuccessAlert';
import { useEffect, useState } from 'react';
// import {  updateCar } from '../../api/Car';
// import { getAllUsers } from '../../api/Auth';
import axios from 'axios';
import APIPath from '../../api/APIPath';
import axiosInstance from '../../utils/AxiosInstance';


const EditCarFormPopup = ({ show, onClose, userId, carId, handleFetchCar }) => {

    // console.log("EditCarFormPopup carId:", carId);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        userId: '',
        model: '',
        engineNumber: '',
        frameNumber: '',
        plateNumber: '',
        province: ''
    });

    useEffect(() => {
        const fetchCarDetails = async () => {
            if (!carId) return;
            try {
                // const response = await getCarById(carId);
                const response = await axios.get(APIPath.SELECT_ONE_CAR(carId));
                console.log("Fetched car details:", response?.data?.data);
                setFormData(response?.data?.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };


        fetchCarDetails();

    }, [carId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

      const fetchUsers = async () => {
        try {
          const res = await axiosInstance.get(APIPath.SELECT_ALL_USER);
          console.log("Users:", res?.data?.data);
          setUsers(res?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        fetchUsers();
      }, []);
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append('userId', userId);
        data.append('model', formData.model);
        data.append('engineNumber', formData.engineNumber);
        data.append('frameNumber', formData.frameNumber);
        data.append('plateNumber', formData.plateNumber);
        data.append('province', formData.province);
        try {
            await axiosInstance.put(APIPath.UPDATE_CAR(carId), data);
            handleFetchCar();
            SuccessAlert("ເພີ່ມຂໍ້ມູນລົດສຳເລັດ");
            onClose();
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };

    return (
        <>
            {/* Blur background */}
            <div
                className={`fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Popup */}
            <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-50 rounded-2xl shadow-lg w-full max-w-3xl p-4 sm:p-6 text-sm transition-all ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
                    <BackButton />
                    <button className="bg-yellow-400 hover:bg-yellow-600 transition-colors px-4 py-2 text-white rounded-lg text-sm sm:text-base">
                        Import
                    </button>
                </div>
                <hr className="border-gray-300 border-1 w-full my-3" />

                {/* Main Content */}
                <form onSubmit={handleSubmit} className='flex flex-col md:items-center lg:flex-row justify-center lg:justify-around gap-6 lg:gap-4'>
                    {/* Left side - Car Image */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className='w-full max-w-[250px] h-[150px] sm:h-[180px] lg:h-[200px] bg-gray-200 rounded-lg flex items-center justify-center'>
                            <Car className='w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] text-gray-600' />
                        </div>
                        <div className='flex flex-col gap-2 my-3 w-full max-w-[250px]'>
                            <button onClick={() => { SuccessAlert("ຍົກເລີກການເເກ້ໄຂຂໍ້ມູນລົດສຳເລັດ"); onClose(); }} className='w-full py-2 border cursor-pointer border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors'>
                                ຍົກເລີກການເເກ້ໄຂ
                            </button>
                            <button type='submit' className='w-full py-2 border cursor-pointer border-red-500 rounded-lg text-sm bg-red-500 text-white hover:bg-[#E32121] transition-colors'>
                                ບັນທຶກການເເກ້ໄຂ
                            </button>
                        </div>
                    </div>

                    {/* Right side - Form Fields */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[400px] w-full'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>ລະຫັດລູກຄ້າ</label>
                            <select name='userId' value={formData.userId} onChange={handleInputChange} className='w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors'>
                                <option disabled >ເລືອກລູກຄ້າ</option>
                                {users?.map(user => (
                                    <option key={user.user_id} value={user.user_id}>{user.customer_number}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>ຊື່ລົດ</label>
                            <input name='model' value={formData.model} onChange={handleInputChange} className='w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors' placeholder='ລຸ້ນລົດ...' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>ເລກຈັກ</label>
                            <input name='engineNumber' value={formData.engineNumber} onChange={handleInputChange} className='w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors' placeholder='ເລກຈັກ...' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>ເລກຖັງ</label>
                            <input name='frameNumber' value={formData.frameNumber} onChange={handleInputChange} className='w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors' placeholder='ເລກຖັງ...' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>ປ້າຍທະບຽນ</label>
                            <input name='plateNumber' value={formData.plateNumber} onChange={handleInputChange} className='w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors' placeholder='ກມ 8xxxx...' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-medium mb-1'>ແຂວງ</label>
                            <input name='province' value={formData.province} onChange={handleInputChange} className='w-full h-[40px] rounded-lg text-sm border border-gray-300 px-3 outline-none hover:border-blue-500 focus:border-blue-500 transition-colors' placeholder='ນະຄອນຫຼວງ' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCarFormPopup;
