import { create } from "zustand";
import axiosInstance from "../utils/AxiosInstance";

const savedToken = localStorage.getItem("token");
const savedRefreshToken = localStorage.getItem("refreshToken");
const savedTokenExpire = localStorage.getItem("tokenExpire");

const useToyotaStore = create((set, get) => ({
  token: savedToken || null,
  refreshToken: savedRefreshToken || null,
  tokenExpire: savedTokenExpire ? parseInt(savedTokenExpire) : null,

  setToken: (token, refreshToken, tokenExpire) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("tokenExpire", tokenExpire.toString());
    set({ token, refreshToken, tokenExpire });
  },

  removeToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpire");
    set({ token: null, refreshToken: null, tokenExpire: null });
  },

  getToken: () => get().token,
  getRefreshToken: () => get().refreshToken,
  getTokenExpire: () => get().tokenExpire,

  refreshTokenIfNeeded: async () => {
    const tokenExpire = get().tokenExpire;
    const refreshToken = get().refreshToken;
    const now = Date.now();

    // 🔹 refresh ล่วงหน้า 5 นาที (5*60*1000 ms)
    const threshold = 5 * 60 * 1000;

    if (tokenExpire && now > tokenExpire - threshold && refreshToken) {
      try {
         const response = await axiosInstance.post('/user/refresh', {
    refreshToken,
  });

        const { token: newToken, refreshToken: newRefresh } = response.data;
        const newExpire = Date.now() + 60 * 60 * 1000; // 1 ชั่วโมงหลัง refresh

        get().setToken(newToken, newRefresh, newExpire);
        return newToken;
      } catch (error) {
        console.error("Refresh token failed:", error);
        get().removeToken();
        return null;
      }
    }

    return get().token;
  },
}));

export default useToyotaStore;


// import { create } from "zustand";
// import axiosInstance from "../utils/AxiosInstance";

// const useToyotaStore = create((set, get) => {
//   // ใช้ undefined สำหรับ token ที่ยังโหลด
//   const savedToken = localStorage.getItem("token");
//   const savedRefreshToken = localStorage.getItem("refreshToken");
//   const savedTokenExpire = localStorage.getItem("tokenExpire");

//   return {
//     token: savedToken ?? undefined,
//     refreshToken: savedRefreshToken ?? undefined,
//     tokenExpire: savedTokenExpire ? parseInt(savedTokenExpire) : undefined,

//     // Set token หลัง login
//     setToken: (token, refreshToken, tokenExpire) => {
//       localStorage.setItem("token", token);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("tokenExpire", tokenExpire.toString());
//       set({ token, refreshToken, tokenExpire });
//     },

//     // Remove token ตอน logout
//     removeToken: () => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("tokenExpire");
//       set({ token: null, refreshToken: null, tokenExpire: null });
//     },

//     getToken: () => get().token,
//     getRefreshToken: () => get().refreshToken,
//     getTokenExpire: () => get().tokenExpire,

//     // Refresh token ล่วงหน้า
//     refreshTokenIfNeeded: async () => {
//       const tokenExpire = get().tokenExpire;
//       const refreshToken = get().refreshToken;
//       const now = Date.now();
//       const threshold = 5 * 60 * 1000; // 5 นาที

//       if (tokenExpire && now > tokenExpire - threshold && refreshToken) {
//         try {
//           const response = await axiosInstance.post('/user/refresh', { refreshToken });
//           const { token: newToken, refreshToken: newRefresh } = response.data;
//           const newExpire = Date.now() + 60 * 60 * 1000; // 1 ชั่วโมง

//           get().setToken(newToken, newRefresh, newExpire);
//           return newToken;
//         } catch (error) {
//           console.error("Refresh token failed:", error);
//           get().removeToken();
//           return null;
//         }
//       }

//       return get().token ?? null;
//     },
//   };
// });

// export default useToyotaStore;

