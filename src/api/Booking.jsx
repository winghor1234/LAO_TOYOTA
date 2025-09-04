import { API } from "./API";

export const getAllBooking = async () => {
    return await API.get("/booking/selAll");
};

export const getBookingById = async (id) => {
    return await API.get(`/booking/selOne/${id}`);
};

export const deleteBooking = async (id) => {
    return await API.delete(`/booking/delete/${id}`);
};

export const updateBooking = async (id, data) => {
    return await API.put(`/booking/update/${id}`, data);
};

export const createBooking = async (data) => {
    return await API.post("/booking/create", data);
};

export const updateBookingStatus = async (id,data) => {
    return await API.put(`/booking/updateStatus/${id}`,data);
}