const { readDB, writeDB } = require('../database');

const getLeaveRequests = async (req, res, next) => {
  try {
    const db = readDB();
    res.json({ success: true, leaves: db.leaves });
  } catch (error) {
    next(error);
  }
};

const applyLeave = async (req, res, next) => {
  try {
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

    res.status(201).json({ success: true, message: 'Leave request submitted successfully', leave: newLeave });
  } catch (error) {
    next(error);
  }
};

const updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDB();

    const target = db.leaves.find((l) => l.id === id);
    if (!target) return res.status(404).json({ success: false, message: 'Leave request not found' });

    target.status = status;
    writeDB(db);

    res.json({ success: true, message: `Leave request ${status}`, leave: target });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLeaveRequests, applyLeave, updateLeaveStatus };
