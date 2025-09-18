import { Users, Clock, Gift, Ticket, Car, Wrench, PlusCircle, FileText, Clock3 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
// import { getAllUsers } from "../../api/Auth";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import APIPath from "../../api/APIPath";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { LiaGiftsSolid } from "react-icons/lia";
import { GrUserAdmin } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";




const dataCircle = [{ name: "Complete", value: 40 }, { name: "Remaining", value: 100 }];
const COLORS = ["#E52020", "#F0F0F0"];


const dataLine = [
    { name: "Jan", value: 50 },
    { name: "Feb", value: 400 },
    { name: "Mar", value: 300 },
    { name: "Apr", value: 200 },
    { name: "May", value: 100 },
    { name: "Jun", value: 250 },
    { name: "Jul", value: 50 },
    { name: "Aug", value: 400 },
    { name: "Sep", value: 500 },
    { name: "Oct", value: 300 },
    { name: "Nov", value: 400 },
    { name: "Dec", value: 500 },
];






const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [booking, setBooking] = useState([]);
    const [fix, setFix] = useState([]);
    const [car, setCar] = useState([]);
    const [gift, setGift] = useState([]);
    const [time, setTime] = useState([]);
    const [zone, setZone] = useState([]);

    const navigate = useNavigate();

    const fetchData = () => {
        Promise.all([
            axiosInstance.get(APIPath.SELECT_ALL_USER),
            axiosInstance.get(APIPath.SELECT_ALL_PROMOTION),
            axiosInstance.get(APIPath.SELECT_ALL_BOOKING),
            axiosInstance.get(APIPath.SELECT_ALL_FIX),
            axiosInstance.get(APIPath.SELECT_ALL_CAR),
            axiosInstance.get(APIPath.SELECT_ALL_GIFT),
            axiosInstance.get(APIPath.SELECT_ALL_TIME),
            axiosInstance.get(APIPath.SELECT_ALL_ZONE),
        ])
            .then(([userRes, promoRes, bookingRes, fixRes, carRes, giftRes, timeRes, zoneRes]) => {
                setUsers(userRes?.data?.data);
                setPromotions(promoRes?.data?.data);
                setBooking(bookingRes?.data?.data);
                setFix(fixRes?.data?.data);
                setCar(carRes?.data?.data);
                setGift(giftRes?.data?.data);
                setTime(timeRes?.data?.data);
                setZone(zoneRes?.data?.data);
                // console.log("Users:", userRes?.data?.data);
                // console.log("Promotions:", promoRes?.data?.data);
                // console.log("Booking:", bookingRes?.data?.data);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleApprove = (BookingId, timeId) => {
        navigate(`/user/receiverCarDetail/${BookingId}?time=${timeId}`);
    };



    useEffect(() => {
        // console.log("fetch user...")
        fetchData();

    }, [])

    const dashboardItems = [
        { title: "ຂໍ້ມູນລູກຄ້າ", path:"/user/user", value: users.length, icon: <Users className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ຍອດບໍລິການ",path:"#", value: "1420", icon: <FaChartLine  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ຂໍ້ມູນໂປໂມຊັນ",path:"/user/promotion", value: promotions.length, icon: <Gift className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ລາງວັນ",path:"/user/gift", value: gift.length, icon: <LiaGiftsSolid className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ຂໍ້ມູນລົດ",path:"/user/car", value: car.length, icon: <Car className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ຂໍ້ມູນບໍລິການ",path:"/user/servicing", value: fix.length, icon: <HiOutlineWrenchScrewdriver className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ຈັດການໂຊນ/ເວລາ",path:"/user/time-zone", value: zone.length +"/" + time.length , icon: <Clock3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
        { title: "ສິດເຂົ້າໃຊ້",path:"#", value: "3102", icon: <GrUserAdmin className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    ]


    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Dashboard Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {dashboardItems.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className="bg-white w-[260px] h-[156px] rounded-lg shadow-xl flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-2xl transition cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
                    >
                        {item.icon}
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-center leading-tight">{item.title}</p>
                        <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold mt-1">{item.value}</h1>
                    </Link>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                {/* Circle Chart */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center justify-center">
                    <h2 className="text-base sm:text-lg md:text-xl font-medium mb-2 text-center">ຜູ້ໃຊ້ທັງໝົດ</h2>
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={dataCircle}
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataCircle.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />

                                    ))}
                                </Pie>
                                <text
                                    x={100} // ครึ่งของ width
                                    y={100} // ครึ่งของ height
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={20}
                                    fontWeight="bold"
                                    fill="black"
                                >
                                    {dataCircle[0].value}%
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* <p className="text-xl sm:text-2xl font-bold mt-2">0%</p> */}
                    <p className="text-xs sm:text-sm text-red-600 mt-1 text-center px-2">ຜູ້ໃຊ້ງານເດືອນນີ້ {users.length} ຄົນ, ສູງກວ່າເດືອນທີ່ຜ່ານມາ 0%</p>
                </div>

                {/* Area Chart */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <h2 className="text-base sm:text-lg md:text-xl font-medium">ລາຍໄດ້ຈາກການສ້ອມແປງ</h2>
                        <button className="bg-red-500 text-white px-6 py-2 cursor-pointer rounded-2xl text-sm whitespace-nowrap">ເບິ່ງຍ້ອນຫຼັງ</button>
                    </div>
                    <div className="w-full h-48 sm:h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dataLine}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E52020" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#E52020" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    fontSize={12}
                                    tick={{ fontSize: 10 }}
                                />
                                <YAxis
                                    interval={0}
                                    domain={[0, 500]}
                                    fontSize={12}
                                    tick={{ fontSize: 10 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #E52020',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#E52020"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <h2 className="text-base mb-2 sm:text-lg md:text-xl font-medium mt-4 sm:mt-6 md:mt-8 ">ການນັດໝາຍລ້າສຸດ</h2>
            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full mt-4">
                {/* Desktop/Tablet View */}
                <div className="hidden md:block divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                    {booking
                        .filter((item) => item.bookingStatus === "await")
                        .map((item, index) => (
                            <div
                                key={index}
                                onClick={() =>
                                    handleApprove(item?.booking_id, item?.time?.time_id)
                                }
                                className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-2 md:gap-3">
                                    <span className="bg-yellow-500 px-4 py-2 text-black rounded-xl text-xs font-semibold text-center min-w-[60px]">
                                        ລໍອະນຸມັດ
                                    </span>
                                    <span className="font-medium text-xs md:text-sm lg:text-base">
                                        {item?.car?.model}
                                    </span>
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item?.user?.username}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item?.user?.phoneNumber}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item?.car?.plateNumber}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item?.time?.date}
                                </div>
                                <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                                    {item?.time?.time}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-gray-200">
                    {booking
                        .filter((item) => item?.bookingStatus === "await")
                        .map((item, index) => (
                            <div
                                key={index}
                                onClick={() =>
                                    handleApprove(item?.booking_id, item?.time?.time_id)
                                }
                                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="bg-yellow-500 px-3 py-1 text-black rounded-xl text-xs font-semibold">
                                        ລໍອະນຸມັດ
                                    </span>
                                    <span className="text-sm font-medium text-gray-800">
                                        {item?.car?.model}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">ຜູ້ໃຊ້:</span>
                                        <span className="text-gray-900">{item?.user?.username}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">ເບີໂທ:</span>
                                        <span className="text-gray-900">{item?.user?.phoneNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">ປ້າຍ:</span>
                                        <span className="text-gray-900">{item?.car?.plateNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">ວັນທີ:</span>
                                        <span className="text-gray-900">{item?.time?.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">ເວລາ:</span>
                                        <span className="text-gray-900">{item?.time?.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard