import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCalendar, FiCheckCircle, FiFileText, FiBell, FiAward, FiX } from 'react-icons/fi';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleClockToggle = () => {
    if (!clockedIn) {
      setClockedIn(true);
      const now = new Date().toLocaleTimeString();
      setClockTime(now);
      triggerToast(`Successfully Clocked In at ${now}`);
    } else {
      setClockedIn(false);
      setClockTime(null);
      triggerToast('Successfully Clocked Out');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 font-sans text-slate-800"
    >
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-[#14B8A6] text-white text-xs font-bold shadow-lg flex items-center justify-between z-50 relative"
          >
            <span>{toastMsg}</span>
            <button onClick={() => setToastMsg('')} className="text-white hover:opacity-80 cursor-pointer">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-teal-50 text-[#14B8A6] border border-teal-200">
            Employee Self-Service Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Welcome, <span className="text-[#14B8A6]">Aarav Sharma</span> 👋
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            Senior Port Logistics Manager | Export & Trade Division (EX-101)
          </p>
        </div>

        {/* Quick Clock In/Out Button */}
        <button
          onClick={handleClockToggle}
          className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center space-x-2 cursor-pointer ${
            clockedIn
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25'
              : 'bg-gradient-to-r from-[#14B8A6] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-teal-500/25'
          }`}
        >
          <FiClock className="w-4 h-4" />
          <span>{clockedIn ? `Clock Out (In at ${clockTime})` : 'Clock In Now'}</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/employee/leave')}
          className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 cursor-pointer hover:shadow-2xl transition group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Annual Leave Balance</span>
            <FiCalendar className="text-[#14B8A6] w-4 h-4 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-slate-900">14 Days</div>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Remaining for 2026</p>
        </div>

        <div
          onClick={() => navigate('/employee/attendance')}
          className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 cursor-pointer hover:shadow-2xl transition group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Monthly Attendance</span>
            <FiCheckCircle className="text-[#2563EB] w-4 h-4 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-slate-900">98.2%</div>
          <p className="text-[11px] font-extrabold text-[#14B8A6] mt-1">21 Days Present / 0 Late</p>
        </div>

        <div
          onClick={() => navigate('/employee/payslips')}
          className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 cursor-pointer hover:shadow-2xl transition group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Latest Payslip</span>
            <FiFileText className="text-purple-600 w-4 h-4 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-slate-900">July 2026</div>
          <p className="text-[11px] font-bold text-[#2563EB] mt-1 group-hover:underline">Download PDF &rarr;</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Performance Rating</span>
            <FiAward className="text-amber-500 w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-slate-900">4.9 / 5.0</div>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Exceeds Expectations</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Attendance Log */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">My Attendance Calendar & Shift History</h3>
            <button
              onClick={() => navigate('/employee/attendance')}
              className="text-xs font-bold text-[#14B8A6] hover:underline cursor-pointer"
            >
              View Full Log &rarr;
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { date: 'Today, Jul 30', status: clockedIn ? `Clocked In at ${clockTime}` : 'Not Clocked In Yet', shift: '09:00 AM - 06:00 PM', hours: '8.0 hrs' },
              { date: 'Yesterday, Jul 29', status: 'Present (09:02 AM - 06:05 PM)', shift: 'Regular Shift', hours: '8.0 hrs' },
              { date: 'Jul 28, 2026', status: 'Present (08:58 AM - 06:00 PM)', shift: 'Regular Shift', hours: '8.0 hrs' },
              { date: 'Jul 27, 2026', status: 'Present (09:00 AM - 06:15 PM)', shift: 'Regular Shift', hours: '8.2 hrs' },
            ].map((log, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{log.date}</div>
                  <div className="text-slate-500 font-medium">{log.status}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#14B8A6]">{log.hours}</div>
                  <div className="text-[10px] font-semibold text-slate-400">{log.shift}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Announcements */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <FiBell className="text-[#14B8A6]" />
            <h3>Company Announcements</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-[#14B8A6] font-extrabold uppercase">HR Notice</span>
              <h4 className="font-bold text-slate-900 mt-1">Annual EXIM Trade Expo 2026</h4>
              <p className="text-slate-500 font-medium mt-1">Global logistics department briefing scheduled for Friday at 10 AM.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-[#2563EB] font-extrabold uppercase">Policy Update</span>
              <h4 className="font-bold text-slate-900 mt-1">Updated Health Insurance Policy</h4>
              <p className="text-slate-500 font-medium mt-1">New medical coverage cards issued for all active personnel.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;
