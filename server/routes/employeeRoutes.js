const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router
  .route('/')
  .get(protect, getEmployees)
  .post(protect, authorize('HR', 'ADMIN'), upload.single('photo'), createEmployee);

router
  .route('/:id')
  .get(protect, getEmployeeById)
  .put(protect, authorize('HR', 'ADMIN'), updateEmployee)
  .delete(protect, authorize('HR', 'ADMIN'), deleteEmployee);

module.exports = router;
