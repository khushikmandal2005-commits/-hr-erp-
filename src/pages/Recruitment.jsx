import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiBriefcase } from 'react-icons/fi';

const Recruitment = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiBriefcase className="w-4 h-4" />
            <span>Talent Acquisition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Recruitment & Job Openings</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Track candidate pipelines, job requisitions & interviews.</p>
        </div>
        <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95">
          <FiPlus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Active Job Postings</div>
          <div className="text-2xl font-black text-slate-900">8 Roles</div>
          <p className="text-[11px] text-[#2563EB] font-extrabold mt-1">Logistics & Trade Division</p>
        </div>
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Total Applicants</div>
          <div className="text-2xl font-black text-slate-900">142 Candidates</div>
          <p className="text-[11px] text-[#14B8A6] font-extrabold mt-1">24 Screened This Week</p>
        </div>
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
          <div className="text-xs text-slate-400 font-bold mb-1">Interviews Scheduled</div>
          <div className="text-2xl font-black text-slate-900">6 Today</div>
          <p className="text-[11px] text-purple-600 font-extrabold mt-1">Panel Interviews Active</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Recruitment;
