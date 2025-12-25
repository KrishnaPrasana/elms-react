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
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosConfig";

export default function ManageEmployees() {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await api.get("/admin/employees");
        setRows(res.data.employees);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this leave type?")) return;
        await api.delete(`/admin/leave-types/${id}`);
        fetchEmployees();
    };

    // Search filter
    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        (row.empId || "").toLowerCase().includes(search.toLowerCase())
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
        { field: "empId", headerName: "Employee ID", flex: 1.5 },
        { field: "email", headerName: "Email", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() =>
                            navigate(`/admin/employees/edit/${params.row.id}`)
                        }
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
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
