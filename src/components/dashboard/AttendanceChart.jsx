import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

const AttendanceChart = () => {
  const [activeFilter, setActiveFilter] = useState('Weekly');

  const weeklyData = [
    { day: 'Mon', present: 135, late: 4, leave: 3, height: '90%' },
    { day: 'Tue', present: 138, late: 2, leave: 2, height: '92%' },
    { day: 'Wed', present: 128, late: 8, leave: 6, height: '85%' },
    { day: 'Thu', present: 132, late: 5, leave: 5, height: '88%' },
    { day: 'Fri', present: 125, late: 9, leave: 8, height: '83%' },
    { day: 'Sat', present: 45, late: 1, leave: 2, height: '30%' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white">Attendance Analytics</h3>
            <span className="flex items-center space-x-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <FiTrendingUp className="w-3 h-3" />
              <span>+3.2% vs last week</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Daily headcount check-ins across global offices.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
          {['Weekly', 'Monthly'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Legend Indicators */}
      <div className="flex items-center space-x-6 mb-6 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400" />
          <span>On Duty / Present</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-md bg-amber-500" />
          <span>Late Check-in</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-md bg-rose-500" />
          <span>On Leave</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
        {weeklyData.map((item, index) => (
          <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end group relative">
            {/* Tooltip on hover */}
            <div className="absolute -top-12 bg-slate-800 text-white border border-slate-700 rounded-lg p-2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20 whitespace-nowrap">
              <div className="font-bold text-blue-400">{item.day} Headcount</div>
              <div>Present: {item.present}</div>
              <div>Late: {item.late}</div>
              <div>On Leave: {item.leave}</div>
            </div>

            {/* Stacked Animated Bar */}
            <div className="w-full max-w-[36px] flex flex-col items-center justify-end rounded-t-xl overflow-hidden bg-slate-800/40 h-full">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: item.height }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="w-full bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 rounded-t-xl relative group-hover:from-blue-600 group-hover:to-cyan-300 transition"
              >
                {/* Late indicator stripe */}
                <div
                  className="w-full bg-amber-500 opacity-90"
                  style={{ height: `${(item.late / item.present) * 100}%` }}
                />
              </motion.div>
            </div>

            {/* Day Label */}
            <span className="text-xs font-semibold text-slate-400 mt-3 group-hover:text-white transition">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChart;
