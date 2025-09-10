// import Swal from "sweetalert2";

// /**
//  * Show a delete confirmation, then return the result
//  * @param {string} deleteText - Text for the confirmation dialog
//  * @param {string} successText - Text for the success alert
//  * @returns {Promise<boolean>} - true ถ้ากดยืนยัน, false ถ้ายกเลิก
//  */
// export const DeleteAlert = (
//   deleteText = "You won't be able to revert this!",
//   successText = "Your file has been deleted."
// ) => {
//   return Swal.fire({
//     title: 'ເຈົ້າແນ່ໃຈບໍ່?',
//     text: deleteText,
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#2757F5',
//     cancelButtonColor: '#d33',
//     cancelButtonText: 'ຍົກເລີກ',
//     confirmButtonText: 'ຢືນຢັນ',
//     reverseButtons: true,
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: '',
//         text: successText,
//         icon: 'success',
//         timer: 1500,
//         showConfirmButton: false,
//         timerProgressBar: true,
//         position: 'center',
//       });
//       return true; // ✅ กดยืนยัน
//     }
//     return false; // ❌ กดยกเลิก
//   });
// };



import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Show a delete confirmation using window.confirm and toastify
 * @param {string} deleteText - ข้อความยืนยันการลบ
 * @param {string} successText - ข้อความแจ้งเตือนหลังลบสำเร็จ
 * @returns {Promise<boolean>} - true ถ้ากดยืนยัน, false ถ้ายกเลิก
 */
export const DeleteAlert = async (
  deleteText = "You won't be able to revert this!",
  successText = "Your file has been deleted."
) => {
  const isConfirmed = window.confirm(deleteText); // แสดง confirm dialog ของ browser

  if (isConfirmed) {
    toast.success(successText, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
    fontFamily: "'Noto Sans Lao', sans-serif",
  },
    });
    return true; // กดยืนยัน
  }

  return false; // กดยกเลิก
};
