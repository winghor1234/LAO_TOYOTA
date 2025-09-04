import { BackButton } from '../../utils/BackButton';
import { SuccessAlert } from '../../utils/handleAlert/SuccessAlert';


const AddUser = ({ show, onClose }) => {
  return (
    <>
      {/* Dark overlay */}
      <div
        className={`fixed inset-0  backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity ${
          show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose} // click outside to close
      />

      {/* Small Popup */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 transition-all text-base ${
          show ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
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
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ລະຫັດຜູ້ໃຊ້</label>
              <input
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ລະຫັດຜູ້ໃຊ້..."
              />
            </div>

            {/* User Name */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ຊື່ຜູ້ໃຊ້</label>
              <input
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ຊື່ຜູ້ໃຊ້..."
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ເພດ</label>
              <select
                className="w-full sm:w-60 h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">ເລືອກເພດ</option>
                <option value="male">ຊາຍ</option>
                <option value="female">ຍິງ</option>
              </select>
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ອາຍຸ</label>
              <input
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="number"
                placeholder="ອາຍຸ..."
              />
            </div>

            {/* Village */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ບ້ານ</label>
              <input
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ບ້ານ..."
              />
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-1">ເມືອງ</label>
              <input
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ເມືອງ"
              />
            </div>

            {/* Province */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <label className="text-base font-medium mb-1">ແຂວງ</label>
              <input
                className="w-full h-[40px] sm:h-[45px] rounded-lg text-base font-light border border-gray-300 outline-none px-3 hover:border-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="ແຂວງ..."
              />
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
              onClick={() => { SuccessAlert("ເພີ່ມລູກຄ້າສຳເລັດ"); onClose(); }}
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

export default AddUser;
