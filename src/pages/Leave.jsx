import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiPlus, FiCheck, FiX } from 'react-icons/fi';

const Leave = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Aarav Sharma', type: 'Annual Leave', duration: '3 Days (Aug 2 - Aug 5)', dept: 'Export Logistics', reason: 'Family vacation travel', status: 'Pending' },
    { id: 2, name: 'Priya Patel', type: 'Sick Leave', duration: '1 Day (Aug 1)', dept: 'Global Trade', reason: 'Medical consultation', status: 'Pending' },
    { id: 3, name: 'Amitabh Verma', type: 'Casual Leave', duration: '2 Days (Jul 25 - Jul 27)', dept: 'Civil Infrastructure', reason: 'Personal affairs', status: 'Approved' },
  ]);

  const [toast, setToast] = useState('');

  const handleAction = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setToast(`Leave request ${newStatus.toLowerCase()} successfully!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiCalendar className="w-4 h-4" />
            <span>Absence & Leave Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Leave Approvals & Calendar</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Review pending leave applications, quota balances & replacement staff.</p>
        </div>

        <button className="relative z-10 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95">
          <FiPlus className="w-4 h-4" />
          <span>Submit Leave Application</span>
        </button>
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-[#14B8A6] text-xs font-extrabold flex items-center justify-between"
          >
            <span>{toast}</span>
            <button onClick={() => setToast('')} className="text-[#14B8A6] hover:opacity-80">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leave Application Cards */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
        <h3 className="text-base font-bold text-slate-900 mb-2">Leave Applications Inbox</h3>

        <div className="space-y-4">
          {requests.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-slate-900">{item.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#2563EB] border border-blue-200">
                    {item.type}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      item.status === 'Approved'
                        ? 'bg-teal-50 text-[#14B8A6] border-teal-200'
                        : item.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-bold">{item.duration}</div>
                <p className="text-xs text-slate-500 font-medium">{item.reason} ({item.dept})</p>
              </div>

              {item.status === 'Pending' && (
                <div className="flex items-center space-x-3 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => handleAction(item.id, 'Approved')}
                    className="px-4 py-2 rounded-xl bg-[#14B8A6] hover:bg-teal-600 text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5"
                  >
                    <FiCheck className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'Rejected')}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5"
                  >
                    <FiX className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Leave;
