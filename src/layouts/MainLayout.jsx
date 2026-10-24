import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import AiAssistantModal from '../components/common/AiAssistantModal';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle Sidebar on both desktop & mobile seamlessly
  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setIsCollapsed((prev) => !prev);
    } else {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const closeMobileSidebar = () => setIsSidebarOpen(false);

  // Responsive window resize check
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatedBackground>
      <div className="flex h-screen w-full text-slate-800 font-sans antialiased overflow-hidden selection:bg-[#2563EB] selection:text-white relative">
        {/* Responsive Light Glass Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          closeMobileSidebar={closeMobileSidebar}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Glass Navbar */}
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

          {/* Inner Pages Content Area with Custom Scrollbar */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6 pb-12">
              <Outlet />
            </div>
          </main>
        </div>

        {/* EXCLUSIVITY FEATURE: Floating EXIM-AI GenAI Assistant Chatbot */}
        <AiAssistantModal />
      </div>
    </AnimatedBackground>
  );
};

export default MainLayout;
