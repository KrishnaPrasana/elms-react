import api from "./axiosConfig";
export const applyLeave = (data) => api.post("/employee/leaves/apply", data);
export const getLeaveApplications = (params) => api.get("employee/leaves",{params});
export const getLeaveApplicationById = (id) => api.get(`employee/leaves/${id}`);
export const updateLeaveApplication = (id, data) =>
  api.put(`employee/leaves/${id}/status`, data);
