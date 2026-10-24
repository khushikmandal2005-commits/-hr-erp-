const { readDB, writeDB } = require('../database');

const getAttendanceLogs = async (req, res, next) => {
  try {
    const db = readDB();
    res.json({ success: true, attendance: db.attendance });
  } catch (error) {
    next(error);
  }
};

const clockInOrOut = async (req, res, next) => {
  try {
    const db = readDB();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const existing = db.attendance.find((a) => a.empId === req.user.empId && a.date === today);

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
      return res.json({ success: true, message: `Clocked In successfully at ${now}`, log: newLog });
    } else {
      existing.checkOut = now;
      writeDB(db);
      return res.json({ success: true, message: `Clocked Out successfully at ${now}`, log: existing });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAttendanceLogs, clockInOrOut };
