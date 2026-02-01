import api from "./axiosConfig";
export const changePassword = (data) => api.put("/auth/change-password",data);
