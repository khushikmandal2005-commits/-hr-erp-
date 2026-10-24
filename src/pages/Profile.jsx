import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiEdit3,
  FiGlobe,
  FiCheckCircle,
  FiX,
  FiCreditCard,
  FiKey,
  FiPrinter,
  FiDownload,
} from 'react-icons/fi';
import logo from '../assets/logo.png';

const Profile = () => {
  const userRole = localStorage.getItem('userRole') || 'HR';
  const isEmployee = userRole === 'EMPLOYEE';

  const [toastMsg, setToastMsg] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGatePassModalOpen, setIsGatePassModalOpen] = useState(false);

  // Dynamic profile data based on login role
  const [profileData, setProfileData] = useState(
    isEmployee
      ? {
          name: 'Sophia Martinez',
          initials: 'SM',
          empId: 'EXIM-8092',
          title: 'Logistics Manager | Export & Trade Division',
          company: 'EXIM 2D World Traders Inc. — Rotterdam & NY Hub',
          badge: 'Export & Customs Staff',
          badgeStyle: 'bg-teal-50 text-[#14B8A6] border-teal-200',
          email: 'sophia.m@exim2d.com',
          phone: '+1 (555) 019-2834',
          location: 'Rotterdam Freight Terminal & NY Hub',
          timeZone: 'UTC+1 (Central European Time)',
          systemRole: 'Employee Self-Service (Level 2 Staff)',
          permissions: 'Access personal clock-in, leave quota balances, payslip downloads & company directory.',
          clearanceLevel: 'Level 2 - Freight & Customs Access',
        }
      : {
          name: 'Alex Morgan',
          initials: 'AM',
          empId: 'EXIM-1001',
          title: 'Global HR Administrator & Operations Lead',
          company: 'EXIM 2D World Traders Inc. — World Trade Center HQ',
          badge: 'Active Executive Admin',
          badgeStyle: 'bg-blue-50 text-[#2563EB] border-blue-200',
          email: 'alex.morgan@exim2d.com',
          phone: '+1 (555) 019-2834',
          location: 'WTC Suite 400, New York',
          timeZone: 'UTC-5 (Eastern Time)',
          systemRole: 'Level 1 Executive Admin',
          permissions: 'Full read/write permissions for employee records, payroll, recruitment & ERP configurations.',
          clearanceLevel: 'Level 1 - Executive Master Access',
        }
  );

  const [editForm, setEditForm] = useState({
    name: profileData.name,
    title: profileData.title,
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
  });

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editForm.name || !editForm.email) {
      alert('Please fill out required fields');
      return;
    }

    const updatedInitials = editForm.name.split(' ').map((n) => n[0]).join('').substring(0, 2);

    setProfileData({
      ...profileData,
      name: editForm.name,
      initials: updatedInitials,
      title: editForm.title,
      email: editForm.email,
      phone: editForm.phone,
      location: editForm.location,
    });

    setIsEditModalOpen(false);
    triggerToast('Profile updated successfully!');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans text-slate-800">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-[#2563EB] text-white text-xs font-bold shadow-lg flex items-center justify-between z-50 relative"
          >
            <div className="flex items-center space-x-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg('')} className="text-white hover:opacity-80 cursor-pointer">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative overflow-hidden">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-blue-700 text-white font-black flex items-center justify-center text-3xl shadow-lg shadow-blue-500/25 shrink-0">
          {profileData.initials}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{profileData.name}</h1>
            <span className={`text-xs px-3 py-0.5 rounded-full border font-extrabold ${profileData.badgeStyle}`}>
              {profileData.badge}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#2563EB] font-bold mt-1">{profileData.title}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">{profileData.company}</p>
        </div>

        {/* Single Edit Profile Button in Header */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditForm({
                name: profileData.name,
                title: profileData.title,
                email: profileData.email,
                phone: profileData.phone,
                location: profileData.location,
              });
              setIsEditModalOpen(true);
            }}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold border border-slate-200/80 flex items-center space-x-2 transition shadow-xs cursor-pointer active:scale-95"
          >
            <FiEdit3 className="w-4 h-4 text-[#2563EB]" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* SINGLE MAIN DIGITAL GATE PASS SECTION CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl shadow-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-500/20 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-extrabold">
            <FiKey className="w-3.5 h-3.5" />
            <span>EXIM 2D OFFICIAL RFID / NFC GATE PASS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Digital Security Gate Pass & NFC Credentials</h2>
          <p className="text-xs text-slate-300 font-medium max-w-xl">
            Biometric gate authorization badge for Civil Construction Sites, Port Cargo Terminals, and NY Headquarters.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 z-10">
          <button
            onClick={() => setIsGatePassModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/30 flex items-center space-x-2 transition cursor-pointer active:scale-95"
          >
            <FiCreditCard className="w-4 h-4" />
            <span>View Full Pass Badge</span>
          </button>
          <button
            onClick={() => triggerToast(`Digital Gate Pass ID ${profileData.empId} exported to PDF!`)}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer"
            title="Download Digital Pass"
          >
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personal & Contact Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-2">Personal & Contact Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-[#2563EB] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 font-bold">Work Email</div>
                  <div className="font-extrabold text-slate-900 truncate">{profileData.email}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-[#14B8A6] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 font-bold">Direct Phone</div>
                  <div className="font-extrabold text-slate-900 truncate">{profileData.phone}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <FiMapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 font-bold">Work Location</div>
                  <div className="font-extrabold text-slate-900 truncate">{profileData.location}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <FiGlobe className="w-5 h-5 text-purple-600 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 font-bold">Time Zone</div>
                  <div className="font-extrabold text-slate-900 truncate">{profileData.timeZone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Security & System Roles */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <FiShield className="text-[#2563EB]" />
            <h3>Security & Roles</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>System Role</span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${profileData.badgeStyle}`}>
                  {profileData.systemRole}
                </span>
              </div>
              <p className="text-slate-500 font-medium text-[11px] mt-1">{profileData.permissions}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center space-x-2">
                <FiCheckCircle className="text-[#14B8A6]" />
                <span>2FA Encrypted Session</span>
              </div>
              <p className="text-slate-500 font-medium text-[11px] mt-1">Secured with Hardware Key / EXIM 2D Authenticator.</p>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
            >
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-slate-900 mb-1">Edit Profile Details</h2>
              <p className="text-xs text-slate-500 font-semibold mb-6">Update your EXIM 2D contact information & location.</p>

              <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Designation *</label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Work Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/25 mt-4 transition cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EXCLUSIVITY FEATURE: EXIM 2D DIGITAL NFC GATE PASS MODAL */}
      <AnimatePresence>
        {isGatePassModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-blue-500/30 relative text-left"
            >
              <button
                onClick={() => setIsGatePassModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <img src={logo} alt="EXIM 2D Logo" className="w-7 h-7 object-contain" />
                <div>
                  <div className="text-xs font-black tracking-widest text-white uppercase">EXIM 2D WORLD TRADERS</div>
                  <div className="text-[9px] text-[#14B8A6] font-bold tracking-widest uppercase">OFFICIAL SECURITY GATE PASS</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 mb-5 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-cyan-500 text-white font-black flex items-center justify-center text-xl shadow-lg shrink-0">
                  {profileData.initials}
                </div>
                <div>
                  <div className="text-sm font-black text-white">{profileData.name}</div>
                  <div className="text-[11px] text-cyan-300 font-bold">{profileData.title}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{profileData.empId}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl text-center mb-4">
                <div className="flex items-center justify-center space-x-2 text-slate-900 font-mono text-xs font-bold mb-2">
                  <FiKey className="w-5 h-5 text-[#2563EB]" />
                  <span>NFC / RFID BIOMETRIC PASS</span>
                </div>
                <div className="w-full h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-[10px] tracking-widest">
                  ||||| | |||| ||||| || |||||| | |||
                </div>
              </div>

              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-400/20 text-center mb-4">
                <span className="text-[10px] text-cyan-300 font-extrabold uppercase">{profileData.clearanceLevel}</span>
              </div>

              <button
                onClick={() => {
                  triggerToast(`Gate Pass ID ${profileData.empId} printed to security terminal!`);
                  setIsGatePassModalOpen(false);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FiPrinter className="w-4 h-4" />
                <span>Print Digital Pass Badge</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;
