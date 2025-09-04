import Swal from "sweetalert2";

/**
 * Show a delete confirmation, then return the result
 * @param {string} deleteText - Text for the confirmation dialog
 * @param {string} successText - Text for the success alert
 * @returns {Promise<boolean>} - true ถ้ากดยืนยัน, false ถ้ายกเลิก
 */
export const DeleteAlert = (
  deleteText = "You won't be able to revert this!",
  successText = "Your file has been deleted."
) => {
  return Swal.fire({
    title: 'ເຈົ້າແນ່ໃຈບໍ່?',
    text: deleteText,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2757F5',
    cancelButtonColor: '#d33',
    cancelButtonText: 'ຍົກເລີກ',
    confirmButtonText: 'ຢືນຢັນ',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '',
        text: successText,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        position: 'center',
      });
      return true; // ✅ กดยืนยัน
    }
    return false; // ❌ กดยกเลิก
  });
};
