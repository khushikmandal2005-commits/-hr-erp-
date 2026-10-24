import React from 'react';
import { Outlet } from 'react-router-dom';
import AnimatedBackground from '../components/common/AnimatedBackground';

const AuthLayout = () => {
  return (
    <AnimatedBackground>
      <div className="min-h-screen w-full flex items-center justify-center">
        <Outlet />
      </div>
    </AnimatedBackground>
  );
};

export default AuthLayout;
