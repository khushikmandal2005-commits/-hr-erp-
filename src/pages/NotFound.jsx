import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import AnimatedBackground from '../components/common/AnimatedBackground';

const NotFound = () => {
  return (
    <AnimatedBackground>
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-900/10 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto mb-4 border border-blue-200">
            <FiAlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-900">404</h1>
          <h2 className="text-lg font-bold text-slate-800 mt-1">Page Not Found</h2>
          <p className="text-xs text-slate-500 font-medium mt-2 mb-6">
            The module or page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 transition"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Return to Portal Gateway</span>
          </Link>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default NotFound;
