import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUserCheck, FiCalendar, FiUserPlus, FiClock, FiTrendingUp } from 'react-icons/fi';

const StatCards = () => {
  const stats = [
    {
      id: 'total',
      title: 'Total Workforce',
      value: '142',
      change: '+12%',
      trend: 'up',
      subtitle: 'Across 6 departments',
      icon: FiUsers,
      color: 'from-blue-600 to-cyan-500',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'present',
      title: 'Present On Duty Today',
      value: '128',
      change: '90.1%',
      trend: 'up',
      subtitle: '8 Late Check-ins',
      icon: FiUserCheck,
      color: 'from-emerald-600 to-teal-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'leave',
      title: 'Employees On Leave',
      value: '9',
      change: '5 Annual / 4 Sick',
      trend: 'neutral',
      subtitle: '3 Returning tomorrow',
      icon: FiCalendar,
      color: 'from-amber-600 to-orange-500',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      id: 'joiners',
      title: 'New Joiners This Month',
      value: '5',
      change: '+2 this week',
      trend: 'up',
      subtitle: 'Logistics & Trade Dept',
      icon: FiUserPlus,
      color: 'from-purple-600 to-indigo-500',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'pending',
      title: 'Pending HR Approvals',
      value: '7',
      change: 'Action Required',
      trend: 'alert',
      subtitle: '4 Leave, 3 Claims',
      icon: FiClock,
      color: 'from-rose-600 to-pink-500',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-slate-700/80 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Background Glow on hover */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none`} />

            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md shadow-blue-500/10`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stat.badgeBg}`}>
                {stat.change}
              </span>
            </div>

            <div className="mt-2">
              <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
              <p className="text-xs font-semibold text-slate-300 mt-1 truncate">{stat.title}</p>
              <p className="text-[11px] text-slate-500 mt-1 truncate">{stat.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatCards;
