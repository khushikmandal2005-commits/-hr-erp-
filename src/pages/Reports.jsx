import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiBarChart2 } from 'react-icons/fi';

const Reports = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiBarChart2 className="w-4 h-4" />
            <span>Executive Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">HR Reports & Exports</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Generate comprehensive compliance, headcount & payroll audit reports.</p>
        </div>
        <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95">
          <FiDownload className="w-4 h-4" />
          <span>Export Annual HR Audit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { title: 'Monthly Attendance Summary', desc: 'Detailed log of working hours, overtime, and tardiness across divisions.' },
          { title: 'Payroll & Tax Audit', desc: 'Salary breakdown, statutory taxes, and disbursement statements.' },
          { title: 'Turnover & Retention Analysis', desc: 'Staff attrition metrics, tenure distribution, and exit interview insights.' },
          { title: 'Leave Quota Utilization Report', desc: 'Remaining annual leave balance per department.' },
        ].map((r, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{r.title}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">{r.desc}</p>
              </div>
              <button className="p-2.5 rounded-xl bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition">
                <FiDownload className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reports;
