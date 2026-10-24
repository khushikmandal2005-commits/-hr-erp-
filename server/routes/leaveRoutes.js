const express = require('express');
const router = express.Router();
const { getLeaveRequests, applyLeave, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getLeaveRequests);
router.post('/apply', protect, applyLeave);
router.patch('/:id/status', protect, authorize('HR', 'ADMIN'), updateLeaveStatus);

module.exports = router;
