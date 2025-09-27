import { useEditTimeForm } from "../../../component/schemaValidate/time-zone/EdittTimeValidate";
import { SuccessAlert } from "../../../utils/handleAlert/SuccessAlert";
import Spinner from "../../../utils/Loading";



const EditTime = ({ show, onClose, timeId, fetchTime }) => {
    const { register, handleSubmit, formState: { errors }, loading, submitForm, zones } = useEditTimeForm({ onClose, timeId, fetchTime });

    if (!show) return null;

    return (
        <>
            <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-30 z-40 transition-opacity" onClick={onClose} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-sm transition-all">
                <h2 className="text-lg sm:text-xl font-bold text-center mb-4">ແກ້ໄຂ້ຂໍ້ມູນເວລາ</h2>
                <form onSubmit={handleSubmit(submitForm)} className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <input
                            type="text"
                            placeholder="ເວລາ"
                            {...register("time")}
                            className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}

                        <input
                            type="date"
                            placeholder="ວັນທີ/ເດືອນ/ປີ"
                            {...register("date")}
                            className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                        <select
                            {...register("zoneId")}
                            className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-colors"
                        >
                            <option value="" disabled>ເລືອກໂຊນ</option>
                            {zones.length > 0 ? zones.map(zone => (
                                <option key={zone.zone_id} value={zone.zone_id}>{zone.zoneName}</option>
                            )) : <option value="">ບໍ່ມີໂຊນ</option>}
                        </select>
                        {errors.zoneId && <p className="text-red-500 text-sm">{errors.zoneId.message}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-3">
                        <button
                            type="button"
                            onClick={() => { SuccessAlert("ຍົກເລີກການແກ້ໄຂ"); onClose(); }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-sm"
                            disabled={loading}
                        >
                            ຍົກເລີກ
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-28 h-10 cursor-pointer transition-colors text-sm flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="5" color="white" /> : "ຕົກລົງ"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditTime;
