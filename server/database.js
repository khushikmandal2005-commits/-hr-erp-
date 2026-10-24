const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

const initialData = {
  users: [
    {
      id: 'usr-1',
      email: 'hr.admin@exim2d.com',
      password: 'password123',
      name: 'Alex Morgan',
      role: 'HR',
      empId: 'EXIM-1001',
      title: 'Global HR Administrator & Operations Lead',
    },
    {
      id: 'usr-2',
      email: 'sophia.m@exim2d.com',
      password: 'password123',
      name: 'Sophia Martinez',
      role: 'EMPLOYEE',
      empId: 'EXIM-8092',
      title: 'Logistics Manager | Export & Trade Division',
    },
    {
      id: 'usr-3',
      email: 'employee@exim2d.com',
      password: 'password123',
      name: 'Sophia Martinez',
      role: 'EMPLOYEE',
      empId: 'EXIM-8092',
      title: 'Logistics Manager | Export & Trade Division',
    },
  ],
  employees: [
    { id: '1', name: 'Sophia Martinez', role: 'Logistics Manager', email: 'sophia.m@exim2d.com', department: 'Export-Import Logistics', status: 'Active', location: 'Rotterdam Port Hub', salary: 4600 },
    { id: '2', name: 'Alex Morgan', role: 'Global HR Admin', email: 'alex.morgan@exim2d.com', department: 'Human Resources', status: 'Active', location: 'New York HQ', salary: 5800 },
    { id: '3', name: 'John Doe', role: 'Senior Civil Engineer', email: 'john.d@exim2d.com', department: 'Civil Engineering', status: 'Active', location: 'Expressway Project Alpha', salary: 5200 },
    { id: '4', name: 'Aisha Patel', role: 'Customs Officer', email: 'aisha.p@exim2d.com', department: 'Export-Import Logistics', status: 'On Leave', location: 'Singapore Hub', salary: 4100 },
    { id: '5', name: 'Liam O’Connor', role: 'Heavy Equipment Specialist', email: 'liam.o@exim2d.com', department: 'Heavy Construction Crew', status: 'Active', location: 'Expressway Project Alpha', salary: 3900 },
  ],
  attendance: [
    { id: 'att-1', empId: 'EXIM-8092', empName: 'Sophia Martinez', date: '2026-07-30', checkIn: '09:02 AM', checkOut: '06:05 PM', status: 'Present' },
    { id: 'att-2', empId: 'EXIM-1001', empName: 'Alex Morgan', date: '2026-07-30', checkIn: '08:55 AM', checkOut: '06:15 PM', status: 'Present' },
  ],
  leaves: [
    { id: 'lv-1', empName: 'John Doe', empId: 'EXIM-3012', type: 'Annual Leave', dates: 'Aug 2 - Aug 5', reason: 'Site rotation vacation', status: 'Pending' },
    { id: 'lv-2', empName: 'Aisha Patel', empId: 'EXIM-4091', type: 'Sick Leave', dates: 'Aug 1', reason: 'Medical consultation', status: 'Pending' },
  ],
  payroll: [
    { month: 'July 2026', totalAmount: 248500, currency: 'USD', status: 'Disbursed', date: '2026-07-28' },
  ]
};

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
