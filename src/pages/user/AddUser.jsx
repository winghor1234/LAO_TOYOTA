import { SuccessAlert } from '../../utils/handleAlert/SuccessAlert';
import { FaArrowLeft } from 'react-icons/fa';
import { useAddUserForm } from '../../component/schemaValidate/userValidate/AddUserValidate';

const AddUser = ({ show, onClose , handleFetch}) => {
  const { register, handleSubmit, formState: { errors }, loading, submitForm } = useAddUserForm({ handleFetch, onClose });

  return (
    <>
      {/* Dark overlay */}
      <div className={`fixed inset-0  backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'  }`} onClick={onClose}/> 
      {/* Small Popup */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 transition-all text-base ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none' }`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div
            onClick={() => onClose()}
            className="inline-flex items-center justify-center w-auto px-4 py-1 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer transition-colors mb-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-black">
              <FaArrowLeft className="text-sm sm:text-base" />
              <span className="font-medium text-sm sm:text-lg lg:text-xl">ກັບໄປຫນ້າກ່ອນ</span>
            </button>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-600 transition-colors w-full sm:w-auto px-4 py-2 text-white rounded-lg font-medium text-base">
            Import
          </button>
        </div>
        <hr className="border-gray-300 border-1 w-full my-3" />
        {/* Main Content */}
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col md:items-center lg:flex-col justify-center lg:justify-around gap-6 lg:gap-3">
          <div className="border grid grid-cols-1 sm:grid-cols-2 md:place-items-start lg:grid-cols-2 gap-3 lg:gap-3 max-w-full w-full p-3 shadow-4xl">

            {/* User Name */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ຊື່ຜູ້ໃຊ້</label>
              <input
                {...register("username")}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ຊື່ຜູ້ໃຊ້..."
              />
              <div className='h-6'>
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
              </div>
            </div>
            {/* Age */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ເບີໂທ</label>
              <input
                {...register("phoneNumber")}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"

                placeholder="ເບີໂທ..."
              />
              <div className='h-6'>
                {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
              </div>
            </div>
            {/* password */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ລະຫັດຜ່ານ</label>
              <input
                {...register("password")}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="password"
                placeholder="ລະຫັດຜ່ານ..."
              />
              <div className='h-6'>
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
            </div>
            {/* Village */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ບ້ານ</label>
              <input
                {...register("village")}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ບ້ານ..."
              />
              <div className='h-6'>
                {errors.village && <span className="text-red-500 text-sm">{errors.village.message}</span>}
              </div>
            </div>
            {/* District */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ເມືອງ</label>
              <input
                {...register("district")}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ເມືອງ"
              />
              <div className='h-6'>
                {errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}
              </div>
            </div>
            {/* Province */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <label className="text-base font-medium mb-1">ແຂວງ</label>
              <input
                {...register("province")}
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ແຂວງ..."
              />
              <div className='h-6'>
                {errors.province && <span className="text-red-500 text-sm">{errors.province.message}</span>}
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
            <button
              onClick={() => { SuccessAlert("ຍົກເລີກການເພີ່ມລູກຄ້າສຳເລັດ"); onClose(); }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-base"
            >
              ຍົກເລີກ
            </button>
            <button
              disabled={loading}
              type='submit'
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-base"
            >
              ຕົກລົງ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
