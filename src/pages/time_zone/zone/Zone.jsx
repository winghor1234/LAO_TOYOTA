import { useEffect, useState } from "react";
import { deleteZone, getAllZone, updateZoneStatus } from "../../../api/Time_Zone";
import { DeleteAlert } from "../../../utils/handleAlert/DeleteAlert";
import { filterByDateRange } from "../../../utils/FilterDate";
import { filterSearch } from "../../../utils/FilterSearch";
import { Car, Edit, Eye, Trash } from "lucide-react";
import SelectDate from "../../../utils/SelectDate";
import AddZone from "./AddZone";
import EditZone from "./EditZone";




const ZoneData = () => {
    const [showEditZone, setShowEditZone] = useState(false);
    const [showAddZone, setShowAddZone] = useState(false);
    const [zone, setZone] = useState([]);
    const [zoneId, setZoneId] = useState(null);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const fetchZone = async () => {
        try {
            const res = await getAllZone();
            // console.log("Fetched zone :", res?.data?.data);
            setZone(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching zone:", error);
        }
    };
    useEffect(() => {
        fetchZone();
    }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            // Call API to update status
            await updateZoneStatus(id, { zoneStatus: !currentStatus });

            // Update frontend list immediately (optimistic update)
            setZone((prev) =>
                prev.map((t) =>
                    t.zone_id === id ? { ...t, zoneStatus: !currentStatus } : t
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };


    const handleDelete = async (id) => {
        const confirmDelete = await DeleteAlert("ວ່າຈະລົບຂໍ້ມູນລາງວັນນີ້ບໍ່?", "ລົບຂໍ້ມູນລາງວັນສຳເລັດ");
        if (confirmDelete) {
            await deleteZone(id);
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
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
                {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
                <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາເວລາ..." onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }} />

                {/* Buttons */}
                <div onClick={() => setShowAddZone(true)} className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto px-10 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                        ເພີ່ມ
                    </button>
                </div>
            </div>
            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
                {/* Desktop/Tablet Table Header (hidden on mobile) */}
                <div className="hidden md:block w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
                    <div className="grid grid-cols-5 gap-3 md:gap-8 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-base lg:text-lg">
                        <div className="flex justify-center items-center">ລຳດັບ</div>
                        <div className="flex justify-center items-center">ຊື່ໂຊນ</div>
                        <div className="flex justify-center items-center">ເວລາສ້ອມແປງ</div>
                        <div className="flex justify-center items-center">ສະຖານະ</div>
                        <div className="flex justify-center items-center">ດຳເນີນການ</div>
                    </div>
                </div>

                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
                    {
                        filteredZone?.map((item, index) => (
                            <div key={index} className="grid grid-cols-5 gap-3 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {index + 1}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item.zoneName}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item.timeFix}
                                </div>
                                <div className="flex justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(item.zone_id, item.zoneStatus)}
                                        className={`px-3 py-1 cursor-pointer rounded-lg text-xs md:text-sm lg:text-base font-medium flex justify-center items-center transition-colors ${item.zoneStatus
                                            ? "bg-green-600 text-white hover:bg-green-500"
                                            : "bg-red-600 text-white hover:bg-red-500"
                                            }`}
                                    >
                                        {item.zoneStatus ? "ຫວ່າງ" : "ເຕັມ"}
                                    </button>
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center gap-6">
                                    <Eye />
                                    <Edit onClick={() => {
                                        setShowEditZone(true);
                                        setZoneId(item.zone_id);
                                    }} />
                                    <Trash onClick={() => handleDelete(item.zone_id)} />
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Mobile Card Layout (visible only on mobile) */}
                <div className="md:hidden divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <Car className="text-gray-600 w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900"></h3>
                                <p className="text-gray-600 text-base"></p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-base">
                            <div className="flex justify-between py-1">
                                <span className="text-gray-500 font-medium">ໂທ:</span>
                                <span className="font-medium text-gray-900"></span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-500 font-medium">ປ້າຍ:</span>
                                <span className="font-medium text-gray-900"></span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-500 font-medium">ວັນທີ:</span>
                                <span className="font-medium text-gray-900"></span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-500 font-medium">ເວລາ:</span>
                                <span className="font-medium text-gray-900"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Zone Popup */}
            <EditZone show={showEditZone} onClose={() => setShowEditZone(false)} zoneId={zoneId} fetchZone={fetchZone} />
            {/* Add Zone Popup */}
            <AddZone show={showAddZone} onClose={() => setShowAddZone(false)} fetchZone={fetchZone} />
        </div>
    )
}

export default ZoneData;
