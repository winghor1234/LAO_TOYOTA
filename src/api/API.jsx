import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});


// ใส่ token ทุกครั้งก่อน request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ดึง token ล่าสุด
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});