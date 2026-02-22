import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import FolderIcon from "@mui/icons-material/Folder";
import LockIcon from "@mui/icons-material/Lock";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNotify } from "../../context/NotificationContext";

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

export default function AdminLayout() {
  const navigate = useNavigate();
  const { notify } = useNotify();
  const [open, setOpen] = useState(true);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    notify("Logged out successfully");

    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        maxWidth: "100%",
      }}
    >
      {/* APP BAR */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidthOpen : drawerWidthClosed,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />

        <List>
          <ListItemButton component={NavLink} to="/admin/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>

          <ListItemButton onClick={() => setLeaveOpen(!leaveOpen)}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Leave Types" />}
            {open && (leaveOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          <Collapse in={leaveOpen}>
            <List component="div" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/admin/leave-types/add"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Add Leave Type" />}
              </ListItemButton>

              <ListItemButton
                component={NavLink}
                to="/admin/leave-types/manage"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Manage Leave Types" />}
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => setDepartmentOpen(!departmentOpen)}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Departments" />}
            {open && (departmentOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          <Collapse in={departmentOpen}>
            <List component="div" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/admin/departments/add"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Add Department" />}
              </ListItemButton>

              <ListItemButton
                component={NavLink}
                to="/admin/departments/manage"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Manage Departments" />}
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => setEmployeeOpen(!employeeOpen)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Employees" />}
            {open && (employeeOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          <Collapse in={employeeOpen}>
            <List component="div" disablePadding>
              <ListItemButton
                component={NavLink}
                to="/admin/employees/add"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Add Employee" />}
              </ListItemButton>

              <ListItemButton
                component={NavLink}
                to="/admin/employees/manage"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Manage Employees" />}
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            component={NavLink}
            to="/admin/employees/leaves/history"
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Leave Applications" />}
          </ListItemButton>

          <ListItemButton component={NavLink} to="/admin/change-password">
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Change Password" />}
          </ListItemButton>

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </List>
      </Drawer>

      {/* 🔥 MAIN CONTENT — FULL WIDTH FIX */}

      <Box
        component="main"
        // bgcolor={"red"}
        sx={{
          flexGrow: 1,
          px: 2,
          width: "100%",
          maxWidth: "100%", // ⬅️ CRITICAL
          overflowX: "hidden",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
