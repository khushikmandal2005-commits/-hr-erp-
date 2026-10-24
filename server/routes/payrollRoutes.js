const express = require('express');
const router = express.Router();
const { getPayrollRecords, disbursePayroll } = require('../controllers/payrollController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getPayrollRecords);
router.post('/disburse', protect, authorize('HR', 'ADMIN'), disbursePayroll);

module.exports = router;
