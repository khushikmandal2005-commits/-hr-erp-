import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiMenu,
  FiUser,
  FiSettings,
  FiLogOut,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
import { setAuthToken } from '../../utils/helpers';
import logo from '../../assets/logo.png';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'HR';
  const isEmployee = userRole === 'EMPLOYEE';

  // Dynamic user profile based on role
  const currentUser = isEmployee
    ? { name: 'Sophia Martinez', role: 'Logistics Manager', email: 'sophia.m@exim2d.com', initials: 'SM' }
    : { name: 'Alex Morgan', role: 'Chief HR Admin', email: 'alex.morgan@exim2d.com', initials: 'AM' };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const msgRef = useRef(null);

  // Messages
  const messages = isEmployee
    ? [
        { id: 1, sender: 'Alex Morgan (HR)', text: 'Your annual leave application for Aug 12 has been approved.', time: '10m ago', unread: true },
        { id: 2, sender: 'David Chen', text: 'Freight container Rotterdam inspection passed.', time: '2h ago', unread: false },
      ]
    : [
        { id: 1, sender: 'Sophia Martinez', text: 'Port Customs clearance documents ready for Rotterdam cargo', time: '15m ago', unread: true },
        { id: 2, sender: 'David Chen', text: 'Civil Construction Site Alpha structural inspection passed', time: '1h ago', unread: true },
      ];

  // Notifications
  const notifications = isEmployee
    ? [
        { id: 1, title: 'July 2026 Payslip Available', desc: 'Your net pay of $4,600.00 has been credited via direct deposit.', time: '5m ago', unread: true },
        { id: 2, title: 'Biometric Clock-In Confirmed', desc: 'Logged shift start at 08:58 AM on July 30.', time: '1h ago', unread: false },
      ]
    : [
        { id: 1, title: 'Civil Site Attendance Alert', desc: '4 Site Engineers checked in at Expressway Project', time: '10m ago', unread: true },
        { id: 2, title: 'Customs Clearance Approved', desc: 'Import shipment EXIM-992 approved by customs', time: '45m ago', unread: true },
      ];

  const unreadNotifCount = notifications.filter((n) => n.unread).length;
  const unreadMsgCount = messages.filter((m) => m.unread).length;

  // Handle Outside Clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(e.target)) {
        setIsMessagesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setIsNotificationsOpen(false);
    setIsMessagesOpen(false);
    setIsProfileOpen((prev) => !prev);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsProfileOpen(false);
    setIsMessagesOpen(false);
    setIsNotificationsOpen((prev) => !prev);
  };

  const toggleMessages = (e) => {
    e.stopPropagation();
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setIsMessagesOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left Side: Sidebar Toggle & Brand Title & Search Bar */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
          title="Toggle Navigation Menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Brand Logo & Name in Navbar */}
        <div className="hidden sm:flex items-center space-x-2 shrink-0 min-w-0">
          <img src={logo} alt="EXIM 2D World Traders Logo" className="w-6 h-6 object-contain shrink-0" />
          <span className="font-black text-xs text-slate-900 tracking-tight whitespace-nowrap">
            EXIM 2D <span className="text-[#2563EB] font-extrabold">{isEmployee ? 'EMPLOYEE PORTAL' : 'HR ERP'}</span>
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-sm ml-2">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder={isEmployee ? "Search colleagues..." : "Search site engineers..."}
              className="w-full pl-10 pr-8 py-2 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Popup */}
          <AnimatePresence>
            {isSearchFocused && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute left-0 right-0 top-12 bg-white backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 text-slate-800"
              >
                <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-2 mb-2">
                  EXIM 2D Search Results
                </div>
                <div className="space-y-1 text-xs">
                  <Link to={isEmployee ? "/employee/directory" : "/employees"} className="block p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-semibold">
                    Search personnel matching "{searchQuery}"
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        {/* Messages Dropdown */}
        <div className="relative z-50" ref={msgRef}>
          <button
            onClick={toggleMessages}
            className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition cursor-pointer"
            title="Messages"
          >
            <FiMessageSquare className="w-4 h-4" />
            {unreadMsgCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
            )}
          </button>

          <AnimatePresence>
            {isMessagesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-slate-800"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <h3 className="text-xs font-bold text-slate-900">Messages</h3>
                  <span className="text-[10px] text-[#2563EB] font-bold">{unreadMsgCount} Unread</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {messages.map((m) => (
                    <div key={m.id} className="p-2.5 rounded-xl hover:bg-slate-50 text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{m.sender}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{m.time}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{m.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative z-50" ref={notifRef}>
          <button
            onClick={toggleNotifications}
            className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition cursor-pointer"
            title="Notifications"
          >
            <FiBell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#14B8A6] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-slate-800"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <h3 className="text-xs font-bold text-slate-900">Notifications</h3>
                  <span className="text-[10px] text-[#14B8A6] font-bold">{unreadNotifCount} New</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl hover:bg-slate-50 text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic User Profile Dropdown Button */}
        <div className="relative z-50" ref={profileRef}>
          <button
            type="button"
            onClick={toggleProfile}
            className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition cursor-pointer active:scale-95 shadow-xs select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-blue-700 text-white font-black flex items-center justify-center text-xs shadow-md shadow-blue-500/20 shrink-0">
              {currentUser.initials}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">{currentUser.role}</div>
            </div>
            <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-[#2563EB]' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-slate-800"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1 bg-slate-50/50 rounded-xl">
                  <div className="text-xs font-black text-slate-900">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 truncate font-semibold">{currentUser.email}</div>
                </div>
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition"
                  >
                    <FiUser className="w-4 h-4 text-[#2563EB]" />
                    <span>My Profile</span>
                  </Link>
                  {!isEmployee && (
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#14B8A6] transition"
                    >
                      <FiSettings className="w-4 h-4 text-[#14B8A6]" />
                      <span>ERP Settings</span>
                    </Link>
                  )}
                </div>
                <div className="pt-1 mt-1 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-black transition cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout Session</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
