import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosConfig";
import { Paper, Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select, Chip,Grid } from "@mui/material";
import { useNotify } from "../../../context/NotificationContext";
import { createEmployee, updateEmployee, getEmployee } from "../../../api/employee";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




export default function EmployeeForm({ mode }) {
    const { notify } = useNotify();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        departmentIds: [],
        gender: "",
        dateOfBirth: null,
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
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
        const res = await getEmployee(id);
        setForm(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDepartmentChange = (e) => {
        setForm({ ...form, departmentIds: e.target.value });
    };

    const payload = {
        ...form,
        dateOfBirth: form.dateOfBirth
            ? form.dateOfBirth.format("YYYY-MM-DD")
            : null,
    };



    const handleSubmit = async () => {
        if (!form.name || !form.email  || form.departmentIds.length === 0) {
            notify("All fields are required", "error");
            return;
        }
        try {


            if (mode === "edit") {
                await updateEmployee(id, payload);
                notify("Employee updated successfully");
            } else {
                await createEmployee(payload);
                notify("Employee created successfully")
            }

            navigate("/admin/employees/manage");
        } catch (error) {
            const message =
                error.response?.data?.message ||   // backend message
                error.message ||                   // axios message
                "Request failed";

            notify(message, "error");
        }

    };

    return (
        <Paper sx={{ p: 2, mt: 2, mb: 2, width: '100%', maxWidth: 1200,}}>
            <Typography variant="h5" mb={3} color="textPrimary" align="left">
                {mode === "edit" ? "Edit Employee" : "Add Employee"}
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Employee Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth size="small" variant="filled" sx={{width:230}}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={form.gender}
                            label="Gender"
                            onChange={handleChange}
                            sx={{textAlign:"left"}}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of Birth"
                            value={form.dateOfBirth}
                            onChange={(val) =>
                                setForm({ ...form, dateOfBirth: val })
                            }
                            slotProps={{ textField: { fullWidth: true, size: "medium",variant:"filled" } }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="filled" sx={{minWidth:230}}>
                        <InputLabel id="department-label">Departments</InputLabel>
                        <Select
                            multiple
                            name="departmentIds"
                            value={form.departmentIds}
                            onChange={handleDepartmentChange}
                            labelId="department-label"
                            label="Departments"
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => {
                                        const dept = departments.find(d => d.id === value);
                                        return (
                                            <Chip
                                                key={value}
                                                label={dept?.name || value}
                                                variant="filled"
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
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                    />
                </Grid>

            </Grid>




            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                {mode === "edit" ? "Update" : "Save"}
            </Button>
        </Paper>
    );
}