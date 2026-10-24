import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCalendar, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const MyAttendance = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const [shiftHistory] = useState([
    { date: 'Today, Jul 30, 2026', timeIn: '08:58 AM', timeOut: clockedIn ? 'Active Now' : '06:00 PM', hours: '8.0 hrs', status: 'On Time' },
    { date: 'Yesterday, Jul 29, 2026', timeIn: '09:02 AM', timeOut: '06:05 PM', hours: '8.0 hrs', status: 'On Time' },
    { date: 'Jul 28, 2026', timeIn: '08:55 AM', timeOut: '06:00 PM', hours: '8.0 hrs', status: 'On Time' },
    { date: 'Jul 27, 2026', timeIn: '09:00 AM', timeOut: '06:15 PM', hours: '8.2 hrs', status: 'On Time' },
    { date: 'Jul 26, 2026', timeIn: '09:18 AM', timeOut: '06:00 PM', hours: '7.7 hrs', status: 'Late' },
  ]);

  const handleClockToggle = () => {
    if (!clockedIn) {
      setClockedIn(true);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setClockTime(now);
      setToastMsg(`Clocked In successfully at ${now}!`);
    } else {
      setClockedIn(false);
      setToastMsg(`Clocked Out successfully! Shift recorded.`);
    }
    setTimeout(() => setToastMsg(''), 3500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-[#14B8A6] text-white text-xs font-bold shadow-lg flex items-center justify-between z-50 relative"
          >
            <div className="flex items-center space-x-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg('')} className="text-white hover:opacity-80">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#14B8A6] text-xs font-bold uppercase tracking-wider mb-1">
            <FiClock className="w-4 h-4" />
            <span>My Biometric Shift Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Attendance Log</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Track your daily biometric check-ins, working hours & monthly attendance punctuality.</p>
        </div>

        <button
          onClick={handleClockToggle}
          className={`px-6 py-3 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center space-x-2 cursor-pointer ${
            clockedIn
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25'
              : 'bg-gradient-to-r from-[#14B8A6] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-teal-500/25'
          }`}
        >
          <FiClock className="w-4 h-4" />
          <span>{clockedIn ? `Clock Out (In at ${clockTime})` : 'Biometric Clock In'}</span>
        </button>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Monthly Attendance Rate</div>
          <div className="text-3xl font-black text-slate-900">98.2%</div>
          <p className="text-[11px] text-[#14B8A6] font-extrabold mt-1">21 Shifts Completed</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Punctuality Record</div>
          <div className="text-3xl font-black text-slate-900">1 Late Check-In</div>
          <p className="text-[11px] text-amber-600 font-extrabold mt-1">Within 15 Min Grace Period</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Total Hours Logged</div>
          <div className="text-3xl font-black text-slate-900">168.4 Hours</div>
          <p className="text-[11px] text-[#2563EB] font-extrabold mt-1">July 2026 Billing Period</p>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 overflow-x-auto">
        <h3 className="text-base font-bold text-slate-900 mb-4">Shift History & Timestamps</h3>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-4 rounded-l-xl">Shift Date</th>
              <th className="py-3.5 px-4">Clock In Time</th>
              <th className="py-3.5 px-4">Clock Out Time</th>
              <th className="py-3.5 px-4">Logged Hours</th>
              <th className="py-3.5 px-4 rounded-r-xl text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shiftHistory.map((s, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900">{s.date}</td>
                <td className="py-3.5 px-4 font-bold text-[#14B8A6]">{s.timeIn}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-600">{s.timeOut}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{s.hours}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    s.status === 'On Time'
                      ? 'bg-teal-50 text-[#14B8A6] border-teal-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyAttendance;
