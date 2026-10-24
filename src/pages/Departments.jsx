import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiPlus, FiMoreVertical, FiX, FiCheckCircle, FiUsers, FiDollarSign, FiMapPin } from 'react-icons/fi';

const Departments = () => {
  const [toastMsg, setToastMsg] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRoster, setSelectedRoster] = useState(null);

  const [depts, setDepts] = useState([
    { name: 'Export & Logistics', head: 'Sophia Martinez', count: 48, code: 'EXP-LOG', budget: '$1.2M', location: 'Rotterdam & NY', color: 'from-[#2563EB] to-blue-700' },
    { name: 'Global Sales & Trade', head: 'David Chen', count: 34, code: 'SALES-GL', budget: '$2.4M', location: 'Singapore Hub', color: 'from-[#14B8A6] to-teal-600' },
    { name: 'Human Resources', head: 'Elena Rostova', count: 18, code: 'HR-GLOBAL', budget: '$800K', location: 'Headquarters', color: 'from-purple-600 to-indigo-600' },
    { name: 'Finance & Accounts', head: 'Marcus Vance', count: 22, code: 'FIN-ACC', budget: '$1.5M', location: 'London & Dubai', color: 'from-amber-500 to-orange-600' },
    { name: 'IT & Operations', head: 'Aisha Patel', count: 20, code: 'IT-OPS', budget: '$950K', location: 'Mumbai & Tech Hub', color: 'from-[#14B8A6] to-emerald-600' },
  ]);

  const [newDeptForm, setNewDeptForm] = useState({
    name: '',
    head: '',
    code: '',
    budget: '',
    location: '',
  });

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDeptForm.name || !newDeptForm.head || !newDeptForm.code) {
      alert('Please fill in required fields');
      return;
    }

    const newDivision = {
      name: newDeptForm.name,
      head: newDeptForm.head,
      count: 1,
      code: newDeptForm.code.toUpperCase(),
      budget: newDeptForm.budget || '$500K',
      location: newDeptForm.location || 'Headquarters',
      color: 'from-[#2563EB] to-cyan-600',
    };

    setDepts([...depts, newDivision]);
    setIsAddModalOpen(false);
    setNewDeptForm({ name: '', head: '', code: '', budget: '', location: '' });
    triggerToast(`Division ${newDivision.name} added successfully!`);
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
            <button onClick={() => setToastMsg('')} className="text-white hover:opacity-80">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiBriefcase className="w-4 h-4" />
            <span>Organizational Units</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Department Directory & Budget</h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Manage global divisions, unit heads & headcount budgets.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="relative z-10 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95 cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Division</span>
        </button>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {depts.map((d) => (
          <motion.div
            key={d.code}
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                  {d.code}
                </span>
                <span className="text-xs font-extrabold text-[#14B8A6] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  {d.count} Staff Members
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-[#2563EB] transition-colors mb-1">{d.name}</h3>
              <p className="text-xs text-slate-500 font-semibold mb-4">Head of Unit: <strong className="text-slate-800">{d.head}</strong></p>

              <div className="space-y-2 py-3 border-t border-b border-slate-100 text-xs text-slate-700 my-4 font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Annual Budget:</span>
                  <span className="font-extrabold text-slate-900">{d.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Hub:</span>
                  <span className="font-semibold text-slate-800">{d.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedRoster(d)}
                className="text-xs text-[#2563EB] hover:underline font-extrabold transition cursor-pointer"
              >
                View Division Roster &rarr;
              </button>
              <button
                onClick={() => triggerToast(`Options menu opened for ${d.name}`)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <FiMoreVertical className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ADD NEW DIVISION MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-black text-slate-900 mb-1">Add New Division</h2>
              <p className="text-xs text-slate-500 font-semibold mb-6">Create an organizational unit for EXIM 2D World Traders.</p>

              <form onSubmit={handleAddDept} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Division Name *</label>
                  <input
                    type="text"
                    required
                    value={newDeptForm.name}
                    onChange={(e) => setNewDeptForm({ ...newDeptForm, name: e.target.value })}
                    placeholder="e.g. Civil Expressway Infrastructure"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Head of Division *</label>
                  <input
                    type="text"
                    required
                    value={newDeptForm.head}
                    onChange={(e) => setNewDeptForm({ ...newDeptForm, head: e.target.value })}
                    placeholder="e.g. David Chen"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Division Code (e.g. CIVIL-INFRA) *</label>
                  <input
                    type="text"
                    required
                    value={newDeptForm.code}
                    onChange={(e) => setNewDeptForm({ ...newDeptForm, code: e.target.value })}
                    placeholder="CIVIL-INFRA"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Annual Budget</label>
                  <input
                    type="text"
                    value={newDeptForm.budget}
                    onChange={(e) => setNewDeptForm({ ...newDeptForm, budget: e.target.value })}
                    placeholder="$1.5M"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/25 mt-4 transition cursor-pointer"
                >
                  Create Organizational Unit
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW ROSTER MODAL */}
      <AnimatePresence>
        {selectedRoster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
            >
              <button
                onClick={() => setSelectedRoster(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl border border-blue-200">
                  <FiBriefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedRoster.name} Roster</h2>
                  <p className="text-xs text-slate-500 font-semibold">Division Code: {selectedRoster.code} • {selectedRoster.count} Staff Members</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 my-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Unit Head:</span>
                  <span className="text-slate-900 font-extrabold">{selectedRoster.head}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Annual Budget:</span>
                  <span className="text-[#14B8A6] font-extrabold">{selectedRoster.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Primary Hubs:</span>
                  <span className="text-slate-800 font-bold">{selectedRoster.location}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-700">Assigned Personnel List</h4>
                <div className="p-3 rounded-xl bg-slate-100/80 text-xs flex justify-between items-center">
                  <span className="font-bold text-slate-800">{selectedRoster.head}</span>
                  <span className="text-[10px] font-extrabold bg-[#2563EB] text-white px-2 py-0.5 rounded-full">Head of Unit</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRoster(null)}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
              >
                Close Roster Overview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Departments;
