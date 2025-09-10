import { Users, Clock, Gift, Ticket, Car, Wrench, PlusCircle, FileText, Clock3 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
// import { getAllUsers } from "../../api/Auth";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import APIPath from "../../api/APIPath";
// import { getPromotions } from "../../api/Promotion";

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




const appointments = [
  {
    status1: "ປະເມີນ",
    status2: "ອະນຸມັດ",
    brand: "TOYOTA",
    customer: "Mr A",
    phone: "020 9679 4376",
    plate: "ກງ 5444",
    date: "02/05/2025",
    time: "13:23",
  }, {
    status1: "ປະເມີນ",
    status2: "ອະນຸມັດ",
    brand: "TOYOTA",
    customer: "Mr A",
    phone: "020 9679 4376",
    plate: "ກງ 5444",
    date: "02/05/2025",
    time: "13:23",
  }, {
    status1: "ປະເມີນ",
    status2: "ອະນຸມັດ",
    brand: "TOYOTA",
    customer: "Mr A",
    phone: "020 9679 4376",
    plate: "ກງ 5444",
    date: "02/05/2025",
    time: "13:23",
  }, {
    status1: "ປະເມີນ",
    status2: "ອະນຸມັດ",
    brand: "TOYOTA",
    customer: "Mr A",
    phone: "020 9679 4376",
    plate: "ກງ 5444",
    date: "02/05/2025",
    time: "13:23",
  },
]

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [promotions, setPromotions] = useState([]);

    const fetchUsers = async () => {
    try {
        const res = await axiosInstance.get(APIPath.SELECT_ALL_USER);
        const resp = await axiosInstance.get(APIPath.SELECT_ALL_PROMOTION);
        setPromotions(resp?.data?.data);
        // console.log("Users:", res?.data?.data);
        setUsers(res?.data?.data);
    } catch (error) {
    console.log(error);
    }
};


useEffect(() => {
    fetchUsers();
},[])

const dashboardItems = [
    { title: "ຂໍ້ມູນຜູ້ໃຊ້ງານທັງໝົດ", value: users.length, icon: <Users className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ຂາຍ", value: "1420", icon: <Clock className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ໂປໂມຊັນ", value: promotions.length, icon: <Gift className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ລວມລາຍວັນ", value: "3102", icon: <Ticket className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ຂໍ້ມູນລົດ", value: "1921", icon: <Car className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ບໍລິການ", value: "1420", icon: <Wrench className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ຈັດການໂຄງ/ເວລາ", value: "194", icon: <Clock3 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
    { title: "ລິດຕິ້ງໃຊ້ງານ", value: "3102", icon: <FileText className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" /> },
]


    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Dashboard Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {dashboardItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white w-[260px] h-[156px] rounded-lg shadow-xl flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-2xl transition cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
                    >
                        {item.icon}
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-center leading-tight">{item.title}</p>
                        <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold mt-1">{item.value}</h1>
                    </div>
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
                    <p className="text-xs sm:text-sm text-red-600 mt-1 text-center px-2">ຜູ້ໃຊ້ງານເດືອນນີ້ 0 ຄົນ, ສູງກວ່າເດືອນທີ່ຜ່ານມາ 0%</p>
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
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                            {/* Desktop/Tablet Table Header (hidden on mobile) */}
                            <div className="hidden md:block  w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
                                <div className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-base lg:text-lg">
                                    <div className="flex justify-center items-center">ຂໍ້ມູນຜູ້ນັດໝາຍ</div>
                                    <div className="flex justify-center items-center">ຊື່ລູກຄ້າ</div>
                                    <div className="flex justify-center items-center">ເບີໂທລູກຄ້າ</div>
                                    <div className="flex justify-center items-center">ປ້າຍທະບຽນ</div>
                                    <div className="flex justify-center items-center">ວັນທີ</div>
                                    <div className="flex justify-center items-center">ເວລາ</div>
                                </div>
                            </div>
            
                            {/* Desktop/Tablet Table Body (hidden on mobile) */}
                            <div className="hidden md:block divide-y divide-gray-200">
                                {appointments.map((item, index) => (
                                    <div key={index}  className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            
                                            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <Car className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600 " />
                                                
                                            </div>
                                            <span className="font-medium text-xs md:text-sm lg:text-base">{item.brand}</span>
                                        </div>
                                        <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.customer}</div>
                                        <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.phone}</div>
                                        <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.number}</div>
                                        <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.date}</div>
                                        <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">{item.time}</div>
                                    </div>
                                ))}
                            </div>
            
                            {/* Mobile Card Layout (visible only on mobile) */}
                            <div className="md:hidden divide-y divide-gray-200">
                                {appointments.map((item, index) => (
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
                            </div>
                        </div>
        </div>
    )
}

export default Dashboard