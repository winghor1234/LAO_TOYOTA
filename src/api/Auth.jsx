import { API } from "./API";

export const userRegister = async (data) => {
    return await API.post("/user/register", data);
}
export const login = async (data) => {
    return await API.post("/user/login", data);
}

export const forgotPassword = async (data) => {
    return await API.put("/user/forgot", data);
}

export const changePassword = async (data) => {
    return await API.put("/user/changePassword", data);
}
export const getProfile = async () => {
    return await API.get("/user/profile");
}

export const getAllUsers = async () => {
    return await API.get("/user/selAll");
}

export const updateProfile = async (data) => {
    return await API.put("/user/update", data);
}

// export const logout = async () => {
//     return await API.delete("/user/delete");
// }


