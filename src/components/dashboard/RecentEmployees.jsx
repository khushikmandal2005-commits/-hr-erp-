import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiMoreVertical, FiFilter, FiCheck, FiClock } from 'react-icons/fi';

const RecentEmployees = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const employees = [
    {
      id: 'EMP-1089',
      name: 'Sophia Martinez',
      email: 'sophia.m@exim2d.com',
      department: 'Export & Logistics',
      role: 'Logistics Manager',
      status: 'Active',
      joined: '12 Jul 2026',
      avatarColor: 'bg-blue-600',
    },
    {
      id: 'EMP-1090',
      name: 'David Chen',
      email: 'david.chen@exim2d.com',
      department: 'Global Sales',
      role: 'Trade Specialist',
      status: 'Active',
      joined: '18 Jul 2026',
      avatarColor: 'bg-cyan-600',
    },
    {
      id: 'EMP-1091',
      name: 'Elena Rostova',
      email: 'elena.r@exim2d.com',
      department: 'Human Resources',
      role: 'Talent Acquisition',
      status: 'On Leave',
      joined: '22 Jul 2026',
      avatarColor: 'bg-amber-600',
    },
    {
      id: 'EMP-1092',
      name: 'Marcus Vance',
      email: 'marcus.v@exim2d.com',
      department: 'Finance & Accounts',
      role: 'Senior Accountant',
      status: 'Probation',
      joined: '25 Jul 2026',
      avatarColor: 'bg-purple-600',
    },
    {
      id: 'EMP-1093',
      name: 'Aisha Patel',
      email: 'aisha.p@exim2d.com',
      department: 'IT & Operations',
      role: 'ERP System Analyst',
      status: 'Active',
      joined: '28 Jul 2026',
      avatarColor: 'bg-emerald-600',
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(filterQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white">Recent Employees</h3>
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs px-2 py-0.5 rounded-full font-bold">
              {employees.length} Joined Recently
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Newly onboarded personnel across world trade divisions.</p>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter list..."
            className="pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
            <tr>
              <th className="py-3 px-4 rounded-l-xl">Employee</th>
              <th className="py-3 px-4">Department & Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Join Date</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-800/40 transition group">
                {/* Employee Name & Photo */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-xl ${emp.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-md shrink-0`}>
                      {emp.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-blue-400 transition">
                        {emp.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{emp.email}</div>
                    </div>
                  </div>
                </td>

                {/* Dept & Role */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-200">{emp.department}</div>
                  <div className="text-[10px] text-slate-400">{emp.role}</div>
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      emp.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : emp.status === 'On Leave'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        emp.status === 'Active'
                          ? 'bg-emerald-400 animate-pulse'
                          : emp.status === 'On Leave'
                          ? 'bg-amber-400'
                          : 'bg-purple-400'
                      }`}
                    />
                    <span>{emp.status}</span>
                  </span>
                </td>

                {/* Join Date */}
                <td className="py-3.5 px-4 text-slate-400 font-medium">{emp.joined}</td>

                {/* Action */}
                <td className="py-3.5 px-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
                    <FiMoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEmployees;
