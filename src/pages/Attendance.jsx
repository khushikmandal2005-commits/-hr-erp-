import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiAlertTriangle, FiCalendar, FiDownload, FiX, FiCheck } from 'react-icons/fi';

const Attendance = () => {
  const [toastMsg, setToastMsg] = useState('');
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [staffName, setStaffName] = useState('');

  const [attendanceLogs, setAttendanceLogs] = useState([
    { name: 'Aarav Sharma', id: 'EX-101', dept: 'Export Logistics', timeIn: '08:52 AM', timeOut: '06:00 PM', status: 'On Time', hours: '8.5 hrs' },
    { name: 'Priya Patel', id: 'EX-102', dept: 'Global Trade', timeIn: '09:05 AM', timeOut: '06:15 PM', status: 'Late', hours: '8.2 hrs' },
    { name: 'Amitabh Verma', id: 'EX-103', dept: 'Civil Infrastructure', timeIn: '07:45 AM', timeOut: '05:00 PM', status: 'On Time', hours: '9.0 hrs' },
    { name: 'Neha Gupta', id: 'EX-104', dept: 'Human Resources', timeIn: '09:28 AM', timeOut: '06:30 PM', status: 'On Time', hours: '8.4 hrs' },
    { name: 'Vikramaditya Rao', id: 'EX-105', dept: 'Export Logistics', timeIn: '08:40 AM', timeOut: '05:55 PM', status: 'On Time', hours: '8.6 hrs' },
    { name: 'Rohan Joshi', id: 'EX-107', dept: 'IT Operations', timeIn: '09:55 AM', timeOut: 'In Progress', status: 'Late', hours: '7.1 hrs' },
  ]);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleMarkCheckInSubmit = (e) => {
    e.preventDefault();
    if (!staffName) {
      alert('Please enter staff name');
      return;
    }

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRecord = {
      name: staffName,
      id: `EX-${Math.floor(Math.random() * 899 + 100)}`,
      dept: 'Civil Engineering',
      timeIn: currentTime,
      timeOut: 'In Progress',
      status: 'On Time',
      hours: '0.1 hrs',
    };

    setAttendanceLogs([newRecord, ...attendanceLogs]);
    setIsCheckInModalOpen(false);
    setStaffName('');
    triggerToast(`Biometric Check-In recorded for ${staffName} at ${currentTime}!`);
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
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiClock className="w-4 h-4" />
            <span>Attendance & Shift Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Real-Time Attendance Portal</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Biometric check-in logs, shift timings & overtime reports.</p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <button
            onClick={() => triggerToast('Biometric attendance log exported to CSV!')}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200/80 flex items-center space-x-2 transition cursor-pointer"
          >
            <FiDownload className="w-4 h-4 text-[#2563EB]" />
            <span>Export Log Report</span>
          </button>
          <button
            onClick={() => setIsCheckInModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 transition transform active:scale-95 cursor-pointer"
          >
            Mark Biometric Check-In
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex items-center space-x-4">
          <div className="p-4 rounded-2xl bg-teal-50 text-[#14B8A6] border border-teal-200">
            <FiCheckCircle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">On Duty Today</div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">{attendanceLogs.length + 123} Staff</div>
            <div className="text-[11px] text-[#14B8A6] font-extrabold mt-1">90.1% Present Rate</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex items-center space-x-4">
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <FiAlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">Late Check-ins</div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">8 Staff</div>
            <div className="text-[11px] text-amber-600 font-extrabold mt-1">&gt; 15 mins grace period</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex items-center space-x-4">
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
            <FiCalendar className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">Absences & Leave</div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">6 Staff</div>
            <div className="text-[11px] text-rose-600 font-extrabold mt-1">5 Approved Annual / 1 Sick</div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Today's Biometric Log Sheet</h3>
          <span className="text-xs font-semibold text-slate-400">Live Server Sync Active</span>
        </div>

        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-4 rounded-l-xl">Employee</th>
              <th className="py-3.5 px-4">Division</th>
              <th className="py-3.5 px-4">Clock In</th>
              <th className="py-3.5 px-4">Clock Out</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 rounded-r-xl text-right">Work Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendanceLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {log.name} <span className="text-slate-400 font-medium">({log.id})</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-600">{log.dept}</td>
                <td className="py-3.5 px-4 text-[#14B8A6] font-bold">{log.timeIn}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{log.timeOut}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    log.status === 'On Time'
                      ? 'bg-teal-50 text-[#14B8A6] border-teal-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-slate-900">{log.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BIOMETRIC CHECK IN MODAL */}
      <AnimatePresence>
        {isCheckInModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
            >
              <button
                onClick={() => setIsCheckInModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-slate-900 mb-1">Mark Biometric Check-In</h2>
              <p className="text-xs text-slate-500 font-semibold mb-6">Record live site attendance timestamp.</p>

              <form onSubmit={handleMarkCheckInSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Staff Member Name *</label>
                  <input
                    type="text"
                    required
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    placeholder="e.g. David Chen"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#14B8A6] focus:outline-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-teal-600 hover:from-teal-600 text-white font-extrabold shadow-lg shadow-teal-500/25 mt-4 transition cursor-pointer"
                >
                  Record Biometric Attendance
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Attendance;
