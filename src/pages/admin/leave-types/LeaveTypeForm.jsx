import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosConfig";

export default function LeaveTypeForm({ mode }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        maxDays: "",
    });

    // Prefill for edit
    useEffect(() => {
        if (mode === "edit" && id) {
            loadLeaveType();
        }
    }, [mode, id]);

    const loadLeaveType = async () => {
        const res = await api.get(`/admin/leave-types/${id}`);
        setForm(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.maxDays) return;

        if (mode === "edit") {
            await api.put(`/admin/leave-types/${id}`, form);
        } else {
            await api.post("/admin/leave-types", form);
        }

        navigate("/admin/leave-types/manage");
    };

    return (


        <Paper sx={{ p: 2, mt: 2, mb: 2 }}>
            <Typography variant="h5" mb={3} color="textPrimary" align="left">
                {mode === "edit" ? "Edit Leave Type" : "Add Leave Type"}
            </Typography>

            <Box display="flex" gap={2}
                // justifyContent="space-between"
                alignItems="center">
                <TextField
                    // fullWidth
                    required

                    label="Leave Type Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}

                />

                <TextField
                    // fullWidth
                    label="Max Days"
                    name="maxDays"
                    type="number"
                    value={form.maxDays}
                    onChange={handleChange}
                />
            </Box>

            <TextField
                fullWidth
                multiline
                rows={5}
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
            />


            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                {mode === "edit" ? "Update" : "Save"}
            </Button>
        </Paper>
    );
}
