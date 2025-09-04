import { API } from "./API"


export const createCar = async (data) => {
    return await API.post("/car/insert", data);
}

export const getUserCar = async (userId) => {
    return await API.get(`/car/selBy/${userId}`);
}

export const getAllCars =  async() => {
    return await API.get("/car/selAll");
}


export const getCarById = async (id) => {
    return await API.get(`/car/selOne/${id}`);
}

export const updateCar = async (id, data) => {
    return await API.put(`/car/update/${id}`, data);
}

export const deleteCar = async (id) => {
    return await API.delete(`/car/delete/${id}`);
}


export const searchCar = async (query) => {
    return await API.get(`/car/search?search=${query}`);
}
