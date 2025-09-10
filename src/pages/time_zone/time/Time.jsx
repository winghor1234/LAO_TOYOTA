import { useEffect, useState } from "react";
// import { deleteTime, getAllTime } from "../../../api/Time_Zone";
import { filterByDateRange } from "../../../utils/FilterDate";
import { filterSearch } from "../../../utils/FilterSearch";
import { Calendar, Car, Edit, Eye, TimerIcon, Trash } from "lucide-react";
import SelectDate from "../../../utils/SelectDate";
import AddTime from "./AddTime";
import EditTime from "./EditTime";
import { useNavigate } from "react-router-dom";
import { DeleteAlert } from "../../../utils/handleAlert/DeleteAlert";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";




const TimeData = () => {
    const [showAddTime, setShowAddTime] = useState(false);
    const [showEditTime, setShowEditTime] = useState(false);
    const [time, setTime] = useState([]);
    const [timeId, setTimeId] = useState(null);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();


    const fetchTime = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_TIME);
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

    // const handleToggleStatus = async (id, currentStatus) => {
    //     try {
    //         // Call API to update status
    //         await updateTimeStatus(id, { timeStatus: !currentStatus });

    //         // Update frontend list immediately (optimistic update)
    //         setTime((prev) =>
    //             prev.map((t) =>
    //                 t.time_id === id ? { ...t, timeStatus: !currentStatus } : t
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Failed to update status:", error);
    //     }
    // };

    const handleDelete = async (id) => {
        // เรียก confirm dialog และ toast หลังยืนยัน
        const confirmDelete = await DeleteAlert(
            "ວ່າຈະລົບຂໍ້ມູນລາງວັນນີ້ບໍ່?",
            "ລົບຂໍ້ມູນລາງວັນສຳເລັດ"
        );

        if (confirmDelete) {
            await axiosInstance.delete(APIPath.DELETE_TIME(id)) // ลบข้อมูลจริง
            fetchTime(); // Refresh list หลังลบ
        }
    };


    const filteredTime = filterByDateRange(
        filterSearch(time, "name", search), // filter search ก่อน
        startDate,
        endDate,
        "createdAt" // field ที่เก็บวันที่
    );


    return (
        <div >
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
            <div className="grid grid-col-5 lg:grid-cols-5 overflow-y-auto lg:items-center gap-2 lg:gap-4 mb-6  ">
                {
                    filteredTime.map((item, index) => (
                        <div key={index} className="flex justify-center hover:shadow-xl ">
                            <div onClick={() => navigate(`/user/timeDetail/${item.time_id}`)} key={index} className={` ${item.timeStatus ? "bg-green-600 text-white " : "bg-[#E52020] text-white "} text-white w-full px-4 py-2 rounded-l  cursor-pointer shadow-2xl`}>
                                <div className="flex items-center justify-start gap-3 text-md">
                                    <TimerIcon />
                                    {item.time}
                                </div>
                                <div className="mt-2 flex items-center justify-start gap-3 text-md">
                                    <Calendar />
                                    {item.date}
                                </div>
                                <div className="mt-2 flex items-center justify-center">
                                    <p className="text-2xl">{item.timeStatus ? "ຫວ່າງ" : "ເຕັມ"}</p>
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-start py-2 gap-2 ${item.timeStatus ? "bg-green-600 text-white " : "bg-[#E52020] text-white "} px-2 rounded-r cursor-pointer`}>
                                <Edit className="text-white" onClick={() => {
                                    setShowEditTime(true);
                                    setTimeId(item.time_id);
                                }} />
                                <Trash className="text-white" onClick={() => handleDelete(item.time_id)} />
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Edit Time Popup */}
            <EditTime show={showEditTime} onClose={() => setShowEditTime(false)} timeId={timeId} fetchTime={fetchTime} />
            {/* Add Time Popup */}
            <AddTime show={showAddTime} onClose={() => setShowAddTime(false)} fetchTime={fetchTime} />
        </div>
    )
}

export default TimeData;
