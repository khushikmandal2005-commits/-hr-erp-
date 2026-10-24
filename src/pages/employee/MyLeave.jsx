import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiPlus, FiCheckCircle, FiX, FiClock } from 'react-icons/fi';

const MyLeave = () => {
  const [toastMsg, setToastMsg] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const [leaveQuota] = useState([
    { title: 'Annual Vacation Leave', total: 18, used: 4, remaining: 14, color: 'text-[#2563EB]', badge: '14 Days Left' },
    { title: 'Medical / Sick Leave', total: 10, used: 1, remaining: 9, color: 'text-[#14B8A6]', badge: '9 Days Left' },
    { title: 'Casual & Personal Leave', total: 6, used: 2, remaining: 4, color: 'text-purple-600', badge: '4 Days Left' },
  ]);

  const [myApplications, setMyApplications] = useState([
    { id: 'LV-801', type: 'Annual Leave', dates: 'Aug 12 - Aug 16', days: '5 Days', reason: 'Family vacation abroad', status: 'Approved' },
    { id: 'LV-802', type: 'Sick Leave', dates: 'Jul 10', days: '1 Day', reason: 'Dental treatment appointment', status: 'Approved' },
    { id: 'LV-803', type: 'Casual Leave', dates: 'Sep 2', days: '1 Day', reason: 'Personal affairs', status: 'Pending' },
  ]);

  const [leaveForm, setLeaveForm] = useState({
    type: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.startDate || !leaveForm.reason) {
      alert('Please fill out start date and reason');
      return;
    }

    const newApp = {
      id: `LV-${Math.floor(Math.random() * 899 + 800)}`,
      type: leaveForm.type,
      dates: `${leaveForm.startDate} to ${leaveForm.endDate || leaveForm.startDate}`,
      days: '2 Days',
      reason: leaveForm.reason,
      status: 'Pending',
    };

    setMyApplications([newApp, ...myApplications]);
    setIsApplyModalOpen(false);
    setLeaveForm({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
    triggerToast('Leave application submitted to HR for approval!');
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
            className="p-4 rounded-2xl bg-[#2563EB] text-white text-xs font-bold shadow-lg flex items-center justify-between z-50 relative"
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
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiCalendar className="w-4 h-4" />
            <span>Employee Self-Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Leave & Time Off</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Check annual leave quota balances & submit time-off applications.</p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95 cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Apply For Leave</span>
        </button>
      </div>

      {/* Quota Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {leaveQuota.map((q) => (
          <div key={q.title} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400">{q.title}</span>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                {q.badge}
              </span>
            </div>
            <div className={`text-3xl font-black ${q.color}`}>{q.remaining} Days Available</div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">{q.used} Used / {q.total} Total Quota</p>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 overflow-x-auto">
        <h3 className="text-base font-bold text-slate-900 mb-4">My Submitted Applications</h3>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-4 rounded-l-xl">Ref ID</th>
              <th className="py-3.5 px-4">Leave Type</th>
              <th className="py-3.5 px-4">Dates / Duration</th>
              <th className="py-3.5 px-4">Reason</th>
              <th className="py-3.5 px-4 rounded-r-xl text-right">HR Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {myApplications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 transition">
                <td className="py-3.5 px-4 font-extrabold text-[#2563EB]">{app.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{app.type}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-600">{app.dates} ({app.days})</td>
                <td className="py-3.5 px-4 text-slate-500 font-medium">{app.reason}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    app.status === 'Approved'
                      ? 'bg-teal-50 text-[#14B8A6] border-teal-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPLY FOR LEAVE MODAL */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
            >
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-slate-900 mb-1">Apply For Leave</h2>
              <p className="text-xs text-slate-500 font-semibold mb-6">Submit a time-off application for HR approval.</p>

              <form onSubmit={handleLeaveSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Leave Type</label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  >
                    <option value="Annual Leave">Annual Vacation Leave</option>
                    <option value="Sick Leave">Medical / Sick Leave</option>
                    <option value="Casual Leave">Casual & Personal Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Start Date *</label>
                    <input
                      type="date"
                      required
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason for Leave *</label>
                  <textarea
                    required
                    rows="3"
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    placeholder="Provide details about your leave request..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/25 mt-4 transition cursor-pointer"
                >
                  Submit Application to HR
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyLeave;
