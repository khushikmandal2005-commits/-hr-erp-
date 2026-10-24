import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser, FiZap, FiArrowRight } from 'react-icons/fi';

const AiAssistantModal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const userRole = localStorage.getItem('userRole') || 'HR';
  const isEmployee = userRole === 'EMPLOYEE';

  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      text: `Hello! I am EXIM-AI Intelligence, your dedicated GenAI Assistant for EXIM 2D World Traders. How can I assist you with HR operations, civil sites, or logistics today?`,
      action: null,
    },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const processQuery = (userText) => {
    const lower = userText.toLowerCase();
    let botText = "";
    let botAction = null;

    if (lower.includes('leave') || lower.includes('vacation') || lower.includes('holiday')) {
      if (isEmployee) {
        botText = "🌴 Your Leave Balance Summary:\n• Annual Vacation: 14 Days remaining\n• Medical Sick Leave: 9 Days remaining\n• Casual Leave: 4 Days remaining";
        botAction = { label: 'Apply For Leave Now', path: '/employee/leave' };
      } else {
        botText = "🌴 HR Leave Management Overview:\n• 5 Active Annual Leave requests pending HR approval\n• 1 Sick Leave request for Aisha Patel\n• Total workforce leave rate: 3.5%";
        botAction = { label: 'Manage Pending Leaves', path: '/leave' };
      }
    } else if (lower.includes('payslip') || lower.includes('salary') || lower.includes('pay') || lower.includes('wages')) {
      if (isEmployee) {
        botText = "💵 July 2026 Payslip Summary:\n• Basic Salary: $4,200.00\n• Allowances: +$850.00\n• Deductions: -$450.00\n• Net Take-Home: $4,600.00 (Paid via Direct Deposit)";
        botAction = { label: 'Download July Payslip PDF', path: '/employee/payslips' };
      } else {
        botText = "💵 EXIM 2D Monthly Payroll Summary:\n• Total Monthly Outflow: $248,500.00\n• Total Personnel: 142 Staff Members\n• Statutory Tax Compliance: 100% Verified";
        botAction = { label: 'Open Payroll Portal', path: '/payroll' };
      }
    } else if (lower.includes('attendance') || lower.includes('clock') || lower.includes('shift') || lower.includes('present')) {
      if (isEmployee) {
        botText = "⏱️ Your Attendance Status:\n• Shift Status: On Duty / Clocked In\n• Punctuality: 98.2% On-Time Record\n• Total Logged Hours: 168.4 Hours (July Billing Period)";
        botAction = { label: 'View Attendance History', path: '/employee/attendance' };
      } else {
        botText = "⏱️ Workforce Attendance Overview:\n• On Duty Today: 128 Staff (90.1% Present Rate)\n• Late Check-Ins: 8 Staff\n• Unexcused Absences: 3 Site Workers";
        botAction = { label: 'Open Attendance Sheet', path: '/attendance' };
      }
    } else if (lower.includes('onboard') || lower.includes('add employee') || lower.includes('new staff') || lower.includes('hire')) {
      botText = "👤 Staff Onboarding:\nClick below to open the New Employee Onboarding Modal and add a new civil engineer or customs officer to the directory.";
      botAction = { label: 'Onboard New Employee', path: '/employees' };
    } else if (lower.includes('ship') || lower.includes('cargo') || lower.includes('port') || lower.includes('rotterdam') || lower.includes('singapore')) {
      botText = "🚢 Global Port & Logistics Radar:\n• Rotterdam Port: 12 Container Ships Docked (EXIM-992 Customs Cleared)\n• Singapore Hub: 99.4% Customs Clearance Efficiency\n• NY Freight: All Hub Clearances Active";
      botAction = { label: 'View Divisions & Hubs', path: '/departments' };
    } else if (lower.includes('department') || lower.includes('division') || lower.includes('budget')) {
      botText = "🏢 Division & Budget Allocation:\n• Total Organizational Units: 6 Engineering & Logistics Divisions\n• Combined Annual Budget: $7.8 Million\n• Largest Division: Civil Engineering (48 Members)";
      botAction = { label: 'View Department Directory', path: '/departments' };
    } else if (lower.includes('contact') || lower.includes('colleague') || lower.includes('directory') || lower.includes('phone')) {
      botText = "📞 EXIM 2D Staff Network:\n• Total Directory Contacts: 142 Personnel\n• Key Contact: Sophia Martinez (Logistics Lead) & David Chen (Civil Site Engineer)";
      botAction = { label: 'Open Company Directory', path: isEmployee ? '/employee/directory' : '/employees' };
    } else {
      botText = `💡 EXIM-AI Assistance:\nI have logged your request: "${userText}".\n\nYou can ask me about Leave Balances, Payslips, Attendance Rates, Customs Freight Ships, or Staff Onboarding!`;
    }

    return { botText, botAction };
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText, action: null }]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      const { botText, botAction } = processQuery(userText);
      setIsTyping(false);
      setChatHistory((prev) => [...prev, { sender: 'bot', text: botText, action: botAction }]);
    }, 700);
  };

  const handleQuickChip = (promptText) => {
    setInputMsg(promptText);
  };

  return (
    <>
      {/* Floating AI Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-cyan-600 text-white shadow-2xl shadow-blue-600/40 flex items-center space-x-2.5 cursor-pointer border border-white/20"
        title="EXIM-AI HR Assistant"
      >
        <FiCpu className="w-6 h-6 animate-pulse" />
        <span className="font-extrabold text-xs hidden sm:inline">EXIM-AI Assistant</span>
      </motion.button>

      {/* AI Assistant Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[490px]"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30">
                  <FiCpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wide text-white">EXIM-AI Intelligence</h3>
                  <p className="text-[10px] text-cyan-300 font-bold">Smart GenAI ERP Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                      <FiCpu className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#2563EB] text-white rounded-tr-none font-semibold'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Interactive Action Button inside Bot Message */}
                    {msg.action && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(msg.action.path);
                        }}
                        className="mt-3 px-3 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-[11px] flex items-center space-x-1.5 shadow-md transition cursor-pointer w-full justify-center"
                      >
                        <FiZap className="w-3.5 h-3.5 text-cyan-300" />
                        <span>{msg.action.label}</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <FiUser className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                    <FiCpu className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs font-semibold flex items-center space-x-1">
                    <span>EXIM-AI is thinking</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[10px]">
              <button
                onClick={() => handleQuickChip('My Leave Quota')}
                className="px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-bold border border-blue-200 whitespace-nowrap transition cursor-pointer"
              >
                🌴 Leave Quota
              </button>
              <button
                onClick={() => handleQuickChip('My Payslip Details')}
                className="px-2.5 py-1 rounded-full bg-teal-50 text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white font-bold border border-teal-200 whitespace-nowrap transition cursor-pointer"
              >
                💵 Payslip
              </button>
              <button
                onClick={() => handleQuickChip('Attendance Rate')}
                className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white font-bold border border-purple-200 whitespace-nowrap transition cursor-pointer"
              >
                ⏱️ Attendance
              </button>
              <button
                onClick={() => handleQuickChip('Rotterdam Cargo Ship')}
                className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white font-bold border border-amber-200 whitespace-nowrap transition cursor-pointer"
              >
                🚢 Port Freight
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask EXIM-AI about leave, payslips, attendance..."
                className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl shadow-md transition cursor-pointer"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistantModal;
