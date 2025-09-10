

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ต้องใส่ <ToastContainer /> ใน App.jsx หรือ Layout.jsx ครั้งเดียว
// <ToastContainer position="top-center" autoClose={1500} />

/**
 * Show success toast
 * @param {string} message - ข้อความที่จะแสดง
 * @param {number} timer - ระยะเวลาก่อนปิดอัตโนมัติ (ms)
 * @param {string} type - ประเภท toast: "success" | "error" | "info" | "warning"
 */
export const SuccessAlert = (message, timer = 1500, type = "success") => {
  toast(message, {
    position: "top-right",
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: type,
    style: {
    fontFamily: "'Noto Sans Lao', sans-serif",
  },
  });
};
