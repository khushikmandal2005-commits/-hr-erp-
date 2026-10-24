import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiLock, FiBell, FiSave, FiCheckCircle } from 'react-icons/fi';

const Settings = () => {
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiSettings className="w-4 h-4" />
            <span>EXIM 2D Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Enterprise ERP Settings</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Configure global portal parameters, security policies, and integrations.</p>
        </div>

        <button
          onClick={handleSave}
          className="relative z-10 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95"
        >
          <FiSave className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Save Notification */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-[#14B8A6] text-xs font-extrabold flex items-center space-x-2"
          >
            <FiCheckCircle className="w-4 h-4 text-[#14B8A6]" />
            <span>Settings successfully updated and applied across all HR modules!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FiLock className="text-[#2563EB]" />
            <span>Security & Authentication</span>
          </h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <span className="text-slate-800 font-bold">Enforce Two-Factor Authentication (2FA)</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded" />
            </label>
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <span className="text-slate-800 font-bold">Session Timeout after 15 mins inactivity</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded" />
            </label>
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <span className="text-slate-800 font-bold">IP Whitelisting for HR Admin Login</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded" />
            </label>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FiBell className="text-[#14B8A6]" />
            <span>Email & System Alerts</span>
          </h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <span className="text-slate-800 font-bold">Notify Admin on Leave Submissions</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded" />
            </label>
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <span className="text-slate-800 font-bold">Daily Attendance Summary Broadcast</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded" />
            </label>
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <span className="text-slate-800 font-bold">New Employee Onboarding Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded" />
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
