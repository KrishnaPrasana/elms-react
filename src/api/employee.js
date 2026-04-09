import api from "./axiosConfig";

export const getDashboard = () => api.get("/employee/dashboard");


export const createEmployee = (data) => api.post("/admin/employees", data);
export const updateMyProfile = (data) => api.put("/employee/profile", data);
export const updateEmployeeStatus = (id, data) =>
  api.put(`/admin/employees/${id}/status`, data);
export const updateEmployee = (id, data) =>
  api.put(`/admin/employees/${id}`, data);
export const getEmployee = (id) => api.get(`/admin/employees/${id}`);
export const getEmployees = () => api.get(`/admin/employees/`);
