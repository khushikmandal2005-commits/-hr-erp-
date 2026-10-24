const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { readDB, writeDB } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'exim-2d-world-traders-secret-key-2026';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });
    req.user = user;
    next();
  });
};

// 1. AUTH ROUTES
app.post('/api/auth/login', (req, res) => {
  const { email, password, portal } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email.toLowerCase() === email?.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  if (portal === 'hr' && user.role !== 'HR') {
    return res.status(403).json({ message: 'Unauthorized. HR access required.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name, empId: user.empId },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      empId: user.empId,
      title: user.title,
    }
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// 2. EMPLOYEES ROUTES
app.get('/api/employees', (req, res) => {
  const db = readDB();
  res.json({ employees: db.employees, total: db.employees.length });
});

app.post('/api/employees', authenticateToken, (req, res) => {
  const { name, role, email, department, location, salary } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const db = readDB();
  const newEmp = {
    id: String(db.employees.length + 1),
    name,
    role: role || 'Site Engineer',
    email,
    department: department || 'Civil Engineering',
    status: 'Active',
    location: location || 'Rotterdam Port Hub',
    salary: salary || 4500,
  };

  db.employees.unshift(newEmp);
  writeDB(db);

  res.status(201).json({ message: 'Employee added successfully', employee: newEmp });
});

// 3. ATTENDANCE ROUTES
app.get('/api/attendance', (req, res) => {
  const db = readDB();
  res.json({ attendance: db.attendance });
});

app.post('/api/attendance/clock', authenticateToken, (req, res) => {
  const db = readDB();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const existing = db.attendance.find(a => a.empId === req.user.empId && a.date === today);

  if (!existing) {
    const newLog = {
      id: `att-${Date.now()}`,
      empId: req.user.empId,
      empName: req.user.name,
      date: today,
      checkIn: now,
      checkOut: null,
      status: 'Present',
    };
    db.attendance.unshift(newLog);
    writeDB(db);
    return res.json({ message: `Clocked In successfully at ${now}`, log: newLog });
  } else {
    existing.checkOut = now;
    writeDB(db);
    return res.json({ message: `Clocked Out successfully at ${now}`, log: existing });
  }
});

// 4. LEAVE ROUTES
app.get('/api/leave', (req, res) => {
  const db = readDB();
  res.json({ leaves: db.leaves });
});

app.post('/api/leave/apply', authenticateToken, (req, res) => {
  const { type, dates, reason } = req.body;
  const db = readDB();

  const newLeave = {
    id: `lv-${Date.now()}`,
    empName: req.user.name,
    empId: req.user.empId,
    type: type || 'Annual Leave',
    dates: dates || 'Aug 5 - Aug 8',
    reason: reason || 'Personal Leave',
    status: 'Pending',
  };

  db.leaves.unshift(newLeave);
  writeDB(db);

  res.status(201).json({ message: 'Leave request submitted', leave: newLeave });
});

app.patch('/api/leave/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDB();

  const target = db.leaves.find(l => l.id === id);
  if (!target) return res.status(404).json({ message: 'Leave request not found' });

  target.status = status;
  writeDB(db);

  res.json({ message: `Leave request ${status}`, leave: target });
});

// 5. PAYROLL ROUTES
app.get('/api/payroll', (req, res) => {
  const db = readDB();
  res.json({ payroll: db.payroll });
});

app.post('/api/payroll/disburse', authenticateToken, (req, res) => {
  const { month, amount, currency } = req.body;
  const db = readDB();

  const record = {
    month: month || 'August 2026',
    totalAmount: amount || 248500,
    currency: currency || 'USD',
    status: 'Disbursed',
    date: new Date().toISOString().split('T')[0],
  };

  db.payroll.unshift(record);
  writeDB(db);

  res.json({ message: 'Payroll disbursed successfully', record });
});

// 6. EXIM-AI CHATBOT ROUTE
app.post('/api/ai/chat', (req, res) => {
  const { message, role } = req.body;
  const lower = (message || '').toLowerCase();

  let botText = "I have received your request. Ask me about Leave Balances, Payslips, Attendance, Cargo Ships, or Staff Onboarding!";
  let botAction = null;

  if (lower.includes('leave')) {
    botText = role === 'EMPLOYEE'
      ? "🌴 Your Leave Balance: 14 Days Annual Leave, 9 Sick Leave days remaining."
      : "🌴 HR Leave Overview: 5 Active Leave requests pending approval.";
    botAction = { label: 'Open Leave Portal', path: role === 'EMPLOYEE' ? '/employee/leave' : '/leave' };
  } else if (lower.includes('payslip') || lower.includes('salary')) {
    botText = "💵 July 2026 Salary Disbursed: $4,600 Take-Home (Direct Deposit Verified).";
    botAction = { label: 'View Payslips', path: role === 'EMPLOYEE' ? '/employee/payslips' : '/payroll' };
  }

  res.json({ botText, botAction });
});

app.listen(PORT, () => {
  console.log(`🚀 EXIM 2D HR ERP Backend Server running at http://localhost:${PORT}`);
});
