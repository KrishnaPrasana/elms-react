import { useEffect, useState } from "react";
import { useNotify } from "../../context/NotificationContext";
import { applyLeave } from "../../api/leaveApplication";
import { getLeaveTypes } from "../../api/leaveType";
import {
  MenuItem,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { Grid } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../../api/axiosConfig";

export default function LeaveApplyForm({ mode }) {
  const { notify } = useNotify();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    leaveTypeId: null,
    fromDate: null,
    toDate: null,
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const payload = {
    ...form,
    fromDate: form.fromDate ? form.fromDate.format("YYYY-MM-DD") : null,
    toDate: form.toDate ? form.toDate.format("YYYY-MM-DD") : null,
  };

  const handleSubmit = async (e) => {
    console.log(form.leaveTypeId);

    if (!form.leaveTypeId || !form.fromDate || !form.toDate || !form.reason) {
      notify("All fields are required", "error");
      return;
    }

    try {
      if (mode === "edit") {
      } else {
        await applyLeave(payload);
        notify("Leave applied successfully");
      }
      navigate("/employee/leaves/history");
    } catch (error) {}
  };

  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    if (mode === "edit" && id) {
      loadLeaveApplication();
    }
    fetchLeaveTypes();
  }, [mode, id]);

  const fetchLeaveTypes = async () => {
    const res = await getLeaveTypes();
    setLeaveTypes(res.data);
  };

  return (
    <Paper sx={{ p: 2, mt: 2, mb: 2, width: "100%", maxWidth: 1200 }}>
      <Typography variant="h5" mb={3} color="textPrimary" align="left">
        {mode === "edit" ? "Edit Leave Application" : "Apply for Leave"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl
            fullWidth
            size="small"
            variant="filled"
            sx={{ width: 230 }}
          >
            <InputLabel>Select leave type</InputLabel>
            <Select
              name="leaveTypeId"
              value={form.leaveTypeId}
              label="Leave type"
              onChange={handleChange}
              sx={{ textAlign: "left" }}
            >
              {leaveTypes.map((leaveType) => (
                <MenuItem key={leaveType.id} value={leaveType.id}>
                  {leaveType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={form.fromDate}
              onChange={(val) => setForm({ ...form, fromDate: val })}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "medium",
                  variant: "filled",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To Date"
              value={form.toDate}
              onChange={(val) => setForm({ ...form, toDate: val })}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "medium",
                  variant: "filled",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <TextField
          fullWidth
          multiline
          rows={5}
          label="Reason"
          name="reason"
          value={form.reason}
          onChange={handleChange}
        />
      </Grid>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        {mode === "edit" ? "Update" : "Apply"}
      </Button>
    </Paper>
  );
}
