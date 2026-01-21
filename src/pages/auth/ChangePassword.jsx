import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import api from "../../api/axiosConfig";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("New password and confirm password do not match");
    }

    try {
      const res = await api.put("/admin/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setMessage(res.data.message);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box maxWidth={400}>
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Change Password
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}

          <Box component="form" onSubmit={handleSubmit} mt={2}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              fullWidth
              margin="normal"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />

            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              fullWidth
              margin="normal"
              value={form.newPassword}
              onChange={handleChange}
              required
            />

            <TextField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              fullWidth
              margin="normal"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
