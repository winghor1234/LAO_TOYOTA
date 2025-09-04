import { Car } from "lucide-react";
import { TopControl } from "../../../utils/TopControl";
import { TableHeader } from "../../../utils/AppointmentTableHeader";

const vehicleData = [
    {
        brand: 'TOYOTA',
        customer: 'Mr A',
        phone: '020 9679 4376',
        number: 'ກງ 5444',
        date: '02/05/2025',
        time: '13:23'
    },
    {
        brand: 'TOYOTA',
        customer: 'Mr B',
        phone: '020 9679 4377',
        number: 'ກງ 5445',
        date: '03/05/2025',
        time: '14:30'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
    {
        brand: 'HONDA',
        customer: 'Mr C',
        phone: '020 9679 4378',
        number: 'ກງ 5446',
        date: '04/05/2025',
        time: '09:15'
    },
];

const Cancel = () => {
    return (
        <div>
            {/* Top Controls */}
            <TopControl />
            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
                {/* Desktop/Tablet Table Header (hidden on mobile) */}
                <TableHeader/>
                {/* Desktop/Tablet Table Body (hidden on mobile) */}
                <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
                    {vehicleData.map((item, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <Car className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-600" />
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
                    {vehicleData.map((item, index) => (
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

export default Cancel
