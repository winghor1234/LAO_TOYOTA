import { API } from "./API"
// Time
export const getAllTime = async () => {
    return await API.get("/time/selAll");
}

export const getTimeById = async (id) => {
    return await API.get(`/time/selOne/${id}`);
}

export const createTime = async (data) => {
    return await API.post("/time/insert", data);
}

export const updateTime = async (id, data) => {
    return await API.put(`/time/update/${id}`, data);
}

export const deleteTime = async (id) => {
    return await API.delete(`/time/delete/${id}`);
}


export const updateTimeStatus = async (id,data) => {
    return await API.put(`/time/updateStatus/${id}`,data);
}


// Zone 

export const getAllZone = async () => {
    return await API.get("/zone/selAll");
}

export const getZoneById = async (id) => {
    return await API.get(`/zone/selOne/${id}`);
}

export const createZone = async (data) => {
    return await API.post("/zone/insert", data);
}

export const updateZone = async (id, data) => {
    return await API.put(`/zone/update/${id}`, data);
}

export const deleteZone = async (id) => {
    return await API.delete(`/zone/delete/${id}`);
}


export const updateZoneStatus = async (id,data) => {
    return await API.put(`/zone/updateStatus/${id}`,data);
}



