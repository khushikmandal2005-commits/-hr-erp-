import React from 'react';
import BrandPanel from '../components/auth/BrandPanel';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-950 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {/* Left side: Company Branding & Illustration */}
      <BrandPanel />

      {/* Right side: Glassmorphism Login Form */}
      <LoginForm />
    </div>
  );
};

export default Login;
