import { useEffect, useState } from "react";
import { filterByDateRange } from "../../utils/FilterDate";
import { filterSearch } from "../../utils/FilterSearch";
import axiosInstance from "../../utils/AxiosInstance";
import APIPath from "../../api/APIPath";
import AddUser from "./AddUser";
import { SuccessAlert } from "../../utils/handleAlert/SuccessAlert";
import SelectDate from "../../utils/SelectDate";
import { Car } from "lucide-react";

const UserList = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const FilteredUser = filterByDateRange(
    filterSearch(users, "username", search),
    startDate,
    endDate,
    "createdAt"
  );

  const handleFetchUser = async () => {
    try {
      const res = await axiosInstance.get(APIPath.SELECT_ALL_USER);
      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <div className="p-4">
      {/* Top Controls */}
      <div className="sticky top-0 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 mb-6">
        <SelectDate
          onSearch={setSearch}
          placeholder="ຄົ້ນຫາຜູ້ໃຊ້..."
          onDateChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
        />
        <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-500 hover:bg-blue-600 transition-colors w-full sm:w-auto px-6 py-2.5 sm:py-3 text-white rounded-xl font-medium cursor-pointer text-sm sm:text-base"
          >
            ເພີ່ມຜູ້ໃຊ້
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
        {/* Table Header (Desktop/Tablet only) */}
        <div className="hidden md:block w-full h-12 md:h-14 lg:h-16 bg-[#E52020] text-white">
          <div className="grid grid-cols-9 gap-3 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-6 py-3 md:py-4 font-medium text-xs md:text-sm lg:text-base">
            <div className="text-center">ລຳດັບ</div>
            <div className="text-center">ລະຫັດຜູ້ໃຊ້</div>
            <div className="text-center">ຊື່ຜູ້ໃຊ້</div>
            <div className="text-center">ບ້ານ</div>
            <div className="text-center">ເມືອງ</div>
            <div className="text-center">ແຂວງ</div>
            <div className="text-center">ເບີໂທ</div>
            <div className="text-center">ອີເມວ</div>
            <div className="text-center">ສະຖານະ</div>
          </div>
        </div>

        {/* Table Body (Desktop/Tablet only) */}
        <div className="hidden md:block divide-y divide-gray-200 overflow-auto max-h-[400px]">
          {FilteredUser.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-9 gap-3 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-6 py-3 md:py-4 items-center hover:bg-gray-50 cursor-pointer transition-colors text-xs md:text-sm lg:text-base"
            >
              <div className="text-center">{index + 1}</div>
              <div className="text-center">{item.customer_number}</div>
              <div className="text-center">{item.username}</div>
              <div className="text-center">{item.village}</div>
              <div className="text-center">{item.district}</div>
              <div className="text-center">{item.province}</div>
              <div className="text-center">{item.phoneNumber}</div>
              <div className="text-center">
                {item.email ? (
                  <a
                    href={`mailto:${item.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div className="text-center">{item.role}</div>
            </div>
          ))}
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {FilteredUser.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Car className="text-gray-600 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-gray-900">
                    {item.username}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.customer_number}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ໂທ:</span>
                  <span className="text-gray-900">{item.phoneNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ບ້ານ:</span>
                  <span className="text-gray-900">{item.village}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ເມືອງ:</span>
                  <span className="text-gray-900">{item.district}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ແຂວງ:</span>
                  <span className="text-gray-900">{item.province}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ອີເມວ:</span>
                  <span className="text-blue-500">
                    {item.email || "-"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">ສະຖານະ:</span>
                  <span className="text-gray-900">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Popup */}
      <AddUser show={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
};

export default UserList;
