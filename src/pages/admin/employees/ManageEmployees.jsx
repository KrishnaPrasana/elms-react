import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosConfig";
import { getEmployees } from "../../../api/employee"
import { updateEmployeeStatus } from "../../../api/employee";
import Tooltip from "@mui/material/Tooltip";

export default function ManageEmployees() {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await getEmployees();

        const formatted = res.data.employees.map(emp => ({
            ...emp,
            department: emp.Departments?.map(d => d.name).join(", ") || "",
            status: emp.status || "inactive"
        }));

        setRows(formatted);
    };

    const handleToggleStatus = async (row) => {
        const newStatus = row.status === "active" ? "inactive" : "active";

        if (!window.confirm(`Mark this employee as ${newStatus}?`)) return;
        await updateEmployeeStatus(row.id, { status: newStatus });

        fetchEmployees();
    };

    // Search filter
    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        (row.empId || "").toLowerCase().includes(search.toLowerCase()) ||
        (row.department || "").toLowerCase().includes(search.toLowerCase()) ||
        (row.status || "").toLowerCase().includes(search.toLowerCase()) ||
        (row.email || "").toLowerCase().includes(search.toLowerCase())

    );

    const columns = [
        {
            field: "slno",
            headerName: "Sl No",
            width: 80,
            sortable: false,
            renderCell: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        { field: "name", headerName: "Employee Name", flex: 1 },
        { field: "empId", headerName: "Employee ID", flex: 1 },
        { field: "email", headerName: "Email", flex: 2 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => {
                const isActive = params.value === "active";

                return (
                    <span style={{
                        color: isActive ? "green" : "red",
                        fontWeight: 500
                    }}>
                        {isActive ? "Active" : "Inactive"}
                    </span>
                );
            }
        },
        {
            field: "department",
            headerName: "Department",
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.value.split(", ").map((dep, i) => (
                        <span key={i} style={{
                            background: "#e0f2f1",
                            padding: "2px 6px",
                            marginRight: 4,
                            borderRadius: 4,
                            fontSize: 12
                        }}>
                            {dep}
                        </span>
                    ))}
                </div>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            sortable: false,
            renderCell: (params) => {
                const isActive = params.row.status === "active";

                return (
                    <>
                        <IconButton
                            color="primary"
                            onClick={() =>
                                navigate(`/admin/employees/edit/${params.row.id}`)
                            }
                        >
                            <EditIcon />
                        </IconButton>

                        <Tooltip title={isActive ? "Deactivate" : "Activate"}>
                            <IconButton
                                color={isActive ? "error" : "success"}
                                onClick={() => handleToggleStatus(params.row)}
                            >
                                {isActive ? <PersonOffIcon /> : <CheckCircleIcon />}
                            </IconButton>
                        </Tooltip>
                    </>
                );
            },
        },
    ];

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ width: "100%" }}>
                {/* Header */}
                <Box
                    display="flex"
                    mb={2}
                >
                    <Typography variant="h5" color="textPrimary">
                        Manage Employees
                    </Typography>

                </Box>

                {/* Search */}
                <Box mb={2} display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <TextField
                        size="small"
                        placeholder="Search Employees..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 300 }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                        }}
                    />


                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/admin/Employees/add")}
                    >
                        Add
                    </Button>
                </Box>

                {/* DataGrid */}
                <Box
                    sx={{
                        width: "100%",
                        height: "calc(100vh - 260px)", // fills screen properly
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
