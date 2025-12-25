import api from "./axiosConfig";

export const applyLeave = (data) => api.post("/employee/apply-leave", data);
export const getHistory = () => api.get("/employee/leave-history");
