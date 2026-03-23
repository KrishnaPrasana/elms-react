import { getLeaveApplications } from "../../api/leaveApplication";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

export default function LeaveHistory() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();


  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    fetchLeaves(status);
  }, [location.search]);

  const fetchLeaves = async (status) => {
    const res = await getLeaveApplications(status ? { status } : {});
    setRows(res.data);
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.LeaveType?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (row.status || "").toLowerCase().includes(search.toLowerCase()),
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const baseColumns = [
    {
      field: "slno",
      headerName: "Sl No",
      width: 80,
      sortable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },

    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
      valueGetter: (value, row) => row?.LeaveType?.name || "",
    },

    {
      field: "fromDate",
      headerName: "From",
      flex: 1,
    },

    {
      field: "toDate",
      headerName: "To",
      flex: 1,
    },

    {
      field: "appliedOn",
      headerName: "Posting Date",
      flex: 1.5,
      valueGetter: (value, row) =>
        new Date(row?.appliedOn).toLocaleDateString(),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  const adminColumn =
    role === "admin"
      ? [
        {
          field: "actions",
          headerName: "Actions",
          width: 180,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="contained"
              size="small"
              onClick={() =>
                navigate(`/admin/employees/leaves/details/${params.row.id}`)
              }
            >
              View Details
            </Button>
          ),
        },
      ]
      : [];

  const columns = [...baseColumns, ...adminColumn];

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Box display="flex" mb={2}>
          <Typography variant="h5" color="textPrimary">
            Leave History
          </Typography>
        </Box>

        {/* Search */}
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            size="small"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />

          {role === "employee" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/employee/leaves/apply")}
            >
              Apply Leave
            </Button>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 260px)",
            backgroundColor: "#fff",
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            density="comfortable"
            sx={{
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
