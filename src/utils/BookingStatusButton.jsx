import { useLocation, useNavigate } from "react-router-dom"

const BookingStatusButton = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        if (!path) {
            navigate(`/user/booking`);
        } else {
            navigate(`/user/booking/${path}`);
        }
    };

    const ApproveButton = [
        {
            label: 'ລໍອະນຸມັດ',
            path: '',
            isActive: currentPath === '/user/booking' || currentPath === '/user/booking/'
        },
        {
            label: 'ກຳລັງສ້ອມແປງ',
            path: 'fix',
            isActive: currentPath === '/user/booking/fix'
        },
        {
            label: 'ສຳເລັດ',
            path: 'success',
            isActive: currentPath === '/user/booking/success'
        },
        {
            label: 'ຍົກເລີກ',
            path: 'cancel',
            isActive: currentPath === '/user/booking/cancel'
        }

    ]

    return (
        <>
            {/* Status Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 mb-2 sm:mb-4 lg:mb-4">
                {/* Approve Button */}
                {
                    ApproveButton.map((item,index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(item.path)}
                            className={`
                        flex-1 flex items-center justify-center 
                        w-full sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]
                        h-12 sm:h-13 md:h-14 lg:h-16 xl:h-18
                        border-2 border-[#727272] 
                        px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 
                        py-3 sm:py-2 md:py-3 lg:py-4
                        rounded-md font-medium transition-all duration-200 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                        cursor-pointer active:scale-95 touch-manipulation
                        ${item.isActive
                                    ? 'bg-red-600 text-white border-red-600 shadow-lg'
                                    : 'bg-white hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md'
                                }
                    `}
                        >
                            <span className="font-semibold whitespace-nowrap">{item.label}</span>
                        </button>
                    ))
                }
            </div>
        </>
    )
}

export default BookingStatusButton