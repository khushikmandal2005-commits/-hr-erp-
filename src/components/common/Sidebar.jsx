import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiUsers,
  FiClock,
  FiCalendar,
  FiBriefcase,
  FiDollarSign,
  FiUserPlus,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiLogOut,
  FiX,
  FiFileText,
  FiBell,
} from 'react-icons/fi';
import { setAuthToken } from '../../utils/helpers';
import logo from '../../assets/logo.png';

const Sidebar = ({ isOpen, isCollapsed, toggleCollapse, closeMobileSidebar }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'HR';
  const isEmployee = userRole === 'EMPLOYEE';

  // 1. HR Admin Executive Menu
  const hrMenuItems = [
    { label: 'Dashboard', path: '/dashboard/hr', icon: FiGrid },
    { label: 'Employees Directory', path: '/employees', icon: FiUsers, badge: '142' },
    { label: 'Attendance & Sites', path: '/attendance', icon: FiClock },
    { label: 'Leave Management', path: '/leave', icon: FiCalendar, badge: '5 New' },
    { label: 'Departments & Projects', path: '/departments', icon: FiBriefcase },
    { label: 'Payroll & Wages', path: '/payroll', icon: FiDollarSign },
    { label: 'Recruitment & Hiring', path: '/recruitment', icon: FiUserPlus },
    { label: 'Reports & Compliance', path: '/reports', icon: FiBarChart2 },
    { label: 'ERP Settings', path: '/settings', icon: FiSettings },
    { label: 'My Profile', path: '/profile', icon: FiUser },
  ];

  // 2. Employee Self-Service Menu
  const employeeMenuItems = [
    { label: 'My Dashboard', path: '/dashboard/employee', icon: FiGrid },
    { label: 'My Attendance', path: '/employee/attendance', icon: FiClock },
    { label: 'My Leave & Requests', path: '/employee/leave', icon: FiCalendar, badge: '14 Days' },
    { label: 'My Payslips', path: '/employee/payslips', icon: FiFileText },
    { label: 'Company Directory', path: '/employee/directory', icon: FiUsers },
    { label: 'Announcements', path: '/employee/announcements', icon: FiBell, badge: '2 New' },
    { label: 'My Profile', path: '/profile', icon: FiUser },
  ];

  const menuItems = isEmployee ? employeeMenuItems : hrMenuItems;

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileSidebar}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Light Glass SaaS Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen bg-white/85 backdrop-blur-xl border-r border-slate-200/80 text-slate-800 flex flex-col justify-between transition-all duration-300 shadow-xs ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        <div>
          {/* Header Branding */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/80 min-w-0">
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="p-1.5 bg-white shadow-md shadow-blue-500/10 border border-blue-100 rounded-xl shrink-0">
                <img src={logo} alt="EXIM 2D World Traders Logo" className="w-6 h-6 object-contain" />
              </div>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0 flex-1"
                >
                  <h1 className="text-[11px] font-black tracking-tight text-slate-900 leading-tight truncate">
                    EXIM 2D <span className="text-[#2563EB]">TRADERS</span>
                  </h1>
                  <p className="text-[8.5px] text-[#14B8A6] font-extrabold tracking-tight uppercase truncate">
                    {isEmployee ? 'Employee Portal' : 'Civil & Exim HR ERP'}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={closeMobileSidebar}
              className="lg:hidden p-1 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 shrink-0 ml-1 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className={`px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>
              {isCollapsed ? '•••' : isEmployee ? 'Employee Self-Service' : 'EXIM ERP Modules'}
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2563EB] to-blue-700 text-white font-extrabold shadow-md shadow-blue-600/25'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`
                  }
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />

                  {!isCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 truncate">
                      {item.label}
                    </motion.span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Action */}
        <div className="p-3 border-t border-slate-200/80">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Logout Session"
          >
            <FiLogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout Session</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
