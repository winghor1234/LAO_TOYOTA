import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import APIPath from "../../../api/APIPath";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BookingSuccess = () => {
    const { t } = useTranslation("booking"); 
    const navigate = useNavigate();
    const { id } = useParams();
    const [booking, setBooking] = useState({});

    const handleBack = () => navigate("/user/booking");

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(APIPath.SELECT_ONE_BOOKING(id));
            setBooking(res?.data?.data || {});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6">
                    {/* Back button */}
                    <div
                        onClick={handleBack}
                        className="inline-flex items-center justify-center w-auto px-4 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 rounded-xl cursor-pointer transition-colors mb-4"
                    >
                        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
                            <FaArrowLeft className="text-sm sm:text-base" />
                            <span className="font-medium text-sm sm:text-lg lg:text-xl">{t("back_button")}</span>
                        </button>
                    </div>

                    <hr className="border-gray-300 w-full mb-6 sm:mb-8" />

                    {/* Success content */}
                    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl sm:text-3xl">🔧</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-600">
                                {t("booking_success")}
                            </h1>
                            <h3 className="text-base sm:text-lg font-medium text-gray-600">
                                {t("invoice_number")}: {booking?.invoiceNumber || "125532525"}
                            </h3>
                        </div>

                        {/* Car & Time */}
                        <div className="w-full max-w-md space-y-4 sm:space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                                    <p className="font-medium text-gray-800">{booking?.car?.model}</p>
                                    <p className="font-medium text-gray-600">{booking?.time?.date}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                                    <p className="font-medium text-gray-800">{booking?.user?.username}</p>
                                    <p className="font-medium text-gray-600">{booking?.time?.time}</p>
                                </div>
                            </div>

                            <hr className="border-gray-300" />

                            {/* Services */}
                            <div className="space-y-2">
                                <p className="font-medium text-gray-800 text-center sm:text-left">
                                    {booking?.service?.serviceName}
                                </p>
                            </div>

                            <hr className="border-gray-300" />

                            {/* Points */}
                            <p className="font-medium text-green-600 text-center text-lg">
                                {t("points_earned", { points: 50 })}
                            </p>

                            {/* Initial symptoms */}
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h2 className="font-semibold text-gray-800 mb-3 text-center sm:text-left">
                                    {t("initial_symptoms")}
                                </h2>
                                <p className="font-medium text-gray-700 text-sm sm:text-base leading-relaxed">
                                    {booking?.initialSymptoms || "change oil, rotate tires, brake inspection, fluid top-off"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
