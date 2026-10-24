import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiCheck } from 'react-icons/fi';
import ForgotPasswordModal from './ForgotPasswordModal';
import { setAuthToken } from '../../utils/helpers';
import logo from '../../assets/logo.png';

const LoginForm = () => {
  const navigate = useNavigate();

  // Form states
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

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Work email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      // Simulate API Authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Demo authentication logic
      if (formData.email === 'admin@exim2d.com' && formData.password === 'password123') {
        setAuthToken('demo-jwt-token-exim-2d-hr');
        navigate('/');
      } else {
        // Accept any valid format for demo convenience, but show notice
        setAuthToken('demo-jwt-token-exim-2d-hr');
        navigate('/');
      }
    } catch (err) {
      setGeneralError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-slate-900/95 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10"
      >
        {/* Mobile Header Logo */}
        <div className="lg:hidden flex items-center space-x-3 mb-8">
          <img src={logo} alt="EXIM 2D" className="w-10 h-10 object-contain" />
          <div>
            <h2 className="text-lg font-bold text-white">EXIM 2D WORLD TRADERS</h2>
            <p className="text-xs text-blue-400 font-medium">Enterprise HR ERP</p>
          </div>
        </div>

        {/* Card Title */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Employee Login
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Access your HR portal, attendance & employee dashboard.
          </p>
        </div>

        {/* General Error Banner */}
        <AnimatePresence>
          {generalError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-300 text-sm"
            >
              <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{generalError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Demo Credentials Tip */}
        <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
          <span>Demo Email: <strong className="text-white">admin@exim2d.com</strong></span>
          <span className="bg-blue-600/30 px-2 py-0.5 rounded text-blue-200">Pass: password123</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Work Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FiMail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@exim2d.com"
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border ${
                  errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700/80 focus:ring-blue-500'
                } rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition`}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 mt-1.5 flex items-center space-x-1"
              >
                <FiAlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FiLock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className={`w-full pl-12 pr-12 py-3.5 bg-slate-800/80 border ${
                  errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700/80 focus:ring-blue-500'
                } rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 mt-1.5 flex items-center space-x-1"
              >
                <FiAlertCircle className="w-3.5 h-3.5" />
                <span>{errors.password}</span>
              </motion.p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border transition flex items-center justify-center ${
                    formData.rememberMe
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-blue-500'
                      : 'border-slate-700 bg-slate-800 group-hover:border-slate-500'
                  }`}
                >
                  {formData.rememberMe && <FiCheck className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
              </div>
              <span className="text-xs text-slate-300 font-medium select-none group-hover:text-white transition">
                Remember me on this device
              </span>
            </label>
          </div>

          {/* Login Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 hover:from-blue-500 hover:via-cyan-500 hover:to-emerald-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                <span>Login to HR Portal</span>
                <FiArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Security Footer Notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Protected by EXIM 2D Security Subsystem. Authorised personnel only.
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};

export default LoginForm;
