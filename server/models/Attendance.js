const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      index: true,
    },
    empName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['Present', 'Late', 'Absent', 'Half Day'],
      default: 'Present',
    },
    siteLocation: {
      type: String,
      default: 'Rotterdam Port Terminal',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
