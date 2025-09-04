import Swal from "sweetalert2";

/**
 * Show success alert
 * @param {string} message - The message to show
 * @param {number} timer - Duration in milliseconds before auto-close (default 1000ms)
 */
export const SuccessAlert = (message, timer = 1500, icon = "success") => {
Swal.fire({
  position: "center",
  icon: icon,
  title: message,
  showConfirmButton: false,
  timer: timer
});
};
