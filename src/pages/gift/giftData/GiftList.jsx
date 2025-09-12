import { CalendarDays, Car, ChevronDown, DeleteIcon, Edit, Eye, GiftIcon, Search, Trash } from "lucide-react"
import { DeleteAlert } from "../../../utils/handleAlert/DeleteAlert";
import { useEffect, useState } from "react";
import EditReward from "./EditGift";
import AddReward from "./AddGift";
import SelectDate from "../../../utils/SelectDate";
// import { deleteGift, getAllGifts } from "../../../api/GIft";
import { filterByDateRange } from "../../../utils/FilterDate";
import { filterSearch } from "../../../utils/FilterSearch";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";


const GiftList = () => {
    const [showEditReward, setShowEditReward] = useState(false);
    const [showAddReward, setShowAddReward] = useState(false);
    const [gifts, setGifts] = useState([]);
    const [giftId, setGiftId] = useState(null);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const fetchGifts = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_GIFT);
            // console.log("Fetched gifts:", res?.data?.data);
            setGifts(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching gifts:", error);
            // Swal.fire("Error", "Failed to fetch gifts. Please try again later.", "error");
        }
    };
    useEffect(() => {
        fetchGifts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = await DeleteAlert("ວ່າຈະລົບຂໍ້ມູນລາງວັນນີ້ບໍ່?", "ລົບຂໍ້ມູນລາງວັນສຳເລັດ");
        if (confirmDelete) {
            await axiosInstance.delete(APIPath.DELETE_GIFT(id));
            fetchGifts(); // Refresh the list after deletion

        }
    }

    const filteredGifts = filterByDateRange(
        filterSearch(gifts, "name", search), // filter search ก่อน
        startDate,
        endDate,
        "createdAt" // field ที่เก็บวันที่
    );




    return (
        <div>
            {/* Top Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
                {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
                <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາລາງວັນ..." onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }} />

                {/* Buttons */}
                <div onClick={() => setShowAddReward(true)} className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
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
                        <div className="flex justify-center items-center">ຮູບພາບ</div>
                        <div className="flex justify-center items-center">ຊື່ລາງວັນ</div>
                        <div className="flex justify-center items-center">ຄະແນນ</div>
                        <div className="flex justify-center items-center">ດຳເນີນການ</div>
                    </div>
                </div>

                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
                    {
                        filteredGifts?.map((item, index) => (
                            <div key={index} className="grid grid-cols-5 gap-3 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {index + 1}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item.image ? <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-full" /> : <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                        <GiftIcon className="text-gray-600 w-6 h-6" />
                                    </div>}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item.name}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item.point}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center gap-6">
                                    <Eye />
                                    <Edit onClick={() => {
                                        setShowEditReward(true);
                                        setGiftId(item.giftcard_id);
                                    }} />
                                    <Trash onClick={() => handleDelete(item.giftcard_id)} />
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
            {/* Edit Reward Popup */}
            <EditReward show={showEditReward} onClose={() => setShowEditReward(false)} giftId={giftId} />
            {/* Add Reward Popup */}
            <AddReward show={showAddReward} onClose={() => setShowAddReward(false)} />
        </div>
    )
}

export default GiftList;
