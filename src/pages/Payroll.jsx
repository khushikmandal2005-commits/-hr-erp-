import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiCheckCircle, FiX, FiGlobe } from 'react-icons/fi';

const Payroll = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [payrollStatus, setPayrollStatus] = useState('Pending Run');

  // EXCLUSIVITY FEATURE: Multi-Currency Exchange Converter
  const [currency, setCurrency] = useState('USD');
  const currencyRates = {
    USD: { symbol: '$', rate: 1, name: 'US Dollar (USD)' },
    EUR: { symbol: '€', rate: 0.92, name: 'Euro (EUR)' },
    GBP: { symbol: '£', rate: 0.78, name: 'British Pound (GBP)' },
    SGD: { symbol: 'S$', rate: 1.34, name: 'Singapore Dollar (SGD)' },
    AED: { symbol: 'AED ', rate: 3.67, name: 'UAE Dirham (AED)' },
    INR: { symbol: '₹', rate: 83.5, name: 'Indian Rupee (INR)' },
  };

  const currentCurr = currencyRates[currency];

  const formatAmount = (usdVal) => {
    const converted = usdVal * currentCurr.rate;
    return `${currentCurr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleProcessPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPayrollStatus('Completed & Disbursed');
      setToastMsg(`July Payroll of ${formatAmount(248500)} disbursed to 142 employees via bank transfer!`);
      setTimeout(() => setToastMsg(''), 4000);
    }, 1800);
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

      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiDollarSign className="w-4 h-4" />
            <span>EXIM 2D Financial Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Payroll & Global Currency</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Manage monthly salary disbursement, multi-currency conversion & tax claims.</p>
        </div>

        {/* EXCLUSIVITY FEATURE: Global Currency Switcher */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <FiGlobe className="w-4 h-4 text-[#2563EB] ml-1" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              {Object.keys(currencyRates).map((c) => (
                <option key={c} value={c}>
                  {currencyRates[c].name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleProcessPayroll}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <FiDollarSign className="w-4 h-4" />
            <span>{isProcessing ? 'Processing Salary Direct Deposit...' : 'Process July Payroll'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Total Monthly Outflow ({currency})</div>
          <div className="text-2xl font-black text-slate-900">{formatAmount(248500)}</div>
          <p className="text-[11px] text-[#14B8A6] font-extrabold mt-1">Status: {payrollStatus}</p>
        </div>
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Tax & Deductions ({currency})</div>
          <div className="text-2xl font-black text-slate-900">{formatAmount(38200)}</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Statutory Compliance Verified</p>
        </div>
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Pending Claims ({currency})</div>
          <div className="text-2xl font-black text-slate-900">{formatAmount(4850)}</div>
          <p className="text-[11px] text-amber-600 font-extrabold mt-1">12 Claims Pending HR Review</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Payroll;
