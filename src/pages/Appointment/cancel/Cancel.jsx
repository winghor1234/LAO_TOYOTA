import { Car } from "lucide-react";
import { TopControl } from "../../../utils/TopControl";
import { TableHeader } from "../../../utils/AppointmentTableHeader";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useEffect, useState } from "react";




const Cancel = () => {
    const [booking, setBooking] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ALL_BOOKING);
            // console.log(res.data.data);
            setBooking(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            {/* Top Controls */}
            <TopControl />
            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
                {/* Desktop/Tablet Table Header (hidden on mobile) */}
                <TableHeader />
                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
                    {booking.filter(item => item.bookingStatus === "cancel").map((item, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className=" flex flex-col">
                                    <span className=" bg-red-500 px-4 py-2  text-white rounded-xl text-xs font-semibold text-center w-full min-w-[60px]">
                                        ຍົກເລີກເເລ້ວ
                                    </span>
                                </div>
                                <span className="font-medium text-xs md:text-sm lg:text-base">{item.car.model}</span>
                            </div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.user?.username}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.user?.phoneNumber}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.car?.plateNumber}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.time?.date}</div>
                            <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item?.time?.time}</div>
                        </div>
                    ))}
                </div>

                {/* Mobile Card Layout (visible only on mobile) */}
                {/* <div className="md:hidden divide-y divide-gray-200">
                    {booking.filter(item => item.bookingStatus === "cancel").map((item, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Car className="text-gray-600 w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-900">{item.brand}</h3>
                                    <p className="text-gray-600 text-base">{item.customer}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-base">
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ໂທ:</span>
                                    <span className="font-medium text-gray-900">{item.phone}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ປ້າຍ:</span>
                                    <span className="font-medium text-gray-900">{item.number}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ວັນທີ:</span>
                                    <span className="font-medium text-gray-900">{item.date}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-500 font-medium">ເວລາ:</span>
                                    <span className="font-medium text-gray-900">{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default Cancel
