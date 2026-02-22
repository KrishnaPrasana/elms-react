import api from "./axiosConfig";
export const getLeaveTypes = () => api.get("/admin/leave-types");