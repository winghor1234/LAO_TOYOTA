// import { useState } from "react";
import { FaArrowLeft, FaCar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// RejectZone Component
const RejectZone = ({ setRejectZone }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">ປະຕິເສດການນັດໝາຍ</h2>
        
        <div className="space-y-4 sm:space-y-5">
          <button 
            onClick={() => setRejectZone(false)} 
            className="w-full py-3 sm:py-4 border border-gray-300 rounded-lg text-lg sm:text-xl shadow-sm flex justify-between items-center px-4 sm:px-6 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            ເລືອກໂຊນ A
            <span className="text-red-500 rotate-180 text-lg sm:text-xl">❯</span>
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pt-4">
          <button
            onClick={() => setRejectZone(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
          >
            ຍົກເລີກ
          </button>
          <button
            onClick={() => setRejectZone(false)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full sm:w-32 h-12 cursor-pointer transition-colors text-sm sm:text-base"
          >
            ຕົກລົງ
          </button>
        </div>
      </div>
    </div>
  );
};
export default RejectZone;