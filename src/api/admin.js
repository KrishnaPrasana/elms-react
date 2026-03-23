import api from "./axiosConfig";

export const getDashboard = () => api.get("/admin/dashboard");

export const getLeaveTypes = () => api.get("/admin/leave-types");
export const addLeaveType = (data) => api.post("/admin/leave-types", data);
export const updateLeaveType = (id, data) => api.put(`/admin/leave-types/${id}`, data);
export const deleteLeaveType = (id) => api.delete(`/admin/leave-types/${id}`);


