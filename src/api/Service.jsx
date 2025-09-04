import { API } from "./API";

export const createService = async (data) => {
    return await API.post("/service/insert", data, {
        headers: {
      "Content-Type": "multipart/form-data", // required for files
    },
    })
};
export const getAllService = async () => {
    return await API.get("/service/selAll", {
        headers: {
      "Content-Type": "multipart/form-data", // required for files
    },
    });
};

export const getServiceById = async (id) => {
    return await API.get(`/service/selOne/${id}`, {
        headers: {
      "Content-Type": "multipart/form-data", // required for files
    },
    });
};
export const updateService = async (id, data) => {
    return await API.put(`/service/update/${id}`, data, {
        headers: {
      "Content-Type": "multipart/form-data", // required for files
    },
    });
};

export const deleteService = async (id) => {
    return await API.delete(`/service/delete/${id}`, {
        headers: {
      "Content-Type": "multipart/form-data", // required for files
    },
    });
};
