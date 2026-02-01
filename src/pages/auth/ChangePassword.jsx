import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import api from "../../api/axiosConfig";
import { changePassword } from "../../api/common";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const toggle = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordProps = (field) => ({
    type: showPassword[field] ? "text" : "password",

    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => toggle(field)} edge="end">
            {showPassword[field] ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
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
      const res = await changePassword(form);

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
              {
                ...passwordProps("currentPassword")
              }
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
              {
                ...passwordProps("newPassword")
              }
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
              {
                ...passwordProps("confirmPassword")
              }
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Update Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
