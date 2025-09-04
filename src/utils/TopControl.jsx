import { CalendarDays, ChevronDown, Search } from "lucide-react"
import SelectDate from "./SelectDate"

export const TopControl = () => {
    return (
        <>
            {/* Top Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
                {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
                <SelectDate/>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
                    <button className="bg-red-600 hover:bg-red-700 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                        ຄົ້ນຫາ
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
                        Export
                    </button>
                </div>
            </div>
        </>
    )
}