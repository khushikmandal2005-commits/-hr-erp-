import React from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiBookOpen } from 'react-icons/fi';

const Announcements = () => {
  const notices = [
    { title: 'Annual EXIM Trade Expo & Global Briefing 2026', date: 'Jul 28, 2026', category: 'HR Notice', desc: 'All logistics and civil engineering department staff are invited to the annual briefing scheduled for Friday at 10 AM.' },
    { title: 'Updated Group Health & Medical Insurance Coverage', date: 'Jul 20, 2026', category: 'Policy Update', desc: 'New medical coverage cards issued for active personnel. Please download your updated digital insurance card from the portal.' },
    { title: 'Civil Site Safety Protocols & Biometric Check-In Policy', date: 'Jul 15, 2026', category: 'Safety Policy', desc: 'Mandatory safety helmet and biometric check-in compliance updated for all on-site construction crew members.' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiBell className="w-4 h-4" />
            <span>Company Noticeboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Announcements & Policies</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Official EXIM 2D World Traders company news, HR notices & policy handbooks.</p>
        </div>
      </div>

      <div className="space-y-4">
        {notices.map((n, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                {n.category}
              </span>
              <span className="text-xs font-semibold text-slate-400">{n.date}</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{n.title}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{n.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Announcements;
