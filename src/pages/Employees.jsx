import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers,
  FiSearch,
  FiPlus,
  FiFilter,
  FiDownload,
  FiMail,
  FiMoreVertical,
  FiGrid,
  FiList,
  FiMapPin,
  FiX,
  FiCheckCircle,
  FiUserCheck,
} from 'react-icons/fi';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employeeList, setEmployeeList] = useState([
    { id: 'EX-101', name: 'Aarav Sharma', role: 'Senior Logistics Manager', dept: 'Export & Logistics', status: 'Active', location: 'JNPT Port Mumbai', email: 'aarav.sharma@exim2d.in', phone: '+91 98201 12345', color: 'from-[#2563EB] to-blue-700' },
    { id: 'EX-102', name: 'Priya Patel', role: 'Customs Clearance Specialist', dept: 'Global Sales', status: 'Active', location: 'Mundra Port Gujarat', email: 'priya.patel@exim2d.in', phone: '+91 98791 23456', color: 'from-[#14B8A6] to-teal-600' },
    { id: 'EX-103', name: 'Amitabh Verma', role: 'Lead Civil Site Engineer', dept: 'Civil Infrastructure', status: 'Active', location: 'Delhi Expressway Site', email: 'amitabh.verma@exim2d.in', phone: '+91 99102 34567', color: 'from-purple-600 to-indigo-600' },
    { id: 'EX-104', name: 'Neha Gupta', role: 'Talent Acquisition Lead', dept: 'Human Resources', status: 'Active', location: 'Corporate HQ Delhi', email: 'neha.gupta@exim2d.in', phone: '+91 98113 45678', color: 'from-amber-500 to-orange-600' },
    { id: 'EX-105', name: 'Vikramaditya Rao', role: 'Marine Freight Lead', dept: 'Export & Logistics', status: 'Active', location: 'Chennai Port Hub', email: 'vikram.rao@exim2d.in', phone: '+91 94440 56789', color: 'from-[#14B8A6] to-emerald-600' },
    { id: 'EX-106', name: 'Ananya Sen', role: 'Senior Payroll Auditor', dept: 'Finance & Accounts', status: 'On Leave', location: 'Kolkata Logistics Hub', email: 'ananya.sen@exim2d.in', phone: '+91 98300 67890', color: 'from-rose-600 to-pink-600' },
    { id: 'EX-107', name: 'Rohan Joshi', role: 'ERP Full-Stack Analyst', dept: 'IT & Operations', status: 'Active', location: 'Bengaluru Tech Hub', email: 'rohan.joshi@exim2d.in', phone: '+91 98220 78901', color: 'from-[#2563EB] to-cyan-600' },
    { id: 'EX-108', name: 'Sneha Iyer', role: 'Structural Safety Inspector', dept: 'Civil Infrastructure', status: 'Probation', location: 'Kochi Terminal', email: 'sneha.iyer@exim2d.in', phone: '+91 94480 89012', color: 'from-teal-600 to-emerald-600' },
  ]);

  const [newEmpForm, setNewEmpForm] = useState({
    name: '',
    role: '',
    dept: 'Export & Logistics',
    location: '',
    email: '',
    phone: '',
  });

  const departments = ['All', 'Export & Logistics', 'Global Sales', 'Human Resources', 'Finance & Accounts', 'IT & Operations'];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!newEmpForm.name || !newEmpForm.role || !newEmpForm.email) {
      alert('Please fill out all required fields');
      return;
    }

    const newId = `EX-${100 + employeeList.length + 1}`;
    const newEmp = {
      id: newId,
      name: newEmpForm.name,
      role: newEmpForm.role,
      dept: newEmpForm.dept,
      status: 'Active',
      location: newEmpForm.location || 'Headquarters',
      email: newEmpForm.email,
      phone: newEmpForm.phone || '+1 555-0100',
      color: 'from-[#2563EB] to-cyan-600',
    };

    setEmployeeList([newEmp, ...employeeList]);
    setIsAddModalOpen(false);
    setNewEmpForm({ name: '', role: '', dept: 'Export & Logistics', location: '', email: '', phone: '' });
    showToast(`Employee ${newEmp.name} onboarded successfully!`);
  };

  const filtered = employeeList.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || e.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const exportCSV = () => {
    showToast('Directory exported to CSV successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 font-sans text-slate-800"
    >
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
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-1">
            <FiUsers className="w-4 h-4" />
            <span>Workforce Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Employee Directory & Profiles
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 max-w-xl">
            Centralized database of {employeeList.length} personnel across EXIM 2D global trade divisions.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200/80 flex items-center space-x-2 transition"
          >
            <FiDownload className="w-4 h-4 text-[#2563EB]" />
            <span>Export Directory</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-extrabold shadow-md shadow-blue-600/25 flex items-center space-x-2 transition transform active:scale-95"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Personnel', val: employeeList.length, sub: 'Across 6 Hubs', color: 'text-[#2563EB]' },
          { label: 'Active On Duty', val: employeeList.filter((e) => e.status === 'Active').length, sub: '90.1% Attendance', color: 'text-[#14B8A6]' },
          { label: 'On Leave', val: employeeList.filter((e) => e.status === 'On Leave').length, sub: 'Approved Requests', color: 'text-amber-500' },
          { label: 'Probationary Staff', val: employeeList.filter((e) => e.status === 'Probation').length, sub: 'Review Due This Month', color: 'text-purple-600' },
        ].map((m, i) => (
          <div key={i} className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5">
            <span className="text-xs font-bold text-slate-400">{m.label}</span>
            <div className={`text-2xl font-black ${m.color} mt-1`}>{m.val}</div>
            <span className="text-[10px] font-semibold text-slate-400">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, designation, ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-slate-400 w-4 h-4" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="bg-white text-slate-800">
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          <div className="bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition ${viewMode === 'grid' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-400 hover:text-slate-700'}`}
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition ${viewMode === 'table' ? 'bg-[#2563EB] text-white shadow-md' : 'text-slate-400 hover:text-slate-700'}`}
              title="Table View"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((emp) => (
            <motion.div
              key={emp.id}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                    {emp.id}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      emp.status === 'Active'
                        ? 'bg-teal-50 text-[#14B8A6] border-teal-200'
                        : emp.status === 'On Leave'
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-purple-50 text-purple-600 border-purple-200'
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${emp.color} text-white font-black flex items-center justify-center text-base shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
                    {emp.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#2563EB] transition-colors truncate">
                      {emp.name}
                    </h3>
                    <p className="text-xs text-[#2563EB] font-bold truncate">{emp.role}</p>
                    <p className="text-[11px] text-slate-500 font-semibold truncate">{emp.dept}</p>
                  </div>
                </div>

                <div className="space-y-2 py-3 border-t border-b border-slate-100 text-xs text-slate-600 my-4">
                  <div className="flex items-center space-x-2 font-medium">
                    <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{emp.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-medium">
                    <FiMail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedEmployee(emp)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-800 font-extrabold transition"
                >
                  View Profile
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg">
                  <FiMoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4 rounded-l-xl">Employee Name</th>
                <th className="py-3.5 px-4">Role & Division</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${emp.color} text-white font-black flex items-center justify-center text-xs shadow-md`}>
                        {emp.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{emp.role}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{emp.dept}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{emp.location}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 text-[#14B8A6] border border-teal-200">
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => setSelectedEmployee(emp)} className="text-[#2563EB] hover:underline font-extrabold">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD NEW EMPLOYEE MODAL */}
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

              <h2 className="text-xl font-black text-slate-900 mb-1">Onboard New Employee</h2>
              <p className="text-xs text-slate-500 font-semibold mb-6">Add staff details to EXIM 2D World Traders HR roster.</p>

              <form onSubmit={handleAddEmployeeSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmpForm.name}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, name: e.target.value })}
                    placeholder="e.g. Robert Vance"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Designation *</label>
                  <input
                    type="text"
                    required
                    value={newEmpForm.role}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, role: e.target.value })}
                    placeholder="e.g. Civil Site Inspector"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newEmpForm.dept}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, dept: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  >
                    {departments.filter(d => d !== 'All').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmpForm.email}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, email: e.target.value })}
                    placeholder="e.g. robert.v@exim2d.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location Hub</label>
                  <input
                    type="text"
                    value={newEmpForm.location}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, location: e.target.value })}
                    placeholder="e.g. Rotterdam, NL"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-700 text-white font-extrabold shadow-lg shadow-blue-600/25 mt-4 transition"
                >
                  Confirm & Onboard Staff
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW PROFILE MODAL */}
      <AnimatePresence>
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-center"
            >
              <button
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${selectedEmployee.color} text-white font-black flex items-center justify-center text-2xl shadow-xl mx-auto mb-4`}>
                {selectedEmployee.name.split(' ').map((n) => n[0]).join('')}
              </div>

              <h2 className="text-xl font-black text-slate-900">{selectedEmployee.name}</h2>
              <p className="text-xs text-[#2563EB] font-bold mt-0.5">{selectedEmployee.role}</p>
              <p className="text-xs text-slate-500 font-semibold">{selectedEmployee.dept} • {selectedEmployee.id}</p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 my-5 text-left text-xs space-y-2">
                <div><strong className="text-slate-400">Email:</strong> <span className="text-slate-800 font-semibold">{selectedEmployee.email}</span></div>
                <div><strong className="text-slate-400">Phone:</strong> <span className="text-slate-800 font-semibold">{selectedEmployee.phone}</span></div>
                <div><strong className="text-slate-400">Location:</strong> <span className="text-slate-800 font-semibold">{selectedEmployee.location}</span></div>
                <div><strong className="text-slate-400">Status:</strong> <span className="text-[#14B8A6] font-bold">{selectedEmployee.status}</span></div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
              >
                Close Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Employees;
