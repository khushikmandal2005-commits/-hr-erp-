import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const CompanyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const colleagues = [
    { name: 'Aarav Sharma', role: 'Senior Port Logistics Manager', dept: 'Export & Logistics', location: 'JNPT Port Mumbai', email: 'aarav.sharma@exim2d.in', phone: '+91 98201 12345', avatar: 'AS', color: 'from-[#2563EB] to-blue-700' },
    { name: 'Priya Patel', role: 'Customs Clearance Specialist', dept: 'Global Trade & Customs', location: 'Mundra Port Gujarat', email: 'priya.patel@exim2d.in', phone: '+91 98791 23456', avatar: 'PP', color: 'from-[#14B8A6] to-teal-600' },
    { name: 'Amitabh Verma', role: 'Lead Civil Site Engineer', dept: 'Civil Infrastructure', location: 'Delhi Expressway Site', email: 'amitabh.verma@exim2d.in', phone: '+91 99102 34567', avatar: 'AV', color: 'from-purple-600 to-indigo-600' },
    { name: 'Neha Gupta', role: 'Talent Acquisition Lead', dept: 'Human Resources', location: 'Corporate HQ Delhi', email: 'neha.gupta@exim2d.in', phone: '+91 98113 45678', avatar: 'NG', color: 'from-amber-500 to-orange-600' },
    { name: 'Rohan Joshi', role: 'ERP Full-Stack Analyst', dept: 'IT & Systems', location: 'Bengaluru Tech Hub', email: 'rohan.joshi@exim2d.in', phone: '+91 98220 78901', avatar: 'RJ', color: 'from-[#14B8A6] to-emerald-600' },
  ];

  const filtered = colleagues.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiUsers className="w-4 h-4" />
            <span>Colleague Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Company Directory</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Connect with team members, site engineers & division heads across EXIM 2D World Traders.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search colleague name or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div key={c.email} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${c.color} text-white font-black flex items-center justify-center text-base shadow-md shrink-0`}>
                {c.avatar}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-black text-slate-900 truncate">{c.name}</h3>
                <p className="text-xs text-[#2563EB] font-bold truncate">{c.role}</p>
                <p className="text-[11px] text-slate-500 font-semibold truncate">{c.dept}</p>
              </div>
            </div>

            <div className="space-y-2 py-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompanyDirectory;
