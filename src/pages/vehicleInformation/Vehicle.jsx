import { CalendarDays, Car, ChevronDown, Edit, Eye, Search, Trash } from "lucide-react"
import AddCarFormPopup from "./AddCarForm";
import SelectDate from "../../utils/SelectDate";
import { deleteCar, getAllCars } from "../../api/Car";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/Auth";
import EditCarFormPopup from "./EditCarForm";
import { DeleteAlert } from "../../utils/handleAlert/DeleteAlert";
import { filterByDateRange } from "../../utils/FilterDate";
import { filterSearch } from "../../utils/FilterSearch";



const Vehicle = () => {
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [showEditCarForm, setShowEditCarForm] = useState(false);
  const [carId, setCarId] = useState(null);
  const [car, setCar] = useState([]);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [carId, setCarId] = useState(null);
  const handleFetchCar = async () => {
    try {
      const [resAllCar, resGetUserId] = await Promise.all([getAllCars(), getProfile()]);
      console.log("Fetched car data:", resAllCar?.data?.data);
      setCar(resAllCar?.data?.data);
      setUserId(resGetUserId?.data?.data?.user_id);
    } catch (error) {
      console.error("Error fetching car data:", error);

    }

  }

  const handleDelete = async (carId) => {
    try {
      const confirmDelete = await DeleteAlert("ທ່ານຕ້ອງການລົບຂໍໍ້ມູນນີ້ບໍ?", "ການລົບຂໍໍ້ມູນສຳເລັດ");
      if (confirmDelete) {
        await deleteCar(carId);
        handleFetchCar();
      }
    } catch (error) {
      console.error("Failed to delete car:", error);

    }
  }

  useEffect(() => {
    handleFetchCar();
  }, [userId]);


  const filteredCar = filterByDateRange(
    filterSearch(car, "engineNumber", search), // filter search ก่อน
    startDate,
    endDate,
    "createdAt" // field ที่เก็บวันที่
  );

  // handleFetchCar();



  return (
    <div>
      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
        {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
        <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາລົດ..." onDateChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }} />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-3">
          <button className="bg-red-600 hover:bg-red-700 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
            ຄົ້ນຫາ
          </button>
          <button className="bg-green-400 hover:bg-green-500 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
            Export
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
            Import
          </button>
          <button onClick={() => setShowAddCarForm(true)} className="bg-blue-500 hover:bg-blue-600 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
            ເພີ່ມລົດ
          </button>
        </div>
      </div>
      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
        {/* Desktop/Tablet Table Header (hidden on mobile) */}
        <div className="hidden md:block  w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
          <div className="grid grid-cols-7 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-base lg:text-lg">
            {/* <div className="flex justify-center items-center">ຂໍ້ມູນຜູ້ນັດໝາຍ</div> */}
            <div className="flex justify-center items-center">ຊື່ລູກຄ້າ</div>
            <div className="flex justify-center items-center">ຊື່ລົດ</div>
            <div className="flex justify-center items-center">ປ້າຍທະບຽນ</div>
            <div className="flex justify-center items-center">ເລກຈັກ</div>
            <div className="flex justify-center items-center">ເລກຖັງ</div>
            <div className="flex justify-center items-center">ແຂວງ</div>
            <div className="flex justify-center items-center">ດຳເນີນການ</div>

          </div>
        </div>

        {/* Desktop/Tablet Table Body (hidden on mobile) */}
        <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
          {filteredCar.map((item, index) => (
            <div key={index} className="grid grid-cols-7 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 transition-colors">
              {/* <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Car className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600 " />
                </div>
                <span className="font-medium text-xs md:text-sm lg:text-base">kham</span>
              </div> */}
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.model}</div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.model}</div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.engineNumber}</div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.frameNumber}</div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.plateNumber}</div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.province}</div>
              <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center gap-6">
                <Eye />
                <Edit
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditCarForm(true);
                    setCarId(item.car_id);
                  }}
                />
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.car_id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Card Layout (visible only on mobile) */}
        <div className="md:hidden divide-y divide-gray-200">
          {car?.map((item, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="text-gray-600 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">kham</h3>
                  <p className="text-gray-600 text-base">{item.model}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-base">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ເລກຈັກ:</span>
                  <span className="font-medium text-gray-900">{item.engineNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ເລກຖັງ:</span>
                  <span className="font-medium text-gray-900">{item.frameNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ປ້າຍທະບຽນ:</span>
                  <span className="font-medium text-gray-900">{item.plateNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ແຂວງ:</span>
                  <span className="font-medium text-gray-900">{item.province}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Car Form Popup */}
      <AddCarFormPopup show={showAddCarForm} onClose={() => setShowAddCarForm(false)} />
      {/* Edit Car Form Popup */}
      <EditCarFormPopup show={showEditCarForm} onClose={() => setShowEditCarForm(false)} userId={userId} carId={carId} />
    </div>
  )
}

export default Vehicle
