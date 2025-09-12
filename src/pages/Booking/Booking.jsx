
import { Car } from "lucide-react";
import StatusButton from "../../utils/StatusButton";
import { Outlet } from "react-router-dom";



const Booking = () => {
  return (
    <div className="bg-[#E2E8F0]  min-h-screen p-2 sm:p-2 lg:p-4">
      <div className="ax-w-7xl mx-auto ">
        {/* Status Buttons */}
        <StatusButton />
        <Outlet />
      </div>
    </div>
  );
};

export default Booking;
