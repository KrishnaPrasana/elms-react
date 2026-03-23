import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CardActionArea,
} from "@mui/material";
import api from "../../api/axiosConfig";
import { getDashboard } from "../../api/employee";

export default function EmployeeDashboard() {
    const [stats, setStats] = useState({
        totalLeaves: 0,
        approvedLeaves: 0,
        newLeaveApplications: 0,
    });

    const [recent, setRecent] = useState([]);

    // Fetch dashboard data
    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await getDashboard();
            setStats(res.data.stats);
            setRecent(res.data.recent);
        } catch (err) {
            console.error("Dashboard load error:", err);
        }
    };

    return (
        <Box>
            <Typography variant="h4" mb={3} color="textPrimary" align="left">
                Dashboard
            </Typography>

            {/* Summary Cards */}
            {/* Summary Cards */}
            <Grid
                container
                spacing={3}
                sx={{
                    mb: 4,
                    // display: "flex",
                    // justifyContent: "space-between",
                }}
            >
                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} sx={{ height: 120, width: 250 }}>
                        <CardActionArea 
                        component={NavLink}
                            to="/employee/leaves/history" 
                            sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Total Leaves
                                </Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    {stats.totalLeaves}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} sx={{ height: 120, width: 250 }}>
                        <CardActionArea
                         component={NavLink}
                            to="/employee/leaves/history?status=approved" 
                            sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Approved Leaves
                                </Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    {stats.approvedLeaves}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} sx={{ height: 120, width: 250 }}>
                        <CardActionArea 
                        component={NavLink}
                            to="/employee/leaves/history?status=pending" 
                             sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                    New Leave Applications
                                </Typography>
                                <Typography variant="h4" fontWeight={700}>
                                    {stats.newLeaveApplications}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>


            </Grid>


            {/* Recent Leave Applications */}
            <Box mt={5}>
                <Typography variant="h6" mb={2}>
                    Recent Leave Applications
                </Typography>

                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                               
                                <TableCell>Leave Type</TableCell>
                                <TableCell>Dates</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {recent.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No recent applications
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recent.map((row) => (
                                    <TableRow key={row.id}>
                                        
                                        <TableCell>{row.leaveType}</TableCell>
                                        <TableCell>
                                            {row.fromDate} — {row.toDate}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                color={
                                                    row.status === "approved"
                                                        ? "success"
                                                        : row.status === "rejected"
                                                            ? "error"
                                                            : "warning"
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
