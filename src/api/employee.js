import api from "./axiosConfig";
export const createEmployee = (data) => api.post("/admin/employees",data);
export const updateEmployee = (id,data) => api.post(`/admin/employees/${id}`,data);
export const getEmployee = (id) => api.get(`/admin/employees/${id}`);
