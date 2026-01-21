import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosConfig";
import { Paper, Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select, Chip } from "@mui/material";
import { useNotify } from "../../../context/NotificationContext";


export default function EmployeeForm({ mode }) {
    const { notify } = useNotify();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        empId: "",
        email: "",
        departmentIds: []
    });

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        if (mode === "edit" && id) {
            loadEmployee();
        }
        fetchDepartments();
    }, [mode, id]);

    const fetchDepartments = async () => {
        const res = await api.get("/admin/departments");
        setDepartments(res.data);
    };

    const loadEmployee = async () => {
        const res = await api.get(`/admin/employees/${id}`);
        setForm(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDepartmentChange = (e) => {
        setForm({ ...form, departmentIds: e.target.value });
    };


    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.empId || form.departmentIds.length === 0) {
            notify("All fields are required","error");
            return;
    }
    try{

    
        if (mode === "edit") {
            await api.put(`/admin/employees/${id}`, form);
            notify("Employee updated successfully");
        } else {
            await api.post(`/admin/employees`, form);
            notify("Employee created successfully")
        }
                 
        navigate("/admin/employees/manage");
    }catch(error){
        notify(error,"error")
    }
    };

    return (
        <Paper sx={{ p: 2, mt: 2, mb: 2 }}>
            <Typography variant="h5" mb={3} color="textPrimary" align="left">
                {mode === "edit" ? "Edit Employee" : "Add Employee"}
            </Typography>

            <Box display="flex" gap={2}
                // justifyContent="space-between"
                alignItems="center">
                <TextField
                    required
                    label="Employee ID"
                    name="empId"
                    value={form.empId}
                    onChange={handleChange}
                />

                <TextField
                    label="Employee Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />


            </Box>
            <Box mt={2} display="flex" justifyContent="flex-start">
                <FormControl fullWidth sx={{ maxWidth: 400 }}>
                    <InputLabel id="department-label">Departments</InputLabel>
                    <Select
                        multiple
                        name="departmentIds"
                        value={form.departmentIds}
                        onChange={handleDepartmentChange}
                        labelId="department-label"
                        label="Departments"
                        sx={{ textAlign: "left" }}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                    justifyContent: "flex-start",
                                }}
                            >
                                {selected.map((value) => {
                                    const dept = departments.find(d => d.id === value);
                                    return (
                                        <Chip
                                            key={value}
                                            label={dept?.name || value}
                                            size="small"
                                        />
                                    );
                                })}
                            </Box>
                        )}
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept.id} value={dept.id}>
                                {dept.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>




            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                {mode === "edit" ? "Update" : "Save"}
            </Button>
        </Paper>
    );
}