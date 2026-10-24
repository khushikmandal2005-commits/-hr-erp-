import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiDownload, FiCheckCircle, FiX, FiDollarSign } from 'react-icons/fi';

const MyPayslips = () => {
  const [toastMsg, setToastMsg] = useState('');

  const [payslips] = useState([
    { month: 'July 2026', basic: '₹95,000', allowances: '₹30,000', deductions: '₹12,000', netPay: '₹1,13,000.00', date: 'Jul 30, 2026', status: 'Paid' },
    { month: 'June 2026', basic: '₹95,000', allowances: '₹30,000', deductions: '₹12,000', netPay: '₹1,13,000.00', date: 'Jun 30, 2026', status: 'Paid' },
    { month: 'May 2026', basic: '₹95,000', allowances: '₹30,000', deductions: '₹12,000', netPay: '₹1,13,000.00', date: 'May 30, 2026', status: 'Paid' },
    { month: 'April 2026', basic: '₹90,000', allowances: '₹28,000', deductions: '₹11,000', netPay: '₹1,07,000.00', date: 'Apr 30, 2026', status: 'Paid' },
  ]);

  const triggerToast = (month) => {
    setToastMsg(`Payslip PDF for ${month} downloaded successfully!`);
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
            <FiFileText className="w-4 h-4" />
            <span>Employee Self-Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Salary & Payslips</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Access monthly salary breakdown, tax deductions & download payslip PDFs.</p>
        </div>

        <button
          onClick={() => triggerToast('July 2026')}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95 cursor-pointer"
        >
          <FiDownload className="w-4 h-4" />
          <span>Download Latest Payslip</span>
        </button>
      </div>

      {/* Payslip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {payslips.map((p) => (
          <div key={p.month} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-blue-50 text-[#2563EB] border border-blue-200">
                  <FiFileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{p.month} Payslip</h3>
                  <p className="text-[11px] font-semibold text-slate-400">Disbursed on {p.date}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 text-[#14B8A6] border border-teal-200">
                {p.status}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 mb-4 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-400">Basic Salary:</span>
                <span className="text-slate-900 font-bold">{p.basic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Allowances & Bonuses:</span>
                <span className="text-[#14B8A6] font-bold">{p.allowances}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Taxes & Deductions:</span>
                <span className="text-rose-500 font-bold">-{p.deductions}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black">
                <span className="text-slate-900">Net Take-Home Pay:</span>
                <span className="text-[#2563EB]">{p.netPay}</span>
              </div>
            </div>

            <button
              onClick={() => triggerToast(p.month)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FiDownload className="w-4 h-4 text-[#2563EB]" />
              <span>Download Payslip PDF</span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyPayslips;
