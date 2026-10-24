const { readDB, writeDB } = require('../database');

const getPayrollRecords = async (req, res, next) => {
  try {
    const db = readDB();
    res.json({ success: true, payroll: db.payroll });
  } catch (error) {
    next(error);
  }
};

const disbursePayroll = async (req, res, next) => {
  try {
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

    res.json({ success: true, message: 'Payroll disbursed successfully', record });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPayrollRecords, disbursePayroll };
