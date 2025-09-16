import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axiosInstance from "./AxiosInstance";
import APIPath from "../api/APIPath";
import { SuccessAlert } from "./handleAlert/SuccessAlert";
import Spinner from "./Loading";


const ImportExcel = ({ fetchTime, addToExport }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // jsonData ต้องมี column: time, date
      for (const item of jsonData) {
        const formData = new URLSearchParams();
        formData.append("time", item.time);
        formData.append("date", item.date);

        await axiosInstance.post(APIPath.CREATE_TIME, formData);

        // เพิ่มไป exportData
        addToExport({
          time: item.time,
          date: item.date,
          status: "ຫວ່າງ", // default หรือเอาจาก backend ถ้ามี
        });
      }
      SuccessAlert("ອັບໂຫຼດເວລາຈາກ Excel ສຳເລັດ");
      fetchTime();
      fileInputRef.current.value = null; // reset input
    } catch (error) {
      console.error("Error importing Excel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="bg-green-500 mt-1 hover:bg-green-600 text-white px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-3 rounded-lg text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1 sm:gap-2 cursor-pointer shadow-4xl w-full sm:w-auto min-w-[100px] sm:min-w-[120px] lg:min-w-auto"
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
      >
        {loading ? <Spinner size="5" color="white" /> : <span className="whitespace-nowrap">Import Excel</span>}
      </button>
    </div>
  );
};

export default ImportExcel;