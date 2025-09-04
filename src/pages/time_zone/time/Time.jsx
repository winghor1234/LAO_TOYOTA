import { useEffect, useState } from "react";
import { deleteTime, getAllTime, updateTimeStatus } from "../../../api/Time_Zone";
import { DeleteAlert } from "../../../utils/handleAlert/DeleteAlert";
import { filterByDateRange } from "../../../utils/FilterDate";
import { filterSearch } from "../../../utils/FilterSearch";
import { Calendar, Car, Edit, Eye, TimerIcon, Trash } from "lucide-react";
import SelectDate from "../../../utils/SelectDate";
import AddTime from "./AddTime";
import EditTime from "./EditTime";




const TimeData = () => {
    const [showEditTime, setShowEditTime] = useState(false);
    const [showAddTime, setShowAddTime] = useState(false);
    const [time, setTime] = useState([]);
    const [timeId, setTimeId] = useState(null);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const fetchTime = async () => {
        try {
            const res = await getAllTime();
            // console.log("Fetched time :", res?.data?.data);
            setTime(res?.data?.data || []);

        } catch (error) {
            console.error("Error fetching gifts:", error);
            // Swal.fire("Error", "Failed to fetch gifts. Please try again later.", "error");
        }
    };
    useEffect(() => {
        fetchTime();
    }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            // Call API to update status
            await updateTimeStatus(id, { timeStatus: !currentStatus });

            // Update frontend list immediately (optimistic update)
            setTime((prev) =>
                prev.map((t) =>
                    t.time_id === id ? { ...t, timeStatus: !currentStatus } : t
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await DeleteAlert("ວ່າຈະລົບຂໍ້ມູນລາງວັນນີ້ບໍ່?", "ລົບຂໍ້ມູນລາງວັນສຳເລັດ");
        if (confirmDelete) {
            await deleteTime(id);
            fetchTime(); // Refresh the list after deletion

        }
    }

    const filteredTime = filterByDateRange(
        filterSearch(time, "name", search), // filter search ก่อน
        startDate,
        endDate,
        "createdAt" // field ที่เก็บวันที่
    );


    return (
        <div className="">
            {/* Top Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
                {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
                <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາເວລາ..." onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }} />

                {/* Buttons */}
                <div onClick={() => setShowAddTime(true)} className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto px-10 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                        ເພີ່ມ
                    </button>
                </div>
            </div>
            <div className="grid grid-col-6 lg:grid-cols-6 overflow-y-auto lg:items-center gap-4 lg:gap-6 mb-6 h-32 ">
                {
                    filteredTime.map((item,index) => (
                        <div key={index} className={` ${item.timeStatus ? "bg-green-600 text-white hover:bg-green-500" : "bg-[#E52020] text-white hover:bg-[#E52020]"}} text-white px-4 py-2 rounded cursor-pointer shadow-2xl`}>
                            <div className="flex items-center justify-center gap-3">
                                <TimerIcon />
                                {item.time}
                            </div>
                            <div className="mt-2 flex items-center justify-center gap-3">
                                <Calendar />
                                {item.date}
                            </div>
                            <div className="mt-2 flex items-center justify-center">
                                <p className="text-2xl">{item.timeStatus ? "ຫວ່າງ" : "ເຕັມ"}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm  w-full ">
                {/* Desktop/Tablet Table Header (hidden on mobile) */}
                <div className="hidden md:block w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
                    <div className="grid grid-cols-5 gap-3 md:gap-8 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-base lg:text-lg">
                        <div className="flex justify-center items-center">ລຳດັບ</div>
                        <div className="flex justify-center items-center">ເວລາ</div>
                        <div className="flex justify-center items-center">ວັນທີ/ເດືອນ/ປີ</div>
                        <div className="flex justify-center items-center">ສະຖານະ</div>
                        <div className="flex justify-center items-center">ດຳເນີນການ</div>
                    </div>
                </div>

                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                <div className="border hidden  md:block overflow-y-auto max-h-[290px] divide-y divide-gray-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {filteredTime?.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 gap-3 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 
                       items-center hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                {index + 1}
                            </div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                {item.time}
                            </div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                {item.date}
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    type="button"
                                    onClick={() => handleToggleStatus(item.time_id, item.timeStatus)}
                                    className={`px-3 py-1 cursor-pointer rounded-lg text-xs md:text-sm lg:text-base font-medium 
                                flex justify-center items-center transition-colors 
                                ${item.timeStatus
                                            ? "bg-green-600 text-white hover:bg-green-500"
                                            : "bg-red-600 text-white hover:bg-red-500"}`}
                                >
                                    {item.timeStatus ? "ຫວ່າງ" : "ເຕັມ"}
                                </button>
                            </div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center gap-6">
                                <Eye />
                                <Edit
                                    onClick={() => {
                                        setShowEditTime(true);
                                        setTimeId(item.time_id);
                                    }}
                                />
                                <Trash onClick={() => handleDelete(item.time_id)} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Card Layout (scrollable) */}
                <div className="md:hidden overflow-y-auto max-h-[500px] divide-y divide-gray-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {filteredTime?.map((item, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Car className="text-gray-600 w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-900">{item.time}</h3>
                                    <p className="text-gray-600 text-base">{item.date}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-base">
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ສະຖານະ:</span>
                                    <span className={`font-medium ${item.timeStatus ? "text-green-600" : "text-red-600"}`}>
                                        {item.timeStatus ? "ຫວ່າງ" : "ເຕັມ"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* Edit Time Popup */}
            <EditTime show={showEditTime} onClose={() => setShowEditTime(false)} timeId={timeId} fetchTime={fetchTime} />
            {/* Add Time Popup */}
            <AddTime show={showAddTime} onClose={() => setShowAddTime(false)} fetchTime={fetchTime} />
        </div>
    )
}

export default TimeData;
