
import { useEffect, useState } from "react";
// import { deletePromotion, getPromotions } from "../../api/Promotion";
import { DeleteAlert } from "../../utils/handleAlert/DeleteAlert";
import { filterSearch } from "../../utils/FilterSearch";
import { filterByDateRange } from "../../utils/FilterDate";
import { useNavigate } from "react-router-dom";
import AddPromotion from "./AddPromotion";
import EditPromotion from "./EditPromotion";
import SelectDate from "../../utils/SelectDate";
import { Car, Edit, Eye, Trash } from "lucide-react";
import { SuccessAlert } from "../../utils/handleAlert/SuccessAlert";
import axiosInstance from "../../utils/AxiosInstance";
import APIPath from "../../api/APIPath";

const PromotionData = () => {

    const [showEditPromotion, setShowEditPromotion] = useState(false);
    const [showAddPromotion, setShowAddPromotion] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleFetchPromotion = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_PROMOTION);
            setPromotions(res?.data?.data);
        } catch (error) {
            console.error("Failed to fetch promotions:", error);
        }
    };

    const handleDeletePromotion = async (selectedPromotion) => {
        try {
            const confirmDelete = await DeleteAlert("ທ່ານຕ້ອງການລົບຂໍໍ້ມູນນີ້ບໍ?", "ການລົບຂໍໍ້ມູນສຳເລັດ");
            if (confirmDelete) {
                await axiosInstance.delete(APIPath.DELETE_PROMOTION(selectedPromotion));
                handleFetchPromotion();
            }
        } catch (error) {
            console.error("Failed to delete service:", error);
            SuccessAlert("ລົບຂໍໍ້ມູນບໍ່ສຳເລັດ", 1500, "error");
        }
    };

    useEffect(() => {
        handleFetchPromotion();
    }, []);

    const handleToDetailPromotion = (id) => {
        navigate(`/user/promotion-detail/${id}`);
    };
    // console.log("Selected Start Date:", startDate);
    // console.log("Selected End Date:", endDate);

    const filteredPromotions = filterByDateRange(
        filterSearch(promotions, "title", search), // filter search ก่อน
        startDate,
        endDate,
        "createdAt" // field ที่เก็บวันที่
    );

    const handleRefresh = (e) => {
        e.preventDefault();
        setSearch("");
        setStartDate(null);
        setEndDate(null);
    }

    handleFetchPromotion();


    return (
        <div>
            <div>
                {/* Top Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-4 flex-1">
                    {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
                    <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາ..." onDateChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }} />
                    <button
                        onClick={() => handleRefresh()}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    >
                        Reset
                    </button>


                    {/* Buttons */}
                    <div onClick={() => setShowAddPromotion(true)} className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto px-10 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                            ເພີ່ມ
                        </button>
                    </div>
                </div>
                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full flex flex-col flex-1 ">
                    {/* Desktop/Tablet Table Header (hidden on mobile) */}
                    <div className="hidden md:block w-full h-10 md:h-12 lg:h-14 bg-[#E52020] text-white">
                        <div className="grid grid-cols-5 gap-3 md:gap-8 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-sm lg:text-base">
                            <div className="flex justify-center items-center">ລຳດັບ</div>
                            <div className="flex justify-center items-center">ຮູບພາບ</div>
                            <div className="flex justify-center items-center">ຊື່</div>
                            <div className="flex justify-center items-center">ລາຍລະອຽດ</div>
                            <div className="flex justify-center items-center">ດຳເນີນການ</div>
                        </div>
                    </div>

                    {/* Desktop/Tablet Table Body (hidden on mobile) */}
                    <div className="hidden md:block divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                        {
                            filteredPromotions.map((item, index) => (
                                <div
                                    onClick={() => handleToDetailPromotion(item.promotion_id)}
                                    key={index}
                                    className="grid grid-cols-5 gap-3 md:gap-4 px-2 md:px-3 lg:px-4 py-2 md:py-3 lg:py-4 items-center hover:bg-gray-50 cursor-pointer transition-colors shadow-md"
                                >
                                    <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                        {index + 1}
                                    </div>
                                    <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        )}
                                    </div>
                                    <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                        {item.title}
                                    </div>
                                    <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                        {item.detail}
                                    </div>
                                    <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center gap-6">
                                        <Eye />
                                        <Edit
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowEditPromotion(true);
                                                setSelectedPromotion(item.promotion_id);
                                            }}
                                        />
                                        <Trash
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeletePromotion(item.promotion_id);
                                            }}
                                        />
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
                {/* Edit promotion */}
                <EditPromotion show={showEditPromotion} onClose={() => setShowEditPromotion(false)} promotionId={selectedPromotion} />
                {/* Add promotion */}
                <AddPromotion show={showAddPromotion} onClose={() => setShowAddPromotion(false)} />
            </div>
        </div>
    )
}

export default PromotionData
