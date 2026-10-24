const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity Leave', 'Emergency Site Leave'],
      default: 'Annual Leave',
    },
    dates: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Leave', leaveSchema);
