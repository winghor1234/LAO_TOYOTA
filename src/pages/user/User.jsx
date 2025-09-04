import { Car } from "lucide-react"
import { useEffect, useState } from "react";
import SelectDate from "../../utils/SelectDate";
import { getAllUsers } from "../../api/User";
import { filterByDateRange } from "../../utils/FilterDate";
import { filterSearch } from "../../utils/FilterSearch";


const User = () => {
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAdd, setShowAdd] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const FilteredUser = filterByDateRange(
    filterSearch(users,"username",search), startDate, endDate, "createdAt"
  )


//   const handleDeleteUser = async (id) => {
//     try {
//       const confirmedDelete = await DeleteAlert("ວ່າຈະລົບຂໍ້ມູນລູກຄ້າຄົນນີ້ບໍ່?", "ລົບຂໍ້ມູນລູກຄ້າສຳເລັດ");
//       if (confirmedDelete) {
//         await deleteUser(id);
//         handleFetchUser();
//       }
//     } catch (error) {
//       console.log(error);
//       SuccessAlert("ລົບຂໍໍ້ມູນບໍ່ສຳເລັດ", 1500, "error");
//     }
//   }

  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        const res = await getAllUsers();
        console.log(res?.data);
        setUsers(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
    handleFetchUser();
  }, []);

  return (
    <div>
      {/* Top Controls */}
      <div className="sticky top-0 flex flex-col justify-between lg:flex-row lg:items-center gap-3 lg:gap-5 mb-6">
        {/* Date pickers and search - Mobile: Stack vertically, Tablet/Desktop: Horizontal */}
        <SelectDate onSearch={setSearch} placeholder="ຄົ້ນຫາຜູ້ໃຊ້..." onDateChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }} />

        {/* Buttons */}
        {/* <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-3">
          <button onClick={() => setShowAdd(true)} className="bg-blue-500 hover:bg-blue-600 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base">
            ເພີ່ມຜູ້ໃຊ້
          </button>
        </div> */}
      </div>
      {/* Data Table */}
      <div className=" bg-white rounded-lg shadow-sm overflow-hidden w-full">
        {/* Desktop/Tablet Table Header (hidden on mobile) */}
        <div className="hidden md:block w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
          <div className="grid grid-cols-8 gap-3 md:gap-8 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-sm md:text-base lg:text-lg">
            <div className="flex justify-center items-center">ລຳດັບ</div>
            <div className="flex justify-center items-center">ລະຫັດຜູ້ໃຊ້</div>
            <div className="flex justify-center items-center">ຊື່ຜູ້ໃຊ້</div>
            <div className="flex justify-center items-center">ບ້ານ</div>
            <div className="flex justify-center items-center">ເມືອງ</div>
            <div className="flex justify-center items-center">ແຂວງ</div>
            <div className="flex justify-center items-center">ເບີໂທ</div>
            <div className="flex justify-center items-center">ອີເມວ</div>
            <div className="flex justify-center items-center">ດຳເນີນການ</div>
          </div>
        </div>

        {/* Desktop/Tablet Table Body (hidden on mobile) */}
        <div className="border hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
          {
            FilteredUser.map((item, index) => {
              return (
                <div key={index} className="grid grid-cols-8 gap-3 md:gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 lg:py-5 items-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.customer_number}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.username}
                  </div>

                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.village}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.district}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.province}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.phoneNumber}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center">
                    {item.email ? <a href={`mailto:${item.email}`} className="text-blue-500 hover:underline">{item.email}</a> : "-"}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium flex justify-center items-center gap-4">
                    {/* <Edit onClick={() => { setShowEdit(true); setSelectedUserId(item.user_id); }} className="cursor-pointer" /> */}
                    {/* <Trash onClick={(e) => { e.stopPropagation(); handleDeleteUser(item.user_id); }} className="cursor-pointer" /> */}
                  </div>
                </div>
              )
            })
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
      {/* Edit Customer Popup */}
      {/* <EditUser show={showEdit} onClose={() => setShowEdit(false)} userId={selectedUserId} /> */}
      {/* Add Customer Popup */}
      {/* <AddUser show={showAdd} onClose={() => setShowAdd(false)} /> */}
    </div >
  )
}

export default User
