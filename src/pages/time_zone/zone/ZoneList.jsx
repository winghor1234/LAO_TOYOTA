import { useEffect, useState } from "react";
import { DeleteAlert } from "../../../utils/handleAlert/DeleteAlert";
import { filterByDateRange } from "../../../utils/FilterDate";
import { filterSearch } from "../../../utils/FilterSearch";
import { Clock1, Clock3, Edit, MapPinned, Trash } from "lucide-react";
import SelectDate from "../../../utils/SelectDate";
import AddZone from "./AddZone";
import EditZone from "./EditZone";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import ExportExcelButton from "../../../utils/ExcelExportButton";
import ImportExcel from "../../../utils/ImportExel";



const ZoneList = () => {
    const [showEditZone, setShowEditZone] = useState(false);
    const [showAddZone, setShowAddZone] = useState(false);
    const [zone, setZone] = useState([]);
    const [zoneId, setZoneId] = useState(null);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [exportData, setExportData] = useState([]);
    const navigate = useNavigate();

    const fetchZone = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_ZONE);
            // console.log("Fetched zone :", res?.data?.data);
            setZone(res?.data?.data || []);
            setExportData(
                res?.data?.data.map((item) => ({
                    ຊື່ໂຊນ: item.zoneName,
                    ເວລາ: item.timeFix,
                    ສະຖານະ: item.zoneStatus ? "ຫວ່າງ" : "ເຕັມ",
                }))
            )
        } catch (error) {
            console.error("Error fetching zone:", error);
        }
    };
    useEffect(() => {
        fetchZone();
    }, []);

    // const handleToggleStatus = async (id, currentStatus) => {
    //     try {
    //         // Call API to update status
    //         await updateZoneStatus(id, { zoneStatus: !currentStatus });

    //         // Update frontend list immediately (optimistic update)
    //         setZone((prev) =>
    //             prev.map((t) =>
    //                 t.zone_id === id ? { ...t, zoneStatus: !currentStatus } : t
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Failed to update status:", error);
    //     }
    // };


    const handleDelete = async (id) => {
        const confirmDelete = await DeleteAlert("ວ່າຈະລົບຂໍ້ມູນລາງວັນນີ້ບໍ່?", "ລົບຂໍ້ມູນລາງວັນສຳເລັດ");
        if (confirmDelete) {
            await axiosInstance.delete(APIPath.DELETE_ZONE(id));
            fetchZone(); // Refresh the list after deletion

        }
    }

    const filteredZone = filterByDateRange(
        filterSearch(zone, "name", search), // filter search ก่อน
        startDate,
        endDate,
        "createdAt" // field ที่เก็บวันที่
    );




    return (
        <div>
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
                {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
                <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາເວລາ..." onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }} />
                {/* Export Excel */}
                <ExportExcelButton data={exportData} fileName="ZoneData.xlsx" />
                {/* Import Excel */}
                <ImportExcel fetchTime={fetchZone} addToExport={setExportData} />
                {/* Buttons */}
                <div onClick={() => setShowAddZone(true)} className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto px-10 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                        ເພີ່ມ
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 overflow-y-auto lg:items-center gap-4 lg:gap-6 mb-6  ">

                {
                    filteredZone?.map((item, index) => (
                        // <div className={`flex flex-col items-center justify-start py-2 gap-2 ${item.zoneStatus ? "bg-green-600 text-white " : "bg-[#E52020] text-white "} px-2 rounded-r cursor-pointer`}>
                        <div key={index} className="flex justify-center hover:shadow-xl ">
                            <div onClick={() => navigate(`/user/zoneDetail/${item.zone_id}`)} key={index} className={` ${item.zoneStatus ? "bg-green-600 text-white " : "bg-[#E52020] text-white "} text-white w-full flex flex-col gap-2 px-4 py-2  rounded-l  cursor-pointer shadow-2xl`}>
                                <div className="flex items-center justify-start gap-3 text-md">
                                    <MapPinned />
                                    {item.zoneName}
                                </div>
                                <div className="flex items-center justify-start gap-3 text-md">
                                    <Clock3 />
                                    {item.timeFix} ນາທີ
                                </div>
                                <div className="mt-2 flex items-center justify-center">
                                    <p className="text-2xl">{item.zoneStatus ? "ຫວ່າງ" : "ເຕັມ"}</p>
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-start py-2 gap-2 ${item.zoneStatus ? "bg-green-600 text-white " : "bg-[#E52020] text-white "} px-2 rounded-r cursor-pointer`}>
                                <Edit onClick={() => {
                                    setShowEditZone(true);
                                    setZoneId(item.zone_id);
                                }} />
                                <Trash onClick={() => handleDelete(item.zone_id)} />
                            </div>
                        </div>
                        // </div>
                    ))
                }
                {/* Edit Zone Popup */}
                <EditZone show={showEditZone} onClose={() => setShowEditZone(false)} zoneId={zoneId} fetchZone={fetchZone} />
                {/* Add Zone Popup */}
                <AddZone show={showAddZone} onClose={() => setShowAddZone(false)} fetchZone={fetchZone} />
            </div>
        </div>
    );
};
export default ZoneList;