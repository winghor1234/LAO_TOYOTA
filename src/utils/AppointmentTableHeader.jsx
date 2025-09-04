export const TableHeader = () => {
    return (
        <>
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
        </>
    )
}