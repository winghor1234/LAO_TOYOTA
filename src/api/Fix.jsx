import { API } from "./API";

export const createFix = async (data) => {
    return await API.post("/fix/insert", data);
};

export const getAllFix = async () => {
    return await API.get("/fix/selAll");
};

export const getFixById = async (id) => {
    return await API.get(`/fix/selOne/${id}`);
};

export const updateFixStatus = async (id, data) => {
    return await API.put(`/fix/updateStatus/${id}`, data);
};