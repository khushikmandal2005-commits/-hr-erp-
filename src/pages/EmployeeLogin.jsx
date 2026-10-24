import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiArrowLeft,
  FiCheck,
  FiUserCheck,
  FiClock,
  FiCalendar,
} from 'react-icons/fi';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import { setAuthToken } from '../utils/helpers';
import logo from '../assets/logo.png';

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (generalError) setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Employee email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setAuthToken('employee-token-exim2d');
      localStorage.setItem('userRole', 'EMPLOYEE');
      navigate('/dashboard/employee');
    } catch (err) {
      setGeneralError('Invalid Employee credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* LEFT SIDE: Animated Illustration, Civil Engineer & Site Clock Graphics */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[400px] lg:min-h-screen">
        {/* Animated Background Glowing Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/25 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              className="absolute w-2 h-2 rounded-full bg-teal-400/40 blur-[0.5px]"
              style={{ top: `${(i * 12) + 10}%`, left: `${(i * 11) + 15}%` }}
            />
          ))}
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="p-2.5 bg-slate-900/90 border border-teal-500/30 rounded-2xl shadow-xl">
            <img src={logo} alt="EXIM 2D World Traders" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              Staff Portal
            </span>
            <h1 className="text-lg font-extrabold tracking-tight text-white mt-0.5">
              EXIM 2D <span className="text-teal-400">WORLD TRADERS</span>
            </h1>
          </div>
        </div>

        {/* Middle Graphic */}
        <div className="relative z-10 my-8 lg:my-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <FiUserCheck className="text-teal-400" />
              <span>Employee Self-Service & Attendance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              Site Engineers & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400">
                Staff Self-Service
              </span> <br />
              Portal.
            </h2>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 mb-1">
                  <FiClock className="w-4 h-4 text-teal-400" />
                  <span>Biometric Clock In</span>
                </div>
                <div className="text-[11px] text-slate-300">Instant Civil Site Attendance</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 mb-1">
                  <FiCalendar className="w-4 h-4 text-cyan-400" />
                  <span>Leave & Payslips</span>
                </div>
                <div className="text-[11px] text-slate-300">Track Quota & Download Statements</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-400 border-t border-slate-800/80 pt-4 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} EXIM 2D World Traders Inc.</span>
          <span className="text-teal-400 font-semibold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>SSL Encrypted</span>
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Glass Login Card & Animated Inputs */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-teal-950/10 relative z-10"
        >
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-[#14B8A6] mb-6 transition"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Role Selection</span>
          </Link>

          {/* Title */}
          <div className="mb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#14B8A6] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/80">
              Staff Portal Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Employee Login
            </h2>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {generalError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center space-x-2 text-xs font-bold"
              >
                <FiAlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{generalError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Staff Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@exim2d.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border ${
                    errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14B8A6]'
                  } rounded-2xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-xs`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-[#14B8A6] hover:underline font-bold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className={`w-full pl-12 pr-12 py-3.5 bg-white border ${
                    errors.password ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-[#14B8A6]'
                  } rounded-2xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-xs`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  formData.rememberMe ? 'bg-[#14B8A6] border-[#14B8A6]' : 'border-slate-300 bg-white'
                }`}
              >
                {formData.rememberMe && <FiCheck className="w-3.5 h-3.5 text-white stroke-[3]" />}
              </div>
              <span className="text-xs text-slate-600 font-semibold select-none">Remember employee session</span>
            </label>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-teal-500/25 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              {isLoading ? (
                <span>Logging into Employee Portal...</span>
              ) : (
                <>
                  <span>Login to Staff Portal</span>
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={() => setIsForgotModalOpen(false)} />
    </div>
  );
};

export default EmployeeLogin;
