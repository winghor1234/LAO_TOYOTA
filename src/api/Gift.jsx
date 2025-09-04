import { API } from "./API";


export const createGift = (data) => {
    return API.post("/giftcard/insert", data, {
        headers: {
            "Content-Type": "multipart/form-data", // required for files
        },
    });
}

export const getAllGifts = () => {
    return API.get("/giftcard/selAll" , {
         headers: {
            "Content-Type": "multipart/form-data", // required for files
        },
    });
}

export const getGiftById = (id) => {
    return API.get(`/giftcard/selOne/${id}`, {
         headers: {
            "Content-Type": "multipart/form-data", // required for files
        },
    });
}

export const updateGift = (id, data) => {
    return API.put(`/giftcard/update/${id}`, data , {
         headers: {
            "Content-Type": "multipart/form-data", // required for files
        },
    });
}

export const deleteGift = (id) => {
    return API.delete(`/giftcard/delete/${id}`, {
        headers: {
            "Content-Type": "multipart/form-data", // required for files
        },
    });
}

export const updateGiftStatus = (id, status) => {
    return API.patch(`/giftcard/updateStatus/${id}`, { status }, {
        headers: {
            "Content-Type": "multipart/form-data", // required for files
        },
    });
}

// Gift History

export const createGiftHistory = (data) => {
    return API.post("/gifthistory/insert", data);
}

export const getAllGiftHistories = () => {
    return API.get("/gifthistory/selAll");
}

export const getGiftHistoryById = (id) => {
    return API.get(`/gifthistory/selOne/${id}`);
}

export const updateGiftHistory = (id, data) => {
    return API.put(`/gifthistory/update/${id}`, data);
}

export const deleteGiftHistory = (id) => {
    return API.delete(`/gifthistory/delete/${id}`);
}
