import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiCalendar,
  FiBriefcase,
  FiClock,
  FiPlus,
  FiCheckCircle,
  FiDollarSign,
  FiGift,
  FiActivity,
  FiX,
  FiDownload,
  FiArrowRight,
  FiAlertOctagon,
  FiGlobe,
  FiSun,
  FiCloudRain,
  FiShield,
} from 'react-icons/fi';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const [toastMsg, setToastMsg] = useState('');
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // EXCLUSIVITY FEATURE 1: Global Site Hub Radar
  const globalHubs = [
    { name: 'Rotterdam Port Hub', location: 'Netherlands', weather: '18°C Sunny', status: '12 Ships Docked', icon: FiSun, color: 'text-amber-500' },
    { name: 'Singapore Logistics Hub', location: 'Singapore', weather: '31°C Tropical', status: '99.4% Customs Rate', icon: FiGlobe, color: 'text-[#14B8A6]' },
    { name: 'New York HQ', location: 'USA', weather: '24°C Clear', status: 'Executive Operations', icon: FiSun, color: 'text-[#2563EB]' },
    { name: 'Expressway Project Alpha', location: 'Civil Site', weather: '28°C Active Site', status: '48 Crew Checked In', icon: FiShield, color: 'text-purple-600' },
  ];

  // 1. KPI Cards tailored to EXIM 2D World Traders
  const kpis = [
    { title: 'Total Workforce', value: '142', sub: 'Site Engineers & Exim Officers', icon: FiUsers, gradient: 'from-[#2563EB] to-blue-700 shadow-blue-500/20', badge: '+12%', path: '/employees' },
    { title: 'Present On Site Today', value: '128', sub: '90.1% Civil & Port Biometrics', icon: FiUserCheck, gradient: 'from-[#14B8A6] to-teal-600 shadow-teal-500/20', badge: '90.1%', path: '/attendance' },
    { title: 'Absent / Off Duty', value: '5', sub: '3 Unexcused Site Absences', icon: FiUserX, gradient: 'from-rose-500 to-rose-600 shadow-rose-500/20', badge: '3 Unexcused', path: '/attendance' },
    { title: 'Personnel On Leave', value: '9', sub: '5 Annual / 4 Medical', icon: FiCalendar, gradient: 'from-amber-500 to-amber-600 shadow-amber-500/20', badge: '9 Active', path: '/leave' },
    { title: 'Civil & Exim Units', value: '6', sub: 'Active Engineering Divisions', icon: FiBriefcase, gradient: 'from-indigo-600 to-purple-600 shadow-indigo-500/20', badge: '6 Units', path: '/departments' },
    { title: 'Pending HR Approvals', value: '7', sub: 'Site Leave & Claim Approvals', icon: FiClock, gradient: 'from-cyan-500 to-blue-600 shadow-cyan-500/20', badge: '7 Pending', path: '/leave' },
  ];

  // 2. Chart Data
  const attendanceData = [
    { day: 'Mon', Present: 135, Late: 4, Absent: 3 },
    { day: 'Tue', Present: 138, Late: 2, Absent: 2 },
    { day: 'Wed', Present: 128, Late: 8, Absent: 6 },
    { day: 'Thu', Present: 132, Late: 5, Absent: 5 },
    { day: 'Fri', Present: 125, Late: 9, Absent: 8 },
    { day: 'Sat', Present: 45, Late: 1, Absent: 2 },
  ];

  const deptDistributionData = [
    { name: 'Civil Engineering & Struct', value: 48, color: '#2563EB' },
    { name: 'Export-Import Logistics', value: 34, color: '#14B8A6' },
    { name: 'Heavy Construction Crew', value: 24, color: '#06B6D4' },
    { name: 'Finance & Procurement', value: 20, color: '#F59E0B' },
    { name: 'Human Resources & Safety', value: 16, color: '#6366F1' },
  ];

  const employeeGrowthData = [
    { month: 'Feb', employees: 110 },
    { month: 'Mar', employees: 118 },
    { month: 'Apr', employees: 124 },
    { month: 'May', employees: 130 },
    { month: 'Jun', employees: 136 },
    { month: 'Jul', employees: 142 },
  ];

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'John Doe', type: 'Annual Leave', dates: 'Aug 2 - Aug 5', reason: 'Site rotation vacation', status: 'Pending' },
    { id: 2, name: 'Aisha Patel', type: 'Sick Leave', dates: 'Aug 1', reason: 'Medical consultation', status: 'Pending' },
    { id: 3, name: 'Liam O’Connor', type: 'Casual Leave', dates: 'Aug 10 - Aug 12', reason: 'Personal affairs', status: 'Pending' },
  ]);

  const handleLeaveAction = (id, newStatus) => {
    setLeaveRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    triggerToast(`Leave request for ${leaveRequests.find(r => r.id === id)?.name} marked as ${newStatus}`);
  };

  const quickActions = [
    { id: 'onboard', label: 'Onboard Site Staff', icon: FiPlus, color: 'bg-gradient-to-r from-[#2563EB] to-blue-700 text-white shadow-blue-600/25', action: () => navigate('/employees') },
    { id: 'biometrics', label: 'Mark Site Biometrics', icon: FiClock, color: 'bg-gradient-to-r from-[#14B8A6] to-teal-600 text-white shadow-teal-500/25', action: () => navigate('/attendance') },
    { id: 'leave', label: 'Approve Site Leave', icon: FiCheckCircle, color: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/25', action: () => navigate('/leave') },
    { id: 'payroll', label: 'Process Site Payroll', icon: FiDollarSign, color: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25', action: () => navigate('/payroll') },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 text-slate-800 font-sans">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-[#2563EB] text-white text-xs font-bold shadow-lg flex items-center justify-between z-50 relative"
          >
            <span>{toastMsg}</span>
            <button onClick={() => setToastMsg('')} className="text-white hover:opacity-80">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#2563EB]">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>{currentDate}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            EXIM 2D World Traders HR ERP
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Executive Operations Dashboard — Civil Engineering, Construction Projects & Export-Import Logistics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* EXCLUSIVITY FEATURE 2: Emergency Safety SOS Button */}
          <button
            onClick={() => setIsSosModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md shadow-rose-600/25 flex items-center space-x-2 transition transform active:scale-95 cursor-pointer"
          >
            <FiAlertOctagon className="w-4 h-4 animate-pulse" />
            <span>Site Safety SOS</span>
          </button>
          <button
            onClick={() => triggerToast('EXIM 2D HR Audit Report generated and downloaded!')}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200/80 flex items-center space-x-2 transition cursor-pointer"
          >
            <FiDownload className="w-4 h-4 text-[#2563EB]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* EXCLUSIVITY FEATURE 1: Global Site Weather & Operations Hub Radar */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FiGlobe className="text-[#2563EB] w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900">EXIM 2D Global Hub Operations Radar</h3>
          </div>
          <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Live Weather & Terminal Feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {globalHubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <div key={hub.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${hub.color} shrink-0`} />
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-900 truncate">{hub.name}</div>
                  <div className="text-[10px] text-slate-500 font-bold">{hub.location} • <span className="text-slate-800">{hub.weather}</span></div>
                  <div className="text-[10px] text-[#2563EB] font-extrabold mt-0.5">{hub.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(kpi.path)}
              className="cursor-pointer p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${kpi.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                  {kpi.badge}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#2563EB] transition-colors">{kpi.value}</h3>
                <p className="text-xs font-bold text-slate-700 mt-0.5 truncate">{kpi.title}</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1 truncate">{kpi.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fully Clickable Executive Quick Actions */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
          EXIM 2D Quick Executive Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <motion.button
                key={act.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={act.action}
                className={`p-4 rounded-2xl ${act.color} font-extrabold text-xs shadow-md transition flex items-center justify-between space-x-2 cursor-pointer w-full text-left`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{act.label}</span>
                </div>
                <FiArrowRight className="w-4 h-4 opacity-80 shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Civil & Port Biometric Attendance</h3>
              <p className="text-xs text-slate-500 font-medium">Weekly attendance of civil site crew, engineers & port officers.</p>
            </div>
            <button
              onClick={() => navigate('/attendance')}
              className="text-xs font-extrabold text-[#14B8A6] bg-teal-50 px-3 py-1 rounded-full border border-teal-200 hover:bg-[#14B8A6] hover:text-white transition cursor-pointer"
            >
              90.1% Present
            </button>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', borderColor: '#e2e8f0', color: '#0f172a', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="Present" fill="#2563EB" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Late" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Absent" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">Division Distribution</h3>
              <button onClick={() => navigate('/departments')} className="text-xs text-[#2563EB] font-bold hover:underline">Manage</button>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">Staff distribution across Civil, Exim & Accounts.</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deptDistributionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {deptDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', borderColor: '#e2e8f0', color: '#0f172a' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
            {deptDistributionData.map((d) => (
              <div key={d.name} className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-lg" onClick={() => navigate('/departments')}>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-700 text-[11px] font-semibold">{d.name}</span>
                </div>
                <span className="font-extrabold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SITE EMERGENCY SOS BROADCAST MODAL */}
      <AnimatePresence>
        {isSosModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 relative text-left"
            >
              <button
                onClick={() => setIsSosModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200">
                  <FiAlertOctagon className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Broadcast Site Safety SOS</h2>
                  <p className="text-xs text-rose-600 font-bold">Emergency Operations Protocol</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium mb-6">
                Send instant emergency safety notifications & SMS alerts to all civil site engineers and port terminal safety leads.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsSosModalOpen(false);
                    triggerToast('🚨 SOS Emergency Safety Alert broadcasted to all 142 site personnel!');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/25 transition cursor-pointer"
                >
                  Confirm & Broadcast Emergency Alert
                </button>
                <button
                  onClick={() => setIsSosModalOpen(false)}
                  className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
