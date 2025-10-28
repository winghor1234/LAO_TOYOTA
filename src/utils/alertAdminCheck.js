
export const AlertCheck = (role, actionName = "ການດຳເນີນງານນີ້") => {
  if (role !== "admin") {
    alert(`ທ່ານບໍ່ມີສິດທິໃນ ${actionName}`);
    return false;
  }
  return true;
};
