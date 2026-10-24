const Department = require('../models/Department');

const getDepartments = async (req, res, next) => {
  try {
    const departments = [
      { id: '1', name: 'Civil Engineering & Construction', code: 'CIV-ENG', head: 'John Doe', staffCount: 48, budget: '$3.5M', status: 'Active' },
      { id: '2', name: 'Export-Import Freight & Customs', code: 'EXIM-LOG', head: 'Sophia Martinez', staffCount: 34, budget: '$2.1M', status: 'Active' },
      { id: '3', name: 'Heavy Equipment Operations', code: 'HEAVY-OPS', head: 'Liam O’Connor', staffCount: 24, budget: '$1.4M', status: 'Active' },
      { id: '4', name: 'Finance & Procurement', code: 'FIN-ACC', head: 'Marcus Vance', staffCount: 20, budget: '$850K', status: 'Active' },
      { id: '5', name: 'Human Resources & Safety', code: 'HR-SAFE', head: 'Alex Morgan', staffCount: 16, budget: '$600K', status: 'Active' },
    ];
    res.json({ success: true, count: departments.length, departments });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDepartments };
