import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import {
  getLeaveApplicationById,
  updateLeaveApplication,
} from "../../../api/leaveApplication";

export default function LeaveDetails() {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  const [open, setOpen] = useState(false);
  const [actionData, setActionData] = useState({
    status: "",
    adminRemark: "",
  });

  useEffect(() => {
    fetchLeaveDetails();
  }, [id]);

  const fetchLeaveDetails = async () => {
    const res = await getLeaveApplicationById(id);
    setLeave(res.data);
  };

  const data = {
    status: actionData.status,
    adminRemark: actionData.adminRemark,
  };

  const handleActionSubmit = async () => {
    try {
      await updateLeaveApplication(id, data);

      setOpen(false);
      window.location.reload(); // or refetchLeaveDetails()
    } catch (err) {
      console.error(err);
    }
  };

  if (!leave) return null;

  const statusColor =
    leave.status === "approved"
      ? "success"
      : leave.status === "rejected"
        ? "error"
        : "warning";

  return (
    <Paper sx={{ p: 3, mt: 3, maxWidth: 1100, mx: "auto" }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        LEAVE DETAILS
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Employee Name :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography color="primary">{leave.User?.name || "N/A"}</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Employee ID :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography color="primary">
              {leave.User?.empId || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Gender :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>{leave.User?.gender || "N/A"}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Employee Email :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>{leave.User?.email || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Employee Contact No :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography color="primary">
              {leave.User?.phoneNumber || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Leave Type :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>{leave.LeaveType?.name}</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Leave Date :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>
              From {leave.fromDate} to {leave.toDate}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Posting Date :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>
              {new Date(leave.appliedOn).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>
              Employee Leave Description :
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>{leave.reason}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Leave Status :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Chip label={leave.status} color={statusColor} variant="filled" />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Admin Remark :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>{leave.adminRemark || "NA"}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Admin Action taken date :</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>
              {leave.adminResponseDate
                ? new Date(leave.adminResponseDate).toLocaleString()
                : "NA"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Show only if pending */}
      {leave.status === "pending" && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2e7d72",
            "&:hover": { backgroundColor: "#1f5f56" },
          }}
          onClick={() => setOpen(true)}
        >
          TAKE ACTION
        </Button>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Take Action</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          {/* Status Select */}
          <TextField
            select
            fullWidth
            label="Select Action"
            value={actionData.status}
            onChange={(e) =>
              setActionData({ ...actionData, status: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="approved">Approve</MenuItem>
            <MenuItem value="rejected">Reject</MenuItem>
          </TextField>

          {/* Admin Remark */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Admin Remark"
            value={actionData.adminRemark}
            onChange={(e) =>
              setActionData({ ...actionData, adminRemark: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleActionSubmit}
            disabled={!actionData.status}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
