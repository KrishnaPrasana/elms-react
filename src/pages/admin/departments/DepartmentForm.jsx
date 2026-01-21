import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosConfig";
import { useNotify } from "../../../context/NotificationContext";

export default function DepartmentForm({ mode }) {
    const {notify} = useNotify();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        shortName: "",
    });

    // Prefill for edit
    useEffect(() => {
        if (mode === "edit" && id) {
            loadDepartment();
        }
    }, [mode, id]);

    const loadDepartment = async () => {
        const res = await api.get(`/admin/departments/${id}`);
        setForm(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.shortName) {
            notify("All fields are required", "error");
            return;

        }
        try {
            if (mode === "edit") {
                await api.put(`/admin/departments/${id}`, form);
                notify("Department updated successfully");
            } else {
                await api.post("/admin/departments", form);
                notify("Department created successfully");
            }

        } catch (error) {
            const message =
                error.response?.data?.message ||   // backend message
                error.message ||                   // axios message
                "Request failed";

            notify(message, "error");
        }

        navigate("/admin/departments/manage");
    };

    return (


        <Paper sx={{ p: 2, mt: 2, mb: 2 }}>
            <Typography variant="h5" mb={3} color="textPrimary" align="left">
                {mode === "edit" ? "Edit Department" : "Add Department"}
            </Typography>

            <Box display="flex" gap={2}
                // justifyContent="space-between"
                alignItems="center">
                <TextField
                    // fullWidth
                    required

                    label="Department Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}

                />

                <TextField
                    // fullWidth
                    label="Short Name"
                    name="shortName"
                    value={form.shortName}
                    onChange={handleChange}
                />
            </Box>

            {/* <TextField
                fullWidth
                multiline
                rows={5}
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
            /> */}


            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                {mode === "edit" ? "Update" : "Save"}
            </Button>
        </Paper>
    );
}
