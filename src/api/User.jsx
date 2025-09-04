import { API } from "./API"


export const getAllUsers = () => {
    return API.get("/user/selAll");
} 

export const getUserById = (id) => {
    return API.get(`/user/selOne/${id}`);
}


export const refreshUser = (id) => {
    return API.put(`/user/refresh/${id}`);
}

