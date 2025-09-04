import { API } from "./API"

export const createPromotion = async (data) => {
    return await API.post('/promotion/insert', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const getPromotions = async () => {
    return await API.get('/promotion/selAll', {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        
    })
}

export const getPromotionById = async (id) => {
    return await API.get(`/promotion/selOne/${id}`, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}


export const updatePromotion = async (id, data) => {
    return await API.put(`/promotion/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const deletePromotion = async (id) => {
    return await API.delete(`/promotion/delete/${id}`, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
