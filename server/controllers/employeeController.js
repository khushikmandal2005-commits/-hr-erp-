const Employee = require('../models/Employee');
const { readDB, writeDB } = require('../database');

// @desc    Get all employees with Search, Filter & Pagination
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';
    const department = req.query.department || '';

    // Mongoose query
    try {
      let query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { empId: { $regex: search, $options: 'i' } },
        ];
      }
      if (department) {
        query.department = department;
      }

      const total = await Employee.countDocuments(query);
      const employees = await Employee.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      if (employees && employees.length > 0) {
        return res.json({
          success: true,
          count: employees.length,
          total,
          pages: Math.ceil(total / limit),
          page,
          employees,
        });
      }
    } catch (e) {
      // Fallthrough to memory DB
    }

    const db = readDB();
    let result = db.employees;

    if (search) {
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          e.role.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (department) {
      result = result.filter((e) => e.department === department);
    }

    res.json({
      success: true,
      count: result.length,
      total: result.length,
      page: 1,
      pages: 1,
      employees: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res, next) => {
  try {
    let employee = null;
    try {
      employee = await Employee.findById(req.params.id);
    } catch (e) {}

    if (!employee) {
      const db = readDB();
      employee = db.employees.find((e) => e.id === req.params.id || e.empId === req.params.id);
    }

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({ success: true, employee });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private/HR
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, role, department, location, salary } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Please provide name and email' });
    }

    const empId = `EXIM-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const newEmp = await Employee.create({
        empId,
        name,
        email,
        role: role || 'Site Engineer',
        department: department || 'Civil Engineering',
        location: location || 'Rotterdam Port Hub',
        salary: salary || 4500,
        photo: req.file ? `/uploads/${req.file.filename}` : '',
      });

      return res.status(201).json({ success: true, message: 'Employee created successfully', employee: newEmp });
    } catch (e) {
      // Memory fallback
      const db = readDB();
      const newEmp = {
        id: String(db.employees.length + 1),
        empId,
        name,
        email,
        role: role || 'Site Engineer',
        department: department || 'Civil Engineering',
        status: 'Active',
        location: location || 'Rotterdam Port Hub',
        salary: salary || 4500,
        photo: req.file ? `/uploads/${req.file.filename}` : '',
      };
      db.employees.unshift(newEmp);
      writeDB(db);
      return res.status(201).json({ success: true, message: 'Employee created successfully', employee: newEmp });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/HR
const updateEmployee = async (req, res, next) => {
  try {
    const db = readDB();
    const index = db.employees.findIndex((e) => e.id === req.params.id || e.empId === req.params.id);

    if (index !== -1) {
      db.employees[index] = { ...db.employees[index], ...req.body };
      writeDB(db);
      return res.json({ success: true, message: 'Employee updated successfully', employee: db.employees[index] });
    }

    res.status(404).json({ success: false, message: 'Employee not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/HR
const deleteEmployee = async (req, res, next) => {
  try {
    const db = readDB();
    db.employees = db.employees.filter((e) => e.id !== req.params.id && e.empId !== req.params.id);
    writeDB(db);
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
