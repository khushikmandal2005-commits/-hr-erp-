const express = require('express');
const router = express.Router();
const { getAttendanceLogs, clockInOrOut } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAttendanceLogs);
router.post('/clock', protect, clockInOrOut);

module.exports = router;
