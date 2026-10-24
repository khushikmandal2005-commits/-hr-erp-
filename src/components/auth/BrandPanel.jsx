import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiUsers, FiShield, FiTrendingUp, FiHardDrive, FiTruck } from 'react-icons/fi';
import logo from '../../assets/logo.png';

const BrandPanel = () => {
  const highlights = [
    { icon: FiGlobe, title: 'Global Export-Import Operations', desc: 'Customs Logistics & International Port Freight' },
    { icon: FiTruck, title: 'Civil Engineering & Construction', desc: 'Expressway, Infrastructure & Heavy Machinery Crew' },
    { icon: FiShield, title: 'Enterprise Security & Compliance', desc: 'Encrypted Payroll & On-Site Biometric Sync' },
  ];

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-slate-950 text-white min-h-[400px] lg:min-h-full">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Header Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center space-x-4"
      >
        <div className="relative p-2.5 bg-slate-900/80 border border-blue-500/30 rounded-2xl shadow-xl backdrop-blur-md">
          <img src={logo} alt="EXIM 2D World Traders Logo" className="w-12 h-12 object-contain" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            EXIM 2D World Traders HR ERP
          </span>
          <h1 className="text-xl font-black tracking-tight text-white mt-1">
            EXIM 2D <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">WORLD TRADERS</span>
          </h1>
        </div>
      </motion.div>

      {/* Value Proposition */}
      <div className="relative z-10 my-12 lg:my-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium mb-6 backdrop-blur-md"
          >
            <FiTrendingUp className="text-emerald-400" />
            <span>Civil Engineering & Global Trade Solutions</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Managing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Civil Infrastructure
            </span> <br />
            & Export-Import Trade.
          </h2>

          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Welcome to the centralized portal of <strong>EXIM 2D World Traders HR ERP</strong>. Unified human capital management for structural architects, site engineers, heavy equipment operators, and port customs officers.
          </p>

          <div className="mt-8 space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  className="flex items-center space-x-4 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/40 transition group"
                >
                  <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-900"
      >
        <span>&copy; {new Date().getFullYear()} EXIM 2D World Traders Inc. All rights reserved.</span>
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 font-medium">ERP Online</span>
        </span>
      </motion.div>
    </div>
  );
};

export default BrandPanel;
