import { useEffect, useState } from "react";
import { filterByDateRange } from "../../../utils/FilterDate";
import { filterSearch } from "../../../utils/FilterSearch";
import { Calendar, TimerIcon, Edit, Trash, MapPinned } from "lucide-react";
import SelectDate from "../../../utils/SelectDate";
import AddTime from "./AddTime";
import EditTime from "./EditTime";
import { useNavigate } from "react-router-dom";
import { DeleteAlert } from "../../../utils/handleAlert/DeleteAlert";
import ExportExcelButton from "../../../utils/ExcelExportButton";
import ImportExcel from "../../../utils/ImportExel";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";

const TimeList = () => {
    const [showAddTime, setShowAddTime] = useState(false);
    const [showEditTime, setShowEditTime] = useState(false);
    const [time, setTime] = useState([]);
    const [timeId, setTimeId] = useState(null);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [exportData, setExportData] = useState([]);
    const navigate = useNavigate();

    const fetchTime = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_TIME);
            const data = res?.data?.data || [];
            console.log("Fetched time :", data);
            setTime(data);

            // อัปเดต exportData ทุกครั้งเมื่อ fetch
            setExportData(
                data.map((item) => ({
                    ເວລາ: item.time,
                    ວັນທີ: item.date,
                    ສະຖານະ: item.timeStatus ? "ຫວ່າງ" : "ເຕັມ",
                }))
            );
        } catch (error) {
            console.error("Error fetching time:", error);
        }
    };

    useEffect(() => {
        fetchTime();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = await DeleteAlert(
            "ວ່າຈະລົບຂໍ້ມູນລາງວັນນີ້ບໍ່?",
            "ລົບຂໍ້ມູນລາງວັນສຳເລັດ"
        );

        if (confirmDelete) {
            await axiosInstance.delete(APIPath.DELETE_TIME(id));
            fetchTime();
        }
    };

    const filteredTime = filterByDateRange(
        filterSearch(time, "name", search),
        startDate,
        endDate,
        "createdAt"
    );

    return (
        <div>
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
                <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາເວລາ..." onDateChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate); }} />
                {/* Export Excel */}
                <ExportExcelButton data={exportData} fileName="TimeData.xlsx" />
                {/* Import Excel */}
                <ImportExcel fetchData={fetchTime} addToExport={(newData) => setExportData((prev) => [...prev, newData])} />
                <div onClick={() => setShowAddTime(true)} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto px-10 py-2 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                        ເພີ່ມ
                    </button>
                </div>
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-y-auto lg:items-center gap-2 lg:gap-4 mb-6">
                {filteredTime.map((item) => (
                    <div key={item.time_id} className="flex justify-center hover:shadow-xl">
                        <div
                            onClick={() => navigate(`/user/timeDetail/${item.time_id}`)}
                            className={`${item.timeStatus ? "bg-green-600 text-white" : "bg-[#E52020] text-white"} text-white cursor-pointer w-full px-4 py-2 rounded-lcursor-pointer shadow-2xl`}>
                            <div className="ml-4 flex items-center justify-start gap-3 text-md">
                                <TimerIcon />
                                {item.time}
                            </div>
                            <div className="mt-2 ml-4 flex items-center justify-start gap-3 text-md">
                                <Calendar />
                                {item.date}
                            </div>
                            <div className="mt-2 ml-4 flex items-center justify-start gap-3 text-2xl font-semibold">
                                <MapPinned />
                                {item?.zone?.zoneName}
                            </div>
                            <div className="mt-2 ml-4 flex items-center justify-start font-semibold">
                                <p className="text-2xl">{item.timeStatus ? "ຫວ່າງ" : "ເຕັມ"}</p>
                            </div>
                        </div>
                        <div className={`flex flex-col items-center justify-start py-2 gap-2 ${item.timeStatus ? "bg-green-600 text-white" : "bg-[#E52020] text-white"} px-2 rounded-r cursor-pointer`}>
                            <Edit
                                className="text-white h-5 w-5 cursor-pointer"
                                onClick={() => {
                                    setShowEditTime(true);
                                    setTimeId(item.time_id);
                                }}
                            />
                            <Trash className="text-white h-5 w-5 cursor-pointer" onClick={() => handleDelete(item.time_id)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Popups */}
            <EditTime show={showEditTime} onClose={() => setShowEditTime(false)} timeId={timeId} fetchTime={fetchTime} />
            <AddTime
                show={showAddTime}
                onClose={() => setShowAddTime(false)}
                fetchTime={fetchTime}
                addToExport={(newData) => setExportData((prev) => [...prev, { ...newData, status: "ຫວ່າງ" },])}
            />
        </div>
    );
};

export default TimeList;