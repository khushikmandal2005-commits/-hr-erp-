import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Components
import ProtectedRoute from '../components/common/ProtectedRoute';

// Pages
import Home from '../pages/Home';
import HRLogin from '../pages/HRLogin';
import EmployeeLogin from '../pages/EmployeeLogin';

// HR Pages
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Attendance from '../pages/Attendance';
import Leave from '../pages/Leave';
import Departments from '../pages/Departments';
import Payroll from '../pages/Payroll';
import Recruitment from '../pages/Recruitment';
import Reports from '../pages/Reports';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

// Dedicated Employee Self-Service Pages
import EmployeeDashboard from '../pages/EmployeeDashboard';
import MyAttendance from '../pages/employee/MyAttendance';
import MyLeave from '../pages/employee/MyLeave';
import MyPayslips from '../pages/employee/MyPayslips';
import CompanyDirectory from '../pages/employee/CompanyDirectory';
import Announcements from '../pages/employee/Announcements';

import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Home Portal Switcher */}
      <Route path="/" element={<Home />} />

      {/* Public Login Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login/hr" element={<HRLogin />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
      </Route>

      {/* Protected ERP App Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Executive HR Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/hr" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          {/* Dedicated Employee Self-Service Routes */}
          <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<MyAttendance />} />
          <Route path="/employee/leave" element={<MyLeave />} />
          <Route path="/employee/payslips" element={<MyPayslips />} />
          <Route path="/employee/directory" element={<CompanyDirectory />} />
          <Route path="/employee/announcements" element={<Announcements />} />

          {/* Shared Routes */}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
