// utils/token.js
export const saveToken = (token) => {
  const expireTime = Date.now() + 60 * 60 * 1000; // 1 ชั่วโมง
  localStorage.setItem("token", token);
  localStorage.setItem("token_expire", expireTime);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  const expire = localStorage.getItem("token_expire");

  if (!token || !expire) return null;

  if (Date.now() > parseInt(expire, 10)) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");
    return null;
  }

  return token;
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("token_expire");
};
