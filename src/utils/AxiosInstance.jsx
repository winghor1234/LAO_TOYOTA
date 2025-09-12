// utils/axiosInstance.js
import axios from "axios";
import useToyotaStore from "../store/ToyotaStore";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


axiosInstance.interceptors.request.use(
  async (config) => {
    const store = useToyotaStore.getState();


    // เรียก refreshTokenIfNeeded → ถ้า token หมดอายุ มันจะ refresh ใหม่ให้
    const token = await store.refreshTokenIfNeeded();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (เผื่อกรณี refresh fail → redirect login)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const store = useToyotaStore.getState();
      store.removeToken();
      window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
