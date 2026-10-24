import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock,
  FiCalendar,
  FiUserPlus,
  FiDollarSign,
  FiSend,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';

const QuickActions = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const actions = [
    {
      id: 'attendance',
      title: 'Mark Attendance',
      desc: 'Clock in/out for today',
      icon: FiClock,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'leave',
      title: 'Apply Leave',
      desc: 'Request annual/sick leave',
      icon: FiCalendar,
      color: 'from-emerald-600 to-teal-500',
    },
    {
      id: 'employee',
      title: 'Add Employee',
      desc: 'Onboard new staff record',
      icon: FiUserPlus,
      color: 'from-purple-600 to-indigo-500',
    },
    {
      id: 'payroll',
      title: 'Generate Payroll',
      desc: 'Process monthly salaries',
      icon: FiDollarSign,
      color: 'from-amber-600 to-orange-500',
    },
    {
      id: 'announce',
      title: 'Broadcast Announcement',
      desc: 'Send company notice',
      icon: FiSend,
      color: 'from-rose-600 to-pink-500',
    },
  ];

  const handleActionClick = (action) => {
    setToastMessage(`Action Triggered: ${action.title}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Quick HR Actions</h3>
          <p className="text-xs text-slate-400 mt-0.5">Common workflow shortcuts for HR administrators.</p>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-400 text-xs font-semibold"
          >
            <div className="flex items-center space-x-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage('')} className="text-emerald-300 hover:text-white">
              <FiX className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleActionClick(action)}
              className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 hover:bg-slate-800 transition text-left flex flex-col justify-between group relative overflow-hidden"
            >
              <div className={`p-2.5 rounded-lg bg-gradient-to-tr ${action.color} text-white w-fit mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition truncate">
                  {action.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{action.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
