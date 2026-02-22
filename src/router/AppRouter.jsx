import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import AdminLayout from "../components/Layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageLeaveTypes from "../pages/admin/leave-types/ManageLeaveTypes";
import LeaveTypeForm from "../pages/admin/leave-types/LeaveTypeForm";
import DepartmentForm from "../pages/admin/departments/DepartmentForm";
import ManageDepartments from "../pages/admin/departments/ManageDepartments";
import EmployeeForm from "../pages/admin/employees/EmployeeForm";
import ManageEmployees from "../pages/admin/employees/ManageEmployees";
import ChangePassword from "../pages/auth/ChangePassword";
import EmployeeLayout from "../components/Layout/EmployeeLayout";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import LeaveApplyForm from "../pages/employee/LeaveApplyForm";
import LeaveHistory from "../pages/employee/LeaveHistory";
import LeaveDetails from "../pages/admin/leave-application/LeaveDetails";

export default function AppRouter() {
  const { user, loading } = useContext(AuthContext);

  const Protected = ({ children }) => {
    if (loading) return null;
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <Protected>
            {" "}
            <AdminLayout />{" "}
          </Protected>
        }
      >
        {/* NESTED admin screens */}
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="leave-types">
          <Route path="add" element={<LeaveTypeForm mode="add" />} />
          <Route path="edit/:id" element={<LeaveTypeForm mode="edit" />} />
          <Route path="manage" element={<ManageLeaveTypes />} />
        </Route>

        <Route path="departments">
          <Route path="add" element={<DepartmentForm mode="add" />} />
          <Route path="edit/:id" element={<DepartmentForm mode="edit" />} />
          <Route path="manage" element={<ManageDepartments />} />
        </Route>

        <Route path="employees">
          <Route path="add" element={<EmployeeForm mode="add" />} />
          <Route path="edit/:id" element={<EmployeeForm mode="edit" />} />
          <Route path="manage" element={<ManageEmployees />} />

          <Route path="leaves">
            <Route path="history" element={<LeaveHistory />} />
            <Route path="details/:id" element={<LeaveDetails />} />
          </Route>
        </Route>
        <Route path="change-password" element={<ChangePassword />} />
        {/* Add more screens here later */}
      </Route>

      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee"
        element={
          <Protected>
            {" "}
            <EmployeeLayout />{" "}
          </Protected>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="change-password" element={<ChangePassword />} />

        <Route path="leaves">
          <Route path="apply" element={<LeaveApplyForm mode="add" />} />
          <Route path="history" element={<LeaveHistory />} />
        </Route>
      </Route>

      {/* DEFAULT REDIRECT */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
