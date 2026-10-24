import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiUserCheck, FiArrowRight } from 'react-icons/fi';
import AnimatedBackground from '../components/common/AnimatedBackground';
import logo from '../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 'hr',
      title: 'HR & Management',
      icon: FiShield,
      path: '/login/hr',
      gradient: 'from-[#2563EB] to-blue-700 shadow-blue-600/25',
      badge: 'Executive Portal',
      badgeBg: 'bg-blue-50 text-[#2563EB] border-blue-200/80',
      btnGradient: 'bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-600/25',
    },
    {
      id: 'employee',
      title: 'Employee Portal',
      icon: FiUserCheck,
      path: '/login/employee',
      gradient: 'from-[#14B8A6] to-teal-600 shadow-teal-500/25',
      badge: 'Staff Self-Service',
      badgeBg: 'bg-teal-50 text-[#14B8A6] border-teal-200/80',
      btnGradient: 'bg-gradient-to-r from-[#14B8A6] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-teal-500/25',
    },
  ];

  return (
    <AnimatedBackground>
      <div className="min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 max-w-6xl mx-auto selection:bg-[#2563EB] selection:text-white">
        {/* TOP BRANDING NAVBAR */}
        <header className="w-full flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-md shadow-blue-500/10 border border-white">
              <img src={logo} alt="EXIM 2D World Traders" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-slate-900 leading-tight">
                EXIM 2D <span className="text-[#2563EB]">WORLD TRADERS</span>
              </h1>
              <p className="text-[10px] font-extrabold text-[#14B8A6] uppercase tracking-wider">
                HR ERP Portal
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
            <span>SaaS Gateway Active</span>
          </div>
        </header>

        {/* MAIN CENTER CONTENT */}
        <main className="my-auto py-12 text-center max-w-4xl mx-auto w-full">
          {/* CATCHY SHORT HEADING */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 space-y-2"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
              Select Your Gateway
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Welcome to EXIM 2D World Traders HR ERP System
            </p>
          </motion.div>

          {/* TWO LOGIN CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {options.map((opt, index) => {
              const Icon = opt.icon;
              return (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(opt.path)}
                  className="cursor-pointer group relative p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden"
                >
                  {/* Subtle Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${opt.gradient}`} />

                  <div>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`p-4 rounded-2xl bg-gradient-to-tr ${opt.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${opt.badgeBg}`}>
                        {opt.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#2563EB] transition-colors mb-8">
                      {opt.title}
                    </h3>
                  </div>

                  {/* Login → Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(opt.path);
                    }}
                    className={`w-full py-4 rounded-2xl ${opt.btnGradient} font-bold text-sm tracking-wide shadow-md flex items-center justify-center space-x-2 transition-all duration-200 group-hover:shadow-lg active:scale-95 cursor-pointer`}
                  >
                    <span>Login</span>
                    <FiArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-500 py-3 border-t border-slate-200/60 gap-2">
          <div>&copy; {new Date().getFullYear()} EXIM 2D World Traders. All rights reserved.</div>
          <div className="text-slate-400">Enterprise HR ERP Gateway</div>
        </footer>
      </div>
    </AnimatedBackground>
  );
};

export default Home;
