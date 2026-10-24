import React from 'react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-800">EXIM 2D HR ERP</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">User Profile</span>
      </div>
    </header>
  );
};

export default Header;
