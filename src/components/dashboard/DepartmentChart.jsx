import React from 'react';
import { motion } from 'framer-motion';
import { FiPieChart } from 'react-icons/fi';

const DepartmentChart = () => {
  const departments = [
    { name: 'Export & Logistics', count: 48, percentage: 33.8, color: 'from-blue-500 to-cyan-400' },
    { name: 'Global Sales & Trade', count: 34, percentage: 23.9, color: 'from-emerald-500 to-teal-400' },
    { name: 'Human Resources', count: 18, percentage: 12.6, color: 'from-purple-500 to-indigo-400' },
    { name: 'Finance & Accounts', count: 22, percentage: 15.5, color: 'from-amber-500 to-orange-400' },
    { name: 'IT & Operations', count: 20, percentage: 14.2, color: 'from-rose-500 to-pink-400' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <FiPieChart className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Department Headcount</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">142 Total</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">Staff distribution across core enterprise business units.</p>

        {/* Department Breakdown List */}
        <div className="space-y-4">
          {departments.map((dept, index) => (
            <div key={dept.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{dept.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-medium">{dept.count} Staff</span>
                  <span className="font-bold text-blue-400">{dept.percentage}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${dept.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Active Division: <strong className="text-white">Export & Logistics</strong></span>
        <button className="text-blue-400 hover:text-blue-300 font-semibold transition">
          Manage Depts &rarr;
        </button>
      </div>
    </div>
  );
};

export default DepartmentChart;
