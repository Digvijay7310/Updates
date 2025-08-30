// utils/logout.js
import axiosInstance from "./axiosInstance";

const logout = async (role) => {
  try {
    const endpoint = role === "ADMIN" ? "/admins/logout" : "/user/logout";
    await axiosInstance.post(endpoint, { withCredentials: true });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Logout failed" };
  }
};

export default logout;
